import Form from '../FormHMF/Form.js';
import SideBar from '../../../Layout/Menu Latertal/MenuLateral.js';
import Style from '../MFGeral.module.css';

function Post() {

    return (

        <div className={Style.body}>

            <SideBar />

            <div className={Style.conteiner}>

                <Form
                    title={'Cadastro de Ajuste de Fator'}
                    nameButton={'Cadastrar'}
                    MF={''}
                    MvDelete={false}
                />

            </div>

        </div>

    );

}

export default Post;