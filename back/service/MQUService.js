import pool from '../repository/mysql.js';

//GET

async function listMQU() {
    const sql = "SELECT * FROM Maquinas_Utilizadas";

    const [rows] = await pool.query(sql);
    return rows;
}

//GET: Codigo

async function changeMQU(id_orc) {

    const sql = "SELECT ID_Proc, Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada from Maquinas_Utilizadas WHERE ID_Orcamento = ?;";

    const [rows] = await pool.query(sql, id_orc);

    return rows;
}

//POST

async function createMQU(Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento) {
    const sql = "INSERT INTO Maquinas_Utilizadas(Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento) VALUES (?,?,?,?,?,?,?,?)";

    const bdInfo = [Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento];
    await pool.query(sql, bdInfo);
}

//PUT

async function updateMQU(Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Proc) {
    const sql = "UPDATE Maquinas_Utilizadas SET Codigo_Maquina = ?, Ordem = ?, Descricao_Operacao = ?, Unidade_Operacao = ?, Qtd_Por_Operecao = ?, Pecas_Hora = ?, Taxa_Hora_Considerada = ? WHERE ID_Proc = ?"

    const bdInfo = [Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Proc]
    await pool.query(sql, bdInfo)
}

//DELETE

async function deleteMQU(ID_Proc) {

    const sql = `DELETE FROM Maquinas_Utilizadas WHERE ID_Proc = ?`;

    await pool.query(sql, ID_Proc);
}

//DELETE ORC

async function deleteMQUORC(id) {

    const SQL = 'delete from Maquinas_Utilizadas where ID_Orcamento = ?';

    await pool.query(SQL, id);


}

export default { listMQU, changeMQU, createMQU, updateMQU, deleteMQU, deleteMQUORC };