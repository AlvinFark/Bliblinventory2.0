package com.sal.bliblinventory.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "permintaanPembelian")
public class PermintaanPembelian {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idPermintaanPembelian;

    private LocalDateTime tgOrder;

    private String namaBarang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    private Category category;

    private int jumlahBarang;

    private String keterangan;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable=false)
    private User user;

    private boolean isBought=false;

    private boolean isExist=true;

    //constructor
    public PermintaanPembelian(){

    }

    public PermintaanPembelian(String namaBarang, Category category, int jumlahBarang, String keterangan, User user){
        this.namaBarang = namaBarang;
        this.category = category;
        this.jumlahBarang = jumlahBarang;
        this.keterangan = keterangan;
        this.user = user;
        this.tgOrder = LocalDateTime.now(ZoneId.of("Asia/Jakarta"));
        this.isBought = false;
        this.isExist = true;
    }

    //getter setter
    public Long getIdPermintaanPembelian() {
        return idPermintaanPembelian;
    }

    public void setIdPermintaanPembelian(Long idPermintaanPembelian) {
        this.idPermintaanPembelian = idPermintaanPembelian;
    }

    public LocalDateTime getTgOrder() {
        return tgOrder;
    }

    public void setTgOrder(LocalDateTime tgOrder) {
        this.tgOrder = tgOrder;
    }

    public String getNamaBarang() {
        return namaBarang;
    }

    public void setNamaBarang(String namaBarang) {
        this.namaBarang = namaBarang;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getJumlahBarang() {
        return jumlahBarang;
    }

    public void setJumlahBarang(int jumlahBarang) {
        this.jumlahBarang = jumlahBarang;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isBought() {
        return isBought;
    }

    public void setBought(boolean bought) {
        isBought = bought;
    }

    public boolean isExist() {
        return isExist;
    }

    public void setExist(boolean exist) {
        isExist = exist;
    }
}
