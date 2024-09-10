package com.example.backendspring.controller;

import com.example.backendspring.controller.Exception.MedicamentnotFoundException;
import com.example.backendspring.controller.Exception.PrescriptionnotFoundException;
import com.example.backendspring.model.Medicament;
import com.example.backendspring.model.Prescription;
import com.example.backendspring.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @PostMapping("/ajout_presc")
    Prescription NewPresc(@RequestBody Prescription newPresc){
        return prescriptionRepository.save(newPresc);
    }
    @GetMapping("/liste_prescription")
    List<Prescription> getAllPresc(){

        return prescriptionRepository.findAll();
    }
    @GetMapping("/prescription/{id_presc}")
    Prescription getAllPrescById(@PathVariable Long id_presc){
        return prescriptionRepository.findById(id_presc)
                .orElseThrow(()-> new PrescriptionnotFoundException(id_presc));
    }
    @PutMapping("/modifier/{id_presc}")
    Prescription updatePresc(@RequestBody Prescription newPresc, @PathVariable Long id_presc){
        return prescriptionRepository.findById(id_presc)
                .map(prescription -> {
                    prescription.setDate_presc(newPresc.getDate_presc());
                    prescription.setMedicament(newPresc.getMedicament());
                    prescription.setPosologie(newPresc.getPosologie());
                    prescription.setDuree(newPresc.getDuree());
                    prescription.setConsultation(newPresc.getConsultation());
                    return prescriptionRepository.save(prescription);
                }).orElseThrow(()->new PrescriptionnotFoundException(id_presc));
    }
    @DeleteMapping("/suppression/{id_presc}")
    String deletePresc(@PathVariable Long id_presc){
        if(!prescriptionRepository.existsById(id_presc)){
            throw new PrescriptionnotFoundException(id_presc);
        }
        prescriptionRepository.deleteById(id_presc);
        return ("Suppression effectué pour le préscription N°: "+ id_presc);
    }


}
