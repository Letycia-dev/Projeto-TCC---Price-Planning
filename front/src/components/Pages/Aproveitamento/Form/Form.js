import Style from './FormStyle.module.css'
import { TiHome as Home } from "react-icons/ti";
import { CiSaveDown2 as Save } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from '../../../../axiosConfig';
import { IoSearchSharp as Lupa } from "react-icons/io5";
import { GiConfirmed as Confirm } from "react-icons/gi";
import { HiPencil as Pencil } from "react-icons/hi2";
import AnalysisField from './AnalysisField/AnalysisFiled';
import ResultAnalysis from './ResultAnalysis/ResultAnalysis';

const Form = ({ date_aprov = {} }) => {

    const User = localStorage.getItem("id_user");

    const navigate = useNavigate();

    const [form, setForm] = useState({

        codigo: date_aprov.codigo || null,
        versão_Item: date_aprov.versão_Item || null,
        comprimento: date_aprov.comprimento || null,
        largura: date_aprov.largura || null,
        espessura: date_aprov.espessura || null,
        volumes_Mes: date_aprov.volumes_Mes || null,
        codigo_MP: date_aprov.codigo_MP || null,
        medida_MP: date_aprov.medida_MP || 'Mínimo',
        codigo_Maq: date_aprov.codigo_Maq || null,
        cavidades_comp: date_aprov.cavidades_comp || null,
        cavidades_larg: date_aprov.cavidades_larg || null,
        cavidades_totais: date_aprov.cavidades_totais || null,
        tipo_de_cavidade: date_aprov.tipo_de_cavidade || null,
        espaçamento_entre_cavidades: date_aprov.espaçamento_entre_cavidades == 0 ? 0 : date_aprov.espaçamento_entre_cavidades,
        N_Blanks_MT: date_aprov.N_Blanks_MT || null,
        N_Blanks_LG: date_aprov.N_Blanks_LG || null,
        ordem_da_Batida: date_aprov.ordem_da_Batida || null,
        N_de_Batidas: date_aprov.N_de_Batidas || null,
        pecas_por_material: date_aprov.pecas_por_material || null,
        user: User,
    });

    const [activeFormSave, setActiveFormSave] = useState(false);

    const [machines, setMachines] = useState([]);

    const [partsCalculation, setpartsCalculation] = useState({

        cavities: null,
        blanks_MT: null,
        blanks_LG: null,
        beats: null,
        partsResult: null


    });

    const [dataMachine, setdataMachine] = useState({

        length: null,
        width: null,
        space: null

    });

    const [rawMaterial, setRawMaterial] = useState({

        Minimum_Length: "",
        Nominal_Length: "",
        Minimum_Width: "",
        Nominal_Width: "",
        Minimum_Thickness: "",
        Nominal_Thickness: "",

    });

    const [selectedDimMP, setSelectedDimMP] = useState({

        length: null,
        width: null


    });

    const [editMachine, setEditMachine] = useState({

        codigo: '',
        descricao: '',
        comprimento: null,
        largura: null,
        aprov: 0,
        type_espac: 'Padrao',
        espac_lamina: 0

    });

    const [tools, setTools] = useState({

        length1: 0,
        width1: 0,
        length2: 0,
        width2: 0,
        length3: 0,
        width3: 0,
        length4: 0,
        width4: 0,

    });

    const [messageDataBase, setMessageDataBase] = useState('')

    const [alertSave, setAlertSave] = useState('')

    const [monthlyVolumesVisible, setMonthlyVolumesVisible] = useState(false)

    const [suggestedCav, setSuggestedCav] = useState(0)

    const [view, setView] = useState('DashBoard')

    const navigateToGet = () => {

        navigate('/Historico_Aproveitamento/Get')

    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        const camposNumericos = [

            'N_Blanks_LG', 'N_Blanks_MT', 'N_de_Batidas', 'cavidades_comp',
            'cavidades_larg', 'cavidades_totais', 'codigo_Maq',
            'comprimento', 'espaçamento_entre_cavidades', 'espessura',
            'largura', 'pecas_por_material', 'volumes_Mes'
        ];

        const valorFinal = camposNumericos.includes(name) ? (value === '' ? '' : +value)
            : value;

        setForm(prev => ({

            ...prev,

            [name]: valorFinal,

            ...(value === "Junta" && { espaçamento_entre_cavidades: 0 })

        }));

    }

    const calculateCav = () => {


        if (form.volumes_Mes <= 300) {

            setSuggestedCav(1)

        } else {

            const cav = Math.ceil(parseInt(form.volumes_Mes) / 300)

            setSuggestedCav(cav > 40 ? 40 : cav)
        }


    }

    const handleRawMaterial = async (e) => {

        if (e.target.value.trim() !== '') {

            console.log(form.medida_MP);

            try {

                const Dimensional = await api.get(`Materia_prima/Get/${e.target.value}`)

                console.log(Dimensional.data)

                setRawMaterial({
                    ...rawMaterial,

                    "Minimum_Length": Dimensional.data[0].comprimento_min,
                    "Nominal_Length": Dimensional.data[0].comprimento_nom,
                    "Minimum_Width": Dimensional.data[0].largura_min,
                    "Nominal_Width": Dimensional.data[0].largura_nom,
                    "Minimum_Thickness": Dimensional.data[0].espessura_min,
                    "Nominal_Thickness": Dimensional.data[0].espessura_nom

                })

                // setForm(prev => ({

                //     ...prev,

                //     codigo_MP: e.target.value

                // }))

            } catch (err) {

                setMessageDataBase('Matéria-Prima desabilitada ou Inexistente')

                console.log(`Erro: ${err}`)
            }

        }

    }

    const searchMachine = async () => {

        try {

            const GetMachines = await api.get(`http://localhost:3333/Historico_Aproveitamento/Get/Machine`)

            setMachines(GetMachines.data)

        } catch (err) {

            console.log(`Erro: ${err}`)
        }
    }

    const handleMachine = (machine) => {

        if (machine.aprov == 1) {

            setForm(prev => ({

                ...prev,

                codigo_Maq: machine.Codigo_Maquina


            }))

            setdataMachine(prev => ({

                ...prev,

                length: machine.comprimento,
                width: machine.largura

            }))

            setMachines([])


        }

        else {

            setMessageDataBase("Máquina não habilitada para Aproveitamentos")
        }

    }

    const handleCodMachine = async (e) => {

        try {

            const GetMachines = await api.get(`http://localhost:3333/Historico_Aproveitamento/Get/Machine`)

            const machine = GetMachines.data.filter((mac) =>

                mac.Codigo_Maquina == e.target.value && mac.aprov == 1

            )

            if (machine[0] != undefined) {

                setdataMachine(prev => ({

                    ...prev,

                    length: machine[0].comprimento,
                    width: machine[0].largura,
                    space: machine[0].espacamento_cav

                }))

            }

            else {

                setdataMachine(prev => ({

                    ...prev,

                    length: null,
                    width: null,
                    space: null

                }))

                setMessageDataBase('Máquina não cadastrada ou não habilitada para aproveitamentos')

            }


        } catch (err) {

            console.log(`Erro: ${err}`)
        }


    }

    const handleDataMachine = (e) => {

        const { name, value } = e.target;

        let updatedMachine = {

            ...editMachine,

            [name]: value

        };

        if (name === 'type_espac' && value === 'Padrao') {
            updatedMachine.espac_lamina = 0;
        }

        setEditMachine(updatedMachine);

    }

    const updateMachine = (machine) => {

        const typeEspacL = machine.espacamento_cav == 0 ? "Padrao" : "Especial"

        setEditMachine(prev => ({

            ...prev,

            codigo: machine.Codigo_Maquina,
            descricao: machine.descricao,
            comprimento: machine.comprimento,
            largura: machine.largura,
            aprov: machine.aprov,
            type_espac: typeEspacL,
            espac_lamina: machine.espacamento_cav


        }))

    }

    const cleanUpdateMachine = () => {

        setEditMachine(prev => ({

            ...prev,

            codigo: '',
            descricao: '',
            comprimento: null,
            largura: null,
            aprov: 0,
            type_espac: 'Padrao',
            espac_lamina: null


        }))

    }

    const handleChangeAprovMac = () => {

        if (editMachine.aprov == 1) {

            setEditMachine(prev => ({

                ...prev,

                aprov: 0

            }))

        }

        else {

            setEditMachine(prev => ({

                ...prev,

                aprov: 1

            }))
        }
    }

    const saveUpdateMachine = async () => {

        try {

            await api.put(`http://localhost:3333/Historico_Aproveitamento/putMac/${editMachine.codigo}`, editMachine)

            setMessageDataBase('Máquina Atualizada')

            cleanUpdateMachine()

            searchMachine()

        } catch (err) {

            console.log(err)
        }


    }

    const autoFillSave = (e) => {

        e.preventDefault()

        setAlertSave('')

        setActiveFormSave(true)

        setForm(prev => ({

            ...prev,

            cavidades_totais: parseInt(partsCalculation.cavities),
            N_Blanks_MT: parseInt(partsCalculation.blanks_MT),
            N_Blanks_LG: parseInt(partsCalculation.blanks_LG),
            N_de_Batidas: parseInt(partsCalculation.beats),
            pecas_por_material: parseInt(partsCalculation.partsResult)

        }))

    }

    const clearAutoFillSave = (e) => {

        e.preventDefault()

        setAlertSave('')

        setActiveFormSave(true)

        setForm(prev => ({

            ...prev,

            cavidades_totais: null,
            N_Blanks_MT: null,
            N_Blanks_LG: null,
            N_de_Batidas: null,
            pecas_por_material: null

        }))

    }

    const saveUtilization = async (e) => {

        e.preventDefault()

        const VoidValues = Object.values(form).filter(value => value == null)

        if (VoidValues.length > 0) {

            setMessageDataBase('Preencha todos os campos necessários (Dimencionais, Volume Mês e Campos da Tela "Salvar")')

            console.log(form)
        }

        else {

            if (date_aprov.ID_Aprov) {

                try {

                    api.put(`http://localhost:3333/Historico_Aproveitamento/${date_aprov.ID_Aprov}`, form)

                    setActiveFormSave(false)

                    setMessageDataBase('Aproveitamento Salvo')

                } catch (err) {

                    setMessageDataBase('Não foi possivel atualizar o Aproveitamento')

                    console.log(err)
                }

            }

            else {


                try {

                    api.post('http://localhost:3333/Historico_Aproveitamento/', form)

                    setActiveFormSave(false)

                    setMessageDataBase('Aproveitamento Salvo')

                } catch (err) {

                    console.log(err)
                }


            }

        }

    }

    useEffect(() => {

        if (form.medida_MP) {

            const handleDimMP = () => {

                if (form.medida_MP == 'Mínimo') {

                    setSelectedDimMP({
                        ...selectedDimMP,

                        length: rawMaterial.Minimum_Length,
                        width: rawMaterial.Minimum_Width


                    })

                }

                else {

                    setSelectedDimMP({
                        ...selectedDimMP,

                        length: rawMaterial.Nominal_Length,
                        width: rawMaterial.Nominal_Width

                    })

                }

            }

            handleDimMP()



        }

    }, [rawMaterial, form.medida_MP, form.codigo])

    useEffect(() => {

        if (date_aprov.ID_Aprov) {

            handleRawMaterial({

                target: {

                    value: date_aprov.codigo_MP
                }
            })

            handleCodMachine({

                target: {

                    value: date_aprov.codigo_Maq
                }
            })

            setpartsCalculation(prev => ({

                ...prev,

                cavities: date_aprov.cavidades_totais,
                blanks_MT: date_aprov.N_Blanks_MT,
                blanks_LG: date_aprov.N_Blanks_LG,
                beats: date_aprov.N_de_Batidas,
                partsResult: date_aprov.pecas_por_material

            }))

            calculateCav()

        }

    }, [form.codigo])

    return (

        <div className={Style.body}>

            <div className={Style.header}>

                <Home className={Style.icon} onClick={() => { navigateToGet() }} />
                <h1>Análise de Aproveitamento</h1>
                <div className={Style.divSupL}>

                    <p className={monthlyVolumesVisible === true ? Style.pHeaderOpen : Style.defaultPHeader}
                        onClick={() => { setMonthlyVolumesVisible(!monthlyVolumesVisible) }}>

                        Peças por mês

                    </p>
                    <Save className={Style.icon} onClick={() => { setAlertSave('Usar dados de "Cálculo de Peças Por BO/PL?"') }} />

                </div>

            </div>

            <div className={Style.main}>

                <div className={Style.scrollView}>

                    <div className={`${Style.slider} ${view === 'DashBoard' ? Style.toDashBoard : Style.toParams}`}>

                        <div className={Style.DashBoard}>

                            <AnalysisField
                                dimenTool={tools}
                                dimenMP={selectedDimMP}
                                spaceTools={dataMachine.space}
                                partThickeness={form.espessura}
                            />

                        </div>
                        <div className={Style.Params}>

                            <ResultAnalysis
                                toolsDim={setTools}
                                resultsParts={partsCalculation}
                                setResultsParts={setpartsCalculation}
                                pushDataMachine={dataMachine}
                                formSave={form} />

                            <div className={`${Style.divParms}`}>

                                <div className={Style.Dimensional}>

                                    <h1>Dimencionais</h1>
                                    <div className={Style.PartData}>

                                        <h3>Dados da Peça</h3>
                                        <ul>

                                            <li className={Style.LabelsizeDefault}>Comprimento</li>
                                            <li className={Style.LabelsizeDefault}>Largura</li>
                                            <li className={Style.LabelsizeDefault}>Espessura</li>
                                            <li className={Style.LabelsizeDefault}>Tipo</li>
                                            <li className={Style.LabelsizeDefault}>Espaçamento</li>

                                        </ul>
                                        <div className={Style.inputs}>

                                            <input
                                                className={Style.inputsDefaults}
                                                type='number' min={1}
                                                name='comprimento'
                                                onChange={(e) => { handleChange(e) }}
                                                value={form.comprimento}
                                            />
                                            <input
                                                className={Style.inputsDefaults}
                                                type='number'
                                                min={1}
                                                name='largura'
                                                onChange={(e) => { handleChange(e) }}
                                                value={form.largura}
                                            />
                                            <input
                                                className={Style.inputsDefaults}
                                                type='number' min={1}
                                                name='espessura'
                                                onChange={(e) => { handleChange(e) }}
                                                value={form.espessura}
                                            />
                                            <select
                                                className={Style.selectDefault}
                                                name='tipo_de_cavidade'
                                                onChange={(e) => { handleChange(e) }}
                                                value={form.tipo_de_cavidade}>

                                                <option value=''></option>
                                                <option value='Junta'>Junta</option>
                                                <option value='Separada'>Separada</option>

                                            </select>
                                            {form.tipo_de_cavidade == "Separada" ?

                                                <input
                                                    className={Style.inputsDefaults}
                                                    name='espaçamento_entre_cavidades'
                                                    type='number'
                                                    min={1}
                                                    onChange={(e) => { handleChange(e) }}
                                                    value={form.espaçamento_entre_cavidades} />

                                                :

                                                <input
                                                    className={Style.inputReadOnly}
                                                    readOnly
                                                    value={form.espaçamento_entre_cavidades}
                                                />

                                            }


                                        </div>

                                    </div>
                                    <div className={Style.PartData}>

                                        <div className={Style.headerMP}>

                                            <h3>Matéria-Prima </h3>
                                            <select
                                                className={Style.selectDefault}
                                                name='medida_MP'
                                                onChange={(e) => { handleChange(e) }}
                                                value={form.medida_MP}>

                                                <option value='Mínimo'>Mínimo</option>
                                                <option value='Nominal'>Nominal</option>

                                            </select>

                                        </div>
                                        <ul>

                                            <li className={Style.LabelsizeDefault}>Código</li>
                                            <li className={Style.LabelsizeDefault}>Comprimento</li>
                                            <li className={Style.LabelsizeDefault}>Largura</li>
                                            <li className={Style.LabelsizeDefault}>Espessura</li>

                                        </ul>
                                        <div className={Style.inputs}>

                                            <input
                                                className={Style.inputsDefaults}
                                                name='codigo_MP'
                                                onBlur={(e) => { handleRawMaterial(e) }}
                                                onChange={(e) => { handleChange(e) }}
                                                value={form.codigo_MP} />
                                            <input
                                                className={Style.inputReadOnly}
                                                readOnly
                                                value={form.medida_MP == 'Mínimo' ? rawMaterial.Minimum_Length : rawMaterial.Nominal_Length}
                                            />
                                            <input
                                                className={Style.inputReadOnly}
                                                readOnly
                                                value={form.medida_MP == 'Mínimo' ? rawMaterial.Minimum_Width : rawMaterial.Nominal_Width}
                                            />
                                            <input className={Style.inputReadOnly}
                                                readOnly
                                                value={form.medida_MP == 'Mínimo' ? rawMaterial.Minimum_Thickness : rawMaterial.Nominal_Thickness}
                                            />

                                        </div>

                                    </div>
                                    <div className={Style.PartData}>

                                        <h3>Máquina</h3>
                                        <ul>

                                            <li className={Style.LabelsizeDefault}>Código</li>
                                            <li className={Style.LabelsizeDefault}>Comprimento</li>
                                            <li className={Style.LabelsizeDefault}>Largura</li>

                                        </ul>
                                        <div className={Style.inputs}>

                                            <div>

                                                <Lupa className={Style.iconSearch} onClick={() => { searchMachine() }} />
                                                <input className={Style.inputsDefaults}
                                                    value={form.codigo_Maq}
                                                    onBlur={(e) => { handleCodMachine(e) }}
                                                    name='codigo_Maq'
                                                    onChange={(e) => { handleChange(e) }} />

                                            </div>
                                            <div>

                                                <input className={Style.inputReadOnly} readOnly value={dataMachine.length} />

                                            </div>
                                            <div>

                                                <input className={Style.inputReadOnly} readOnly value={dataMachine.width} />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {machines.length > 0 &&

                                <div className={`${Style.listMachines} ${editMachine.codigo != '' && Style.opacity}`}>

                                    <h1>Máquinas</h1>
                                    <div className={Style.mainMachine}>

                                        <ul className={Style.labelMachine}>

                                            <li className={Style.liMachineLabel}>Código</li>
                                            <li className={Style.liMachineLabel}>Descrição</li>
                                            <li className={Style.liMachineLabel}>Comprimento</li>
                                            <li className={Style.liMachineLabel}>Largura</li>
                                            <li className={Style.liMachineLabel}>Máq. Aproveit.</li>
                                            <li className={Style.liMachineLabel}>Espac. Lâmina</li>
                                            <li className={Style.spaceLabelMachine}></li>

                                        </ul>

                                        <div className={Style.listMachine}>

                                            {machines.map((machine) => {

                                                return (

                                                    <ul >

                                                        <li className={Style.liMachine}>{machine.Codigo_Maquina}</li>
                                                        <li className={Style.liMachine}>{machine.descricao}</li>
                                                        <li className={Style.liMachine}>{machine.comprimento}</li>
                                                        <li className={Style.liMachine}>{machine.largura}</li>
                                                        <li className={Style.liMachine}>{machine.aprov == 1 ? 'Sim' : 'Não'}</li>
                                                        <li className={Style.liMachine}>

                                                            {machine.espacamento_cav == 0 || machine.espacamento_cav == '0' ? 'Padrão' : machine.espacamento_cav}

                                                        </li>
                                                        <li className={Style.iconsMachine}>

                                                            <Pencil onClick={() => updateMachine(machine)} />
                                                            <Confirm onClick={() => { handleMachine(machine) }} />

                                                        </li>

                                                    </ul>




                                                )

                                            })}

                                        </div>

                                    </div>
                                    <button onClick={() => { setMachines([]) }}>Voltar</button>

                                </div>

                            }

                            {editMachine.codigo != '' &&

                                <div className={Style.editMachine}>

                                    <h3>Editar Máquina</h3>
                                    <div className={Style.mainEditMachine}>

                                        <div className={Style.editMachineField}>

                                            <p>Código</p>
                                            <input className={Style.inputReadOnly} readOnly value={editMachine.codigo} />

                                        </div>
                                        <div className={Style.editMachineField}>

                                            <p>Descrição</p>
                                            <input className={Style.inputDescEditMachine}
                                                name='descricao'
                                                value={editMachine.descricao}
                                                onChange={(e) => { handleDataMachine(e) }} />

                                        </div>
                                        <div className={Style.inlineInputMachine}>

                                            <div className={Style.editMachineField}>

                                                <p>Comprimento</p>
                                                <input className={Style.inputsDefaults}
                                                    type='number'
                                                    name='comprimento'
                                                    value={editMachine.comprimento}
                                                    onChange={(e) => { handleDataMachine(e) }} />

                                            </div>
                                            <div className={Style.editMachineField}>

                                                <p>Largura</p>
                                                <input className={Style.inputsDefaults}
                                                    name='largura'
                                                    type='number'
                                                    value={editMachine.largura}
                                                    onChange={(e) => { handleDataMachine(e) }} />

                                            </div>

                                        </div>
                                        <div className={Style.inlineInputMachine}>

                                            <div className={Style.editMachineField}>

                                                <p>Espaça. da Lâmina</p>

                                                <div className={Style.inlineInputEspacL}>

                                                    <select name='type_espac'
                                                        onChange={(e) => { handleDataMachine(e) }}
                                                        value={editMachine.type_espac}>

                                                        <option value='Padrao'>Padrão</option>
                                                        <option value='Especial'>Especial</option>

                                                    </select>

                                                    {editMachine.type_espac == 'Padrao' ?

                                                        <input className={Style.inputReadOnly} readOnly />
                                                        :

                                                        <input className={Style.inputsDefaults}
                                                            name='espac_lamina'
                                                            type='number'
                                                            onChange={(e) => { handleDataMachine(e) }}
                                                            value={editMachine.espac_lamina} />

                                                    }


                                                </div>

                                            </div>

                                            <div className={Style.editMachineField}>

                                                <p>Máq. Aproveit.</p>
                                                <input type='checkbox'
                                                    className={Style.inputsDefaults}
                                                    checked={editMachine.aprov == 1}
                                                    onClick={handleChangeAprovMac} />

                                            </div>

                                        </div>

                                    </div>
                                    <div className={Style.btnsEditMachine}>

                                        <button onClick={(e) => { e.preventDefault(); saveUpdateMachine() }}>OK</button>
                                        <button onClick={(e) => { e.preventDefault(); cleanUpdateMachine() }}>Voltar</button>

                                    </div>



                                </div>

                            }

                        </div>

                    </div>

                </div>

                <div className={Style.buttonScrollView}>

                    <div className={`${Style.selected} ${view === 'DashBoard' ? Style.toStart : Style.toEnd}`}></div>

                    <h3 className={Style.buttonDashBoard} onClick={() => { setView('DashBoard') }}>

                        DashBoard

                    </h3>
                    <h3 className={Style.buttonParams} onClick={() => { setView('Parametros') }}>

                        Parâmetros

                    </h3>


                </div>

            </div>

            {monthlyVolumesVisible === true &&

                <div className={Style.monthlyVolumes}>

                    <div className={Style.Label}>

                        <p>Volume do Cliente</p>
                        <p>Cavidades Sugeridas</p>

                    </div>
                    <div className={Style.inputsVol}>

                        <input
                            type='number'
                            className={Style.inputDefualt}
                            name='volumes_Mes'
                            onChange={(e) => { handleChange(e) }}
                            onBlur={() => { calculateCav() }}
                            value={form.volumes_Mes ? form.volumes_Mes : 0} />

                        <input className={Style.readOnly} readOnly value={form.volumes_Mes ? suggestedCav : ''} />

                    </div>

                </div>

            }

            {alertSave &&

                <div className={Style.message}>

                    <p>{alertSave}</p>
                    <div>

                        <button onClick={(e) => { autoFillSave(e) }}> Sim </button>
                        <button onClick={(e) => { clearAutoFillSave(e) }}> Não </button>

                    </div>

                </div>
            }

            {activeFormSave &&

                <div className={Style.formSave}>

                    <h2>Salvar</h2>
                    <div className={Style.formSaveMain}>

                        <ul className={Style.formSaveSideM}>

                            <li>RCA</li>
                            <li>Versão</li>
                            <li>Cav. Comp.</li>
                            <li>Cav. Larg.</li>
                            <li>Blanks (MT)</li>
                            <li>Blanks (LG)</li>
                            <li>Sentido Bat.</li>
                            <li>Núm. Bat.</li>
                            <li>Peças Totais Retidas</li>

                        </ul>

                        <div className={Style.formSaveMainInputs}>

                            <input
                                className={Style.inputsDefaults}
                                name='codigo'
                                onChange={(e) => { handleChange(e) }}
                                value={form.codigo}
                            />
                            <input
                                className={Style.inputsDefaults}
                                name='versão_Item'
                                onChange={(e) => { handleChange(e) }}
                                value={form.versão_Item}
                            />
                            <input
                                className={Style.inputsDefaults}
                                name='cavidades_comp'
                                onChange={(e) => { handleChange(e) }}
                            />
                            <input
                                className={Style.inputsDefaults}
                                name='cavidades_larg'
                                onChange={(e) => { handleChange(e) }}
                            />
                            <input
                                className={Style.inputsDefaults}
                                name='N_Blanks_MT'
                                onChange={(e) => { handleChange(e) }}
                                value={form.N_Blanks_MT}
                            />
                            <input
                                className={Style.inputsDefaults}
                                name='N_Blanks_LG'
                                onChange={(e) => { handleChange(e) }}
                                value={form.N_Blanks_LG} />
                            <select
                                className={Style.selectDefault}
                                name='ordem_da_Batida'
                                onChange={(e) => { handleChange(e) }}
                            >

                                <option value=''></option>
                                <option value='Comprimento'>Comprim.</option>
                                <option value='Largura'>Largura</option>

                            </select>
                            <input
                                className={Style.inputsDefaults}
                                name='N_de_Batidas'
                                onChange={(e) => { handleChange(e) }}
                                value={form.N_de_Batidas}
                            />
                            <input
                                className={Style.inputsDefaults}
                                onChange={(e) => { handleChange(e) }}
                                name='pecas_por_material'
                                value={form.pecas_por_material}
                            />

                        </div>

                    </div>
                    <div className={Style.btnsFormSave}>

                        <button onClick={(e) => (saveUtilization(e))}>Salvar</button>
                        <button onClick={(e) => { e.preventDefault(); setActiveFormSave(false) }}>Voltar</button>

                    </div>

                </div>

            }

            {messageDataBase &&

                <div className={Style.message}>

                    <p>{messageDataBase}</p>

                    {messageDataBase === 'Aproveitamento Atualizado' || messageDataBase === 'Aproveitamento Salvo' ?

                        <button onClick={(e) => { e.preventDefault(); setMessageDataBase(''); navigate('/Historico_Aproveitamento/Get') }}> OK </button>

                        :

                        <button onClick={(e) => { e.preventDefault(); setMessageDataBase('') }}> OK </button>


                    }


                </div>
            }

        </div>

    )

}

export default Form;