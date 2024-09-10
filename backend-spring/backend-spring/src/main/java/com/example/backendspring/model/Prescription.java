package com.example.backendspring.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name="prescription")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_presc;


    public Date getDate_presc() {
        return date_presc;
    }

    public void setDate_presc(Date date_presc) {
        this.date_presc = date_presc;
    }

    public Integer getMedicament() {
        return medicament;
    }

    public void setMedicament(Integer medicament) {
        this.medicament = medicament;
    }

    public String getPosologie() {
        return posologie;
    }

    public void setPosologie(String posologie) {
        this.posologie = posologie;
    }

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public Integer getConsultation() {
        return consultation;
    }

    public void setConsultation(Integer consultation) {
        this.consultation = consultation;
    }
    @Column(name = "date_presc")
    private Date date_presc;
    @Column(name = "medicament")
    private Integer medicament;
    @Column(name = "posologie")
    private String posologie;
    @Column(name = "duree_traitement")
    private Integer duree;
    @Column(name = "consultation")
    private Integer consultation;


}
