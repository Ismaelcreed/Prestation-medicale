package com.example.backendspring.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

import java.sql.Time;
import java.util.Date;

@Entity
@Data
@Table(name="consultation")
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_consult;

    public void setDate_consult(Date date_consult) {
        this.date_consult = date_consult;
    }

    public Integer getPatient() {
        return patient;
    }

    public void setPatient(Integer patient) {
        this.patient = patient;
    }

    public void setSymptome(String symptome) {
        this.symptome = symptome;
    }
    public Time getHeure() {
        return heure;
    }

    public void setHeure(Time heure) {
        this.heure = heure;
    }

    public Long getId_consult() {
        return id_consult;
    }

    public void setId_consult(Long id_consult) {
        this.id_consult = id_consult;
    }

    public Date getDate_consult() {
        return date_consult;
    }

    public String getSymptome() {
        return symptome;
    }

    @Getter
    @Column(name = "date_consult")
    private Date date_consult;
    @Column(name = "patient")
    private Integer patient;
    @Getter
    @Column(name = "symptome")
    private String symptome;
    @Column(name = "heure")
    private Time heure;
}
