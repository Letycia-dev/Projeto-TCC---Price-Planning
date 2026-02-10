import SideBar from '../../../Layout/Menu Latertal/MenuLateral'
import StyleGeneral from '../HistApGeral.module.css'
import Style from './Get.module.css'
import { useEffect, useState } from 'react'
import api from '../../../../axiosConfig';
import { IoSearchSharp as Lupa } from "react-icons/io5";
import { MdAddBox as Add } from "react-icons/md";
import { HiPencil as Pencil } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { FaTrash as Trash } from "react-icons/fa";

const GetAP = () => {

  const [dados, setDados] = useState([]);

  const [tipoPesquisa, setTipoPesquisa] = useState('codigo');

  const [pesquisa, setPesquisa] = useState('');

  const [id_Aprov, setId_Aprov] = useState(null);

  const navigate = useNavigate();

  const [message, setMessage] = useState('')

  const opcoesPesquisa = [

    { value: 'codigo', label: "RCA" },
    { value: 'comprimento', label: "Comprimento" },
    { value: 'largura', label: "Largura" },
    { value: 'espessura', label: "Espessura" },

  ];

  const ordenarDados = (dados, tipo) => {

    if (tipo === 'RCA') {

      return [...dados].sort((a, b) => a.RCA - b.RCA);

    }

    else if (tipo === 'Comprimento' || tipo === 'Largura' || tipo === 'Espessura') {

      return [...dados].sort((a, b) => a[tipo].localeCompare(b[tipo]));

    }

    return dados;

  };

  const handleSearch = async () => {

    let url = 'http://localhost:3333/Historico_Aproveitamento/';

    try {

      const response = await api.get(url);

      let resultado = response.data;

      if (tipoPesquisa && pesquisa) {

        console.log('Ta no primeiro if')

        resultado = resultado.filter((item) => String(item[tipoPesquisa]).includes(pesquisa));

      }

      else if (tipoPesquisa) {

        console.log('Ta no else if')

        resultado = ordenarDados(resultado, tipoPesquisa);
      }

      setDados(resultado);

    } catch (error) {

      console.log(`Erro ${error}`)

      setDados([]);
    }
  };

  const navigateToPost = () => {

    navigate("/Historico_Aproveitamento/Post");

  };

  const navigateToPut = (data) => {

    navigate("/Historico_Aproveitamento/Put", { state: { Aprov: data } });

  };

  const deleteAprov = (id_Aprov) => {

    setMessage("Tem certeza que deseja excluir o Aproveitamento calculado?")

    setId_Aprov(id_Aprov)

  };

  const confirmDelete = (value) => {

    if (value) {

      try {

        api.delete(`http://localhost:3333/Historico_Aproveitamento/${id_Aprov}`)

        setMessage(`Aproveitamento deletado`)

      } catch (err) {

        console.log(err)

        setMessage('Erro ao deletar Aproveitamento')
      }

    }

    else {

      setMessage('')
      setId_Aprov(null)

    }


  };

  useEffect(() => {

    handleSearch();

  }, [dados, tipoPesquisa, pesquisa]);

  useEffect(() => {

    console.log(tipoPesquisa)
    console.log(pesquisa)

  }, [tipoPesquisa, pesquisa]);

  return (

    <div className={StyleGeneral.body}>

      <SideBar />

      <div className={StyleGeneral.conteiner}>

        <div className={Style.body}>

          <div className={Style.header}>

            <h2>Aproveitamento</h2>

            <div className={Style.campo_add}>

              <div className={Style.pesquisar}>

                <label htmlFor="pesquisa">Campo</label>

                <select
                  className={Style.combo_box}
                  value={tipoPesquisa}
                  onChange={(e) => { setTipoPesquisa(e.target.value) }}>

                  {opcoesPesquisa.map((opcao) => (

                    <option key={opcao.value} value={opcao.value}>

                      {opcao.label}

                    </option>

                  ))}

                </select>

                <div className={Style.inputPesquisa}>

                  <input id="pesquisa"
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Digite aqui..." />

                  <div className={Style.icone_pesquisa} onClick={handleSearch}>

                    <Lupa />

                  </div>

                </div>

              </div>

              <div className={Style.adicionar} onClick={navigateToPost}>

                <h4>Adicionar</h4>
                <Add className={Style.icone} />

              </div>

            </div>

          </div>

          <div className={Style.read}>

            <div className={Style.backgroundRead}>

              <ul className={Style.label}>

                <li className={Style.defaultLi}>RCA</li>
                <li className={Style.defaultLi}>Versão</li>
                <li className={Style.defaultLi}>Comprim. PC.</li>
                <li className={Style.defaultLi}>Largura PC.</li>
                <li className={Style.defaultLi}>Espessura PC.</li>
                <li className={Style.defaultLi}>Volume Mês</li>
                <li className={Style.defaultLi}>M.P. Principal</li>
                <li className={Style.defaultLi}>Máquina Utilizada</li>
                <li className={Style.defaultLi}>Cav. Comprim.</li>
                <li className={Style.defaultLi}>Cav. Largura</li>
                <li className={Style.defaultLi}>Cav. Totais</li>
                <li className={Style.defaultLi}>Tipo de Cav.</li>
                <li className={Style.defaultLi}>Espaçamento Cav.</li>
                <li className={Style.defaultLi}>Núm. Blanks (MT)</li>
                <li className={Style.defaultLi}>Núm. Blanks (LG)</li>
                <li className={Style.defaultLi}>Sentido Bat.</li>
                <li className={Style.defaultLi}>Batida na Placa</li>
                <li className={Style.defaultLi}>Peças por PL/BO</li>
                <li className={Style.defaultLi}>Usuário</li>
                <li className={Style.spaceLi}></li>

              </ul>

              {dados.length > 0 ?

                dados.map((aprov) => {

                  return (

                    <ul key={aprov.codigo} className={Style.aprovRegister}>

                      <li className={Style.defaultLiRegister}>{aprov.codigo}</li>
                      <li className={Style.defaultLiRegister}>{aprov.versão_Item}</li>
                      <li className={Style.defaultLiRegister}>{aprov.comprimento}</li>
                      <li className={Style.defaultLiRegister}>{aprov.largura}</li>
                      <li className={Style.defaultLiRegister}>{aprov.espessura}</li>
                      <li className={Style.defaultLiRegister}>{aprov.volumes_Mes}</li>
                      <li className={Style.defaultLiRegister}>{aprov.codigo_MP}</li>
                      <li className={Style.defaultLiRegister}>{aprov.codigo_Maq}</li>
                      <li className={Style.defaultLiRegister}>{aprov.cavidades_comp}</li>
                      <li className={Style.defaultLiRegister}>{aprov.cavidades_larg}</li>
                      <li className={Style.defaultLiRegister}>{aprov.cavidades_totais}</li>
                      <li className={Style.defaultLiRegister}>{aprov.tipo_de_cavidade}</li>
                      <li className={Style.defaultLiRegister}>{aprov.espaçamento_entre_cavidades}</li>
                      <li className={Style.defaultLiRegister}>{aprov.N_Blanks_MT}</li>
                      <li className={Style.defaultLiRegister}>{aprov.N_Blanks_LG}</li>
                      <li className={Style.defaultLiRegister}>{aprov.ordem_da_Batida}</li>
                      <li className={Style.defaultLiRegister}>{aprov.N_de_Batidas}</li>
                      <li className={Style.defaultLiRegister}>{aprov.pecas_por_material}</li>
                      <li className={Style.defaultLiRegister}>{aprov.user}</li>
                      <li className={Style.iconsAprov}>

                        <Pencil onClick={() => { navigateToPut(aprov) }} />
                        <Trash onClick={() => { deleteAprov(aprov.ID_Aprov) }} />

                      </li>

                    </ul>

                  )
                })

                :

                <div className={Style.aprovRegister}>

                  <p>Não há Aproveitamentos Salvos</p>

                </div>

              }



            </div>

          </div>

        </div>

        {message &&

          <div className={Style.message}>

            <p>{message}</p>

            {message == "Tem certeza que deseja excluir o Aproveitamento calculado?" ?

              <div className={Style.alingBtns}>

                <button onClick={() => { confirmDelete(true) }}>Sim</button>
                <button onClick={() => { confirmDelete(false) }}>Não</button>

              </div>

              :

              <button onClick={() => { confirmDelete(false) }}>OK</button>

            }


          </div>

        }

      </div>

    </div >
  );

}

export default GetAP;