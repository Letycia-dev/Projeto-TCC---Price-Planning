import { TiHome as Home } from "react-icons/ti";
import { VscPercentage as Percentage } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import api from "../../../../axiosConfig";
import Style from './Form.module.css'
import { useEffect, useState } from "react";

function FormHMF({ title, nameButton, MF = {}, MvDelete }) {

    const id_user = localStorage.getItem("id_user");
    const name_user = localStorage.getItem("name");
    const navigate = useNavigate();
    const [messageDataBase, setMessageDataBase] = useState('');

    const [formData, setFormData] = useState({
        Data_de_Atualizacao: new Date().toISOString().split('T')[0],
        Reajuste_MAQ: MF.Reajuste_MAQ?.toString() || '',
        Reajuste_MO: MF.Reajuste_MO?.toString() || '',
        Altercao_User: parseInt(id_user)
    });


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Reajuste_MAQ < 0 || formData.Reajuste_MO < 0 || formData.Reajuste_MAQ == null || formData.Reajuste_MO == null) {
            setMessageDataBase('Informe um valor acima de 0')
            return;
        };
        setFormData(prev => ({
            ...prev,
            Reajuste_MAQ: parseFloat(formData.Reajuste_MAQ.replace(',', '.')),
            Reajuste_MO: parseFloat(formData.Reajuste_MO.replace(',', '.'))
        }));
        try {
            if (MF.ID_Fator && MvDelete == true) {
                await api.delete(`/Mudanca_Fator/Delete/${MF.ID_Fator}`);
                setMessageDataBase("Fator Excluido com sucesso!");
            }
            else if (MF.ID_Fator && MvDelete == false) {
                await api.put(`/Mudanca_Fator/Put/${MF.ID_Fator}`, formData);
                setMessageDataBase("Fator Atualizado com sucesso!");
            }
            else {
                await api.post("/Mudanca_Fator/Post", formData);
                setMessageDataBase("Novo Fator Cadastrado com sucesso!");
            }
            console.log(formData)
        }
        catch (error) {
            console.error("Erro ao salvar usuário:", error);
            setMessageDataBase("Não foi possivel salvar o Fator");
            navigate('/Custo_Maquina/Mudanca_Fator/Get')
        };
    };
    const closeMessage = () => {
        if (messageDataBase.includes('sucesso')) {
            navigate('/Custo_Maquina/Mudanca_Fator/Get')
            setMessageDataBase('')
        }
        else {
            setMessageDataBase('')
        }
    };

    useEffect(() => {
        console.log(formData)
    }, [formData]);

    return (

        <div className={Style.body}>

            <div className={Style.header}>

                <Home className={Style.iconHome} onClick={() => { navigate('/Custo_Maquina/Mudanca_Fator/Get') }} />

                <h1>{title}</h1>

            </div>
            <div className={Style.main}>

                <div className={Style.backgroundForm}>

                    <div className={Style.iconPerc}>

                        <Percentage />

                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className={Style.data}>

                            <div>

                                <h3>Ajuste de Máq (%)</h3>
                                <input
                                    className={`${Style.inputDefault} ${MvDelete ? Style.ReadOnly : ''}`}
                                    name="Reajuste_MAQ"
                                    value={formData.Reajuste_MAQ}
                                    onChange={(e) => { handleChange(e) }}
                                    readOnly={MvDelete}
                                />

                            </div>
                            <div>

                                <h3>Ajuste de M.O. (%)</h3>
                                <input
                                    className={`${Style.inputDefault} ${MvDelete ? Style.ReadOnly : ''}`}
                                    name="Reajuste_MO"
                                    value={formData.Reajuste_MO}
                                    onChange={(e) => { handleChange(e) }}
                                    readOnly={MvDelete}
                                />

                            </div>
                            <div>

                                <h3>Data</h3>
                                <input
                                    className={`${Style.inputDefault} ${Style.ReadOnly}`}
                                    type="date"
                                    value={formData.Data_de_Atualizacao}
                                    readOnly
                                />

                            </div>
                            <div>

                                <h3>Usuário</h3>
                                <input
                                    className={`${Style.inputDefault} ${Style.ReadOnly}`}
                                    readOnly
                                    value={name_user}
                                />

                            </div>

                        </div>
                        <button type="Submit">{nameButton}</button>

                    </form>

                </div>

                {messageDataBase ?

                    <div className={Style.message}>

                        {messageDataBase}

                        <button onClick={() => { closeMessage() }}> OK </button>

                    </div>

                    : <></>}
            </div>

        </div>

    );
}

export default FormHMF;
