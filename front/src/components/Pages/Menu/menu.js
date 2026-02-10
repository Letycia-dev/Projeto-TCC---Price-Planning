import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './menu.module.css';
import logo from '../../../image/Logo.png';
import { BsPerson as IconeUser } from 'react-icons/bs';
import { BiPowerOff as ButtonOFF } from "react-icons/bi";
import { CiCalculator1 as Calculator } from "react-icons/ci";
import { CiCoins1 as Coins } from "react-icons/ci";
import { TbShoppingBagDiscount as Sale } from "react-icons/tb";
import { BiBlanket as Raw_Material } from "react-icons/bi";
import { FaGears as Gear } from "react-icons/fa6";
import { logout } from '../../../helpers/Auth';
import { useNavigate } from 'react-router-dom';


const Menu = () => {

    const [nomeUsuario, setNomeUsuario] = useState('');

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate('/Login');

    };

    useEffect(() => {

        const nomeSalvo = localStorage.getItem('name');

        if (nomeSalvo) {

            setNomeUsuario(nomeSalvo);
        }

    }, []);

    return (
        <div className={Style.body}>

            <div className={Style.Header}>

                <img className={Style.logo} src={logo}></img>
                <div className={Style.canto}>

                    <Link to={'/Usuario/Get'}>

                        <div className={Style.Usuario}>

                            <IconeUser className={Style.UserIcon} />
                            <p>{nomeUsuario}</p>

                        </div>

                    </Link>
                    <div className={Style.sair} onClick={handleLogout} style={{ cursor: 'pointer' }}>

                        <ButtonOFF className={Style.Off} />
                        <p>Sair</p>

                    </div>

                </div>

            </div>
            <div className={Style.Main}>

                <div className={Style.caixas_cima}>

                    <Link to={'/Historico_Aproveitamento/Get'}>

                        <div className={Style.caixas}>

                            <Calculator className={Style.Icon} />
                            <h1>Cálculo de Aproveitamento</h1>

                        </div>


                    </Link>

                    <Link to={`/Orcamentos/Get`}>

                        <div className={Style.caixasc2}>

                            <Coins className={Style.Icon} />
                            <h1>Orçamentos</h1>

                        </div>

                    </Link>
                    <div className={Style.caixas}>

                        <Sale className={Style.Icon} />
                        <h1>Ajuste de Vendas</h1>

                    </div>

                </div>
                <div className={Style.caixas_baixo}>

                    <Link to={`/Materia_Prima/Get`}>

                        <div className={Style.caixasc2}>

                            <Raw_Material className={`${Style.Icon} ${Style.RawMaterial}`} />
                            <h1>Matéria - Prima</h1>

                        </div>

                    </Link>
                    <div className={Style.caixas}>

                        <Link to={`/Custo_Maquina/Get`}>

                            <Gear className={Style.Icon} />
                            <h1>Máquinas</h1>

                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Menu;