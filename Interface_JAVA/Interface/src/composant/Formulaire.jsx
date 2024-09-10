import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import '../assets/css/Formulaire.css';
import { Input } from 'antd';
import Backdrop from "@mui/material/Backdrop";
import {Spin} from 'antd'

const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }

    onChange(newOtp.join(""));
  };

  return (
    <div>
      {otp.map((data, index) => (
        <input
          key={index}
          type="password"
          maxLength="1"
          value={data}
          onChange={e => handleChange(e.target, index)}
          onFocus={e => e.target.select()}
          className='otp-input'
        />
      ))}
    </div>
  );
};

const Formulaire = () => {
  const navigate = useNavigate();
  const [credentials, setCredential] = useState({
    user: "",
    password: ""
  });
  const value = {
    username: 'Ismael',
    pass: '1234'
  };
  
  const onChange = (e) => {
    setCredential({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (otp) => {
    setCredential({
      ...credentials,
      password: otp
    });
  };

  const seConnecter = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate("/acceuil");
    }, 2500); // Attendre 5 secondes avant de naviguer
  };

  const verifiedValue = () => {
    if (!credentials.user || !credentials.password) {
      toast.warning('Les champs ne doivent pas être nuls!');
    } else if (credentials.user !== value.username || credentials.password !== value.pass) {
      toast.error('Utilisateur incorrect!');
    } else {
      seConnecter();
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="ContentLogin">
        <div className="back"></div>
        <div className="inputField">
          <label htmlFor="name">Docteur:</label> <br />
          <Input
            name="user"
            style={{ width: 260, height: 50 }}
            placeholder="Nom"
            onChange={onChange}
            value={credentials.user}
            required
          />
          <br /><br />
          <label htmlFor="lname">Clé privé:</label> <br />
          <OTPInput
            length={4}
            onChange={handleOtpChange}
          />
        </div>
      
        <Backdrop className="backdrop" open={open}>
          <Spin tip="Chargement" size="large" />
        </Backdrop>
        <button className="btnLogin" onClick={verifiedValue}>Gérer maintenant</button>
        <Toaster />
      </div>
    </div>
  );
};

export default Formulaire;
