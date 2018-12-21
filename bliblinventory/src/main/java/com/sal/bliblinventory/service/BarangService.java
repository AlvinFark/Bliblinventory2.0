package com.sal.bliblinventory.service;

import com.sal.bliblinventory.model.Barang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class BarangService {
    @Autowired
    JdbcTemplate template;

    public List<Barang> findAll() {
        String sql = "select * from barang order by nama[]";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }

    public List<Barang> findByKode(String kode) {
        String sql = "select * from barang where kode ='"+kode+"'";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }

    public List<Barang> sortByName() {
        String sql = "select * from barang order by nama";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }

    public List<Barang> sortByCode() {
        String sql = "select * from barang order by kode";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }


    public List<Barang> getDetailBarang(String kodeBarang) {
        String sql = "select * from barang where kode = '"+kodeBarang+"'";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }

    public List<Barang> sortByNameAndSeachKeyword(String keyword) {
        String sql = "select * from barang where nama like '%"+keyword+"%' order by nama";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }

    public List<Barang> sortByCodeAndSeachKeyword(String keyword) {
        String sql = "select * from barang where nama like '%"+keyword+"%' order by kode";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                Barang barang = new Barang(resultSet.getString("kode"),
                        resultSet.getString("nama"),
                        resultSet.getString("gambar"),
                        resultSet.getString("deskripsi"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }

    public List<Barang> getJumlahSubBarang(Barang barang, String keyword) {
        String sql = "select COUNT(kode_sub_barang) as JumlahSubBarang, sub_barang_tersedia.total as JumlahTersedia from sub_barang, (SELECT COUNT(kode_sub_barang) AS total FROM sub_barang where kode_barang='"+barang.getKode()+"' AND status_sub_barang=1) AS sub_barang_tersedia where kode_barang='"+barang.getKode()+"'";
        //String sql = "select COUNT(kode_sub_barang) as JumlahSubBarang from sub_barang where kode_barang='"+barang.getKode()+"'";
        RowMapper<Barang> rm = new RowMapper<Barang>() {
            @Override
            public Barang mapRow(ResultSet resultSet, int i) throws SQLException {
                barang.setJumlahSubBarang(resultSet.getInt("JumlahSubBarang"));
                barang.setJumlahSubBarangTersedia(resultSet.getInt("JumlahTersedia"));
                return barang;
            }
        };
        return template.query(sql, rm);
    }
}
