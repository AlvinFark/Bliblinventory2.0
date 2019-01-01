package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.repository.DetailTransaksiRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class PrintController {

    @Autowired
    BarangRepository barangRepository;

    @Autowired
    SubBarangRepository subBarangRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    DetailTransaksiRepository detailTransaksiRepository;

    //testing
    @RequestMapping(value = "api/printDaftarBarang", method = RequestMethod.GET)
    public void testing(){
        String FILE_NAME = "D:/bliblinventory/testing.xlsx";
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Daftar Barang Inventaris");

        List<Barang> barangList = barangRepository.findAllByIsExistOrderByKode(true);
        int rowNum = 0;
        System.out.println("Creating excel");

        XSSFCellStyle styleHeader = workbook.createCellStyle();
        styleHeader.setBorderTop((short) 6); // double lines border
        styleHeader.setBorderBottom((short) 1); // single line border
        XSSFFont font = workbook.createFont();
        font.setFontHeightInPoints((short) 15);
        font.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        styleHeader.setFont(font);

        //buat header
        int colNum = 0;
        Row row = sheet.createRow(rowNum++);
        Cell cell = row.createCell(colNum++);
        cell.setCellValue("Kode Barang");
        cell = row.createCell(colNum++);
        cell.setCellValue("Nama Barang");
        cell = row.createCell(colNum++);
        cell.setCellValue("Harga Beli");
        cell = row.createCell(colNum++);
        cell.setCellValue("Deskripsi");
        cell = row.createCell(colNum++);
        cell.setCellValue("Kode Sub Barang");
        cell = row.createCell(colNum++);
        cell.setCellValue("Status");
        cell = row.createCell(colNum++);
        cell.setCellValue("Peminjam");
        cell = row.createCell(colNum++);
        cell.setCellValue("Tanggal Pinjam");
        for(int j = 0; j<8; j++)
            row.getCell(j).setCellStyle(styleHeader);

        //utk kontennya
        for (int i=0;i<barangList.size();i++) {
            row = sheet.createRow(rowNum++);
            colNum = 0;
            cell = row.createCell(colNum++);
            cell.setCellValue((String) barangList.get(i).getKode());
            cell = row.createCell(colNum++);
            cell.setCellValue((String) barangList.get(i).getNama());
            cell = row.createCell(colNum++);
            cell.setCellValue((Long) barangList.get(i).getHargaBeli());
            cell = row.createCell(colNum++);
            cell.setCellValue((String) barangList.get(i).getDeskripsi());
            CellStyle cs = workbook.createCellStyle(); //utk keperluan multiline pada cell deskripsi
            cs.setWrapText(true);
            cell.setCellStyle(cs);
            List<SubBarang> subBarangList= subBarangRepository.findAllByBarangAndIsExistOrderByStatusSubBarangDesc(barangList.get(i), true);
            for (int j=0;j<subBarangList.size();j++){
                int colSubBarang = colNum;
                cell = row.createCell(colSubBarang++);
                cell.setCellValue((String) subBarangList.get(j).getKodeSubBarang());
                cell = row.createCell(colSubBarang++);
                if(subBarangList.get(j).getStatusSubBarang() == true){
                    cell.setCellValue("Tersedia");
                    cell = row.createCell(colSubBarang++);
                    cell.setCellValue("-");
                    cell = row.createCell(colSubBarang++);
                    cell.setCellValue("-");
                }
                else{
                    cell.setCellValue("Dipinjam");
                    //ganti tanggal kembali jadi 000000..
                    DetailTransaksi detailTransaksi= detailTransaksiRepository.getDetailTransaksiBySubBarang_KodeSubBarangAndTgKembaliAndIsExist(subBarangList.get(j).getKodeSubBarang(), null, true);
                    cell = row.createCell(colSubBarang++);
                    cell.setCellValue((String) detailTransaksi.getTransaksi().getUser().getName());
                    cell = row.createCell(colSubBarang++);
                    cell.setCellValue((String) (detailTransaksi.getTransaksi().getTgPinjam()).toString());
                }
                row = sheet.createRow(rowNum++);
            }
            if(subBarangList.size()==0){
                for(int j=0;j<4;j++){
                    cell = row.createCell(colNum++);
                    cell.setCellValue("-");
                }
                row = sheet.createRow(rowNum++);
            }
        }
        //supaya panjang kolom fit content
        for (int i=0;i<8;i++)
            sheet.autoSizeColumn(i);
        try {
            FileOutputStream outputStream = new FileOutputStream(FILE_NAME);
            workbook.write(outputStream);
            workbook.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Done");
    }
}
