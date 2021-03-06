package com.sal.bliblinventory.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotBlank
    private String address;

    private Date dateOfBirth;

    private String phoneNumber;

    private Long superiorId;

    private boolean isActive;

    String gambar;

    public User() {

    }

    public User(String name, String username, String email, String password, Gender gender, String address, Date dateOfBirth, String phoneNumber, String gambar) {
      this.name = name;
      this.username = username;
      this.email = email;
      this.password = password;
      this.address = address;
      this.dateOfBirth = dateOfBirth;
      this.gender = gender;
      this.phoneNumber = phoneNumber;
      this.isActive = true;
      this.gambar = gambar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setDateOfBirth(Date dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setSuperiorId(Long superiorId) {
    this.superiorId = superiorId;
  }

  public Long getSuperiorId() {
    return superiorId;
  }

  public Gender getGender() {
    return gender;
  }

  public Date getDateOfBirth() {
    return dateOfBirth;
  }

  public String getAddress() {
    return address;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setIsActive(boolean isActive) {
    this.isActive = isActive;
  }

  public boolean getIsActive(){
      return this.isActive;
  }

  public String getGambar() {
    return gambar;
  }

  public void setGambar(String gambar) {
    this.gambar = gambar;
  }
}

