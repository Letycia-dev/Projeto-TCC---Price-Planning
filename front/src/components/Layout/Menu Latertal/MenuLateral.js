import { Link, useLocation } from 'react-router-dom'
import logo from '../../../image/Logo.png'
import Style from './menuLateral.module.css'
import { CiCalculator1 as Calculator } from "react-icons/ci";
import { CiCoins1 as Coins } from "react-icons/ci";
import { TbShoppingBagDiscount as Sale } from "react-icons/tb";
import { BiBlanket as Raw_Material } from "react-icons/bi";
import { FaGears as Gear } from "react-icons/fa6";
import { BsPerson as IconeUser } from 'react-icons/bs';
import { BiPowerOff as ButtonOFF } from "react-icons/bi";
import { logout } from '../../../helpers/Auth';
import { useNavigate } from 'react-router-dom';


const MenuLateral = () => {

    const URL = useLocation();

    const navigate = useNavigate();

    const handleLogout = () => { logout();  navigate('/Login');};

    const Pages = [

        { id: 1, icon: <Calculator className={Style.icone} />, text: 'Cálculo de Aproveitamento', url: '/Historico_Aproveitamento/Get', MainURL: '/Historico_Aproveitamento' },
        { id: 2, icon: <Coins className={Style.icone} />, text: 'Orçamentos', url: '/Orcamentos/Get', MainURL: '/Orcamentos' },
        { id: 3, icon: <Sale className={Style.icone} />, text: 'Ajuste de Vendas', url: '/menu', MainURL: '/AjusteVendas' },
        { id: 4, icon: <Raw_Material className={Style.icone} />, text: 'Máteria-Prima', url: '/Materia_Prima/Get', MainURL: '/Materia_Prima' },
        { id: 5, icon: <Gear className={Style.icone} />, text: 'Máquinas', url: '/Custo_Maquina/Get', MainURL: '/Custo_Maquina' },
        { id: 6, icon: <IconeUser className={Style.icone} />, text: 'Usuários', url: '/Usuario/Get', MainURL: '/Usuario' }
    ]

    return (

        <div className={Style.menuLateral}>

            <div className={Style.logoPosicao}>

                <img className={Style.logo} src={logo}></img>

            </div>
            <ul>

                {Pages.map((page) => (

                    <li key={page.id}>

                        <Link to={page.url} className={URL.pathname.includes(page.MainURL) ? Style.itemSelecionado : Style.option} >

                            {page.icon}{page.text}

                        </Link>

                    </li>

                ))}

            </ul>
            <div className={Style.Sair} onClick={handleLogout} style={{ cursor: 'pointer' }}>

                <ButtonOFF className={Style.icone} />
                <p>Sair</p>

            </div>

        </div>
    )
}

export default MenuLateral;