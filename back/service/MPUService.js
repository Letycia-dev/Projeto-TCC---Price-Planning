import pool from '../repository/mysql.js';

//GET

async function listMPU() {
    const sql = "SELECT * FROM MP_Utilizada";

    const [rows] = await pool.query(sql);
    return rows;
}

//GET: Codigo

async function changeMPU(id_orc) {

    const sql = "SELECT ID, Codigo_MP, Ordem, Quantidade, Preco_Considerado FROM MP_Utilizada WHERE ID_Orcamento = ?;";

    const [rows] = await pool.query(sql, id_orc);
    return rows;
}

//POST

async function createMPU(Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) {

    const sql = "INSERT INTO MP_Utilizada(Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES (?,?,?,?,?)";

    const bdInfo = [Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento];

    await pool.query(sql, bdInfo);
}

//PUT

async function updateMPU(Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID) {

    const sql = "UPDATE MP_Utilizada SET Codigo_MP = ?, Ordem = ?, Quantidade = ?, Preco_Considerado = ? WHERE ID = ?"

    const bdInfo = [Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID]
    await pool.query(sql, bdInfo)
}

// DELETE 

async function deleteMPU(id) {

    const sql = `DELETE FROM MP_Utilizada WHERE ID = ?`;

    await pool.query(sql, id);

}

//Delete ID_Orc

async function deleteMPUORC(id) {

    const SQL = 'delete from MP_Utilizada where ID_Orcamento = ?';

    await pool.query(SQL, id);


}

export default { listMPU, changeMPU, createMPU, updateMPU, deleteMPU, deleteMPUORC };