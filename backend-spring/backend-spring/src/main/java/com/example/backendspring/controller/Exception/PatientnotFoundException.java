package com.example.backendspring.controller.Exception;

public class PatientnotFoundException extends RuntimeException{
    public PatientnotFoundException(Long id_patient){
        super("Identifiant introuvable!" + id_patient);
    }
}
