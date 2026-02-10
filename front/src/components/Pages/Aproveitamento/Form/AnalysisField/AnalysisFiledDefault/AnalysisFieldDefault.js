import Style from './AnalysisFieldDefault.module.css'

function AnalysisFieldDefault({Title, resultLength, resultWitdh }) {

    return (

        <div className={Style.bodyField}>

            <div className={Style.label}>

                <h3>{Title}</h3>

            </div>
            <div className={Style.main}>

                <div>

                    <h3>Comp. Ferr.</h3>
                    <h3>Larg. Ferr.</h3>


                </div>
                <div>

                    <input readOnly value={resultLength}/>
                    <input readOnly value={resultWitdh}/>

                </div>


            </div>


        </div>
    )

}

export default AnalysisFieldDefault;