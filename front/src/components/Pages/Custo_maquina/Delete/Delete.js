import React, { useState } from 'react';
import axios from 'axios';
// import './Delete.css'

const Delete = () => {

    const [erro, setErro] = useState('')
    const [cod_maquina, setCodMaquina] = useState('');
    const [descricao, setDescricao] = useState('');
    const [comprimento, setComprimento] = useState('');
    const [largura, setLargura] = useState('');
    const [pecas_hora, setPecasHora] = useState('');
    const [ano_base, setAnoBase] = useState('');
    const [custo_reposicao, setCustoReposicao] = useState('');
    const [amortizacao, setAmortizacao] = useState('');
    const [cust_maquina, setCustMaquina] = useState('');
    const [cust_maquina_anterior, setCustMaquinaAnterior] = useState('');
    const [manutencao, setManutencao] = useState('');
    const [energia_gas, setEnergiaGas] = useState('');
    const [insumo, setInsumo] = useState('');
    const [total_maq, setTotalMaq] = useState('');
    const [total_maq_anterior, setTotalMaqAnterior] = useState('');
    const [qtd_operadores, setQtdOperadores] = useState('');
    const [mod_encargos, setModEncargos] = useState('');
    const [total_mod, setTotalMod] = useState('');
    const [total_mod_anterior, setTotalModAnterior] = useState('');
    const [eficiencia_maq, setEficienciaMaq] = useState('');
    const [eficiencia_ope, setEficiencia_Ope] = useState('');
    const [eficiencia_pro, setEficiencia_pro] = useState('');
    const [taxa_pro, setTaxaPro] = useState('');

    const handleDelete = async (event) => {

        event.preventDefault();
    
          const response = await axios.delete(`http://localhost:3333/${cod_maquina}`);
    
          if (response.status !== 200) {
    
            setErro(response.data.message);
          }
    
      };

    const erroAceito = () => {

        setErro('')
    }

    return (
        <div className='Custo-Maquina'>
            <h1>Custo Maquina</h1>
            <form onSubmit={handleDelete}>
                <div className='principal'>
                    <div className='Cod_Maquina'>
                        <label>Codigo Maquina:</label>
                        <input type="number" value={cod_maquina} onChange={(e) => setCodMaquina(e.target.value)} />
                    </div>
                </div>
                <div className='dados1'>
                    <div className='dimencionais'>
                        <h2>Dimencionais</h2>
                        <div className='comprimento'>
                            <label>Descricao:</label>
                            <input type="number" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className='largura'>
                            <label>Comprimento:</label>
                            <input
                                type="number"
                                value={comprimento}
                                onChange={(e) => setComprimento(e.target.value)}
                            />
                        </div>
                        <div className='Largura'>
                            <label>Largura:</label>
                            <input
                                type="number"
                                value={largura}
                                onChange={(e) => setLargura(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='dados_adicionais'>
                        <h2>Peças hora</h2>
                        <div className='Pecas horas'>
                            <label>Peças hora:</label>
                            <input type="number" value={pecas_hora} onChange={(e) => setPecasHora(e.target.value)} />
                        </div>
                        <div className='ano_base'>
                            <label>Ano Base:</label>
                            <input type="date" value={ano_base} onChange={(e) => setAnoBase(e.target.value)} />
                        </div>
                        <div className='custo_reposicao'>
                            <label>Custo de Reposição:</label>
                            <input type="text" value={custo_reposicao} onChange={(e) => setCustoReposicao(e.target.value)} />
                        </div>
                        <div className='amortizacao'>
                            <label>Amortizacao:</label>
                            <input type="text" value={amortizacao} onChange={(e) => setAmortizacao(e.target.value.toUpperCase())} maxLength={2} />
                            <div className='cust_maquina'>
                                <label>Custo de maquina:</label>
                                <input type="text" value={cust_maquina} onChange={(e) => setCustMaquina(e.target.value.toUpperCase())} maxLength={2} />
                            </div>
                            <div className='cust_maquina_anterior'>
                                <label>Custo de maquina anterior:</label>
                                <input type="text" value={cust_maquina_anterior} onChange={(e) => setCustMaquinaAnterior(e.target.value.toUpperCase())} maxLength={2} />
                            </div>
                            <div className='manutencao'>
                                <label>Manutenção:</label>
                                <input type="text" value={manutencao} onChange={(e) => setManutencao(e.target.value)} maxLength={2} />
                            </div>
                            <div className='energia_gas'>
                                <label>Enegia Gas:</label>
                                <input type="text" value={energia_gas} onChange={(e) => setEnergiaGas(e.target.value)} />
                            </div>
                            <div className='insumo'>
                                <label>insumo:</label>
                                <input type="text" value={insumo} onChange={(e) => setInsumo(e.target.value)} />
                            </div>
                            <div className='total_maq'>
                                <label>Total Maquina:</label>
                                <input type="text" value={total_maq} onChange={(e) => setTotalMaq(e.target.value)} />
                            </div>
                            <div className='total_maq_anterior'>
                                <label>Total Maquina Anterior:</label>
                                <input type="text" value={total_maq_anterior} onChange={(e) => setTotalMaqAnterior(e.target.value)} />
                            </div>
                            <div className='qtd_operadores'>
                                <label>Quantidade de operadores:</label>
                                <input type="number" value={qtd_operadores} onChange={(e) => setQtdOperadores(e.target.value)} />
                            </div>
                            <div className='mod_encargos'>
                                <label>Mod encargos:</label>
                                <input type="number" value={mod_encargos} onChange={(e) => setModEncargos(e.target.value)} />
                            </div>
                            <div className='total_mod'>
                                <label>Total mod:</label>
                                <input type="number" value={total_mod} onChange={(e) => setTotalMod(e.target.value)} />
                            </div>
                            <div className='total_mod_anterior'>
                                <label>Total mod:</label>
                                <input type="number" value={total_mod_anterior} onChange={(e) => setTotalModAnterior(e.target.value)} />
                            </div>
                            <div className='eficiencia_maq'>
                                <label>Eficiencia maquina:</label>
                                <input type="number" value={eficiencia_maq} onChange={(e) => setEficienciaMaq(e.target.value)} />
                            </div>
                            <div className='eficiencia_ope'>
                                <label>Eficiencia Ope:</label>
                                <input type="number" value={eficiencia_ope} onChange={(e) => setEficiencia_Ope(e.target.value)} />
                            </div>
                            <div className='eficiencia_pro'>
                                <label>Eficiencia Pro:</label>
                                <input type="number" value={eficiencia_pro} onChange={(e) => setEficiencia_pro(e.target.value)} />
                            </div>
                            <div className='taxa_pro'>
                                <label>Taxa Pro:</label>
                                <input type="number" value={taxa_pro} onChange={(e) => setTaxaPro(e.target.value)} />
                            </div>

                        </div>
                    </div>
                </div>
                <button type="submit">Apagar</button>
            </form>

            {erro &&

                <div className='Mensagem_BD'>
                    <h3>Mensagem do Banco: </h3>
                    <p>{erro}</p>
                    <button onClick={erroAceito}>OK</button>

                </div>

            }

        </div>
    );

}