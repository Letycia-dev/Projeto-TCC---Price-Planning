import { useEffect, useState } from "react";
import api from "../../../../axiosConfig";
import Style from "./Get_CM.module.css";
import { IoSearchSharp as Lupa } from "react-icons/io5";
import { MdAddBox as Add } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SiderBar from "../../../Layout/Menu Latertal/MenuLateral";
import StyleGeneral from "../cssgeral.module.css";
import { HiPencil as Pencil } from "react-icons/hi2";
import { TfiReload as Reload } from "react-icons/tfi";

const Get = () => {

  const [dados, setDados] = useState([]);

  const [tipoPesquisa, setTipoPesquisa] = useState("");

  const [pesquisa, setPesquisa] = useState("");

  const navigate = useNavigate();

  const mudançaPesquisa = (e) => {

    setTipoPesquisa(e.target.value);

  };

  const ordenarDados = (dados, tipo) => {

    if (tipo === "codigo") {

      return [...dados].sort((a, b) => a.codigo - b.codigo);

    }

    else if (tipo === "descricao" || tipo === "fornecedor") {

      return [...dados].sort((a, b) => a[tipo].localeCompare(b[tipo]));

    }

    return dados;

  };

  const handleSearch = async () => {

    let url = "http://localhost:3333/Custo_maquina/Get";

    try {

      const response = await api.get(url);

      let resultado = response.data;

      if (tipoPesquisa && pesquisa) {

        resultado = resultado.filter((item) => item[tipoPesquisa]?.toString().toLowerCase().includes(pesquisa.toLowerCase()));

      }

      else if (tipoPesquisa) {

        resultado = ordenarDados(resultado, tipoPesquisa);

      }

      setDados(resultado);

    }

    catch (error) {

      console.error("Erro ao buscar dados:", error);

      setDados([]);

    }

  };

  const navigateToPut = (maquinaData) => {

    navigate("/Custo_maquina/Put", { state: { maquina: maquinaData } });

  };

  const navigateToPost = () => {

    navigate("/Custo_Maquina/Post");

  };

  const navigateToHMF = () => {

    navigate("/Custo_Maquina/Mudanca_Fator/Get");

  };

  useEffect(() => {

    handleSearch();

  }, []);

  return (

    <div className={StyleGeneral.body}>

      <SiderBar />

      <div className={StyleGeneral.conteiner}>

        <div className={Style.Body}>

          <div className={Style.header}>

            <h2>Máquinas</h2>
            <div className={Style.campo_add}>

              <div className={Style.pesquisar}>


                <label htmlFor="pesquisa">Pesquisa</label>
                <div className={Style.inputPesquisa}>

                  <input
                    id="pesquisa"
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Digite aqui..."
                  />
                  <div className={Style.icone_pesquisa} onClick={handleSearch}>

                    <Lupa />

                  </div>


                <label htmlFor="pesquisa">Tipo</label>
                <select className={Style.combo_box} value={tipoPesquisa} onChange={mudançaPesquisa}>

                  <option value={'Codigo_Maquina'}>Código</option>
                  <option value={'descricao'}>Descrição</option>

                </select>
                

                </div>

              </div>
              <div className={Style.adicionar} onClick={() => { navigateToHMF()}} >

                <h4>Atualizar MOD </h4>
                <Reload className={Style.icone}/>

              </div>
              <div className={Style.adicionar} onClick={navigateToPost}>

                <h4>Adicionar</h4>
                <Add className={Style.icone} />

              </div>

            </div>

          </div>
          
          <div className={Style.read}>
            

            <div className={Style.BackGroundRead}>

              <ul className={Style.label}>

                <li className={Style.defaultLi}>Código</li>
                <li className={Style.defaultLi}>Descrição</li>
                <li className={Style.defaultLi}>Comprimento</li>
                <li className={Style.defaultLi}>Largura</li>
                <li className={Style.defaultLi}>Unidade</li>
                <li className={Style.defaultLi}>Peças Hora</li>
                <li className={Style.defaultLi}>Amortização</li>
                <li className={Style.defaultLi}>Custo máquina</li>
                <li className={Style.defaultLi}>Manutenção</li>
                <li className={Style.defaultLi}>Energia/Gás</li>
                <li className={Style.defaultLi}>Insumo</li>
                <li className={Style.defaultLi}>Total da máquina</li>
                <li className={Style.defaultLi}>Qtda. Operadores</li>
                <li className={Style.defaultLi}>Mod. encargos</li>
                <li className={Style.defaultLi}>Total Mod.</li>
                <li className={Style.defaultLi}>Efic. do Oper.(%)</li>
                <li className={Style.defaultLi}>Efic. da Máq.(%)</li>
                <li className={Style.defaultLi}>Efic. do Proc.(%)</li>
                <li className={Style.defaultLi}>Taxa Hora</li>
                <li className={Style.defaultLi}>Habilitado</li>
                <li className={Style.spaceLi}></li>

              </ul>

              {dados.length > 0 ?

                dados.map((maq) => {

                  return (

                    <ul className={Style.macRegister}>

                      <li className={Style.defaultLiRegisterCodigo}>{maq.Codigo_Maquina}</li>
                      <li className={Style.defaultLiRegisterDescricao}>{maq.descricao}</li>
                      <li className={Style.defaultLiRegister}>{maq.comprimento}</li>
                      <li className={Style.defaultLiRegisterLargura}>{maq.largura}</li>
                      <li className={Style.defaultLiRegister}>{maq.unidade}</li>
                      <li className={Style.defaultLiRegisterPecas}>{maq.pecas_hora}</li>
                      <li className={Style.defaultLiRegister}>{maq.amortizacao}</li>
                      <li className={Style.defaultLiRegisterCustM}>{maq.cust_maquina}</li>
                      <li className={Style.defaultLiRegisterManutencao}>{maq.manutencao}</li>
                      <li className={Style.defaultLiRegisterenerg}>{maq.energia_gas}</li>
                      <li className={Style.defaultLiRegisterInsumo}>{maq.insumo}</li>
                      <li className={Style.defaultLiRegisterTotalM}>{maq.total_maq}</li>
                      <li className={Style.defaultLiRegisterQtdaO}>{maq.qtd_operadores}</li>
                      <li className={Style.defaultLiRegisterModEng}>{maq.mod_encargos}</li>
                      <li className={Style.defaultLiRegisterTotalMod}>{maq.total_mod}</li>
                      <li className={Style.defaultLiRegisterEficiM}>{maq.eficiencia_maq}</li>
                      <li className={Style.defaultLiRegisterEficiOp}>{maq.eficiencia_ope}</li>
                      <li className={Style.defaultLiRegisterEficiPro}>{maq.eficiencia_pro}</li>
                      <li className={Style.defaultLiRegisterTaxaH}>{maq.taxa_hora}</li>
                      <li className={Style.defaultLiRegisterHabilitado}>{maq.habilitado}</li>
                      <li className={Style.iconsMaq}>

                        <Pencil className={Style.iconeLapis}onClick={() => { navigateToPut(maq) }} />

                      </li>

                    </ul>

                  )
                })

                :

                <div className={Style.macRegister}>

                  <p>Não há Máquinas Cadastradas</p>

                </div>

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Get;