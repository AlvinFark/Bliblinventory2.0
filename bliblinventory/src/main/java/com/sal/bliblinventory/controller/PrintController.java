package com.sal.bliblinventory.controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.sal.bliblinventory.model.Barang;
import com.sal.bliblinventory.model.Category;
import com.sal.bliblinventory.model.DetailTransaksi;
import com.sal.bliblinventory.model.SubBarang;
import com.sal.bliblinventory.repository.BarangRepository;
import com.sal.bliblinventory.repository.CategoryRepository;
import com.sal.bliblinventory.repository.DetailTransaksiRepository;
import com.sal.bliblinventory.repository.SubBarangRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @RequestMapping(value = "api/printDaftarBarang", method = RequestMethod.GET)
    public void printDaftarBarang(){
        String FILE_NAME = "D:/bliblinventory/file-to-print/print-daftar-barang.xlsx";
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
                    String str = "1970-01-01 00:00:00";
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

                    DetailTransaksi detailTransaksi= detailTransaksiRepository.getDetailTransaksiBySubBarang_KodeSubBarangAndTgKembaliAndIsExist(subBarangList.get(j).getKodeSubBarang(), dateTime, true);
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

    @RequestMapping(value = "api/printRequestBeli/{namaBarang}/{namaBrand}/{namaSupplier}/{kuantitas}/{namaKategori}/{tanggal}/{catatan}", method = RequestMethod.GET)
    public void printRequestBeliDenganCatatan(@PathVariable(value = "namaBarang") String namaBarang, @PathVariable(value = "namaBrand") String namaBrand, @PathVariable(value = "namaSupplier") String namaSupplier,
                        @PathVariable(value = "kuantitas") String kuantitas, @PathVariable(value = "namaKategori") String namaKategori, @PathVariable(value = "tanggal") String tanggal, @PathVariable(value = "catatan") String catatan) {
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("D:/bliblinventory/file-to-print/print-request-pembelian.pdf"));
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.TIMES_BOLD, 17, BaseColor.BLACK);
            Font fontContentBold = FontFactory.getFont(FontFactory.TIMES_BOLD, 12, BaseColor.BLACK);
            Font fontContent = FontFactory.getFont(FontFactory.TIMES, 12, BaseColor.BLACK);

            //buat judul
            Chunk chunk = new Chunk("Request Pembelian Barang Inventaris", fontTitle);
            Paragraph centerTitle = new Paragraph(chunk);
            centerTitle.setAlignment(Element.ALIGN_CENTER);
            document.add( centerTitle );
            document.add( Chunk.NEWLINE );
            document.add( Chunk.NEWLINE );

            //buat content
            Paragraph p = new Paragraph();
            p.add(new Chunk("Tanggal", fontContentBold));
            p.setTabSettings(new TabSettings(130f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+tanggal, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Nama Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaBarang, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Nama Brand Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaBrand, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Kategori Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaKategori, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Kuantitas Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+kuantitas+" unit", fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Nama Supplier", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaSupplier, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Catatan", fontContentBold));
            p.setTabSettings(new TabSettings(130f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+catatan, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            document.close();
        }
        catch (DocumentException de) {
            de.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "api/printRequestBeli/{namaBarang}/{namaBrand}/{namaSupplier}/{kuantitas}/{namaKategori}/{tanggal}", method = RequestMethod.GET)
    public void printRequestBeliTanpaCatatan(@PathVariable(value = "namaBarang") String namaBarang, @PathVariable(value = "namaBrand") String namaBrand, @PathVariable(value = "namaSupplier") String namaSupplier,
                        @PathVariable(value = "kuantitas") String kuantitas, @PathVariable(value = "namaKategori") String namaKategori, @PathVariable(value = "tanggal") String tanggal) {
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("D:/bliblinventory/file-to-print/print-request-pembelian.pdf"));
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.TIMES_BOLD, 17, BaseColor.BLACK);
            Font fontContentBold = FontFactory.getFont(FontFactory.TIMES_BOLD, 12, BaseColor.BLACK);
            Font fontContent = FontFactory.getFont(FontFactory.TIMES, 12, BaseColor.BLACK);

            //buat judul
            Chunk chunk = new Chunk("Request Pembelian Barang Inventaris", fontTitle);
            Paragraph centerTitle = new Paragraph(chunk);
            centerTitle.setAlignment(Element.ALIGN_CENTER);
            document.add( centerTitle );
            document.add( Chunk.NEWLINE );
            document.add( Chunk.NEWLINE );

            //buat content
            Paragraph p = new Paragraph();
            p.add(new Chunk("Tanggal", fontContentBold));
            p.setTabSettings(new TabSettings(130f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+tanggal, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Nama Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaBarang, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Nama Brand Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaBrand, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Kategori Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaKategori, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Kuantitas Barang", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+kuantitas+" unit", fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Nama Supplier", fontContentBold));
            p.setTabSettings(new TabSettings(65f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": "+namaSupplier, fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            p = new Paragraph();
            p.add(new Chunk("Catatan", fontContentBold));
            p.setTabSettings(new TabSettings(130f));
            p.add(Chunk.TABBING);
            p.add(new Chunk(": -", fontContent));
            document.add(p);
            document.add( Chunk.NEWLINE );

            document.close();
        }
        catch (DocumentException de) {
            de.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "api/downloadFormatTambahBarangBulk", method = RequestMethod.GET)
    public void downloadFormatTambahBarangBulk() {
        try {
            FileInputStream fis = new FileInputStream("D:/bliblinventory/file-to-print/format-tambah-barang-bulk.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheetAt(1);
            List<Category> categoryList = categoryRepository.findAll();
            int idxRow = 0;
            int idxCell = 0;
            Row row;
            Cell cell;
            for(int i=0;i<categoryList.size();i++){
                idxCell=0;
                row = sheet.createRow(idxRow++);
                cell = row.createCell(idxCell++);
                cell.setCellValue((Long) categoryList.get(i).getId());
                cell = row.createCell(idxCell++);
                cell.setCellValue((String) categoryList.get(i).getName());
            }
            fis.close();
            FileOutputStream fos = new FileOutputStream(new File("D:/bliblinventory/file-to-print/format-tambah-barang-bulk.xlsx"));
            workbook.write(fos);
            fos.close();
            System.out.println("Done");
        }
        catch (FileNotFoundException e){

        }
        catch (IOException e){

        }
    }
}
