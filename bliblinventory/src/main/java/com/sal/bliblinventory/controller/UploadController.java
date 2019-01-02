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
    private int baris,kolom = 0;

    @PostMapping("/upload/bulk")
    public String singleFileUpload(@RequestParam("fileExcel") MultipartFile fileExcel, @RequestParam("fileGambar") MultipartFile fileGambar) throws Exception {
        stringValue = null;
        numericValue = null;
        baris = 0;
        kolom = 0;

        //Cek apakah input file excel mengirimkan file excel
        int x = fileExcel.getOriginalFilename().lastIndexOf('.');
        if(!fileExcel.getOriginalFilename().substring(x).equals(".xlsx")){
            return "notExcel";
        }

        //Cek apakah input file zip mengirimkan file zip
        int z = fileGambar.getOriginalFilename().lastIndexOf('.');
        if(!fileGambar.getOriginalFilename().substring(z).equals(".zip")){
            return "notZip";
        }


//        if (file.isEmpty()) {
////            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
////        }
////
////        try {
////            // Get the file and save it somewhere
////            byte[] bytes = file.getBytes();
////            filename = UPLOADED_FOLDER + file.getOriginalFilename();
////            Path path = Paths.get(filename);
////
////            Files.write(path, bytes);
////
////            redirectAttributes.addFlashAttribute("message",
////                    "You successfully uploaded '" + file.getOriginalFilename() + "'");
////        } catch (IOException e) {
////            e.printStackTrace();
////        }
        
        File excel = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream fos = new FileOutputStream(excel);
        IOUtils.copy(fileExcel.getInputStream(), fos);
        fos.close();


//        File uploadedFile = new File("tambahBulk/" + fileExcel.getOriginalFilename());
//        uploadedFile.createNewFile();
//        FileOutputStream fos = new FileOutputStream(uploadedFile);
//        fos.write(fileExcel.getBytes());
//        fos.close();

        /**
         * save file to temp
         */
        File zip = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream o = new FileOutputStream(zip);
        IOUtils.copy(fileGambar.getInputStream(), o);
        o.close();

        /**
         * unizp file from temp by zip4j
         */
        String destination = "D:/bliblinventory/images/barang/";
//        try {
//            ZipFile zipFile = new ZipFile(zip);
//            zipFile.extractAll(destination);
//        } catch (ZipException e) {
//            e.printStackTrace();
//        } finally {
//            /**
//             * delete temp file
//             */
//            zip.delete();
//        }


        //membaca isi dari dokumen excel
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
            boolean isSuccess = true;

            ArrayList<Barang> barangList = new ArrayList<Barang>();
            ArrayList<SubBarang> subBarangList = new ArrayList<SubBarang>();

            while (iterator.hasNext()) {
                if(!isSuccess)
                    break;

                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                kolom = 0;

                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();
                    //getCellTypeEnum shown as deprecated for version 3.15
                    //getCellTypeEnum ill be renamed to getCellType starting from version 4.0
                    if (currentCell.getCellTypeEnum() == CellType.STRING && kolom != 2) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                        stringValue = currentCell.getStringCellValue();
                    } else if (currentCell.getCellTypeEnum() == CellType.NUMERIC && (kolom == 2 || kolom == 4)) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                        numericValue = Double.valueOf(currentCell.getNumericCellValue()).longValue();
                    }
                    else{
                        if(baris != 0){
                            System.out.print("--------------------------Masuk else----------------------");
                            kolom = 0;
                            isSuccess = false;
                            break;
                        }
                    }
                    if(baris != 0){
                        switch (kolom){
                            case 0 : nama = stringValue;break;
                            case 1 : deskripsi = stringValue;break;
                            case 2 : kuantitas = numericValue;break;
                            case 3 : gambar = stringValue;break;
                            case 4 : harga = numericValue;break;
                            case 5 : kategori = stringValue;break;
                        }
                    }
                    if(kolom == 5 && baris != 0){
                        Category category = categoryRepository.findByName(kategori);

                        //barangRepository.save(barang);
                        Pageable limit = new PageRequest(0, 1);
                        String kodeHead = kategori.substring(0,3).toUpperCase();    //PER

                        //Cek apakah barang sudah ada di database
                        List<Barang> lastBarang = barangRepository.findByCategory_NameContainingOrderByKodeDesc(kodeHead,limit);
                        if (lastBarang.isEmpty()){
                            kode = kodeHead+"0001";  //PER0001
                        } else {
                            String lastIndexString = lastBarang.get(0).getKode().substring(3,7);
                            int lastIndex = Integer.parseInt(lastIndexString);
                            lastIndex++;
                            String kodeTail = "0000" + lastIndex;
                            kodeTail = kodeTail.substring(kodeTail.length()-4);
                            kode = kodeHead+kodeTail;
                        }

                        List<SubBarang> listSubBarangInDatabase = subBarangRepository.findAllByBarang_KodeAndIsExistOrderByKodeSubBarangDesc(kode, limit,true);

                        boolean isNotExist = listSubBarangInDatabase.isEmpty();

                        int lastIdSubBarang = 1;

                        //Mencoba meng-extract zip berdasarkan filename gambar di excel
                        try{
                            ZipFile zipFile = new ZipFile(zip);
                            zipFile.extractFile(gambar,destination);
                        } catch (ZipException e){
                            e.printStackTrace();
                            isSuccess = false;
                        }

                        //Mengubah filename gambar menjadi sama dengan id barang
                        File f = new File(destination+gambar);
                        int p = gambar.lastIndexOf('.');
                        String ext = gambar.substring(p);
                        File newFile = new File(destination+kode+ext);
                        f.renameTo(newFile);

                        gambar = kode + ext;


                        Barang barang = new Barang(kode,nama,gambar,deskripsi,harga,true,category);
                        if(isNotExist){
                            barangRepository.save(barang);
                            barangList.add(barang);
                        }
                        else{
                            lastIdSubBarang = Integer.parseInt(listSubBarangInDatabase.get(0).getKodeSubBarang().substring(3,7));
                        }

                        // Menambah sub barang berdasarkan kuantitas
                        for(int i=1;i<=kuantitas;i++){

                            String kodeTail = "0000" + lastIdSubBarang;
                            kodeTail = kodeTail.substring(kodeTail.length()-4);

                            String kodeSubBarang = barang.getKode() + kodeTail;

                            SubBarang subBarang = new SubBarang(kodeSubBarang, barang);
                            subBarangRepository.save(subBarang);
                            subBarangList.add(subBarang);
                            lastIdSubBarang++;
                            //System.out.print("------------------" + i + "----------------------------");
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


        //MENGHAPUS FILE
//        try{
//            Path p = Paths.get(UPLOADED_FOLDER+file.getOriginalFilename());
//            Files.delete(p);
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
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
