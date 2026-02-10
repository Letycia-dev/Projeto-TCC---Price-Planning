import { useState, useEffect } from 'react';
import api from '../../../../axiosConfig';
import StyleGeneral from '../MFGeral.module.css';
import Style from '../Get/Get.module.css';
import { IoSearchSharp as Lupa } from "react-icons/io5";
import { MdAddBox as Add } from "react-icons/md";
import { HiPencil as Pencil } from "react-icons/hi2";
import SiderBar from "../../../Layout/Menu Latertal/MenuLateral";
import { useNavigate } from "react-router-dom";
import { FaGears as Gear } from "react-icons/fa6";
import { format } from 'date-fns';
import { FaTrash as Trash } from "react-icons/fa";


const Get = () => {

  const [dados, setDados] = useState([]);
  const [tipoPesquisa, setTipoPesquisa] = useState('Data_de_Atualizacao');
  const [pesquisa, setPesquisa] = useState('');
  const navigate = useNavigate();

  const mudancaPesquisa = (e) => {
    setTipoPesquisa(e.target.value);
    setPesquisa('')
  };

  const ordenarDados = (dados, tipo) => {
    if (tipo === 'Data_de_Atualizacao') {
      return [...dados].sort((a, b) => new Date(b[tipo]) - new Date(a[tipo]));
    }
    else if (tipo === 'Altercao_User') {
      return [...dados].sort((a, b) => a[tipo] - b[tipo]);
    }
    return dados;
  };

  const handleSearch = async () => {
    let url = '/Mudanca_Fator/Get';

    try {
      const response = await api.get(url);
      let resultado = response.data;

      if (tipoPesquisa && pesquisa) {
        resultado = resultado.filter((item) => item[tipoPesquisa].toString().toLowerCase().includes(pesquisa.toLowerCase()));
      }
      else if (tipoPesquisa) {
        resultado = ordenarDados(resultado, tipoPesquisa);
      }
      for (const mud_fator of resultado) {
        const dataFormatada = format(new Date(mud_fator.Data_de_Atualizacao), 'dd/MM/yyyy');
        mud_fator.Data_de_Atualizacao = dataFormatada
      }
      setDados(resultado);
    }
    catch (error) {
      setDados([]);
    }
  };

  const navigateToPost = () => {
    navigate("/Custo_Maquina/Mudanca_Fator/Post");
  };

  const navigateToPut = (data) => {
    navigate("/Custo_Maquina/Mudanca_Fator/Put", { state: { MF: data } });
  };

  const navigateToDelete = (data) => {
    navigate("/Custo_Maquina/Mudanca_Fator/Delete", { state: { MF: data } });
  };

  const navigateToMaquina = () => {
    navigate("/Custo_maquina/Get");
  };

  useEffect(() => {
    handleSearch();
  }, [dados, tipoPesquisa, pesquisa]);

  return (

    <div className={StyleGeneral.body}>

      <SiderBar />

      <div className={StyleGeneral.conteiner}>

        <div className={Style.Body_GetMP}>

          <div className={Style.header}>

            <h2>Ajuste de Fator</h2>

            <div className={Style.campo_add}>

              <div className={Style.pesquisar}>

                <label htmlFor="pesquisa">Campo</label>
                <select
                  className={Style.combo_box}
                  value={tipoPesquisa}
                  onChange={mudancaPesquisa}
                >

                  <option value={"Data_de_Atualizacao"}>Data</option>
                  <option value={"Altercao_User"}>Usuário</option>

                </select>
                <div className={Style.inputPesquisa}>

                  <input
                    id="pesquisa"
                    type={tipoPesquisa == "Data_de_Atualizacao" ? 'date' : 'text'}
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Digite aqui..."
                  />
                  <div className={Style.icone_pesquisa} onClick={handleSearch}>

                    <Lupa />

                  </div>

                </div>

              </div>
              <div className={Style.adicionar} onClick={() => { navigateToMaquina() }}>

                <h4>Máquinas</h4>
                <Gear className={Style.icone_add} />

              </div>
              <div className={Style.adicionar} onClick={() => { navigateToPost() }}>

                <h4>Adicionar</h4>
                <Add className={Style.icone_add} />

              </div>

            </div>

          </div>
          <div className={Style.read}>

            <ul className={Style.label}>

              <li className={Style.defaultLi}>Ajuste MAQ(%)</li>
              <li className={Style.defaultLi}>Ajuste MO(%)</li>
              <li className={Style.defaultLi}>Data de Realização</li>
              <li className={Style.defaultLi}>Usúario</li>
              <li className={Style.spaceLi}></li>

            </ul>

            {dados ? (

              <>
                {dados.map((givenMF) => (

                  <ul key={givenMF.ID_Fator} className={Style.mfRegister}>

                    <li className={Style.defaultLiRegister}>{givenMF.Reajuste_MAQ}</li>
                    <li className={Style.defaultLiRegister}>{givenMF.Reajuste_MO}</li>
                    <li className={Style.defaultLiRegister}>{givenMF.Data_de_Atualizacao}</li>
                    <li className={Style.defaultLiRegister}>{givenMF.Altercao_User}</li>
                    <li className={Style.icons}>

                      <Pencil onClick={() => { navigateToPut(givenMF) }} />
                      <Trash onClick={() => { navigateToDelete(givenMF) }} />

                    </li>

                  </ul>

                )

                )}

              </>

            ) : (

              <div className={Style.mfRegister}>

                <p>Dados não encontrados</p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default Get;