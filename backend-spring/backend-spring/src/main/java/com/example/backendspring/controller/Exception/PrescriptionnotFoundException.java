package com.example.backendspring.controller.Exception;

public class PrescriptionnotFoundException extends RuntimeException{
    public PrescriptionnotFoundException(Long id_presc)
    {
        super("Identifiant introuvable!" + id_presc);
    }
}
