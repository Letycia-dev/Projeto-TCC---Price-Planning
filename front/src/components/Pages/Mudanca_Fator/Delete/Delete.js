import Form from '../FormHMF/Form.js';
import SideBar from '../../../Layout/Menu Latertal/MenuLateral.js';
import Style from '../MFGeral.module.css';
import { useLocation } from 'react-router-dom';

function Delete() {

    const location = useLocation();

    const MF = location.state?.MF;

    console.log(MF)

    return (

        <div className={Style.body}>

            <SideBar />
            <div className={Style.conteiner}>

                <Form
                    title={'Exclusão de Ajuste de Fator'}
                    nameButton={'Deletar'}
                    MF={MF}
                    MvDelete={true}
                />

            </div>

        </div>

    );

}

export default Delete;
