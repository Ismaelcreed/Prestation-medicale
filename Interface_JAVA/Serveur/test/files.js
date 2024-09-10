const serveur = require("express")
const routes = serveur.Router() ; // Bibliothèque d'express qui permet d'établir des chemins 

routes.get("/get", (req,res) => { // req = demande ou requête et res est la reponse retourner par le serveur
      res.json({message: 'Io eh'}) 
 } ) 

routes.post("/send",(req,res) =>{
    res.json({message: 'Vous avez réussi a envoyer les info'})
}) 

routes.put("/:id" , (req,res) => { // :id dans le chemin veut dire un parametre
    res.json({messageId: req.params.id})
})
routes.delete("/:id", (req,res) => {
    res.json({message:'Votre suppression a été belle et bien effectué' + req.params.id}) // en général après 
    //le params , il y a .id
})
routes.patch("/post-id/:id" , (req,res) =>{
    res.json({message:'Post liké :id'+ req.params.id })
} )

module.exports = routes

//Stockage temporaire
import { v4 as uuid} from 'uuid';

let candidat = [];
let candidats = {
    nom_cand:'',
    prenom_cand:'',
    age_cand:'',
    slogant:'',
    categorie_cand:'',
}
export const getCand = (req, res) => {
    res.send(candidat);
};
export const createCand = (req, res) => {
    const candidats = req.body;
    const neWcandidat = ({...candidat,...candidats, id: uuid()});
    candidat.push(neWcandidat);
    res.send("Bravo,un nouveau candidat ajouter!");
}
export const getCandList = (req , res) => {
    const singleCandidat = candidat.filter((candidats) => candidats.id === req.params.id);
    res.send(singleCandidat);
}
export const deleteCand = (req , res) => {
    candidat = candidat.filter((candidats) => candidats.id !== req.params.id);
    res.send("Le candidat a été bien supprimer!")
}
export const updateCand = (req , res) => {
    const candidats = candidats.find((candidats) => candidatss.id === req.params.id);

    candidats.nom_cand = req.body.nom_cand;
    candidats.prenom_cand = req.body.prenom_cand;
    candidats.categorie_cand = req.body.categorie_cand;

    res.send("Mis à jour effectué!")
}
