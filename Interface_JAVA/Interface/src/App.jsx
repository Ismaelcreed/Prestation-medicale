import Acceuil from './composant/Acceuil';
import Login_Interface from './composant/login_interface';
import Error from './composant/Error_page';


import Formulaire from './composant/Formulaire.jsx';
import Payment from './composant/Payement-stripe/Payment.jsx';
import Consultation from './composant/Consultation/Consultation.jsx';
import Prescription from './composant/Prescription/Prescription.jsx';
import Patient from './composant/Patient/Patient.jsx';
import Medicament from './composant/Medicament/Medicament.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import './App.css';
import { AnimatePresence} from 'framer-motion';

function App() {
 
  return (
  <>  
  <AnimatePresence mode='wait'>
    <Router  >
      
            <Routes >
              <Route exact path="/" element={<Login_Interface />} />
              <Route path="/acceuil" element={<Acceuil />} />

              <Route path="/patients" element={<Patient />} />
              <Route path="/consultations" element={<Consultation/>} />
              <Route path="/prescriptions" element={< Prescription/>} />
              <Route path="/medicaments" element={< Medicament/>} />
              <Route path="/payements" element={< Payment/>} />
              <Route path="/signup" element={<Formulaire />} />
              <Route path="*" element={<Error />} />
            </Routes>
      
    </Router>
  </AnimatePresence>
     <ToastContainer />
    </>   
  );
}

export default App;
