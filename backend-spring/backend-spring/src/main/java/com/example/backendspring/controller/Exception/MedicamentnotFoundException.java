package com.example.backendspring.controller.Exception;

public class MedicamentnotFoundException extends RuntimeException{
    public MedicamentnotFoundException(Long id_medicament)
    {
        super("Identifiant introuvable!" + id_medicament);
    }
}
