import React, { useEffect, useState, useRef } from "react";
import api from "../../../../axiosConfig";
import Style from "./Atualiza_Mod.module.css";
import { IoSearchSharp as Lupa } from "react-icons/io5";
import { MdAddBox as Add } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SiderBar from "../../../Layout/Menu Latertal/MenuLateral";
import StyleGeneral from "../cssgeral.module.css";
import { HiPencil as Pencil } from "react-icons/hi2";
import * as XLSX from "xlsx";
import { TfiReload as Reload } from "react-icons/tfi";

const Get = () => {

  const [dados, setDados] = useState([]);

  const [tipoPesquisa, setTipoPesquisa] = useState("");

  const [pesquisa, setPesquisa] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const opcoesPesquisa = [
    { value: "Codigo_Maquina", label: "Código" },
    { value: "descricao", label: "Descrição" },

  ];

  const mudançaPesquisa = (e) => {
    setTipoPesquisa(e.target.value);
  };

  const ordenarDados = (dados, tipo) => {
    if (tipo === "codigo") {
      return [...dados].sort((a, b) => a.codigo - b.codigo);
    } else if (tipo === "descricao" || tipo === "fornecedor") {
      return [...dados].sort((a, b) => a[tipo].localeCompare(b[tipo]));
    }
    return dados;
  };

  const handleSearch = async () => {

    let url = "http://localhost:3333/Custo_maquina/AtualizaMod";

    try {

      const response = await api.get(url);

      let resultado = response.data;

      if (tipoPesquisa && pesquisa) {

        resultado = resultado.filter((item) =>

          item[tipoPesquisa]?.toString().toLowerCase().includes(pesquisa.toLowerCase())

        );

      } else if (tipoPesquisa) {

        resultado = ordenarDados(resultado, tipoPesquisa);

      }

      setDados(resultado);

      setErro(null);

    } catch (error) {

      console.error("Erro ao buscar dados:", error);

      setErro("Erro ao buscar dados");

      setDados([]);

    }
  };

  const navigateToPut = (userData) => {

    navigate("/Custo_maquina/Put", { state: { user: userData } });

  };

  const navigateToPost = () => {

    navigate("/Custo_maquina/Post");

  };

  useEffect(() => {

    handleSearch();

  }, [dados]);

  return (
    <div className={StyleGeneral.body}>

      <SiderBar />

      <div className={StyleGeneral.conteiner}>

        <div className={Style.Body_GetMP}>
          <div className={Style.header}>
            <h2>Ajuste de fator</h2>
            <div className={Style.campo_add}>
              <div className={Style.pesquisar}>
                <label htmlFor="pesquisa">Campo</label>
                <select className={Style.combo_box} value={tipoPesquisa} onChange={mudançaPesquisa}>
                  {opcoesPesquisa.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                  ))}
                </select>
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
                </div>
              </div>
              <div className={Style.adicionar}>
                <Link to={'/Custo_maquina/AtualizaMod'}>
                <h4>Atualizar MOD </h4>
                <Reload className={Style.icone} />
                </Link>
                <input type="file" style={{ display: 'none' }} />
              </div>
              <div className={Style.adicionar} onClick={navigateToPost}>
                <h4>Adicionar</h4>
                <Add className={Style.icone} />
              </div>
            </div>
          </div>
          <div className={Style.read}>
            <div className={Style.BackGroundRead}>
              <div className={Style.rotulo}>
                <p className={Style.DefaultP}>Código</p>
                <p className={Style.DefaultP}>Descrição</p>
                <p className={Style.DefaultP}>Comprimento</p>
                <p className={Style.DefaultP}>Largura</p>
                <p className={Style.DefaultP}>Unidade</p>
                <p className={Style.DefaultP}>Peças Hora</p>
                <p className={Style.DefaultP}>Amortização</p>
                <p className={Style.DefaultP}>Custo máquina</p>
                <p className={Style.DefaultP}>Custo anterior</p>
                <p className={Style.DefaultP}>Manutenção</p>
                <p className={Style.DefaultP}>Energia/Gás</p>
                <p className={Style.DefaultP}>Insumo</p>
                <p className={Style.DefaultP}>Qtda. Operadores</p>
                <p className={Style.DefaultP}>Total da máquina</p>
                <p className={Style.DefaultP}>Mod. engargos</p>
                <p className={Style.DefaultP}>Total Mod.</p>
                <p className={Style.DefaultP}>Ano base</p>
                <p className={Style.DefaultP}>Eficiência do Operador(%)</p>
                <p className={Style.DefaultP}>Eficiência da máquina(%)</p>
                <p className={Style.DefaultP}>Eficiência do processo(%)</p>
                <p className={Style.DefaultP}>habilitado(%)</p>
              </div>
              {dados.length > 0 ? (

                <>
                  {dados.map((givenMaq) => {

                    return (

                      <div className={Style.conteudo} key={givenMaq.Codigo_Maquina}>

                        <p>{givenMaq.Codigo_Maquina}</p>
                        <p>{givenMaq.descricao}</p>
                        <p>{givenMaq.comprimento}</p>
                        <p>{givenMaq.largura}</p>
                        <p>{givenMaq.pecas_hora}</p>
                        <p>{givenMaq.custo_reposicao}</p>
                        <p>{givenMaq.amortizacao}</p>
                        <p>{givenMaq.cust_maquina}</p>
                        <p>{givenMaq.cust_maquina_anterior}</p>
                        <p>{givenMaq.manutencao}</p>
                        <p>{givenMaq.energia_gas}</p>
                        <p>{givenMaq.insumo}</p>
                        <p>{givenMaq.total_maq}</p>
                        <p>{givenMaq.qtd_operadores}</p>
                        <p>{givenMaq.mod_encargos}</p>
                        <p>{givenMaq.total_mod}</p>
                        <p>{givenMaq.eficiencia_maq}</p>
                        <p>{givenMaq.eficiencia_ope}</p>
                        <p>{givenMaq.eficiencia_pro}</p>
                        <p>{givenMaq.taxa_hora}</p>
                        <p>{givenMaq.habilitado}</p>
                        
                        <Pencil

                          onClick={() => navigateToPut({

                          })}
                        />

                      </div>

                    )

                  })}

                </>

              ) : (

                <div className={Style.leitura_erro}>

                  <p>Sem máquinas cadastrados</p>

                </div>

              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Get;
