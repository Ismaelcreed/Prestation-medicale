import React from 'react';
import Icon from './Icon/Icon';
import Icon1 from './Icon/Icon1';
import Icon2 from './Icon/Icon2';
import Icon3 from './Icon/Icon3';
import { Link, useNavigate } from 'react-router-dom';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { motion, useAnimate } from 'framer-motion';
import { Tooltip, Button, Modal } from 'antd';
import { useState } from 'react';
import MapComponent from './Lealeft';


const NavBar = (props) => {
    const driverObj = driver({
        showProgress: true,
        steps: [
            { element: '.btn-nav', popover: { title: 'En cas urgences!', description: "Si vous voulez trouvez l'hopital le plus proche de vous" } },
            
        ]

    });

    driverObj.drive();
    const [modal2Open, setModal2Open] = useState(false);

    const showModal = () => {
        setModal2Open(true);
    };
      
    return (
        <>
           
            <Modal
                title=""
                centered
                width={800} 
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
            >
                <MapComponent/>
            </Modal>
            <Button type="primary" onClick={showModal} className='btn-nav'>
                Pour une urgence?
            </Button>
            <div className="body-nav">
                <div className="card">
                    <div className="display">
                        <Tooltip title="Patients">
                            <Link to={"/patients"}>
                                <div className="content">
                                    <div className="patient">
                                        <Icon />
                                    </div>
                                </div>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Consultations">
                            <Link to={"/consultations"}>
                                <div className="content">
                                    <div className="consultations">
                                        <Icon1 />
                                    </div>
                                </div>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Médicaments">
                            <Link to={"/medicaments"}>
                                <div className="content">
                                    <div className="medicament">
                                        <Icon2 />
                                    </div>
                                </div>
                            </Link >
                        </Tooltip>
                        <Tooltip title="Préscriptions">
                            <Link to={"/prescriptions"}>
                                <div className="content">
                                    <div className="prescription">
                                        <Icon3 />
                                    </div>
                                </div>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
           
        </div>  
      </>
    )
}
export default NavBar;