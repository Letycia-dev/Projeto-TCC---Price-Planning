import StyleGeneral from '../HistApGeral.module.css'
import SideBar from '../../../Layout/Menu Latertal/MenuLateral.js'
import Form from '../Form/Form.js';
import { useLocation } from 'react-router-dom';

const PutAp = () => {

    const location = useLocation();

    const DateAprov = location.state?.Aprov;

    return (

        <div className={StyleGeneral.body}>

            <SideBar />

            <div className={StyleGeneral.conteiner}>

                <Form date_aprov={DateAprov} />

            </div>

        </div>

    )
}

export default PutAp;