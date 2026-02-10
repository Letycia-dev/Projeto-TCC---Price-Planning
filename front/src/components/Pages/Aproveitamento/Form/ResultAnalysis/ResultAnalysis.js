import { useEffect, useState } from 'react'
import Style from './ResultAnalysis.module.css'

function ResultAnalysis({ toolsDim, resultsParts, formSave, setResultsParts, pushDataMachine }) {

    const [messageDataBase, setMessageDataBase] = useState('')

    const [tools, setTools] = useState({

        length1: 0,
        width1: 0,
        length2: 0,
        width2: 0,
        length3: 0,
        width3: 0,
        length4: 0,
        width4: 0,

    })

    const [toolAnalysis, SetToolAnalysis] = useState({

        numCavLength: formSave.cavidades_comp || null,
        numCavWidth: formSave.cavidades_larg || null,
        dimenToolLength: null,
        dimenToolWidth: null,
        ToolMacLenLength: null,
        ToolMacLenWidth: null,
        ToolMacWidLength: null,
        ToolMacWidWidth: null,
        TotalCav: null

    })

    const handleToolsDim = (e) => {

        if (e.target.value > 0 || e.target.value.trim() === '') {

            setTools({ ...tools, [e.target.name]: e.target.value })

        }

        else {

            setMessageDataBase('Insira um valor maior que 0')

        }

    }

    const ChangeCalculation = (e) => {

        setResultsParts({ ...resultsParts, [e.target.name]: e.target.value })

    }

    const autoFillToolAnalysis = (e) => {


        if (e.target.value.trim() == '') {

            return;

        }

        if (e.target.value > 0) {

            SetToolAnalysis(prev => ({

                ...prev,

                [e.target.name]: e.target.value

            }))

        }

        else {

            setMessageDataBase('Insira um valor válido (Maior que 0)')

        }

    }

    useEffect(() => {

        toolsDim(tools)

    }, [tools])

    //Calcular peças por BO/PL
    useEffect(() => {

        const { cavities, blanks_MT, blanks_LG, beats } = resultsParts;

        if (cavities > 0 && blanks_MT > 0 && blanks_LG > 0 && beats > 0) {

            const result = cavities * blanks_MT * blanks_LG * beats;

            setResultsParts(prev => ({

                ...prev,

                partsResult: result

            }));

        } else {

            setResultsParts(prev => ({

                ...prev,

                partsResult: null

            }));

        }

    }, [resultsParts.cavities, resultsParts.blanks_MT, resultsParts.blanks_LG, resultsParts.beats]);

    useEffect(() => {

        if (formSave.tipo_de_cavidade == "Separada") {

            if (toolAnalysis.numCavLength !== 0) {

                const dimToolLength = toolAnalysis.numCavLength * (parseFloat(formSave.comprimento) + parseFloat(formSave.espaçamento_entre_cavidades))

                SetToolAnalysis(prev => ({

                    ...prev,

                    dimenToolLength: dimToolLength

                }))


            }

            if (toolAnalysis.numCavWidth !== 0) {

                const dimToolWidth = toolAnalysis.numCavWidth * (parseFloat(formSave.largura) + parseFloat(formSave.espaçamento_entre_cavidades))

                SetToolAnalysis(prev => ({

                    ...prev,

                    dimenToolWidth: dimToolWidth

                }))

            }

        }

        else {

            if (toolAnalysis.numCavLength !== 0) {

                const dimToolLength = toolAnalysis.numCavLength * formSave.comprimento

                SetToolAnalysis(prev => ({

                    ...prev,

                    dimenToolLength: dimToolLength

                }))

            }

            if (toolAnalysis.numCavWidth !== 0) {

                const dimToolWidth = toolAnalysis.numCavWidth * formSave.largura

                SetToolAnalysis(prev => ({

                    ...prev,

                    dimenToolWidth: dimToolWidth

                }))


            }


        }

        if (toolAnalysis.numCavLength && toolAnalysis.numCavWidth) {

            const totalCav = toolAnalysis.numCavLength * toolAnalysis.numCavWidth;

            SetToolAnalysis(prev => ({

                ...prev,

                TotalCav: totalCav

            }))

            if (totalCav > 40) {

                setMessageDataBase('Número de Cavidades é superior a 40')
            }
        }

        else {

            SetToolAnalysis(prev => ({

                ...prev,

                TotalCav: null

            }))
        }

    }, [toolAnalysis.numCavLength, toolAnalysis.numCavWidth, formSave])

    useEffect(() => {

        if (toolAnalysis.dimenToolLength) {

            if (toolAnalysis.dimenToolLength <= pushDataMachine.length) {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacLenLength: "OK"

                }))
            }

            else {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacLenLength: "Inválido"

                }))
            }

            if (toolAnalysis.dimenToolLength <= pushDataMachine.width) {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacLenWidth: "OK"

                }))
            }

            else {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacLenWidth: "Inválida"

                }))
            }

        }

        if (toolAnalysis.dimenToolWidth) {

            if (toolAnalysis.dimenToolWidth <= pushDataMachine.length) {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacWidLength: "OK"

                }))
            }

            else {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacWidLength: "Inválido"

                }))
            }

            if (toolAnalysis.dimenToolWidth <= pushDataMachine.width) {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacWidWidth: "OK"

                }))
            }

            else {

                SetToolAnalysis(prev => ({

                    ...prev,

                    ToolMacWidWidth: "Inválido"

                }))
            }


        }

    }, [toolAnalysis.dimenToolLength, toolAnalysis.dimenToolWidth, pushDataMachine])

    return (

        <div className={Style.Body}>

            <div className={Style.divParms}>

                <div className={Style.AnalysisL}>

                    <h1>Análise de Layout</h1>
                    <ul>

                        <li className={Style.LabelsizeDefault}>Comprimento</li>
                        <li className={Style.LabelsizeDefault}>Largura</li>
                        <li className={Style.LabelsizeDefault}>Peças Tiradas</li>

                    </ul>
                    <div className={Style.inputsAnalysisL}>

                        <div className={Style.inputs}>

                            <div>

                                <h4>1</h4>
                                <input
                                    className={Style.inputsDefaults}
                                    name='length1'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input
                                    className={Style.inputsDefaults}
                                    name='width1'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input className={Style.inputsDefaults} />

                            </div>




                        </div>
                        <div className={Style.inputs}>

                            <div>

                                <h4>2</h4>
                                <input
                                    className={Style.inputsDefaults}
                                    name='length2'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input
                                    className={Style.inputsDefaults}
                                    name='width2'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input
                                    className={Style.inputsDefaults} />

                            </div>




                        </div>
                        <div className={Style.inputs}>

                            <div>

                                <h4>3</h4>
                                <input
                                    className={Style.inputsDefaults}
                                    name='length3'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input
                                    className={Style.inputsDefaults}
                                    name='width3'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input className={Style.inputsDefaults} />

                            </div>




                        </div>
                        <div className={Style.inputs}>

                            <div>

                                <h4>4</h4>
                                <input
                                    className={Style.inputsDefaults}
                                    name='length4'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input
                                    className={Style.inputsDefaults}
                                    name='width4'
                                    onChange={(e) => { handleToolsDim(e) }} />

                            </div>
                            <div>

                                <input className={Style.inputsDefaults} />

                            </div>




                        </div>

                    </div>

                </div>
                <div className={Style.PartsBy}>

                    <h1>Cálculo de Peças Por BO/PL</h1>
                    <div className={Style.mainPartBy}>

                        <ul>

                            <li className={Style.LabelsizeDefault}>Cavidades</li>
                            <li className={Style.LabelsizeDefault}>N° de Blanks (MT)</li>
                            <li className={Style.LabelsizeDefault}>N° de Blanks (LG)</li>
                            <li className={Style.LabelsizeDefault}>N° de Batidas</li>
                            <li className={Style.LabelsizeDefault}>Peças Totais</li>

                        </ul>
                        <div className={Style.inputsPartsBy}>

                            <input
                                className={Style.inputsDefaults}
                                type='number'
                                min={1}
                                name='cavities'
                                onChange={(e) => ChangeCalculation(e)}
                                value={resultsParts.cavities ? resultsParts.cavities : null}
                            />
                            <input
                                className={Style.inputsDefaults}
                                type='number'
                                min={1}
                                name='blanks_MT'
                                onChange={(e) => ChangeCalculation(e)}
                                value={resultsParts.blanks_MT ? resultsParts.blanks_MT : null}
                            />
                            <input
                                className={Style.inputsDefaults}
                                type='number'
                                min={1}
                                name='blanks_LG'
                                onChange={(e) => ChangeCalculation(e)}
                                value={resultsParts.blanks_LG ? resultsParts.blanks_LG : null}
                            />
                            <input
                                className={Style.inputsDefaults}
                                type='number'
                                min={1}
                                name='beats'
                                onChange={(e) => ChangeCalculation(e)}
                                value={resultsParts.beats ? resultsParts.beats : null}
                            />
                            <input
                                className={Style.inputReadOnly}
                                type='number'
                                min={1}
                                readOnly
                                value={resultsParts.partsResult} />

                        </div>

                    </div>

                </div>
                <div className={Style.AnalysisT}>

                    <h1>Análise de Ferramenta</h1>
                    <div className={Style.mainAnalysisT}>

                        <div className={Style.lateralLabelAnalisisT}>

                            <p>Medidas</p>
                            <ul>

                                <li className={Style.LabelsizeDefault}>Num. Cav.</li>
                                <li className={Style.LabelsizeDefault}>Dimen. Ferram.</li>
                                <li className={Style.LabelsizeDefault}>Ferram. no Comp.</li>
                                <li className={Style.LabelsizeDefault}>Ferram. na Larg.</li>
                                <li className={Style.LabelsizeDefault}>Cavidades Totais</li>

                            </ul>

                        </div>
                        <div className={Style.labelDefaultAnalisisT}>

                            <ul>

                                <li>Comprimento</li>
                                <li>Largura</li>

                            </ul>
                            <div className={Style.inputsAnalysisT}>

                                <div>

                                    <input
                                        className={Style.inputsDefaults}
                                        name='numCavLength'
                                        onChange={(e) => { autoFillToolAnalysis(e) }}
                                        value={toolAnalysis.numCavLength}
                                    />
                                    <input
                                        className={Style.inputsDefaults}
                                        name='numCavWidth'
                                        onChange={(e) => { autoFillToolAnalysis(e) }}
                                        value={toolAnalysis.numCavWidth}
                                    />

                                </div>
                                <div>

                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.dimenToolLength || ''} />
                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.dimenToolWidth || ''} />

                                </div>
                                <div>

                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.ToolMacLenLength} />
                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.ToolMacWidLength} />

                                </div>
                                <div>

                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.ToolMacLenWidth} />
                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.ToolMacWidWidth} />

                                </div>
                                <div>

                                    <input className={Style.inputReadOnly} readOnly value={toolAnalysis.TotalCav} />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {messageDataBase &&

                <div className={Style.message}>

                    <p>{messageDataBase}</p>

                    <button onClick={(e) => { e.preventDefault(); setMessageDataBase('') }}> OK </button>

                </div>
            }


        </div>

    )
}

export default ResultAnalysis;
