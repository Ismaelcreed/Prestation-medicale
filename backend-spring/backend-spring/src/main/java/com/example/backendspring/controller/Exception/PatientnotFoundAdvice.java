package com.example.backendspring.controller.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class PatientnotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PatientnotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String , String> exceptionHandler(PatientnotFoundException exception){
        Map<String , String> errorMap = new HashMap<>();
        errorMap.put("message_erreur", exception.getMessage());

        return errorMap;
    }
}
