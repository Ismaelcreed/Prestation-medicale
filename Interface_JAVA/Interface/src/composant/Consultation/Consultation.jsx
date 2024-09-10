import { Flex, Input, Button, Select, message, Popconfirm, TimePicker, Space, Table, DatePicker, FloatButton ,Modal} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EditTwoTone, DeleteTwoTone, LeftCircleTwoTone } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Consultation() {
    const [state, setState] = useState({
        date: "",
        id_patient: "",
        symptome: "",
        heure: ""
    });
    const [info, setInfo] = useState({
        date: "",
        id_patient: "",
        symptome: "",
        heure: ""
    });
    const [donnee, setDonnee] = useState([]);
    const [id, setId] = useState([]);
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:1000/consultations/liste_consultation");
            const transformedData = response.data.map((item, index) => ({
                key: index + 1,
                id: item.id_consult,
                date: item.date_consult.split("T")[0],
                id_patient: item.patient,
                symp: item.symptome,
                heure: item.heure,
            }));
            setDonnee(transformedData);
        } catch (error) {
            console.log(error);
        }
    };
    const getIDPatient = async () => {
        try {
            const response = await axios.get("http://localhost:1000/patients/liste_patient");
            const Data = response.data.map((item) => ({
                id_patient: item.id_patient,
            }));
            setId(Data);
        } catch (error) {
            console.log(error);
        }
    };
    const ajoutConsult = async ({ date_consult, patient, symptome, heure }) => {
        try {
            const response = await axios.post("http://localhost:1000/consultations/ajout_consult", {
                date_consult,
                patient,
                symptome,
                heure
            });
            setState(response.data);
            message.success('Réussi');
        } catch (error) {
            console.log(error);
        }
    };
    const modifierConsult = async (id_consult,  date, patient, symptome, heure) => {
        try {
          await axios.put(`http://localhost:1000/consultations/modifier/${id_consult}`, {
            date,
            patient, 
            symptome,
            heure
          });
          setInfo({
            date : date, 
            patient : patient,
             symptome : symptome,
              heure : heure
          });
          getData();
          handleSubmit();
        } catch (e) {
          console.log(e);
        }
      };
      
    useEffect(() => {
        getIDPatient();
        getData();
        const interval = setInterval(() => {
            getData();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const onChange1 = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };
    const onChangeDate = (date, dateString) => {
        setState({ ...state, date: dateString});
    };
    
    const onChangeTime = (time, timeString) => {
        setState({ ...state, heure: timeString });
    };
    const onChangeDate1 = (date, dateString) => {
        setState({ ...state, date: dateString });
    };
    
    const onChangeTime1 = (time, timeString) => {
        setState({ ...state, heure: timeString });
    };
    
    const handleDelete = async (id_consult) => {
        try {
            await axios.delete('http://localhost:1000/consultations/suppression/' + id_consult);
            message.success('Consultation supprimée');
            getData();
        } catch (error) {
            console.log(error);
            message.error('Erreur lors de la suppression');
        }
    };
    
    const [id_consult, setIdConsult] = useState([]);
    const [modal2Open, setModal2Open] = useState(false);
    const getConsult = async (id_consult) => {
        try {
            const response = await axios.get(`http://localhost:1000/consultations/consultation/${id_consult}`)
            const donneeRecup = {
                date: response.data.date_consult,
                id_patient: response.data.patient,
                symptome: response.data.symptome,
                heure: response.data.heure
            };
            const id_cons = response.data.id_consult
            setIdConsult(id_cons)
            setInfo(donneeRecup);
            setModal2Open(true)
        }
        catch (e) {
            console.log(e)
        }
    }
    const checkingInfo = () => {
        if (!state.date || !state.heure || !state.id_patient || !state.symptome) {
            message.warning('Veuillez remplir tous les champs!');
        } 
        else {
            ajoutConsult({
                date_consult : state.date, 
                patient : state.id_patient , 
                symptome : state.symptome,
                heure : state.heure 
            });
        }
    };
    const checkingInfo1 = (id) => {
        if (!state.date || !state.heure || !state.id_patient || !state.symptome) {
            message.warning('Veuillez remplir tous les champs!');
        } 
        else {
            modifierConsult(id,{
                date : info.date, 
                patient : info.id_patient , 
                symptome : info.symptome,
                heure : info.heure 
            });
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date consultation',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Patient',
            dataIndex: 'id_patient',
            key: 'id_patient',
        },
        {
            title: 'Symptôme',
            dataIndex: 'symp',
            key: 'symp',
        },
        {
            title: 'Heure',
            dataIndex: 'heure',
            key: 'heure',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => getConsult(record.id)}><EditTwoTone /></a>
                    <Popconfirm
                        title="Suppression"
                        description="Êtes-vous sûr de vouloir supprimer cette consultation?"
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={() => message.error('Annulé')}
                        okText="Oui"
                        cancelText="Non" 
                    >
                        <a><DeleteTwoTone /></a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="Consultation">
            <hr />
            <Modal
                title="MODIFICATION"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
            >
                <Flex vertical gap={30}>
                    <DatePicker
                        placeholder="Date de consultation"
                        variant="outlined"
                        onChange={onChangeDate1}
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        name="date"
                        value={info.date}
                    />
                    <TimePicker
                        onChange={onChangeTime1}
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        value={info.heure}
                    />
                    <Select
                        variant="filled"
                        placeholder="Patient N°"
                        options={id.map(patient => ({
                            value: patient.id_patient,
                            label: `Patient N° ${patient.id_patient}`,
                        }))}
                        onChange={(value) => setInfo({ ...info, id_patient: value })}
                        value={info.id_patient}
                        name="id_patient"
                    />
                    <Input
                        type="text"
                        placeholder="Décrivez son symptôme ..."
                        style={{ height: 150 }}
                        name="symptome"
                        onChange={onChange1}
                        value={info.symptome}
                    />
                    <Button type="primary" onClick={()=>checkingInfo1(id_consult)}>Resoumettre</Button>
                </Flex>
            </Modal>
            <div className="contentInput">
                <div className="container">
                    <Flex vertical gap={30}>
                        <DatePicker
                            placeholder="Date de consultation"
                            variant="outlined"
                            onChange={onChangeDate}
                            name="date"
                           
                        />
                        <TimePicker
                            onChange={onChangeTime}
                            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        />
                        <Select
                            variant="filled"
                            placeholder="Patient N°"
                            options={id.map(patient => ({
                                value: patient.id_patient,
                                label: `Patient N° ${patient.id_patient}`,
                            }))}
                            onChange={(value) => setState({ ...state, id_patient: value })}
                            name="id_patient"
                        />
                        <Input
                            type="text"
                            placeholder="Décrivez son symptôme ..."
                            style={{ height: 150 }}
                            name="symptome"
                            onChange={onChange}
                            value={state.symptome}
                        />
                        <Button type="primary" onClick={checkingInfo}>Soumettre</Button>
                    </Flex>
                </div>
            </div>
            <hr />
            <Table className="Table" columns={columns} dataSource={donnee} rowKey="id" />
            <Link to="/acceuil"> <FloatButton icon={<LeftCircleTwoTone />} type="primary" style={{ right: 35, top: 480 }} /></Link>
        </div>
    );
}
