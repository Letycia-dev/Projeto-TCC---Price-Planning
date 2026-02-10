import pool from "../repository/mysql.js";

//GET

async function listCM() {
    const sql = "SELECT * FROM Maquinas";

    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.error("Erro ao executar query no listMP:", error);
        throw error;
    }
}

//GET: Codigo

async function changeCM(Codigo_Maquina) {
    const sql = "SELECT * FROM Maquinas WHERE habilitado = 0 AND Codigo_Maquina = ?";

    try {
        const [rows] = await pool.query(sql, [Codigo_Maquina]);
        return rows
    } catch (error) {
        console.error("Erro ao executar query no listCM:", error);
        throw error;
    }
}

// GET: Aprov

async function changeCMAprv() {

    const sql = "select Codigo_Maquina, descricao, comprimento, largura, aprov, espacamento_cav from Maquinas";

    try {

        const [rows] = await pool.query(sql);
        return rows;

    } catch (error) {

        console.error("Erro ao executar query no listMP:", error);
        throw error;

    }

}

//GET: Orc

async function changeCMOrc() {

    const sql = "select Codigo_Maquina, descricao, pecas_hora, taxa_hora, unidade from Maquinas where habilitado = true";

    try {

        const [rows] = await pool.query(sql);
        return rows;

    } catch (error) {

        console.error("Erro ao executar query no listMP:", error);
        throw error;

    }
}


// POST
async function createCM(
    Codigo_Maquina, descricao, comprimento, largura, pecas_hora, custo_reposicao,
    amortizacao, cust_maquina, manutencao, energia_gas, insumo, total_maq, qtd_operadores,
    mod_encargos, total_mod, eficiencia_maq, eficiencia_ope, eficiencia_pro, taxa_hora,
    unidade,
) {
    const sql = `INSERT INTO Maquinas(
    Codigo_Maquina, descricao, comprimento, largura, pecas_hora, custo_reposicao, 
    amortizacao, cust_maquina, manutencao, energia_gas, insumo, total_maq, qtd_operadores, 
    mod_encargos,  total_mod,  eficiencia_maq, eficiencia_ope, eficiencia_pro, taxa_hora, 
     unidade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const bdInfo = [
        Codigo_Maquina, descricao, comprimento, largura, pecas_hora, custo_reposicao,
        amortizacao, cust_maquina, manutencao, energia_gas, insumo, total_maq, qtd_operadores,
        mod_encargos, total_mod, eficiencia_maq, eficiencia_ope, eficiencia_pro, taxa_hora,
        unidade,
    ];

    await pool.query(sql, bdInfo);
}

//PUT

async function updateCM(
    descricao, comprimento, largura, pecas_hora, custo_reposicao,
    amortizacao, cust_maquina, manutencao, energia_gas, insumo,
    total_maq, qtd_operadores, mod_encargos, total_mod,
    eficiencia_maq, eficiencia_ope, eficiencia_pro, taxa_hora,
    unidade, Codigo_Maquina
) {
    const sql = `UPDATE Maquinas SET 
    descricao = ?, comprimento = ?, largura = ?, pecas_hora = ?, custo_reposicao = ?,
    amortizacao = ?, cust_maquina = ?, manutencao = ?, energia_gas = ?,
    insumo = ?, total_maq = ?, qtd_operadores = ?, mod_encargos = ?, total_mod = ?, 
    eficiencia_maq = ?, eficiencia_ope = ?, eficiencia_pro = ?, taxa_hora = ?,
    unidade = ?
    WHERE Codigo_Maquina = ?`;

    const bdInfo = [
        descricao, comprimento, largura, pecas_hora, custo_reposicao,
        amortizacao, cust_maquina, manutencao, energia_gas, insumo,
        total_maq, qtd_operadores, mod_encargos, total_mod,
        eficiencia_maq, eficiencia_ope, eficiencia_pro, taxa_hora,
        unidade, Codigo_Maquina
    ];

    await pool.query(sql, bdInfo);
}


//PUT : Aprov

async function updateMacAprov(descricao, comprimento, largura, aprov, espacamento_cav, codigo) {
    const SQL = 'update Maquinas set descricao = ? , comprimento = ?, largura = ?, aprov = ?, espacamento_cav = ? where Codigo_Maquina = ?'
    const bdInfo = [descricao, comprimento, largura, aprov, espacamento_cav, codigo]

    await pool.query(SQL, bdInfo);
}

//DELETE

async function deleteCM(Codigo_Maquina) {
    const sql = "UPDATE Maquinas SET habilitado = 1 WHERE Codigo_Maquina = ?"
    await pool.query(sql, Codigo_Maquina);
}

export default { listCM, createCM, updateCM, deleteCM, changeCM, changeCMAprv, updateMacAprov, changeCMOrc };