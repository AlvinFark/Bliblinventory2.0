package com.sal.bliblinventory.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "transaksi")
public class Transaksi {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idTransaksi;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_peminjam", nullable=false)
    private User user;

    private LocalDateTime tgOrder;

    private LocalDate tgPinjam;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "kode_barang", nullable=false)
    private Barang barang;

    private int jumlah;

    private String keterangan;

    @Enumerated(EnumType.STRING)
    private StatusTransaksi statusTransaksi;

    //constructor
    public Transaksi(){

    }

    public Transaksi(User user, String tgPinjam, Barang barang, int jumlah, String keterangan, StatusTransaksi statusTransaksi){
        this.user = user;
        this.tgPinjam = LocalDate.parse(tgPinjam);
        this.barang = barang;
        this.jumlah = jumlah;
        this.keterangan = keterangan;
        this.statusTransaksi = statusTransaksi;
        this.tgOrder = LocalDateTime.now(ZoneId.of("Asia/Jakarta"));
    }

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

    public LocalDateTime getTgOrder() {
        return tgOrder;
    }

    public void setTgOrder(LocalDateTime tgOrder) {
        this.tgOrder = tgOrder;
    }

    public LocalDate getTgPinjam() {
        return tgPinjam;
    }

    public void setTgPinjam(LocalDate tgPinjam) {
        this.tgPinjam = tgPinjam;
    }

    public Barang getBarang() {
        return barang;
    }

    public void setBarang(Barang barang) {
        this.barang = barang;
    }

    public int getJumlah() {
        return jumlah;
    }

    public void setJumlah(int jumlah) {
        this.jumlah = jumlah;
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
