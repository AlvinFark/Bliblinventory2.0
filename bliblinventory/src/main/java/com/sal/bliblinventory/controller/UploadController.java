package com.sal.bliblinventory.controller;


import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.repository.BarangRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;

@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    BarangRepository barangRepository;

    public static String filename;
    private static String UPLOADED_FOLDER = "D:/";

    private String stringValue;
    private Long numericValue;
    private int baris,kolom = 0;

    @PostMapping("/upload")
    public void singleFileUpload(@RequestParam("fileUpload") MultipartFile file,
                                         RedirectAttributes redirectAttributes, ModelMap model) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
        }

        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            filename = UPLOADED_FOLDER + file.getOriginalFilename();
            Path path = Paths.get(filename);

            Files.write(path, bytes);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }


        //membaca isi dari dokumen excel
        try {
            FileInputStream excelFile = new FileInputStream(new File(filename));
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();

            String kode = " ";
            String nama = " ";
            String deskripsi = " ";
            String gambar = " ";
            double kuantitas;
            Long harga = 0L;
            Long kategori = 0L;

            while (iterator.hasNext()) {

                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();

                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();
                    //getCellTypeEnum shown as deprecated for version 3.15
                    //getCellTypeEnum ill be renamed to getCellType starting from version 4.0
                    if (currentCell.getCellTypeEnum() == CellType.STRING) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                        stringValue = currentCell.getStringCellValue();
                    } else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                        numericValue = Double.valueOf(currentCell.getNumericCellValue()).longValue();
                    }
                    if(baris != 0){
                        switch (kolom % 7){
                            case 0 : kode = stringValue;break;
                            case 1 : nama = stringValue;break;
                            case 2 : deskripsi = stringValue;break;
                            case 3 : kuantitas = numericValue;break;
                            case 4 : gambar = stringValue;break;
                            case 5 : harga = numericValue;break;
                            case 6 :
                                if(stringValue.equals("Elektronik"))
                                    kategori = 1L;
                                else if(stringValue.equals("Peralatan Kantor"))
                                    kategori = 2L;
                                break;
                        }
                    }
                    if(kolom % 7 == 6 && baris != 0){
                        Barang barang = new Barang(kode,nama,gambar,deskripsi,harga,true,kategori);
                        barangRepository.save(barang);
                    }
                    if(kolom == 6)
                        baris++;
                    kolom++;
                }
                System.out.println();

            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try{
            Path p = Paths.get(UPLOADED_FOLDER+file.getOriginalFilename());
            Files.delete(p);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //return new ModelAndView("redirect:/admin", model);
    }
}
