import { Flex, Input, Button, Select, message, Popconfirm, FloatButton, DatePicker } from 'antd';
import { Space, Table } from 'antd';
import { EditTwoTone, DeleteTwoTone, LeftCircleTwoTone , PrinterTwoTone ,MoneyCollectFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

export default function Prescription() {
  const [state, setState] = useState({
    date: "",
    medoc: "",
    duree: "",
    posologie: "",
    consult: ""
  })
  const [id , setId] = useState([]);
  const [id1 , setId1] = useState([]);
  const [donnee , setDonnee] = useState([]);
  const getIDCons =  async () => {
    try {
        const response = await axios.get("http://localhost:1000/consultations/liste_consultation");
        const Data = response.data.map((item) => ({
            id_consult: item.id_consult,
        }));
        setId(Data);
    } catch (error) {
        console.log(error);
    }
};
  const [print , setPrint] = useState([])
  const getIDMedoc = async () => {
    try {
        const response = await axios.get("http://localhost:1000/medicaments/liste_medicament");
        const Data = response.data.map((item) => ({
            id_medicament: item.id_medicament,
        }));
        setId1(Data);
    } catch (error) {
        console.log(error);
    }
};
const getData = async () => {
  try {
      const response = await axios.get("http://localhost:1000/prescriptions/liste_prescription"); // Assuming it's a GET request
      const transformedData = response.data.map((item, index) => ({
          key: index + 1,
          id: item.id_presc,
          date: item.date_presc,
          medoc: item.medicament,
          posologie : item.posologie,
          duree : item.duree + ' jours',
          consult : item.consultation
      }));
      const donneeImprimer = response.data.map((item, index) => ({
        key: index + 1,
        id: item.id_presc,
        medoc: item.medicament,
        posologie : item.posologie,
        duree : item.duree + ' jours',
    }));
      setDonnee(transformedData);
      setPrint(donneeImprimer);
  } catch (error) {
      console.log(error);
  }
};
const handleDelete = async (id_presc) => {
  try {
      await axios.delete('http://localhost:1000/prescriptions/suppression/'+id_presc);
      message.success('Prescription supprimé');
      getData(); 
  } catch (error) {
      console.log(error);
      message.error('Erreur lors de la suppression');
  }
};
useEffect(() => {
 
  const interval = setInterval(() => {
    getIDCons();
    getIDMedoc();
    getData();
    setPrint([
      { medoc: "Paracétamol", posologie: "1 comprimé toutes les 6 heures", duree: "5 jours" },
    ]);
  }, 500);

  return () => clearInterval(interval);
}, []);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
 
  const generatePDF = (id_presc) => {
    const prescription = donnee.find(item => item.id === id_presc);
    if (!prescription) {
      message.error('Prescription non trouvée');
      return;
    }

    const doc = new jsPDF();
    doc.text("ORDONANCE MEDICALE", 105, 20, { align: "center" ,color:"#000"})
    doc.setFont("Calibri", "bold");

    // Title
    doc.setFontSize(22);
   ;
    doc.setFontSize(12);
    doc.text("Nom du patient:", 10, 30);
    doc.text("Age du patient:", 10, 40);
    doc.text("Sexe :" , 150 , 30);
    doc.text("Signature et cachet:" , 150 , 100);
    doc.setFont("Calibri", "normal");
    const columns = ["Médicament", "Posologie", "Durée"];

    const rows = print.map((item) => [item.medoc, item.posologie, item.duree]);
    doc.autoTable({ startY: 60, head: [columns], body: rows });
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(10, doc.internal.pageSize.height - 10, `Page ${i} sur ${totalPages}`);
    }

    doc.save(`ordonance_${id_presc}.pdf`);

  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Médicament',
      dataIndex: 'medoc',
      key: 'medoc',
    },
    {
      title: 'Posologie',
      dataIndex: 'posologie',
      key: 'posologie',
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
    },
    {
      title: 'Consultation',
      dataIndex: 'consult',
      key: 'consult',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditTwoTone /></a>
          <a onClick={() => generatePDF(record.id)}><PrinterTwoTone /></a>
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
 
  const onChangeDate = (date, dateString) => {
    setState({ ...state, date: dateString });
  };
  const ajoutPresc = async ({
    date_presc,
    medicament,
    posologie,
    duree,
    consultation
  }) => {
    try{
      const response = await axios.post("http://localhost:1000/prescriptions/ajout_presc",{
        date_presc,
        medicament,
        posologie,
        duree,
        consultation
      });
      setState(response.data);
      message.success('Réussi');
    }
   catch(error){
    console.log(error);
   }
  }
  const checkingInfo = () => {
    if ( !state.duree || !state.posologie ) {
      message.warning('Veuillez remplir tous les champs!');
  }
   else{
      ajoutPresc({
        date_presc: state.date,
        medicament: state.medoc,
        posologie: state.posologie,
        duree: state.duree,
        consultation: state.consult
      })
    }
  }

  const cancel = (e) => {
    console.log(e);
    message.error('Annulé');
  };

  return (
    <div className="Patient">
      <hr />
      <div className="contentInput">
        <div className="container">
          <Flex vertical gap={30}>
            <DatePicker
              placeholder="Date de préscription"
              variant="outlined"
              onChange={onChangeDate}
              name="date"
            />
            <Select
              variant="filled"
              name="medoc"
              placeholder="Médicament N°"
              options={id1.map(medicament => ({
                value: medicament.id_medicament,
                label: `Médicament N° ${medicament.id_medicament}`,
            }))}
            onChange={(value) => setState({ ...state, medoc: value })} />
            <Input placeholder="Posologie"
              style={{ height: 150 }}
              variant="outlined"
              name="posologie"
              onChange={onChange}
              value={state.posologie}
            />
            <Input placeholder="Durée du traitement"
              variant="filled"
              type='number'
              name="duree"
              onChange={onChange}
              value={state.duree}
            />
            <Select
              variant="filled"
              placeholder="Consulation N°"
              name="consult"
              options={id.map(consultation => ({
                value: consultation.id_consult,
                label: `Consultation N° ${consultation.id_consult}`,
            }))}
            onChange={(value) => setState({ ...state, consultation: value })}
            />
            <Button type='primary' onClick={checkingInfo}>Soumettre</Button>
          </Flex>
        </div>
      </div>
      <hr />
      <Table className="Table" columns={columns} dataSource={donnee} />
      <Link to="/acceuil"> <FloatButton icon={<LeftCircleTwoTone />} type="primary" style={{ right: 35, top: 480 }} /></Link>
      <Link to="/payements"> <FloatButton icon={<MoneyCollectFilled />} type="primary" style={{ right: 35, top: 550 }} /></Link>
      
    </div>

  )
}