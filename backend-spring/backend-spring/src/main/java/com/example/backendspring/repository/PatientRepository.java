package com.example.backendspring.repository;

import com.example.backendspring.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository <Patient, Long> {

}
