package com.sal.bliblinventory.model;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "Category")
public class Category {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  public Category(){}

  public void setId(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

}
