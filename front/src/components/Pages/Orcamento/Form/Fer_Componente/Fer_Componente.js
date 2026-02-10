import { useEffect, useState } from 'react';
import Style from '../Fer_Componente/Fer_Componente.module.css';
import { FaTrash as Trash } from "react-icons/fa";
import { MdAddBox as Add } from "react-icons/md";

function Fer_Componente({ form, handleChange, ActionAdd, ActionRemove, setForm, CalcDiluitionPart, setMessage }) {

    const [trashEnabled, setTrashEnabled] = useState(false);

    const [visualInfo, setVisualInfo] = useState([]);

    const iconTrash = () => {

        const fers = form.Ferramentas_Utilizadas.filter(fer => fer.Codigo_Ferramenta !== null)

        if (fers.length > 1) {

            setTrashEnabled(true)
        }

        else {

            setTrashEnabled(false)
        }

    };

    const removeInfo = (ordem) => {

        setVisualInfo(prev => {

            const updated = { ...prev };

            delete updated[ordem];

            return updated;

        });
    };

    const handleChangeForm = (e) => {

        setForm(prev => ({

            ...prev,

            observacao_Ferramenta: e.target.value

        }))

    };

    const validTool = () => {

        const codigos = form.Ferramentas_Utilizadas.map(ferr => ferr.Codigo_Ferramenta?.trim()).filter(Boolean);

        codigos.map((cod, position) => {

            form.Ferramentas_Utilizadas.map((ferr, index) => {

                if (ferr.Codigo_Ferramenta == cod && index !== position) {

                    setMessage('Já existe uma ferramenta com esse codigo')
                }

            })

        })

    };

    useEffect(() => {

        const totalSum = Object.values(visualInfo).reduce((acc, item) => acc + (item.totalCost || 0), 0);

        setForm(prev => ({

            ...prev,

            custo_total_Ferramenta: totalSum.toFixed(6)

        }));

    }, [visualInfo]);

    // useEffect(() => {

    //     console.log(visualInfo)

    // }, [visualInfo])

    useEffect(() => {

        form.Ferramentas_Utilizadas.map((ferr, index) => {

            if (ferr.Custo && ferr.Diluicao_Pecas && ferr.Quantidade) {

                const totalCost = (parseFloat(ferr.Custo) * parseInt(ferr.Quantidade)) / parseInt(ferr.Diluicao_Pecas);

                setVisualInfo(prev => ({

                    ...prev,

                    [index]: {

                        ...prev[index],

                        totalCost: parseFloat(totalCost.toFixed(6))
                    }

                }))

            }

        });

    }, [form.volume_mes, form.Ferramentas_Utilizadas])

    useEffect(() => {

        iconTrash();

    }, [form.Ferramentas_Utilizadas]);

    return (

        <div className={Style.body}>

            <h4>3. Ferramentas, Máquinas, Dispositivos e Investimentos</h4>
            <div className={Style.form}>

                <ul className={Style.label}>

                    <li className={Style.defaultLi}>Código</li>
                    <li className={Style.liDescription}>Descrição de Máteria-Prima</li>
                    <li className={Style.defaultLi}>Quantidade</li>
                    <li className={Style.defaultLi}>Custo R$</li>
                    <li className={Style.defaultLi}>Vida (Meses)</li>
                    <li className={Style.defaultLi}>Vida (Peças)</li>
                    <li className={Style.defaultLi}>Custo Total R$</li>
                    <li className={Style.space}></li>

                </ul>
                <div className={Style.main}>

                    {form.Ferramentas_Utilizadas.map((ferr, index) => {

                        if (ferr.Codigo_Ferramenta !== null) {

                            const clearTool = (e) => {

                                if (e.target.value.trim() == '') {

                                    ferr.Descricao_Ferramenta = '';
                                    ferr.Quantidade = '';
                                    ferr.Custo = '';
                                    ferr.Diluicao_Meses = '';
                                    ferr.Diluicao_Pecas = '';

                                    setVisualInfo(prev => ({

                                        ...prev,

                                        [index]: {

                                            ...prev[index],

                                            totalCost: ''

                                        }

                                    }))

                                }


                            }

                            return (

                                <div className={Style.listDataMP} key={index}>

                                    <input
                                        className={`${Style.inputDefault} ${Style.default}`}
                                        id={index}
                                        name='Codigo_Ferramenta'
                                        type='text'
                                        value={ferr.Codigo_Ferramenta}
                                        onChange={(e) => { handleChange(e) }}
                                        onBlur={(e) => { validTool(); clearTool(e) }}
                                    />
                                    <input
                                        className={`${Style.inputDescription} ${Style.default}`}
                                        id={index}
                                        name='Descricao_Ferramenta'
                                        value={ferr.Descricao_Ferramenta}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <input
                                        className={`${Style.inputDefault} ${Style.default}`}
                                        id={index}
                                        name='Quantidade'
                                        type='number'
                                        min={0}
                                        value={ferr.Quantidade}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <input
                                        className={`${Style.inputDefault} ${Style.default}`}
                                        id={index}
                                        name='Custo'
                                        type='number'
                                        min={0}
                                        value={ferr.Custo}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <input
                                        className={`${Style.inputDefault} ${Style.default}`}
                                        id={index}
                                        name='Diluicao_Meses'
                                        type='number'
                                        min={0}
                                        value={ferr.Diluicao_Meses}
                                        onChange={(e) => { handleChange(e) }}
                                        onBlur={() => { CalcDiluitionPart() }}

                                    />
                                    <input
                                        className={`${Style.inputDefault} ${Style.default}`}
                                        id={index}
                                        name='Diluicao_Pecas'
                                        type='number'
                                        min={0}
                                        value={ferr.Diluicao_Pecas}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <input
                                        className={`${Style.inputDefault} ${Style.readOnly}`}
                                        readOnly
                                        value={visualInfo[index]?.totalCost}
                                    />
                                    <div className={Style.icon}>

                                        {trashEnabled &&

                                            <Trash onClick={() => { ActionRemove(index); removeInfo(index) }} />

                                        }

                                    </div>

                                </div>

                            );
                        };

                    })}

                    <div className={Style.iconAdd}>

                        <Add onClick={() => { ActionAdd() }} />

                    </div>

                </div>
                <div className={Style.footer}>

                    <div className={Style.observation}>

                        <h5>Obs:</h5>
                        <input
                            value={form.observacao_Ferramenta}
                            onChange={(e) => { handleChangeForm(e) }}
                        />

                    </div>
                    <div className={Style.tax}>

                        <h5>Custo Ferramental / Dispositivo</h5>
                        <input readOnly value={form.custo_total_Ferramenta} />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Fer_Componente;