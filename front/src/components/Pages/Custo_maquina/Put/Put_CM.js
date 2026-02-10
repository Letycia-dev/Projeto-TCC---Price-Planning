import Style from '../cssgeral.module.css';
import SideBar from '../../../Layout/Menu Latertal/MenuLateral.js';
import Form from '../Form/Form.js'
import Put from '../../Usuarios/Put/Put.js';

function Put_CM() {
    return (
        <div className={Style.body}>
            <SideBar />
            <div className={Style.conteiner}>
              <Form 
                title='Cadastro de Materia-Prima' 
                nameButton='Atualizar'
                user={''}
                tpMov={''}
              />
            </div>
        </div>
    );
}

export default Put_CM;