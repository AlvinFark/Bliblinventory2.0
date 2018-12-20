package com.sal.bliblinventory.model;

public class Barang {
    private String kode;
    private String nama;
    private String gambar;
    private String deskripsi;
    private int jumlahSubBarang;
    private int jumlahSubBarangTersedia;

    public Barang(String kode, String nama, String gambar, String deskripsi){
        this.kode=kode;
        this.nama=nama;
        this.gambar=gambar;
        this.deskripsi=deskripsi;
    }

    //gettersetter
    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getGambar() {
        return gambar;
    }

    public void setGambar(String gambar) {
        this.gambar = gambar;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public int getJumlahSubBarang() {
        return jumlahSubBarang;
    }

    public void setJumlahSubBarang(int jumlahSubBarang) {
        this.jumlahSubBarang = jumlahSubBarang;
    }

    public int getJumlahSubBarangTersedia() {
        return jumlahSubBarangTersedia;
    }

    public void setJumlahSubBarangTersedia(int jumlahSubBarangTersedia) {
        this.jumlahSubBarangTersedia = jumlahSubBarangTersedia;
    }
}
