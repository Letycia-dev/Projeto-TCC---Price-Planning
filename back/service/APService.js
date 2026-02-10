import pool from "../repository/mysql.js";

//GET

async function listAP() {

    const SQL = "SELECT * FROM historico_de_aproveitamento";

    const [rows] = await pool.query(SQL);

    return rows;
}

//POST

async function createAP(codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
    medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
    espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
    pecas_por_material, user) {

    const sql = "INSERT INTO historico_de_aproveitamento (codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP, medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade, espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas, pecas_por_material, user) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    const bdInfo = [codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
        medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
        espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
        pecas_por_material, user];

    await pool.query(sql, bdInfo);
}

//PUT

async function updateAP(codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
    medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
    espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
    pecas_por_material, user, ID_Aprov) {

    const sql = "UPDATE historico_de_aproveitamento SET codigo = ?, versão_Item = ?, comprimento = ? , largura = ?, espessura = ?, volumes_Mes = ? , codigo_MP = ?, medida_MP = ?, codigo_Maq = ?, cavidades_comp = ?, cavidades_larg = ?, cavidades_totais = ?, tipo_de_cavidade = ?, espaçamento_entre_cavidades = ?, N_Blanks_MT = ?, N_Blanks_LG = ?, ordem_da_Batida = ?, N_de_Batidas = ?, pecas_por_material = ?, user = ? WHERE ID_Aprov = ? "

    const bdInfo = [codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
        medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
        espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
        pecas_por_material, user, ID_Aprov]

    await pool.query(sql, bdInfo)
}

//DELETE

async function deleteAP(codigo) {

    const sql = "delete from historico_de_aproveitamento WHERE ID_Aprov = ?";

    await pool.query(sql, codigo);
}

export default { listAP, createAP, updateAP, deleteAP };