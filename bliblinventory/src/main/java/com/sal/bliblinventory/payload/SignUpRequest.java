package com.sal.bliblinventory.payload;

import javax.validation.constraints.*;
import java.sql.Date;

public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 40)
    private String name;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    private long roleId;

    private long superiorId;

    @NotBlank
    private String gender;

    @NotBlank
    private String address;

    private Date dateOfBirth;

    @NotBlank
    private String phoneNumber;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public String getAddress() {
    return address;
  }

  public Date getDateOfBirth() {
    return dateOfBirth;
  }

  public String getGender() {
    return gender;
  }

  public long getRoleId() {
    return roleId;
  }

  public long getSuperiorId() {
    return superiorId;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setDateOfBirth(Date dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setRoleId(int roleId) {
    this.roleId = roleId;
  }

  public void setSuperiorId(int superiorId) {
    this.superiorId = superiorId;
  }
}