import { TiHome as Home } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Style from './Form.module.css'
import { useEffect, useState } from "react";
import api from "../../../../axiosConfig";
import { format } from 'date-fns';

function Form({ title, nameButton, mp = {}, tpMov }) {

    const [messageDataBase, setMessageDataBase] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        codigo: mp.codigo || null,
        unid_medida: mp.unid_medida || null,
        descricao: mp.descricao || null,
        comprimento_min: mp.comprimento_min || null,
        comprimento_nom: mp.comprimento_nom || null,
        largura_min: mp.largura_min || null,
        largura_nom: mp.largura_nom || null,
        espessura_min: mp.espessura_min || null,
        espessura_nom: mp.espessura_nom || null,
        preco_c_imposto: mp.preco_c_imposto || null,
        fator_conv: mp.fator_conv || 0,
        preco_s_imposto: mp.preco_s_imposto || null,
        dt_ultimo_custo: null,
        observacao_custo: mp.observacao_custo || null,
        habilitado: mp.habilitado || 1,

    });

    const unitOptions = [
        { value: "", label: "" },
        { value: "BD", label: "BD" },
        { value: "BL", label: "BL" },
        { value: "BO", label: "BO" },
        { value: "CA", label: "CA" },
        { value: "CJ", label: "CJ" },
        { value: "CM", label: "CM" },
        { value: "CT", label: "CT" },
        { value: "CX", label: "CX" },
        { value: "FD", label: "FD" },
        { value: "HR", label: "HR" },
        { value: "KG", label: "KG" },
        { value: "KT", label: "KT" },
        { value: "L", label: "L" },
        { value: "M2", label: "M2" },
        { value: "M3", label: "M3" },
        { value: "MH", label: "MH" },
        { value: "MT", label: "MT" },
        { value: "MM", label: "MM" },
        { value: "PC", label: "PC" },
        { value: "PL", label: "PL" },
        { value: "UN", label: "UN" },
    ];

    const handleChange = (e) => {

        const { name, value } = e.target;

        const newValue = name === 'preco_c_imposto' || 'fator_conv' ? value.replace(",", ".") : value.toUpperCase();

        setFormData({ ...formData, [name]: newValue });

    };

    const validatesUnit = (e) => {

        if (!unitOptions.some(opt => opt.value === e.target.value)) {

            setMessageDataBase("Unidade de medida inválida");

            return;
        }

    };

    const handleEnabled = (field, value) => {

        setFormData((prevFormData) => ({

            ...prevFormData,
            [field]: value,

        }));

        console.log(formData.habilitado)

    };

    const handlePriceTax = () => {

        if (formData.preco_c_imposto == 0) {

            setMessageDataBase('Preencha o campo "Preço Com Imposto"')
        }

        else {

            if (formData.fator_conv > 0) {

                const PsI = formData.preco_c_imposto.replace(',', '.') * formData.fator_conv.replace(',', '.')

                setFormData((prevSate) => ({

                    ...prevSate,
                    preco_s_imposto: parseFloat(PsI.toFixed(6))

                }))

            }

            else {

                setFormData((prevSate) => ({

                    ...prevSate,
                    preco_s_imposto: formData.preco_c_imposto.replace(',', '.')

                }))

            }
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!unitOptions.some(opt => opt.value === formData.unid_medida)) {

            setMessageDataBase("Unidade de medida inválida");

            return;

        }

        else {

            try {

                if (tpMov === 'Put') {

                    await api.put(`http://localhost:3333/Materia_prima/Put/${mp.codigo}`, formData);

                    setMessageDataBase('Materia-Prima Atualizada');

                    console.log(formData)
                }

                else {

                    await api.post("http://localhost:3333/Materia_prima/Post", formData);

                    setMessageDataBase('Materia-Prima Cadastrada')

                    console.log(formData)
                }

            }

            catch (error) {

                console.error("Erro ao salvar matéria-prima:", error);

                console.log(formData)

                setMessageDataBase("Não foi possível salvar a Matéria-Prima");

            }

        }

    };

    useEffect(() => {

        console.log(formData)

    }, [formData]);

    useEffect(() => {

        if (mp && mp.dt_ultimo_custo) {

            const dataFormatada = format(new Date(mp.dt_ultimo_custo), 'dd/MM/yyyy');

            const [dia, mes, ano] = dataFormatada.split("/");

            setFormData(prev => ({

                ...prev,

                dt_ultimo_custo: `${ano}-${mes}-${dia}`
            }));

        }

    }, [mp]);

    return (

        <div className={Style.body}>

            <div className={Style.header}>

                <Link to={'/Materia_Prima/Get'}>

                    <Home className={Style.iconHome} />

                </Link>
                <h1>{title}</h1>

            </div>
            <div className={Style.main}>

                <form onSubmit={handleSubmit}>

                    <div className={Style.forms}>

                        <div className={Style.divLeft}>

                            <div className={Style.initialData}>

                                <h2>Dados Iniciais</h2>
                                <div className={Style.divSupL}>

                                    {tpMov === 'Put' &&

                                        <div>

                                            <p className={Style.codigo}>Codigo</p>
                                            <input className={Style.readOnlyCod} name="codigo" onChange={handleChange} value={formData.codigo} readOnly />

                                        </div>
                                    }

                                    {tpMov !== 'Put' &&

                                        <div>

                                            <p className={Style.codigo}>Codigo</p>
                                            <input name="codigo" onChange={handleChange} value={formData.codigo} maxLength={6} />

                                        </div>
                                    }
                                    <div>

                                        <p>Unidade</p>


                                        <input list="unidades" id="unid_medida" name="unid_medida" value={formData.unid_medida} onChange={handleChange} onBlur={validatesUnit} />

                                        <datalist id="unidades">

                                            {unitOptions.map((option) => (

                                                <option key={option.value} value={option.value} />

                                            ))}

                                        </datalist>
                                    </div>

                                </div>
                                <div className={Style.descricao}>

                                    <p>Descrição</p>
                                    <input name="descricao" onChange={handleChange}
                                        value={formData.descricao} maxLength={60} />

                                </div>

                                {tpMov == 'Put' &&

                                    <div className={Style.enabledInput}>

                                        <p>Habilitado</p>
                                        <div className={Style.inputsEnabled}>
                                            <div>
                                                <p>Sim</p>
                                                <input checked={formData.habilitado == 1} type="checkbox" onChange={() => { handleEnabled('habilitado', 1) }} />
                                            </div>
                                            <div>
                                                <p>Não</p>
                                                <input checked={formData.habilitado == 0} type="checkbox" onChange={() => { handleEnabled('habilitado', 0) }} />
                                            </div>
                                        </div>

                                    </div>
                                }


                            </div>
                            <div className={Style.initialData}>

                                <h2>Custo</h2>
                                <div className={Style.divCost}>

                                    <div>

                                        <div>

                                            <p>Preço C/ Imposto</p>
                                            <input type="float" className={Style.inputDefault}
                                                onChange={(e) => { handleChange(e) }} onBlur={(e) => { handlePriceTax(e) }}
                                                name="preco_c_imposto"
                                                value={formData.preco_c_imposto}
                                                maxLength={10} />

                                        </div>
                                        <div>

                                            <p>Preço S/ Imposto</p>
                                            <input type="float" value={formData.preco_s_imposto}
                                                className={Style.readOnly}
                                                name="preco_s_imposto"
                                                readOnly
                                                maxLength={10} />

                                        </div>

                                    </div>
                                    <div>

                                        <div>

                                            <p>Fator de Conv.</p>
                                            <input type="float" className={Style.inputDefault}
                                                onChange={(e) => { handleChange(e) }} onBlur={(e) => { handlePriceTax(e) }}
                                                name="fator_conv"
                                                value={formData.fator_conv}
                                                maxLength={10} />

                                        </div>
                                        <div className={Style.divDate}>

                                            <p>Data de Custo</p>
                                            <input className={Style.inputDate} onChange={handleChange}
                                                type="date" required name="dt_ultimo_custo"
                                                value={formData.dt_ultimo_custo} />

                                        </div>

                                    </div>

                                </div>
                                <div className={Style.observacao}>

                                    <p>Observação</p>
                                    <input name="observacao_custo" onChange={handleChange}
                                        value={formData.observacao_custo}
                                        maxLength={40} />

                                </div>

                            </div>

                        </div>
                        <div className={Style.divRight}>

                            <h2>Dimencionais (MM)</h2>
                            <div className={Style.given}>

                                <div>

                                    <div>

                                        <p>Comp. Mín.</p>
                                        <input name="comprimento_min" type="number"
                                            onChange={handleChange}
                                            value={formData.comprimento_min}
                                            maxLength={4} />

                                    </div>
                                    <div>

                                        <p>Comp. Nom.</p>
                                        <input name="comprimento_nom" type="number"
                                            onChange={handleChange}
                                            value={formData.comprimento_nom}
                                            maxLength={4} />

                                    </div>

                                </div>
                                <div>

                                    <div>

                                        <p>Larg. Mín.</p>
                                        <input name="largura_min" type="number"
                                            onChange={handleChange}
                                            value={formData.largura_min}
                                            maxLength={4} />

                                    </div>
                                    <div>

                                        <p>Larg. Nom.</p>
                                        <input name="largura_nom" type="number"
                                            onChange={handleChange}
                                            value={formData.largura_nom}
                                            maxLength={4} />

                                    </div>

                                </div>
                                <div>

                                    <div>

                                        <p>Esp. Mín.</p>
                                        <input name="espessura_min" type="number"
                                            onChange={handleChange}
                                            value={formData.espessura_min}
                                            maxLength={4} />

                                    </div>
                                    <div>

                                        <p>Esp. Nom.</p>
                                        <input name="espessura_nom" type="number"
                                            onChange={handleChange}
                                            value={formData.espessura_nom}
                                            maxLength={4} />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <button type="Submit">{nameButton}</button>

                </form>

                {messageDataBase &&

                    <div className={Style.message}>

                        <p>{messageDataBase}</p>

                        {messageDataBase === 'Materia-Prima Atualizada' || messageDataBase === 'Materia-Prima Cadastrada' ?

                            <button onClick={(e) => { e.preventDefault(); setMessageDataBase(''); navigate('/Materia_Prima/Get') }}> OK </button>

                            :

                            <button onClick={(e) => { e.preventDefault(); setMessageDataBase('') }}> OK </button>


                        }


                    </div>
                }

            </div >

        </div >

    );
}

export default Form;
