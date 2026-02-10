import pool from '../repository/mysql.js'

//GET

async function listOrcs() {

    const sql = "SELECT * FROM historico_de_orcamento";

    const [rows] = await pool.query(sql);
    
    return rows;
}

//GET: Codigo

async function changeOrcs(id_orcamento) {
    
    const sql = "SELECT * FROM historico_de_orcamento WHERE id_orcamento = ?";
    const bdInfo = [id_orcamento]

    try {
        const [rows] = await pool.query(sql, bdInfo);
        return rows;
    } catch (error) {
        throw error;
    }
}

//POST

async function createOrcs(cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao, codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista) {

    const sql = "INSERT INTO historico_de_orcamento (cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao, codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    const bdInfo = [cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao, codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista];

    const [orc] = await pool.query(sql, bdInfo);

    return orc.insertId;
}

//PUT

async function updateOrcs(cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao, codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista, id_orcamento) {
    const sql = "UPDATE historico_de_orcamento SET cod_cliente = ?, nome_do_cliente = ?, tipo = ?, codigo = ?, versao_item = ?, planta = ?, data = ?, descricao = ?, codigo_desenho= ?, unidade = ?, comprimento = ?, largura = ?, espessura = ?, tipo_vlm = ?, volume_mes = ?, custo_total_MP = ?, observacao_MP = ?, custo_total_MQ = ?, observacao_MQ = ?, custo_total_Ferramenta = ?, observacao_Ferramenta = ?, custo_total_Teste = ?, observacao_Teste = ?, custo_total_Proc = ?, scrap = ?, CT_Proc_C_Scrap = ?, icms_considerado = ?, pis_considerado = ?, confins_considerado = ?, custo_fixo = ?, despesas_gerais = ?, custo_financeiro = ?, frete = ?, margem = ?, preco_final_s_imposto = ?, preco_final_c_imposto = ?, lta = ?, bussines_link = ?, custo_adicional = ?, department = ?, orcamentista = ? WHERE id_orcamento = ? "
    const bdInfo = [cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao, codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista, id_orcamento]

    await pool.query(sql, bdInfo)
}

//DELETE

async function deleteOrcs(id_orcamento) {
    const sql = "delete from historico_de_orcamento WHERE id_orcamento = ?";

    await pool.query(sql, id_orcamento);
}

export default { listOrcs, changeOrcs, createOrcs, updateOrcs, deleteOrcs };