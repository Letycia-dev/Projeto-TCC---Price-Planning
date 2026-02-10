import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axiosConfig';
import style from './Login.module.css'
import logo from '../../../image/Logo.png'
import { FaEye as VisiblePassword } from "react-icons/fa";
import { FaEyeSlash as HiddenPassword } from "react-icons/fa6";

function Login() {

    const [name, setName] = useState('');

    const [password, setPassword] = useState('');

    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    const [passwordV, setPasswordV] = useState(false);

    const [typePassword, setTypePassword] = useState('password');

    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post('/Login', {
                name,
                password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('typeUser', response.data.typeUser);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('id_user', response.data.id_user);
            localStorage.setItem('department', response.data.department);

            setToken(response.data.token);

        } catch (error) {

            console.error(error);

            setMessage('Usuario não permitido');
        }
    };

    const passwordVisible = () => {

        setPasswordV(true);

        setTypePassword('text');

    };

    const passwordInvisible = () => {

        setPasswordV(false);

        setTypePassword('password');
    };

    useEffect(() => {

        if (token) {

            navigate('/menu');

        }

    }, [token])

    return (
        <div className={style.body}>

            <div className={style.login}>

                <div className={style.buttonAndInput}>

                    <div className={style.input}>

                        <form onSubmit={handleLogin}>

                            <p>Usuário:</p>
                            <input type="text" placeholder="Ex: Usuario1" value={name} onChange={(e) => setName(e.target.value)} />
                            <p>Senha:</p>
                            <div className={style.password}>

                                <input type={typePassword} value={password} onChange={(e) => setPassword(e.target.value)} />
                                {passwordV ? <VisiblePassword className={style.icon} onClick={passwordInvisible} />
                                    : <HiddenPassword className={style.icon} onClick={passwordVisible} />}

                            </div>
                            <div className={style.buttonLogin}>

                                {<button type="submit">Login</button>}
                                {/* <button onClick={()=>{navigate('/menu')}}>Login</button> */}

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <div className={style.logo}>

                <div>

                    <img src={logo} alt="Logo do Sistema" />

                </div>

            </div>

            {message &&

                <div className={style.message}>

                    <p>{message}</p>
                    <button onClick={(e) => { e.preventDefault(); setMessage('') }}> OK </button>

                </div>
            }

        </div>
    );

}

export default Login;