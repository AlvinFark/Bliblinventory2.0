package com.sal.bliblinventory.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "barang")
public class Barang {
    @Id
    private String kode;

    @NotBlank
    private String nama;

    @NotBlank
    private String gambar;

    @NotBlank
    private String deskripsi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    private Category category;

    private Long hargaBeli;

    private boolean isExist;

    //gettersetter

    public Barang(){}

    public Barang(String kode, String nama, String gambar, String deskripsi, Long hargaBeli, boolean isExist, Long kategori){
      this.kode = kode;
      this.nama = nama;
      this.gambar = gambar;
      this.deskripsi = deskripsi;
      this.isExist = isExist;
      this.hargaBeli = hargaBeli;
      try{
          this.category.setId(kategori);
      }
      catch(NullPointerException e){

      }
    }

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

    public Category getCategory() {
      return category;
    }

    public void setCategory(Category category) {
      this.category = category;
    }

  public Long getHargaBeli() {
    return hargaBeli;
  }

  public void setHargaBeli(Long hargaBeli) {
    this.hargaBeli = hargaBeli;
  }

  public void setIsExist(boolean exist) {
    isExist = exist;
  }

  public boolean getisExist(){
      return this.isExist;
  }
}
