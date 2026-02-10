import pool from "../repository/mysql.js";

async function listFU() {

    const sql = "SELECT * FROM Ferramentas_Utilizadas";
    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.error("Erro ao executar query no listFU:", error);
        throw error;
    }
}

async function createFU(Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, ID_Orcamento) {

    const sql = `INSERT INTO Ferramentas_Utilizadas( Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, ID_Orcamento )
    VALUES (?,?,?,?,?,?,?)`;

    const bdInfo = [
        Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, ID_Orcamento
    ];
    await pool.query(sql, bdInfo);
}

async function changeFU(id_orc) {

    const sql = "SELECT id, Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas FROM Ferramentas_Utilizadas WHERE ID_Orcamento = ?";

    const [rows] = await pool.query(sql, id_orc);

    return rows;
}

async function updateFU(Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, Codigo_Ferramenta) {

    const sql = `UPDATE Ferramentas_Utilizadas SET Descricao_Ferramenta = ?, Quantidade = ?, Custo = ?, Diluicao_Meses = ?,
         Diluicao_Pecas = ? WHERE Codigo_Ferramenta = ?`;

    const bdInfo = [ Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, Codigo_Ferramenta ];
    
    await pool.query(sql, bdInfo);
}

async function deleteFU(id) {

    const sql = `DELETE FROM Ferramentas_Utilizadas WHERE id = ?;`;

    await pool.query(sql, id);

}

async function deleteFUORC(id) {

  const SQL = 'delete from Ferramentas_Utilizadas where ID_Orcamento = ?';

  await pool.query(SQL, id);


}

export default { listFU, createFU, changeFU,updateFU, deleteFU, deleteFUORC };
