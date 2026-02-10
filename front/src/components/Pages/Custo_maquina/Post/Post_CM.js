import Style from '../cssgeral.module.css';
import SideBar from '../../../Layout/Menu Latertal/MenuLateral.js';
import Form from '../Form/Form.js'

function Post() {
    return (
        <div className={Style.body}>
            <SideBar />
            <div className={Style.conteiner}>
              <Form 
                title='Cadastro de Materia-Prima' 
                nameButton='Cadastrar'
                user={''}
                tpMov={''}
              />
            </div>
        </div>
    );
}

export default Post;