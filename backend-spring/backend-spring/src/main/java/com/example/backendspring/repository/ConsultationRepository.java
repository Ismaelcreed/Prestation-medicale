package com.example.backendspring.repository;

import com.example.backendspring.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRepository extends JpaRepository  <Consultation, Long> {
}
