import { useEffect, useMemo, useState } from 'react';
import Style from './AnalysisFiled.module.css';
import DefaultField from './AnalysisFiledDefault/AnalysisFieldDefault.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

function AnalysisField({ dimenTool, dimenMP, spaceTools, partThickeness }) {

    const [dimenTools, setDimenTools] = useState()

    const [selectedDim, setSeletedDim] = useState({

        length: null,
        width: null

    })

    const [results, setResult] = useState({

        cutSizeL: null,
        cutSizeW: null,
        countBlankMTL: null,
        countBlankMTW: null,
        beatBlankMTL: null,
        beatBlankMTW: null,
        beatBlankLGL: null,
        beatBlankLGW: null,
        cutToWidthL: null,
        cutToWidthW: null,

    })

    const [losses, setLosses] = useState({

        lossLengthMT: null,
        lossLengthLG: null,
        lossWidthBeatMT: null,
        lossWidthBeatLG: null,
        lossWidthMT: null,
        lossWidthLG: null,

    })

    const LossRawMaterial = useMemo(() => [

        {
            Tipo: 'Perda do Comprimento da MP',
            'Comp. Ferram.': losses.lossLengthMT,
            'Larg. Ferram.': losses.lossLengthLG
        },
        {
            Tipo: 'Perda no Corte da Largura da MP',
            'Comp. Ferram.': losses.lossWidthMT,
            'Larg. Ferram.': losses.lossWidthLG
        },
        {
            Tipo: 'Perda da Batida na Largura da MP',
            'Comp. Ferram.': losses.lossWidthBeatMT,
            'Larg. Ferram.': losses.lossWidthBeatLG
        }


    ], [losses])

    const handleChangePosition = (e) => {

        if (e.target.value !== '') {

            const lengthTool = dimenTools[`length${e.target.value}`];

            const widthTool = dimenTools[`width${e.target.value}`];

            if (lengthTool && widthTool) {

                setSeletedDim(prev => ({

                    ...prev,

                    length: lengthTool,
                    width: widthTool


                }))

            }

            else {

                setSeletedDim(prev => ({

                    ...prev,

                    length: null,
                    width: null


                }))

                setResult(prev => ({

                    ...prev,

                    countBlankMTL: null,
                    countBlankMTW: null,
                    beatBlankMTL: null,
                    beatBlankMTW: null,
                    beatBlankLGL: null,
                    beatBlankLGW: null,
                    cutToWidthL: null,
                    cutToWidthW: null,


                }))
            }

        }

        else {

            setSeletedDim(prev => ({

                ...prev,

                length: null,
                width: null

            }))

            setResult(prev => ({

                ...prev,

                beatBlankMTL: null,
                beatBlankMTW: null,
                beatBlankLGL: null,
                beatBlankLGW: null,
                cutToWidthL: null,
                cutToWidthW: null,

            }))

        }

    }

    const handleChange = (e) => {

        if (e.target.value > 0) {

            setResult(prev => ({

                ...prev,

                [e.target.name]: e.target.value

            }))

        }

        else {

            setResult(prev => ({

                ...prev,

                [e.target.name]: null

            }))
        }

    }

    // Definir o tamanho do Blank No Metro
    useEffect(() => {

        const countBlankMTL = () => {

            const result = parseInt(dimenMP.length / results.cutSizeL)

            setResult(prev => ({

                ...prev,

                countBlankMTL: result

            }))


        }

        const countBlankMTW = () => {

            const result = parseInt(dimenMP.length / results.cutSizeW)

            setResult(prev => ({

                ...prev,

                countBlankMTW: result

            }))

        }

        if (results.cutSizeL !== null) {

            countBlankMTL();

        }

        else {

            setResult(prev => ({

                ...prev,

                countBlankMTL: null

            }))
        }

        if (results.cutSizeW !== null) {

            countBlankMTW();

        }

        else {

            setResult(prev => ({

                ...prev,

                countBlankMTW: null

            }))
        }


    }, [dimenMP, results.cutSizeL, results.cutSizeW])

    //Trazer os dimencionais das Ferramentas
    useEffect(() => {

        setDimenTools(dimenTool)

    }, [dimenTool])

    //Cálculos Automáticos
    useEffect(() => {

        let safetyMargin = 0;

        if (spaceTools) {

            safetyMargin = spaceTools
        }

        else {

            if (partThickeness <= 19) {

                safetyMargin = 10;
            }

            else if (partThickeness >= 20 && partThickeness <= 40) {

                safetyMargin = 20;
            }

            else {

                safetyMargin = 20;
            }

        }

        const beatBlankLength = () => {

            if (selectedDim.length !== null) {

                let resultMTL = 0;

                let lossMTL = 0;

                if ((parseFloat(selectedDim.length) + (safetyMargin * 2)) * 2 < results.countBlankMTL) {

                    resultMTL = parseInt(results.countBlankMTL / (parseFloat(selectedDim.length) + safetyMargin)); // (OK)

                    lossMTL = dimenMP.length - (((parseFloat(selectedDim.length) + safetyMargin) * resultMTL) * results.cutSizeL); //Perdas no Metro da Lamina 

                }

                else if ((parseFloat(selectedDim.length) + (safetyMargin * 2)) <= results.countBlankMTL) {

                    resultMTL = 1;

                    lossMTL = dimenMP.length - (results.cutSizeL * (parseFloat(selectedDim.length) + (safetyMargin * 2))); //Perdas no Metro da Lamina

                }

                else {

                    resultMTL = null;
                    lossMTL = null
                }

                setResult(prev => ({

                    ...prev,

                    beatBlankMTL: resultMTL,

                }))

                setLosses(prev => ({

                    ...prev,

                    lossLengthMT: lossMTL,

                }))
            }

            else {

                setResult(prev => ({

                    ...prev,

                    beatBlankMTL: null,

                }))

                setLosses(prev => ({

                    ...prev,

                    lossLengthMT: null,

                }))
            }

            if (selectedDim.width !== null) {

                let resultMTW = 0;

                let lossMTW = 0;

                if ((parseFloat(selectedDim.width) + (safetyMargin * 2)) * 2 < results.countBlankMTW) {

                    resultMTW = parseInt(results.countBlankMTW / (parseFloat(selectedDim.width) + safetyMargin)); // (OK)

                    lossMTW = dimenMP.length - (((parseFloat(selectedDim.width) + safetyMargin) * resultMTW) * results.cutSizeW); //Perdas no Metro da Lamina 

                }

                else if ((parseFloat(selectedDim.width) + (safetyMargin * 2)) <= results.countBlankMTW) {

                    resultMTW = 1;

                    lossMTW = dimenMP.length - (results.cutSizeW * (parseFloat(selectedDim.width) + (safetyMargin * 2))); //Perdas no Metro da Lamina

                }

                else {

                    resultMTW = null;
                    lossMTW = null
                }

                setResult(prev => ({

                    ...prev,

                    beatBlankMTW: resultMTW,

                }))

                setLosses(prev => ({

                    ...prev,

                    lossLengthLG: lossMTW,

                }))
            }

            else {

                setResult(prev => ({

                    ...prev,

                    beatBlankMTW: null,

                }))

                setLosses(prev => ({

                    ...prev,

                    lossLengthLG: null,

                }))
            }

        }

        const beatBlankWidth = () => {

            if (selectedDim.length !== null || selectedDim.width !== null) {

                const resultLGL = parseInt(dimenMP.width / (parseFloat(selectedDim.length) + safetyMargin)); // Numero de batidas (MT ferramenta) na Largura da MP

                const resultLGW = parseInt(dimenMP.width / (parseFloat(selectedDim.width) + safetyMargin)); // Numero de batidas (LG ferramenta) na Largura da MP

                const lossLGL = dimenMP.width - (resultLGL * (parseFloat(selectedDim.length) + safetyMargin)); //Perdas no Metro da Lamina

                const lossLGW = dimenMP.width - (resultLGW * (parseFloat(selectedDim.width) + safetyMargin)); //Perdas na Largura da Lamina

                setResult(prev => ({

                    ...prev,

                    beatBlankLGL: resultLGL,
                    beatBlankLGW: resultLGW

                }))

                setLosses(prev => ({


                    ...prev,

                    lossWidthBeatMT: lossLGL,
                    lossWidthBeatLG: lossLGW

                }))
            }

            else {

                setResult(prev => ({

                    ...prev,

                    beatBlankLGL: null,
                    beatBlankLGW: null

                }))

                setLosses(prev => ({

                    ...prev,

                    lossWidthBeatMT: null,
                    lossWidthBeatLG: null,


                }))
            }

        }

        const cutToWidth = () => {

            if (selectedDim.length !== null || selectedDim.width !== null) {

                const resultLGL = parseInt(dimenMP.width / (parseFloat(selectedDim.length) + (safetyMargin * 2))); // Numero de cortes (MT ferramenta) na Largura da MP

                const resultLGW = parseInt(dimenMP.width / (parseFloat(selectedDim.width) + (safetyMargin * 2))); // Numero de cortes (LG ferramenta) na Largura da MP

                const lossLGL = dimenMP.width - (resultLGL * (parseFloat(selectedDim.length) + (safetyMargin * 2))); //Perdas no Metro da Lamina

                const lossLGW = dimenMP.width - (resultLGW * (parseFloat(selectedDim.width) + (safetyMargin * 2))); //Perdas na Largura da Lamina

                setResult(prev => ({

                    ...prev,

                    cutToWidthL: resultLGL,
                    cutToWidthW: resultLGW

                }))

                setLosses(prev => ({


                    ...prev,

                    lossWidthMT: lossLGL,
                    lossWidthLG: lossLGW

                }))

            }

            else {

                setResult(prev => ({

                    ...prev,

                    cutToWidthL: null,
                    cutToWidthW: null

                }))

                setLosses(prev => ({


                    ...prev,

                    lossWidthMT: null,
                    lossWidthLG: null

                }))
            }

        }

        // Chamando os Calculos
        beatBlankLength()

        beatBlankWidth()

        cutToWidth()

    }, [results.countBlankMTL, results.countBlankMTW, spaceTools, partThickeness, selectedDim])

    //Teste de Validações via Console.Log
    // useEffect(() => {

    //     console.log(results)

    // }, [results])

    return (

        <div className={Style.body}>

            <div className={Style.alingFields}>

                <div className={Style.bodyField}>

                    <div className={Style.label}>

                        <h3>Ferramenta</h3>

                        <select onChange={(e) => { handleChangePosition(e) }}>

                            <option value={''}></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>

                        </select>

                    </div>
                    <div className={Style.main}>

                        <div>

                            <h3>Comp.</h3>
                            <h3>Largura</h3>


                        </div>
                        <div>

                            <input readOnly className={Style.readOnlyInput} value={selectedDim.length ? selectedDim.length : ''} />
                            <input readOnly className={Style.readOnlyInput} value={selectedDim.width ? selectedDim.width : ''} />

                        </div>


                    </div>

                </div>
                <div className={Style.bodyField}>

                    <div className={Style.label}>

                        <h3>Placas Consideradas (MT)</h3>

                    </div>
                    <div className={Style.main}>

                        <div>

                            <h3>Comp. Ferr.</h3>
                            <h3>Larg. Ferr.</h3>


                        </div>
                        <div>

                            <input
                                className={Style.defaultInput}
                                type='number'
                                min={1}
                                name='cutSizeL'
                                onChange={(e) => handleChange(e)}
                            />
                            <input
                                className={Style.defaultInput}
                                type='number'
                                min={1}
                                name='cutSizeW'
                                onChange={(e) => handleChange(e)}
                            />

                        </div>


                    </div>

                </div>
                <DefaultField
                    Title={'Dimen. Blank (MT)'}
                    resultLength={results.countBlankMTL ? results.countBlankMTL : ''}
                    resultWitdh={results.countBlankMTW ? results.countBlankMTW : ''}
                />
                <DefaultField
                    Title={'N° de Batidas (MT)'}
                    resultLength={results.beatBlankMTL ? results.beatBlankMTL : ''}
                    resultWitdh={results.beatBlankMTW ? results.beatBlankMTW : ''}
                />
                <DefaultField
                    Title={'Cortes do Blank (LG)'}
                    resultLength={results.cutToWidthL ? results.cutToWidthL : ''}
                    resultWitdh={results.cutToWidthW ? results.cutToWidthW : ''}
                />

            </div>
            <div className={Style.alingFields2}>

                <div>

                    <DefaultField
                        Title={'N° de Batidas (LG)'}
                        resultLength={results.beatBlankLGL ? results.beatBlankLGL : ''}
                        resultWitdh={results.beatBlankLGW ? results.beatBlankLGW : ''}
                    />

                </div>
                <div className={Style.containerDashBoard}>

                    <h2>Análise de Perda (MM)</h2>

                    <ResponsiveContainer width="100%" height='100%'>

                        <BarChart data={LossRawMaterial} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Tipo" tick={{ fill: "white", fontSize: '1.2vh' }} />
                            <YAxis tick={{ fill: "white", fontSize: '1.2vh' }} />
                            <Tooltip />
                            <Legend
                                wrapperStyle={{
                                    marginTop: 40,
                                    height: '2vh',
                                    padding: '1vh',
                                    color: 'white',
                                }}
                            />
                            <Bar dataKey="Comp. Ferram." name="Comp. Ferram." fill="rgb(0, 50, 120)" />
                            <Bar dataKey="Larg. Ferram." name="Larg. Ferram." fill="rgb(0, 86, 206)" />

                        </BarChart>

                    </ResponsiveContainer>


                </div>

            </div>

        </div>

    )

}

export default AnalysisField;