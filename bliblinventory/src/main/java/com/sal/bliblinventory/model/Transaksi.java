package com.sal.bliblinventory.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "transaksi")
public class Transaksi {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idTransaksi;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_peminjam", nullable=false)
    private User user;

    @NotBlank
    private Timestamp tgOrder;

    @NotBlank
    private Date tgPinjam;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kode_barang", nullable=false)
    private Barang barang;

    private String keterangan;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private StatusTransaksi statusTransaksi = StatusTransaksi.menunggu;

    //getter setter
    public Long getIdTransaksi() {
        return idTransaksi;
    }

    public void setIdTransaksi(Long idTransaksi) {
        this.idTransaksi = idTransaksi;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getTgOrder() {
        return tgOrder;
    }

    public void setTgOrder(Timestamp tgOrder) {
        this.tgOrder = tgOrder;
    }

    public Date getTgPinjam() {
        return tgPinjam;
    }

    public void setTgPinjam(Date tgPinjam) {
        this.tgPinjam = tgPinjam;
    }

    public Barang getBarang() {
        return barang;
    }

    public void setBarang(Barang barang) {
        this.barang = barang;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    public StatusTransaksi getStatusTransaksi() {
        return statusTransaksi;
    }

    public void setStatusTransaksi(StatusTransaksi statusTransaksi) {
        this.statusTransaksi = statusTransaksi;
    }
}
