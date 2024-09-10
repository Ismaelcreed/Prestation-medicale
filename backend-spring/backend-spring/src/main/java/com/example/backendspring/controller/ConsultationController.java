package com.example.backendspring.controller;

import com.example.backendspring.controller.Exception.ConsultnotFoundException;
import com.example.backendspring.controller.Exception.PatientnotFoundException;
import com.example.backendspring.model.Consultation;
import com.example.backendspring.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/consultations")
public class ConsultationController {
    @Autowired
    private ConsultationRepository consultationRepository;

    @PostMapping("/ajout_consult")
    Consultation NewConsult(@RequestBody Consultation newConsult){
        return consultationRepository.save(newConsult);
    }
    @GetMapping("/liste_consultation")
    List<Consultation> getAllConsult(){

        return consultationRepository.findAll();
    }
    @GetMapping("/consultation/{id_consult}")
    Consultation getAllConsultById(@PathVariable Long id_consult){
        return consultationRepository.findById(id_consult)
                .orElseThrow(()-> new PatientnotFoundException(id_consult));
    }
    @PutMapping("/modifier/{id_consult}")
    Consultation updateConsult(@RequestBody Consultation newConsult, @PathVariable Long id_consult){
        return consultationRepository.findById(id_consult)
                .map(consultation -> {
                    consultation.setDate_consult(newConsult.getDate_consult());
                    consultation.setPatient(newConsult.getPatient());
                    consultation.setSymptome(newConsult.getSymptome());
                    consultation.setHeure(newConsult.getHeure());
                    return consultationRepository.save(consultation);
                }).orElseThrow(()->new ConsultnotFoundException(id_consult));
    }
    @DeleteMapping("/suppression/{id_consult}")
    String deleteConsult(@PathVariable Long id_consult){
        if(!consultationRepository.existsById(id_consult)){
            throw new ConsultnotFoundException(id_consult);
        }
        consultationRepository.deleteById(id_consult);
        return ("Suppression effectué pour le patient N°: "+ id_consult);
    }

}
