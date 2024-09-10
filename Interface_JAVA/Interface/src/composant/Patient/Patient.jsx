import { useState , useEffect ,useCallback} from 'react';
import { Flex, Input, Button, Select, message, Popconfirm, Modal, Space, Table , FloatButton } from 'antd';
import { EditTwoTone, DeleteTwoTone, LeftCircleTwoTone , EyeTwoTone} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import confetti from 'canvas-confetti';
import axios from 'axios';

export default function Patient() {
  const [showConfetti, setShowConfetti] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const confettiOptions = {
    particles: {
      number: { value: 500 },
      size: { value: 7 },
      move: { enable: true, speed: 5 },
      shape: { type: 'circle' },
      opacity: { value: 0.8 },
      color: { value: ['#FF0000', '#00FF00', '#0000FF'] },
    },
    interactivity: {
      events: {
        onClick: { enable: false },
        onHover: { enable: false },
      },
    },
  };

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const handleSubmit = () => {

    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
    

    // Afficher les confettis tsParticles (optionnel)
    setShowConfetti(true);

    // Arrêter les confettis après quelques secondes
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  };

  const [valeur, setValeur] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    age: "",
  
  });

  const onChange = (e) => {
    setValeur({
      ...valeur,
      [e.target.name]: e.target.value
    });
  };
  const onChange1 = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };
  const ajoutPatient = async ({
    nom,
    prenom,
    sexe,
    age,
    
  }) => {
    try {
      const response = await axios.post("http://localhost:1000/patients/ajout_patient", {
        nom,
        prenom,
        sexe,
        age,
        
      });
      setValeur(response.data);
      handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };
  const [qrCoderUrl , setqrCodeUrl] = useState('');
  const genererQrCode = async(id_patient , nom , prenom , sexe , age) => {
    try{
    
     const response =  await axios.post('http://localhost:8000/api/qr_code' ,{
        nom : valeur.nom ,
        prenom :valeur.prenom, 
        sexe : valeur.sexe,
        age :valeur.age
      })
      setqrCodeUrl(response.data)
    }
    catch(e){
      console.log(e)
    }
  }
  const checkingInfo = async (e) => {
    e.preventDefault();
    if (!valeur.nom || !valeur.prenom || !valeur.sexe || !valeur.age ) {
      message.warning("Veuillez complétez ces champs!");
    }
    else{
    ajoutPatient({
      nom: valeur.nom,
      prenom: valeur.prenom,
      sexe: valeur.sexe,
      age: valeur.age,
     
    });
    genererQrCode({
      nom : valeur.nom ,
      prenom :valeur.prenom ,
      sexe :  valeur.sexe ,
      age :  valeur.age})
  }
  };
 
  const [donnee, setDonnee] = useState([]);
  const [info , setInfo] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    age: "",
  })
  const getData = async () => {
    try {
        const response = await axios.get("http://localhost:1000/patients/liste_patient"); // Assuming it's a GET request
        const transformedData = response.data.map((item, index) => ({
            key: index + 1,
            id: item.id_patient,
            name: item.nom,
            lname: item.prenom,
            age : item.age + " ans", 
            sexe : item.sexe
        }));
        setDonnee(transformedData);
    } catch (error) {
        console.log(error);
    }
};
  const [id,setId] = useState([]);
  const getPatient  = async (id_patient) => {
    try{
      const response = await axios.get(`http://localhost:1000/patients/patient/${id_patient}` )
      const donneeRecup = {
        nom: response.data.nom,
        prenom: response.data.prenom,
        sexe: response.data.sexe,
        age: response.data.age,
    };
    const id = response.data.id_patient
      setId(id)
      setInfo(donneeRecup);
      setModal2Open(true)
    }
    catch(e){
      console.log(e)
    }
  }
