package com.example.backendspring.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_patient;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    @Column(name = "nom_patient")
    private String nom;
    @Column(name = "prenom_patient")
    private String prenom;
    @Column(name = "sexe")
    private String sexe;
    @Column(name="age")
    private String age;

}
