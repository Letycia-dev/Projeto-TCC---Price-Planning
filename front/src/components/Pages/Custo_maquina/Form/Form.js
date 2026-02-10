import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import api from "../../../../axiosConfig";
import Style from './Form.module.css';

function CadastroMaquina() {
  const location = useLocation();
  const [tpMov, setTpMov] = useState('Post');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Codigo_Maquina: '',
    referencia: '',
    descricao: '',
    comprimento: '',
    largura: '',
    pecas_hora: '',
    unidade: '',
    eficiencia_maquina: '',
    eficiencia_homem: '',
    eficiencia_processo: '',
    qtd_operadores: '',
    mod_encargos: '',
    mod_auxiliar_encargos: '',
    total_mod: '',
    custo_reposicao: '',
    amortizacao: '',
    custo_maquinario: '',
    custo_maquinario_ant: '',
    manutencao: '',
    energia_gas: '',
    insumos: '',
    total_maquina: '',
    taxa_hora: ''
  });

  const [loadingPesquisar, setLoadingPesquisar] = useState(false);
  const [loadingCadastrar, setLoadingCadastrar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const unitOptions = [
    { value: 'MT', label: 'Metro' },
    { value: 'PL', label: 'Peça Longa' },
    { value: 'PC', label: 'Peça' },
    { value: 'BO', label: 'Bobina' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculo
  useEffect(() => {
    const calcularTotais = () => {
      const qtdOperadores = parseFloat(formData.qtd_operadores) || 0;
      const modEncargos = parseFloat(formData.mod_encargos) || 0;
      const moAuxiliar = parseFloat(formData.mod_auxiliar_encargos) || 0;
      const totalMOD = (modEncargos + moAuxiliar) * qtdOperadores;

      const custoMaquinario = parseFloat(formData.custo_maquinario) || 0;
      const manutencao = parseFloat(formData.manutencao) || 0;
      const energiaGas = parseFloat(formData.energia_gas) || 0;
      const insumos = parseFloat(formData.insumos) || 0;
      const totalMaquina = custoMaquinario + manutencao + energiaGas + insumos;

      return {
        total_mod: totalMOD.toFixed(2),
        total_maquina: totalMaquina.toFixed(2)
      };
    };

    const { total_mod, total_maquina } = calcularTotais();
    setFormData((prev) => ({ ...prev, total_mod, total_maquina }));
  }, [
    formData.qtd_operadores,
    formData.mod_encargos,
    formData.mod_auxiliar_encargos,
    formData.custo_maquinario,
    formData.manutencao,
    formData.energia_gas,
    formData.insumos
  ]);

  // Referencia
  const handlePesquisar = async () => {
    if (!formData.referencia.trim()) {
      alert('Informe uma referência para pesquisar.');
      return;
    }

    try {
      setLoadingPesquisar(true);
      const token = localStorage.getItem('token');

      const response = await api.get(
        `http://localhost:3333/Custo_Maquina/GetByReferencia/${formData.referencia}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        setFormData({
          Codigo_Maquina: response.data.Codigo_Maquina ?? '',
          referencia: response.data.referencia ?? '',
          descricao: response.data.descricao ?? '',
          comprimento: response.data.comprimento ?? '',
          largura: response.data.largura ?? '',
          pecas_hora: response.data.pecas_hora ?? '',
          unidade: response.data.unidade ?? 'M',
          eficiencia_maquina: response.data.eficiencia_maq ?? '',
          eficiencia_homem: response.data.eficiencia_ope ?? '',
          eficiencia_processo: response.data.eficiencia_pro ?? '',
          qtd_operadores: response.data.qtd_operadores ?? '',
          mod_encargos: response.data.mod_encargos ?? '',
          mod_auxiliar_encargos: response.data.mod_auxiliar_encargos ?? '',
          total_mod: response.data.total_mod ?? '',
          custo_reposicao: response.data.custo_reposicao ?? '',
          amortizacao: response.data.amortizacao ?? '',
          custo_maquinario: response.data.cust_maquina ?? '',
          custo_maquinario_ant: response.data.cust_maquina_anterior ?? '',
          manutencao: response.data.manutencao ?? '',
          energia_gas: response.data.energia_gas ?? '',
          insumos: response.data.insumo ?? '',
          total_maquina: response.data.total_maq ?? '',
          taxa_hora: response.data.taxa_hora ?? ''
        });
        setTpMov('Put');
      } else {
        alert('Máquina não encontrada.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao pesquisar máquina.');
    } finally {
      setLoadingPesquisar(false);
    }
  };

  useEffect(() => {
    if (location.state && location.state.maquina) {
      const maquina = location.state.maquina;
      setFormData({
        Codigo_Maquina: maquina.Codigo_Maquina ?? '',
        referencia: maquina.referencia ?? '',
        descricao: maquina.descricao ?? '',
        comprimento: maquina.comprimento ?? '',
        largura: maquina.largura ?? '',
        pecas_hora: maquina.pecas_hora ?? '',
        unidade: maquina.unidade ?? 'M',
        eficiencia_maquina: maquina.eficiencia_maq ?? '',
        eficiencia_homem: maquina.eficiencia_ope ?? '',
        eficiencia_processo: maquina.eficiencia_pro ?? '',
        qtd_operadores: maquina.qtd_operadores ?? '',
        mod_encargos: maquina.mod_encargos ?? '',
        mod_auxiliar_encargos: maquina.mod_auxiliar_encargos ?? '',
        total_mod: maquina.total_mod ?? '',
        custo_reposicao: maquina.custo_reposicao ?? '',
        amortizacao: maquina.amortizacao ?? '',
        custo_maquinario: maquina.cust_maquina ?? '',
        custo_maquinario_ant: maquina.cust_maquina_anterior ?? '',
        manutencao: maquina.manutencao ?? '',
        energia_gas: maquina.energia_gas ?? '',
        insumos: maquina.insumo ?? '',
        total_maquina: maquina.total_maq ?? '',
        taxa_hora: maquina.taxa_hora ?? ''
      });
      setTpMov('Put');
    }
  }, [location.state]);

  //Envio do POST e do PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!unitOptions.some((opt) => opt.value === formData.unidade)) {
      setErrorMsg('Unidade de medida inválida');
      return;
    }

    setErrorMsg('');
    setLoadingCadastrar(true);

    if (!formData.Codigo_Maquina || isNaN(formData.Codigo_Maquina)) {
      setErrorMsg('Código da Máquina deve ser um número válido');
      setLoadingCadastrar(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const payload = {
        Codigo_Maquina: formData.Codigo_Maquina ?? '',
        descricao: formData.descricao ?? '',
        referencia: formData.referencia ?? '',
        comprimento: parseFloat(formData.comprimento) || 0,
        largura: parseFloat(formData.largura) || 0,
        pecas_hora: parseFloat(formData.pecas_hora) || 0,
        unidade: formData.unidade ?? 'M',
        qtd_operadores: parseFloat(formData.qtd_operadores) || 0,
        mod_encargos: parseFloat(formData.mod_encargos) || 0,
        mod_auxiliar_encargos: parseFloat(formData.mod_auxiliar_encargos) || 0,
        total_mod: parseFloat(formData.total_mod) || 0,
        taxa_hora: parseFloat(formData.taxa_hora) || 0,
        eficiencia_maq: parseFloat(formData.eficiencia_maquina) || 0,
        eficiencia_ope: parseFloat(formData.eficiencia_homem) || 0,
        eficiencia_pro: parseFloat(formData.eficiencia_processo) || 0,
        custo_reposicao: parseFloat(formData.custo_reposicao) || 0,
        amortizacao: parseFloat(formData.amortizacao) || 0,
        cust_maquina: parseFloat(formData.custo_maquinario) || 0,
        cust_maquina_anterior: parseFloat(formData.custo_maquinario_ant) || 0,
        manutencao: parseFloat(formData.manutencao) || 0,
        energia_gas: parseFloat(formData.energia_gas) || 0,
        insumo: parseFloat(formData.insumos) || 0,
        total_maq: parseFloat(formData.total_maquina) || 0,
      };

      console.log("Payload sendo enviado:", payload);

      const url = tpMov === 'Post'
        ? 'http://localhost:3333/Custo_Maquina/Post'
        : `http://localhost:3333/Custo_Maquina/Put/${formData.Codigo_Maquina}`;

      await api[tpMov === 'Post' ? 'post' : 'put'](url, payload);
      navigate("/Custo_Maquina/Get");
    } catch (error) {
      console.error('Erro ao salvar máquina:', error.response?.data || error.message);
      setErrorMsg(`Erro ao salvar: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoadingCadastrar(false);
    }
  };

  return (
    <div className={Style.body}>
      <div className={Style.header}>
        <Link to={'/Custo_Maquina/Get'}>
          <BiHome className={Style.iconHome} />
        </Link>
        <h1>Cadastro de Máquinas</h1>
      </div>

      <div className={Style.main}>
        <form onSubmit={handleSubmit} className={Style.formContainer}>
          <div className={Style.topFields}>
            <div>
              <label className={Style.label_default_codigo}>Código</label>
              <input
                className={Style.input_default_codigo}
                name="Codigo_Maquina"
                value={formData.Codigo_Maquina}
                onChange={handleChange}
                required
                maxLength="20"
                disabled={tpMov === 'Put'}
              />
            </div>

            <div className={Style.referenciaGroup}>
              <label className={Style.label_default_referencia}>Referência</label>
              <div className={Style.referenciaInput}>
                <input
                  className={Style.input_default_referencia}
                  name="referencia"
                  value={formData.referencia}
                  onChange={handleChange}
                  maxLength="50"
                />
                <button
                  className={Style.submitBtnPesquisar}
                  type="button"
                  onClick={handlePesquisar}
                  disabled={loadingPesquisar}
                >
                  {loadingPesquisar ? 'Pesquisando...' : 'Pesquisar'}
                </button>
              </div>
            </div>

            <div className={Style.descricaoField}>
              <label className={Style.label_default_descricao}>Descrição</label>
              <input
                className={Style.input_default_descricao}
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                maxLength="100"
              />
            </div>
          </div>

          <div className={Style.cards}>
            <CardProducao formData={formData} handleChange={handleChange} />
            <CardEficiencia formData={formData} handleChange={handleChange} />
            <CardCustoHoraHomem formData={formData} handleChange={handleChange} />
            <CardCustoHoraMaquina formData={formData} handleChange={handleChange} />
            <CardTaxaHora formData={formData} handleChange={handleChange} />
          </div>

          {errorMsg && <div className={Style.errorMessage}>{errorMsg}</div>}

          <button className={Style.submitBtn} type="submit" disabled={loadingCadastrar}>
            {loadingCadastrar ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

      </div>
    </div>
  );
}

const CardProducao = ({ formData, handleChange }) => (
  <div className={Style.CardProducao}>
    <h2>Produção</h2>
    <label className={Style.label_default}>Comprimento: </label>
    <input
      className={Style.input_default}
      name="comprimento"
      value={formData.comprimento}
      onChange={handleChange}
      placeholder=""
    />
    <label className={Style.label_default}>Largura: </label>
    <input
      className={Style.input_default}
      name="largura"
      value={formData.largura}
      onChange={handleChange}
      placeholder=""
    />
    <label className={Style.label_default}>Peças Hora:</label>
    <input
      className={Style.input_default}
      name="pecas_hora"
      value={formData.pecas_hora}
      onChange={handleChange}
      placeholder=""
    />
    <label className={Style.label_default_select}>Unidade: </label>
    <select
      className={Style.select_default}
      name="unidade"
      value={formData.unidade}
      onChange={handleChange}
      required
    >
      <option value="MT">Metro</option>
      <option value="PL">Peça Longa</option>
      <option value="PC">Peça</option>
      <option value="BO">Bobina</option>
    </select>
  </div>
);

const CardEficiencia = ({ formData, handleChange }) => (
  <div className={Style.CardEficiencia}>
    <h2>Eficiência (%)</h2>
    <label className={Style.label_default}>Máquina: </label>
    <input
      className={Style.input_default}
      name="eficiencia_maquina"
      value={formData.eficiencia_maquina}
      onChange={handleChange}
    />
    <label className={Style.label_default}>Homem: </label>
    <input
      className={Style.input_default}
      name="eficiencia_homem"
      value={formData.eficiencia_homem}
      onChange={handleChange}
    />
    <label className={Style.label_default}>Processo: </label>
    <input
      className={Style.input_default}
      name="eficiencia_processo"
      value={formData.eficiencia_processo}
      onChange={handleChange}
    />
  </div>
);

const CardCustoHoraHomem = ({ formData, handleChange }) => (
  <>
    <div className={Style.CardCustoHoraHomem}>
      <h2>Custo Hora Homem</h2>
      <label className={Style.label_default}>Qtd. Operadores: </label>
      <input
        className={Style.input_default}
        name="qtd_operadores"
        value={formData.qtd_operadores}
        onChange={handleChange}
      />
      <label className={Style.label_default}>MOD com Encargos: </label>
      <input
        className={Style.input_default}
        name="mod_encargos"
        value={formData.mod_encargos}
        onChange={handleChange}
      />
      <label className={Style.label_default}>MO Auxiliar c/ Encargos: </label>
      <input
        className={Style.input_default}
        name="mod_auxiliar_encargos"
        value={formData.mod_auxiliar_encargos}
        onChange={handleChange}
      />
    </div>


      <label className={Style.label_default_mod}>Total MOD: </label>
      <input
        className={Style.input_default_mod}
        name="total_mod"
        value={formData.total_mod}
        onChange={handleChange}
        readOnly
      />

  </>
);

const CardCustoHoraMaquina = ({ formData, handleChange }) => (
  <>
  <div className={Style.CardCustoHoraMaquina}>
    <h2 className={Style.cardTitle}>Custo Hora Máquina</h2>

    <label className={Style.label_default}>Custo de Reposição: </label>
    <input className={Style.input_default} name="custo_reposicao" value={formData.custo_reposicao} onChange={handleChange} />

    <label className={Style.label_default}>Amortização (Meses): </label>
    <input className={Style.input_default} name="amortizacao" value={formData.amortizacao} onChange={handleChange} />

    <label className={Style.label_default}>Custo Maquinário: </label>
    <input className={Style.input_default} name="custo_maquinario" value={formData.custo_reposicao / formData.amortizacao} onChange={handleChange} readOnly />

    <label className={Style.label_default}>Custo Maquinário Anterior: </label>
    <input className={Style.input_default} name="custo_maquinario_ant" value={formData.custo_maquinario_ant} onChange={handleChange} readOnly />

    <label className={Style.label_default}>Manutenção (R$): </label>
    <input className={Style.input_default} name="manutencao" value={formData.manutencao} onChange={handleChange} />

    <label className={Style.label_default}>Energia / Gás (R$): </label>
    <input className={Style.input_default} name="energia_gas" value={formData.energia_gas} onChange={handleChange} />

    <label className={Style.label_default}>Insumos (R$ / HR):</label>
    <input className={Style.input_default} name="insumos" value={formData.insumos} onChange={handleChange} />
  </div>
  
    <label className={Style.label_default_TotalM}>Total da Máquina: </label>
    <input className={Style.input_default_TotalM} name="total_maquina" value={formData.total_maquina} onChange={handleChange} readOnly />
  </>
);

const CardTaxaHora = ({ formData, handleChange }) => (
  <div className={Style.CardTaxaHora}>
    <label className={Style.label_default_taxah}>Taxa Hora (R$/h): </label>
    <input
      className={Style.input_default_taxah}
      name="taxa_hora"
      value={formData.taxa_hora}
      onChange={handleChange}
      readOnly
    />
  </div>
);

export default CadastroMaquina;