useEffect(() => {
  getData();
  const interval = setInterval(() => {
      getData();
  }, 500);

  return () => clearInterval(interval);
}, []);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Prenom',
      dataIndex: 'lname',
      key: 'lname',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() =>  getPatient(record.id)}><EditTwoTone /></a>
          <Popconfirm
            title="Suppression"
            description="Etes vous sûre de vous?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Oui"
            cancelText="Non"
          >
            <a><DeleteTwoTone /></a>
          </Popconfirm>
          <a onClick={()=> setOpenmodal(true)}><EyeTwoTone /></a>
        </Space>
      ),
    },
  ];
  const modifier = async (id_patient , nom , prenom , sexe , age ) => {
    try{
       await axios.put(`http://localhost:1000/patients/modifier/${id_patient}`,{
        nom ,
        prenom ,
        sexe ,
        age 
      });
        setInfo({
          nom : nom,
          prenom : prenom ,
          sexe : sexe , 
          age : age
        } );
        getData();
        handleSubmit();
    }
    catch(e){
      console.log(e);
    }
  }
  const handleDelete = async (id_patient) => {
    try {
        await axios.delete('http://localhost:1000/patients/suppression/'+id_patient);
        message.success('Patient supprimé');
        getData();
    } catch (error) {
        console.log(error);
        message.error('Erreur lors de la suppression');
    }
};

  const cancel = (e) => {
    console.log(e);
    message.error('Annulé');
  };
  const checkingInfo1 = async (id) => {
    if (!info.nom || !info.prenom || !info.sexe || !info.age ) {
      message.warning("Veuillez complétez ces champs!");
    }
    else{
    modifier(
       id,
       info.nom,
       info.prenom,
       info.sexe,
       info.age,
     
    );
  }
  };
  const [modal2Open, setModal2Open] = useState(false);
  const [openModal , setOpenmodal] = useState(false);
  return (
    <div className="Patient">
      <hr />
      <Modal
        title="MODIFICATION"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <Flex vertical gap={30}>
            <Input placeholder="Nom" variant="filled" name="nom" value={info.nom} onChange={onChange1} />
            <Input placeholder="Prénom" variant="filled" name="prenom" value={info.prenom} onChange={onChange1} />
            <Input placeholder="Age" variant="filled" type='text' name="age" value={info.age} onChange={onChange1} />
            <Select
              variant="outlined"
              defaultValue="Sexe"
              name="sexe"
              value={info.sexe}
              onChange={(value) => setInfo({ ...info, sexe: value })}
              options={[
                { value: 'Masculin', label: 'Masculin' },
                { value: 'Féminin', label: 'Féminin' },
              ]}
            />
              
            <Button type='primary' onClick={()=> checkingInfo1(id)}>Resoumettre</Button>
          </Flex>
      </Modal>
      <Modal
        title="QR code du patient"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenmodal(false)}
      >
        {qrCoderUrl && (
          <a href={qrCoderUrl} download><img src={qrCoderUrl} alt="Qr code patient" width="200" height="200"/></a>
        )}
      </Modal>
      <div className="contentInput">
        <div className="container">
          <Flex vertical gap={30}>
            <Input placeholder="Nom" variant="outlined" name="nom" value={valeur.nom} onChange={onChange} />
            <Input placeholder="Prénom" variant="outlined" name="prenom" value={valeur.prenom} onChange={onChange} />
            <Input placeholder="Age" variant="outlined" type='text' name="age" value={valeur.age} onChange={onChange} />
            <Select
              variant="filled"
              defaultValue="Sexe"
              name="sexe"
              onChange={(value) => setValeur({ ...valeur, sexe: value })}
              options={[
                { value: 'Masculin', label: 'Masculin' },
                { value: 'Féminin', label: 'Féminin' },
              ]}
            />
              
            <Button type='primary' onClick={checkingInfo}>Soumettre</Button>
          </Flex>
        </div>
      </div>
      <hr />
    <div className="back">  
      <Table className="Table" columns={columns} dataSource={donnee} />
    </div>
      <Link to="/acceuil"> <FloatButton icon={<LeftCircleTwoTone/>} type="primary" style={{ right: 35 , top : 480}}/></Link>
      {showConfetti && (
        <Particles id="tsparticles" init={particlesInit} options={confettiOptions} />
      )} 
    </div>
  );
}
