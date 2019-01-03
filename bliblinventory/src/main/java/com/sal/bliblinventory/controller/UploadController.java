package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zeroturnaround.zip.commons.FilenameUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    BarangRepository barangRepository;

    @Autowired
    SubBarangRepository subBarangRepository;

    @Autowired
    CategoryRepository categoryRepository;

    private String stringValue;
    private Long numericValue;
    private int baris,kolom;

    @PostMapping("/upload/bulk")
    public String singleFileUpload(@RequestParam("fileExcel") MultipartFile fileExcel, @RequestParam("fileGambar") MultipartFile fileGambar) throws Exception {
        stringValue = null;
        numericValue = null;
        baris = 0; //variabel untuk menandai posisi baris excel
        kolom = 0; //variabel untuk menandai posisi kolom excel

        //Cek apakah input file excel mengirimkan file excel (.xlsx)
        int x = fileExcel.getOriginalFilename().lastIndexOf('.');
        if(!fileExcel.getOriginalFilename().substring(x).equals(".xlsx")){
            return "notExcel";
        }

        //Cek apakah input file zip mengirimkan file zip (.zip)
        int z = fileGambar.getOriginalFilename().lastIndexOf('.');
        if(!fileGambar.getOriginalFilename().substring(z).equals(".zip")){
            return "notZip";
        }

        //Menyimpan file excel yang diupload secara temporary
        File excel = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream fos = new FileOutputStream(excel);
        IOUtils.copy(fileExcel.getInputStream(), fos);
        fos.close();

        //Menyimpan file zip yang diupload secara temporary
        File zip = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream o = new FileOutputStream(zip);
        IOUtils.copy(fileGambar.getInputStream(), o);
        o.close();

        //
        String destination = "D:/bliblinventory/images/barang/";

        //Membaca isi dari dokumen excel yang diupload
        try {
            FileInputStream excelFile = new FileInputStream(excel);
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();

            String kode = " ";
            String nama = " ";
            String deskripsi = " ";
            String gambar = " ";
            double kuantitas = 0;
            Long harga = 0L;
            String kategori = " ";

            boolean isSuccess = true; //variabel untuk menandai status dari proses tambah bulk

            ArrayList<Barang> barangList = new ArrayList<Barang>();
            ArrayList<SubBarang> subBarangList = new ArrayList<SubBarang>();

            while (iterator.hasNext()) {
                if(!isSuccess) //Jika proses tambah bulk terjadi error
                    break;

                Row currentRow = iterator.next(); //Saat baris selanjutnya tidak kosong
                Iterator<Cell> cellIterator = currentRow.iterator();
                kolom = 0;

                while (cellIterator.hasNext()) { //Saat sel selanjutnya tidak kosong
                    Cell currentCell = cellIterator.next();
                    //getCellTypeEnum shown as deprecated for version 3.15
                    //getCellTypeEnum ill be renamed to getCellType starting from version 4.0

                    //Saat sel tersebut berisi String dan kolom tidak berada di posisi 2
                    if (currentCell.getCellTypeEnum() == CellType.STRING && kolom != 2) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                        stringValue = currentCell.getStringCellValue();
                    }
                    //Saat sel tersebut berisi numeric dan kolom berada di posisi 2 dan 4
                    else if (currentCell.getCellTypeEnum() == CellType.NUMERIC && (kolom == 2 || kolom == 4)) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                        numericValue = Double.valueOf(currentCell.getNumericCellValue()).longValue();
                    }
                    else{ //Kondisi saat sel tersebut tidak berisi String atau numeric
                        if(baris != 0){ //Saat baris tidak di posisi pertama
                            kolom = 0; //Dan kolom berada di posisi pertama di baris tersebut
                            isSuccess = false; //Proese tambah bulk gagal
                            break;
                        }
                    }
                    if(baris != 0){ //Memasukkan data yang didapat dari file excel ke variabel yang sesuai
                        switch (kolom){
                            case 0 : nama = stringValue;break;
                            case 1 : deskripsi = stringValue;break;
                            case 2 : kuantitas = numericValue;break;
                            case 3 : gambar = stringValue;break;
                            case 4 : harga = numericValue;break;
                            case 5 : kategori = stringValue;break;
                        }
                    }

                    //Saat kolom di posisi ke 5 (terakhir) dan baris tidak di posisi pertama
                    //Lakukan proses penambahan untuk tiap barang
                    if(kolom == 5 && baris != 0){
                        //Mengambil object kategori berdasarkan kategori yang didapatkan dari file excel
                        Category category = categoryRepository.findByName(kategori);

                        //Membatasi hasil query yang didapatkan menjadi 1 hasil
                        Pageable limit = new PageRequest(0, 1);

                        //Mengambil 3 karakter awal dari kategori sebagai bagian depan
                        String kodeHead = kategori.substring(0,3).toUpperCase();

                        //Cek apakah barang sudah ada di database
                        List<Barang> lastBarang = barangRepository.findByCategory_NameContainingOrderByKodeDesc(kodeHead,limit);
                        if (lastBarang.isEmpty()){ //Jika barang belum ada di database
                            kode = kodeHead + "0001"; //Kode barang dimulai dari 0001
                        } else { //Jika sudah ada barang dengan kategori sama di database
                            //Mengambil 4 karakter terakhir untuk digunakan bagi kode barang selanjutnya
                            String lastIndexString = lastBarang.get(0).getKode().substring(3,7);
                            int lastIndex = Integer.parseInt(lastIndexString);
                            lastIndex++;
                            String kodeTail = "0000" + lastIndex;
                            kodeTail = kodeTail.substring(kodeTail.length()-4);
                            kode = kodeHead+kodeTail;
                        }

                        List<SubBarang> listSubBarangInDatabase = subBarangRepository.findAllByBarang_KodeAndIsExistOrderByKodeSubBarangDesc(kode, limit,true);

                        //variabel untuk menandai apakah barang sudah ada di database atau belum
                        boolean isNotExist = listSubBarangInDatabase.isEmpty();

                        int lastIdSubBarang = 1;

                        //Mencoba meng-extract zip berdasarkan filename gambar di excel
                        try{
                            ZipFile zipFile = new ZipFile(zip);
                            zipFile.extractFile(gambar,destination);
                        } catch (ZipException e){ //Jika terjadi error, maka proses tambah bulk gagal
                            //e.printStackTrace();
                            isSuccess = false;
                        }

                        //Mengubah filename gambar menjadi sama dengan id barang
                        File f = new File(destination+gambar);
                        int p = gambar.lastIndexOf('.');
                        String ext = gambar.substring(p);
                        File newFile = new File(destination+kode+ext);
                        f.renameTo(newFile);
                        gambar = kode + ext; //Set variabel gambar dengan kode dan ekstensi dari gambar, agar data gambar di database sama

                        //Melakukan pembentukan object barang berdasarkan data yang didapat dari excel
                        Barang barang = new Barang(kode,nama,gambar,deskripsi,harga,true,category);
                        if(isNotExist){ //Jika barang belum ada di database, barang tersebut dimasukkan ke database
                            barangRepository.save(barang);
                            //Menambahkan barang yang baru saja ditambahkan ke ArrayList barang
                            //Untuk jaga-jaga seandainya proses tambah bulk tidak berhasil sepenuhnya
                            barangList.add(barang);
                        }
                        else{
                            //Mengambil kode terakhir dari sub barang yang sudah ada
                            lastIdSubBarang = Integer.parseInt(listSubBarangInDatabase.get(0).getKodeSubBarang().substring(3,7));
                        }

                        // Menambahkan sub barang berdasarkan kuantitas
                        for(int i=1;i<=kuantitas;i++){
                            String kodeTail = "0000" + lastIdSubBarang;
                            kodeTail = kodeTail.substring(kodeTail.length()-4);

                            String kodeSubBarang = barang.getKode() + kodeTail;

                            SubBarang subBarang = new SubBarang(kodeSubBarang, barang);
                            subBarangRepository.save(subBarang);

                            //Menambahkan sub barang yang baru saja ditambahkan ke ArrayList subBarang
                            //Untuk jaga-jaga seandainya proses tambah bulk tidak berhasil sepenuhnya
                            subBarangList.add(subBarang);
                            lastIdSubBarang++;
                        }
                    }
                    if(kolom == 5){
                        baris++;
                        if(cellIterator.hasNext() && !iterator.hasNext()){
                            isSuccess = false;
                            System.out.print("-------------------kena error------------------");
                        }
                        break;
                    }
                    kolom++;
                }
                System.out.println();
            }

            //Jika proses tambah bulk tidak berhasil sepenuhnya
            //Hapus sebagian data yang berhasil ditambahkan pada proses diatas
            if(!isSuccess){
                if(!subBarangList.isEmpty()){
                    for(SubBarang sb : subBarangList){
                        subBarangRepository.delete(sb);
                    }
                }
                if(!barangList.isEmpty()){
                    for(Barang b : barangList){
                        barangRepository.delete(b);
                    }
                }
                return "failed";
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        zip.delete();
        return "success";
    }

    @PostMapping("/upload/users/{fotoname}")
    public void singleFileUploadUser(@RequestParam("fotoKaryawan") MultipartFile fotoKaryawan, @PathVariable String fotoname, RedirectAttributes redirectAttributes, HttpServletResponse httpResponse) throws Exception {

      String fileName = fotoname;
      Path destination = Paths.get("D:/bliblinventory/images/users/").toAbsolutePath().normalize();
      Path targetLocation = destination.resolve(fileName);

      Files.copy(fotoKaryawan.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
    }

    @PostMapping("/upload/barang/{fotoname}")
    public void singleFileUploadBarang(@RequestParam("fotoBarang") MultipartFile fotoBarang, @PathVariable String fotoname, RedirectAttributes redirectAttributes, HttpServletResponse httpResponse) throws Exception {

      String fileName = fotoname;
      Path destination = Paths.get("D:/bliblinventory/images/barang/").toAbsolutePath().normalize();
      Path targetLocation = destination.resolve(fileName);

      Files.copy(fotoBarang.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
    }
}
