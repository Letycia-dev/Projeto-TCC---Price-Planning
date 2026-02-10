import Style from '../MPGeral.module.css';
import SideBar from '../../../Layout/Menu Latertal/MenuLateral.js';
import Form from '../FormMP/Form.js'
import { useLocation } from 'react-router-dom';
import { constructFromSymbol } from 'date-fns/constants';

function Put() {

  const location = useLocation();

  const mp = location.state?.MP;

    return (

        <div className={Style.body}>

            <SideBar />
            <div className={Style.conteiner}>

              <Form 
                title='Atulização de Materia-Prima' 
                nameButton='Atualizar'
                mp={mp.givenMP}
                tpMov={'Put'}
              />

            </div>

        </div>
    );
}

export default Put;