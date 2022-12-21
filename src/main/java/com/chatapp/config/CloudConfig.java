package com.chatapp.config;

import com.cloudinary.Cloudinary;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@SpringBootApplication
public class CloudConfig {

    @Bean
    public Cloudinary cloudinaryConfigs() {
        Cloudinary cloudinary = null;
        Map config = new HashMap();
        config.put("cloud_name", "dxccmy7an");
        config.put("api_key", "233598743282511");
        config.put("api_secret", "uQJ0N8nPQjm9Zr870BmGWUeViN4");
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }

}
