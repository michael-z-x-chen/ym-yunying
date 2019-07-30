package com.hmn.ym.manager;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import tk.mybatis.spring.annotation.MapperScan;

@Slf4j
@SpringBootApplication
@MapperScan(basePackages = "com.hmn.ym.dao.mapper")
public class ApplicationConsole extends SpringBootServletInitializer {
    private final static Logger log = LoggerFactory.getLogger(ApplicationConsole.class);

    public static void main(String[] args) throws Exception {
        SpringApplication.run(ApplicationConsole.class, args);

        log.info("======================管理后台启动成功======================");
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ApplicationConsole.class);
    }
}
