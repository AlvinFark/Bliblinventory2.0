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
        registry.addViewController("/employee").setViewName("basePage.html");
        registry.addViewController("/superior").setViewName("basePage.html");
        registry.addViewController("/admin").setViewName("basePage.html");
        registry.addViewController("/homeEmployee.html").setViewName("homeEmployee.html");
        registry.addViewController("/homeSuperior.html").setViewName("homeSuperior.html");
        registry.addViewController("/homeAdmin.html").setViewName("homeAdmin.html");
        registry.addViewController("/daftarBarangCard.html").setViewName("daftarBarangCard.html");
        registry.addViewController("/daftarBarangTable.html").setViewName("daftarBarangTable.html");
        registry.addViewController("/orderList.html").setViewName("orderList.html");
        registry.addViewController("/daftarKaryawan.html").setViewName("daftarKaryawan.html");
        registry.addViewController("/permintaanKaryawan.html").setViewName("permintaanKaryawan.html");
        registry.addViewController("/permintaanKaryawanToAssign.html").setViewName("permintaanKaryawanToAssign.html");
        registry.addViewController("/pengembalianBarang.html").setViewName("pengembalianBarang.html");
        registry.addViewController("/permintaanPembelianKaryawan.html").setViewName("permintaanPembelianKaryawan.html");
        registry.addViewController("/permintaanPembelianList.html").setViewName("permintaanPembelianList.html");
        registry.addViewController("/daftarKategori.html").setViewName("daftarKategori.html");

        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}