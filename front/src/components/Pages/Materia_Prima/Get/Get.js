import { useRef, useState, useEffect } from 'react';
import api from '../../../../axiosConfig';
import StyleGeneral from '../MPGeral.module.css';
import Style from '../Get/Get.module.css';
import { IoSearchSharp as Lupa } from "react-icons/io5";
import { MdAddBox as Add } from "react-icons/md";
import { HiPencil as Pencil } from "react-icons/hi2";
import SiderBar from "../../../Layout/Menu Latertal/MenuLateral";
import { useNavigate } from "react-router-dom";
import { TfiReload as Reload } from "react-icons/tfi";
import * as XLSX from 'xlsx';
import { format } from 'date-fns';


const Get = () => {

  const [dados, setDados] = useState([]);

  const [excelDate, setExcelDate] = useState([]);

  const [message, setMessage] = useState(null)

  const [tipoPesquisa, setTipoPesquisa] = useState('codigo');

  const [pesquisa, setPesquisa] = useState('');

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const mudancaPesquisa = (e) => {

    setTipoPesquisa(e.target.value);

  };

  const ordenarDados = (dados, tipo) => {

    if (tipo === 'codigo') {

      return [...dados].sort((a, b) => a.codigo - b.codigo);

    } else if (tipo === 'descricao') {

      return [...dados].sort((a, b) => a[tipo].localeCompare(b[tipo]));

    }
    return dados;
  };

  const handleSearch = async () => {

    let url = 'http://localhost:3333/Materia_prima/Get';

    try {

      const response = await api.get(url);

      let resultado = response.data;

      if (tipoPesquisa && pesquisa) {

        resultado = resultado.filter((item) => item[tipoPesquisa].toString().toLowerCase().includes(pesquisa.toLowerCase()));

      } else if (tipoPesquisa) {

        resultado = ordenarDados(resultado, tipoPesquisa);
      }

      for (const mp of resultado) {

        if (mp.habilitado == 0) {

          mp.habilitado = '0'

        }

      }

      setDados(resultado);

    } catch (error) {

      setDados([]);
    }
  };

  const uptadeCostClick = () => {

    fileInputRef.current.click();

  };

  const handleFileUpload = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {

      const array = e.target.result;

      const binaryData = new Uint8Array(array)

      const spreadsheet = XLSX.read(binaryData, { type: 'array' });

      const sheetName = spreadsheet.SheetNames[0];

      const sheet = spreadsheet.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {

        raw: false,
        defval: null

      });

      const novosDados = jsonData.map(line => {

        let custoStr = line['Custo Stand.'];

        if (typeof custoStr === 'string') {

          custoStr = custoStr.replace(',', '.');

        }

        const custo = parseFloat(custoStr) || 0;

        const dataExcel = line['Ult. Calculo'] === '  /  /    ' || line['Ult. Calculo'] === '/  /' ? '31/12/9999' : line['Ult. Calculo'];

        const partes = dataExcel.split('/');

        const [dia, mes, ano] = partes

        const dataFinal = `${ano}-${mes}-${dia}`

        return {

          codigo: line['Codigo'],
          custo: custo,
          data: dataFinal


        };

      });

      setExcelDate(prev => [...prev, ...novosDados]);

    };

  };

  const navigateToPut = (mpData) => {

    navigate("/Materia_Prima/Put", { state: { MP: mpData } });

  };

  const navigateToPost = () => {

    navigate("/Materia_Prima/Post");

  };

  useEffect(() => {

    handleSearch();

  }, [dados, pesquisa, tipoPesquisa]);

  useEffect(() => {

    if (excelDate.length != 0) {

      api.put('http://localhost:3333/Materia_prima/atualiza_custo', excelDate)
        .then(res => (setMessage("Custos atualizados com sucesso")))
        .catch(err => (console.log(err)))

    }

  }, [excelDate]);

  return (

    <div className={StyleGeneral.body}>

      <SiderBar />

      <div className={StyleGeneral.conteiner}>

        <div className={Style.body}>

          <div className={Style.header}>

            <h2>Matéria-Prima</h2>

            <div className={Style.campo_add}>

              <div className={Style.pesquisar}>

                <label htmlFor="pesquisa">Campo</label>

                <select
                  className={Style.combo_box}
                  value={tipoPesquisa}
                  onChange={mudancaPesquisa}
                >

                  <option value='codigo'>Código</option>
                  <option value='descricao'>Descrição</option>

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

              <div className={Style.adicionar} onClick={uptadeCostClick}>

                <h4>Atualizar Custo</h4>
                <Reload className={Style.icone} />
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} />

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
                <li className={Style.descriptionLi}>Descrição</li>
                <li className={Style.defaultLi}>Unidade de Medida</li>
                <li className={Style.defaultLi}>Comprimento (Min.)</li>
                <li className={Style.defaultLi}>Largura (Min.)</li>
                <li className={Style.defaultLi}>Espessura (Min.)</li>
                <li className={Style.defaultLi}>Preço (C/ Imposto)</li>
                <li className={Style.defaultLi}>Fator de Conversão</li>
                <li className={Style.defaultLi}>Preço (S/ Imposto)</li>
                <li className={Style.defaultLi}>DT. Ultimo Custo</li>
                <li className={Style.defaultLi}>Habilitado</li>
                <li className={Style.spaceLi}></li>

              </ul>

              {dados.length > 0 ? (

                <>
                  {dados.map((givenMP) => {

                    const lengthMP = givenMP.comprimento_min || '-';

                    const widthMP = givenMP.largura_min || '-';

                    const thicknessMP = givenMP.espessura_min || '-';

                    const convFactor = givenMP.fator_conv || 'Sem Fator'

                    const dataFormatada = format(new Date(givenMP.dt_ultimo_custo), 'dd/MM/yyyy');

                    return (

                      <ul key={givenMP.codigo} className={Style.MPRegister}>

                        <li className={Style.defaultLiRegister}>{givenMP.codigo}</li>
                        <li className={Style.liRegistrationDescription}>{givenMP.descricao}</li>
                        <li className={Style.defaultLiRegister}>{givenMP.unid_medida}</li>
                        <li className={Style.defaultLiRegister}>{lengthMP}</li>
                        <li className={Style.defaultLiRegister}>{widthMP}</li>
                        <li className={Style.defaultLiRegister}>{thicknessMP}</li>
                        <li className={Style.defaultLiRegister}>{givenMP.preco_c_imposto}</li>
                        <li className={Style.defaultLiRegister}>{convFactor}</li>
                        <li className={Style.defaultLiRegister}>{givenMP.preco_s_imposto}</li>
                        <li className={Style.defaultLiRegister}>{dataFormatada}</li>
                        <li className={Style.defaultLiRegister}>{givenMP.habilitado == 1 ? 'Sim' : 'Não'}</li>
                        <li className={Style.iconsMP}>

                          <Pencil onClick={() => navigateToPut({ givenMP })} />

                        </li>

                      </ul>

                    )

                  })}

                </>

              ) : (

                <div className={Style.MPRegister}>

                  <p>Sem Matérias-Primas</p>

                </div>

              )}

            </div>

          </div>

          {message &&

            <div className={Style.message}>

              <p>{message}</p>

              <button onClick={(e) => { e.preventDefault(); setMessage(null) }}> OK </button>

            </div>
          }

        </div>

      </div>

    </div>

  );
};

export default Get;