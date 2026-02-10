import StyleGeneral from '../HistApGeral.module.css'
import SideBar from '../../../Layout/Menu Latertal/MenuLateral'
import Form from '../Form/Form.js';

const PostAP = () => {

    return (

        <div className={StyleGeneral.body}>

            <SideBar />

            <div className={StyleGeneral.conteiner}>

                <Form />

            </div>

        </div>

    )
}

export default PostAP;