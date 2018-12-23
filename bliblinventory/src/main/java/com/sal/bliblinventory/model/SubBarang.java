package com.sal.bliblinventory.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "subBarang")
public class SubBarang {
    @Id
    private String kodeSubBarang;

    @NotBlank
    private Boolean statusSubBarang;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kode_barang", nullable=false)
    private Barang barang;


    //getter and setter
    public String getKodeSubBarang() {
        return kodeSubBarang;
    }

    public void setKodeSubBarang(String kodeSubBarang) {
        this.kodeSubBarang = kodeSubBarang;
    }

    public Boolean getStatusSubBarang() {
        return statusSubBarang;
    }

    public void setStatusSubBarang(Boolean statusSubBarang) {
        this.statusSubBarang = statusSubBarang;
    }

    public Barang getBarang() {
        return barang;
    }

    public void setBarang(Barang barang) {
        this.barang = barang;
    }
}
