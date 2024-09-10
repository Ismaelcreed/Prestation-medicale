package com.example.backendspring.controller;

import com.example.backendspring.controller.Exception.MedicamentnotFoundException;
import com.example.backendspring.model.Medicament;
import com.example.backendspring.repository.MedicamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/medicaments")
public class MedicamentController {
    @Autowired
    private MedicamentRepository medicamentRepository;

    @PostMapping("/ajout_medoc")
    Medicament NewMedoc(@RequestBody Medicament newMedoc){
        return medicamentRepository.save(newMedoc);
    }
    @GetMapping("/liste_medicament")
    List<Medicament> getAllMedoc(){
        return medicamentRepository.findAll();
    }
    @GetMapping("/medicament/{id_medicament}")
    Medicament getAllMedocById(@PathVariable Long id_medicament){
        return medicamentRepository.findById(id_medicament)
                .orElseThrow(()-> new MedicamentnotFoundException(id_medicament));
    }
    @PutMapping("/modifier/{id_medicament}")
    Medicament updateMedoc(@RequestBody Medicament newMedoc, @PathVariable Long id_medicament){
        return medicamentRepository.findById(id_medicament)
                .map(medicament -> {
                    medicament.setNom_medoc(newMedoc.getNom_medoc());
                   medicament.setDescription(newMedoc.getDescription());
                    return medicamentRepository.save(medicament);
                }).orElseThrow(()->new MedicamentnotFoundException(id_medicament));
    }
    @DeleteMapping("/suppression/{id_medicament}")
    String deleteMedoc(@PathVariable Long id_medicament){
        if(!medicamentRepository.existsById(id_medicament)){
            throw new MedicamentnotFoundException(id_medicament);
        }
        medicamentRepository.deleteById(id_medicament);
        return ("Suppression effectué pour le médicament N°: "+ id_medicament);
    }
}
