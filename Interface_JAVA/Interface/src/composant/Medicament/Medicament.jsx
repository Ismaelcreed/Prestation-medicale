import { Flex, Input, Button, message, Popconfirm, FloatButton ,Modal } from 'antd';
import { Space, Table } from 'antd';
import { EditTwoTone, DeleteTwoTone, LeftCircleTwoTone } from '@ant-design/icons';
import { useState, useEffect ,useCallback} from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import confetti from 'canvas-confetti';
import axios from 'axios';

export default function Medicament() {
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
      particleCount: randomInRange(100, 150),
      origin: { y: 0.6 },
    });
    

    // Afficher les confettis tsParticles (optionnel)
    setShowConfetti(true);

    // Arrêter les confettis après quelques secondes
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nom du médoc',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => getMedoc(record.id)}><EditTwoTone /></a>
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
        </Space>
      ),
    },
  ];
  const [state, setState] = useState({
    nom_medoc: "",
    description: "",
  })
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    }
    )
  }
  const onChange1 = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };
  const ajoutMedoc = async ({
    nom_medoc: nom,
    description: desc
  }) => {
    try {
      const response = await axios.post("http://localhost:1000/medicaments/ajout_medoc", { nom_medoc: nom, description: desc })
      setState(response.data);
      handleSubmit();
    }
    catch (error) {
      console.log(error);
    }
  }
  const [donnee, setDonnee] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/medicaments/liste_medicament"); // Assuming it's a GET request
      const transformedData = response.data.map((item, index) => ({
        key: index + 1,
        id: item.id_medicament,
        name: item.nom_medoc,
        desc: item.description,
      }));
      setDonnee(transformedData);
    } catch (error) {
      console.log(error);
    }
  };
  const [info, setInfo] = useState({
    nom_medoc: "",
    description: "",
  })
  const [id, setId] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const getMedoc = async (id_medoc) => {
    try {
      const response = await axios.get(`http://localhost:1000/medicaments/medicament/${id_medoc}`)
      const donneeRecup = {
        nom_medoc: response.data.nom_medoc,
        description: response.data.description,
      };
      const id = response.data.id_medicament
      setId(id)
      setInfo(donneeRecup);
      setModal2Open(true)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id_medicament) => {
    try {
      await axios.delete('http://localhost:1000/medicaments/suppression/' + id_medicament);
      message.success('Médicament supprimé');
      getData();
    } catch (error) {
      console.log(error);
      message.error('Erreur lors de la suppression');
    }
  };
  const modifData = async (id_medicament, nom_medoc, description) => {
    try {
      await axios.put(`http://localhost:1000/medicaments/modifier/${id_medicament}`, {
        nom_medoc,
        description
      });
      setInfo({
        nom_medoc: nom_medoc,
        description: description
      });
      getData();
      handleSubmit();
    } catch (e) {
      console.log(e);
    }
  };
  

  const cancel = () => {
    message.error('Suppression annulée');
  };
  const checkingInfo = (e) => {
    e.preventDefault();
    if (!state.nom_medoc || !state.description) {
      message.warning('Veuillez remplir les champs!')
    }
    else {
      ajoutMedoc({
        nom_medoc: state.nom_medoc,
        description: state.description
      })
    }
  }
  const checkingInfo1 = (id) => {
    if (!info.nom_medoc || !info.description) {
      message.warning('Veuillez remplir les champs!');
    } else {
      modifData(id, info.nom_medoc, info.description);
    }
  };
  
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
          <Input placeholder="Nom du médicament" variant="outlined" name="nom_medoc" onChange={onChange1} value={info.nom_medoc} />
          <Input placeholder="Description" variant="outlined" type='text' style={{ height: 100 }} name="description" onChange={onChange1} value={info.description} />

          <Button type='primary' onClick={()=> checkingInfo1(id)}>Resoumettre</Button>
        </Flex>
      </Modal>
      <div className="contentInput">
        <div className="container">
          <Flex vertical gap={30}>
            <Input placeholder="Nom du médicament" variant="outlined" name="nom_medoc" onChange={onChange} value={state.nom_medoc} />
            <Input placeholder="Description" variant="outlined" type='text' style={{ height: 100 }} name="description" onChange={onChange} value={state.description} />

            <Button type='primary' onClick={checkingInfo}>Soumettre</Button>
          </Flex>
        </div>
      </div>
      <hr />
      <Table className="Table" columns={columns} dataSource={donnee} />
      <Link to="/acceuil"> <FloatButton icon={<LeftCircleTwoTone />} type="primary" style={{ right: 35, top: 480 }} /></Link>
    </div>

  )
}