package com.sal.bliblinventory.service;

import org.springframework.web.multipart.MultipartFile;

public interface BackupRestoreService {
    public String backup() throws Exception;

    public void restore(MultipartFile fileSQL);
}
