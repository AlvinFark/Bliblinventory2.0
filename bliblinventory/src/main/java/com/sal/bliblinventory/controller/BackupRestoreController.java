package com.sal.bliblinventory.controller;

import com.smattme.MysqlExportService;
import com.smattme.MysqlImportService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
public class BackupRestoreController {

    //properties relating to email config
//    properties.setProperty(MysqlExportService.EMAIL_HOST, "smtp.mailtrap.io");
//    properties.setProperty(MysqlExportService.EMAIL_PORT, "25");
//    properties.setProperty(MysqlExportService.EMAIL_USERNAME, "mailtrap-username");
//    properties.setProperty(MysqlExportService.EMAIL_PASSWORD, "mailtrap-password");
//    properties.setProperty(MysqlExportService.EMAIL_FROM, "test@smattme.com");
//    properties.setProperty(MysqlExportService.EMAIL_TO, "backup@smattme.com");

    //set the outputs temp dir

    String savePath;

    @GetMapping("/backup")
    private String backupDB() throws Exception{
        //required properties for exporting of db
        Properties properties = new Properties();
        properties.put(MysqlExportService.DB_NAME, "bliblinventory");
        properties.setProperty(MysqlExportService.DB_USERNAME, "root");
        properties.setProperty(MysqlExportService.DB_PASSWORD, "");
        properties.setProperty(MysqlExportService.JDBC_DRIVER_NAME, "com.mysql.cj.jdbc.Driver");

        properties.setProperty(MysqlExportService.TEMP_DIR, new File("backup").getPath());
        properties.setProperty(MysqlExportService.PRESERVE_GENERATED_ZIP, "true");

        MysqlExportService mysqlExportService = new MysqlExportService(properties);
        mysqlExportService.export();


        File file = mysqlExportService.getGeneratedZipFile();

        byte[] bytes = Files.readAllBytes(file.toPath());
        savePath = "D:/bliblinventory/backup/" + file.getName();
        Path path = Paths.get(savePath);

        Files.write(path, bytes);

        //Menghapus file temp hasil backup
        try{
            Path p = Paths.get("backup/" + file.getName());
            Files.delete(p);
            p = Paths.get("backup");
            Files.delete(p);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return file.getName();
    }

    @PostMapping("/restore")
    private void restoreDB(@RequestParam("dbRestore") MultipartFile fileSQL) throws Exception{

        String sql = new String(fileSQL.getBytes());

        MysqlImportService.builder()
                .setDatabase("bliblirestore")
                .setSqlString(sql)
                .setUsername("blibli")
                .setPassword("future")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDeleteExisting(true)
                .setDropExisting(true)
                .importDatabase();
    }
}
