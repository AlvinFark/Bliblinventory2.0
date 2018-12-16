package com.sal.bliblinventory.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@ComponentScan
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("LoginPage.html");
        registry.addViewController("/homeEmployee").setViewName("homeEmployee.html");
        registry.addViewController("/homeSuperior").setViewName("homeSuperior.html");
        registry.addViewController("/homeAdmin").setViewName("homeAdmin.html");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}