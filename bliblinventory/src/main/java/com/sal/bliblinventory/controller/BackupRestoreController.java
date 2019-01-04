package com.sal.bliblinventory.controller;

import com.sal.bliblinventory.service.BackupRestoreService;
import com.smattme.MysqlExportService;
import com.smattme.MysqlImportService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    BackupRestoreService backupRestoreService;

    //set the outputs temp dir

    @GetMapping("/backup")
    private String backup() throws Exception{
        backupRestoreService.backup();
    }

    @PostMapping("/restore")
    private void restore(@RequestParam("dbRestore") MultipartFile fileSQL) throws Exception{
        backupRestoreService.restore(fileSQL);
    }
}
