package com.sal.bliblinventory.controller;

import com.smattme.MysqlExportService;
import com.smattme.MysqlImportService;
import org.apache.poi.util.IOUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
public class BackupRestoreController {
    //required properties for exporting of db
    Properties properties = new Properties();



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
    private void backupDB() throws Exception{
        Properties properties = new Properties();
        properties.put(MysqlExportService.DB_NAME, "bliblinventory");
        properties.setProperty(MysqlExportService.DB_USERNAME, "root");
        properties.setProperty(MysqlExportService.DB_PASSWORD, "");
        properties.setProperty(MysqlExportService.JDBC_DRIVER_NAME, "com.mysql.cj.jdbc.Driver");

        properties.setProperty(MysqlExportService.TEMP_DIR, new File("external").getPath());
        properties.setProperty(MysqlExportService.PRESERVE_GENERATED_ZIP, "true");

        MysqlExportService mysqlExportService = new MysqlExportService(properties);
        mysqlExportService.export();


        File file = mysqlExportService.getGeneratedZipFile();

        byte[] bytes = Files.readAllBytes(file.toPath());
        savePath = "D:/" + file.getName();
        Path path = Paths.get(savePath);

        Files.write(path, bytes);
    }

    @GetMapping("/restore")
    private void restoreDB() throws Exception{
        String sql = new String(Files.readAllBytes(Paths.get("D:/31_12_2019_20_22_40_bliblinventory_database_dump.sql")));

        MysqlImportService.builder()
                .setDatabase("bbb")
                .setSqlString(sql)
                .setUsername("blibli")
                .setPassword("CRYwWIPzqDDd8LMg")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDeleteExisting(true)
                .setDropExisting(true)
                .importDatabase();
    }
}
