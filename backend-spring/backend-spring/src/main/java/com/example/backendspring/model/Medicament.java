package com.example.backendspring.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="medicament")
public class Medicament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_medicament;

    public String getNom_medoc() {
        return nom_medoc;
    }

    public void setNom_medoc(String nom_medoc) {
        this.nom_medoc = nom_medoc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "nom_medicament")
    private String nom_medoc;
    @Column(name = "description")
    private String description;
}
