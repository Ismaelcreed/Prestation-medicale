package com.example.backendspring.controller;

import com.example.backendspring.controller.Exception.PatientnotFoundException;
import com.example.backendspring.model.Patient;
import com.example.backendspring.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/ajout_patient")
    Patient newPatient(@RequestBody Patient newPatient){

        return patientRepository.save(newPatient);
    }
    @GetMapping("/liste_patient")

    List<Patient>getAllPatient(){

        return patientRepository.findAll();
    }

    @GetMapping("/patient/{id_patient}")
    Patient getAllPatientById(@PathVariable Long id_patient){

        return patientRepository.findById(id_patient)
                .orElseThrow(()-> new PatientnotFoundException(id_patient));
    }
    @PutMapping("/modifier/{id_patient}")
    Patient updatePatient(@RequestBody Patient newPatient, @PathVariable Long id_patient){
        return patientRepository.findById(id_patient)
                .map(patient -> {
                    patient.setNom(newPatient.getNom());
                    patient.setPrenom(newPatient.getPrenom());
                    patient.setSexe(newPatient.getSexe());
                    patient.setAge(newPatient.getAge());
                    return patientRepository.save(patient);
                }).orElseThrow(()->new PatientnotFoundException(id_patient));
    }

    @DeleteMapping("/suppression/{id_patient}")
   String deletePatient(@PathVariable Long id_patient){
        if(!patientRepository.existsById(id_patient)){
            throw new PatientnotFoundException(id_patient);
        }
        patientRepository.deleteById(id_patient);
        return ("Suppression effectué pour le patient N°: "+ id_patient);
    }


}
