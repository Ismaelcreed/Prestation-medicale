package com.example.backendspring.controller.Exception;

public class ConsultnotFoundException extends RuntimeException{
    public ConsultnotFoundException(Long id_consult)
    {
        super("Identifiant introuvable!" + id_consult);

    }
}
