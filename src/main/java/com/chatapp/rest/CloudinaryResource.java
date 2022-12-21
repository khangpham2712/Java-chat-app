package com.chatapp.rest;

import com.chatapp.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CloudinaryResource {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/public/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        Long str = System.currentTimeMillis();
        String url = cloudinaryService.uploadFile(file);
        System.out.println(System.currentTimeMillis()-str);
        return url;
    }
    @PostMapping("/public/multiupload")
    public List<String> uploadMultiFile(@RequestParam("file")  MultipartFile[] file) {
        Long str = System.currentTimeMillis();
        List<String> s = cloudinaryService.uploadMultiFile(file);
        System.out.println(System.currentTimeMillis()-str);
        return s;
    }
}
