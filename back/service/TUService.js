import pool from "../repository/mysql.js";

async function listTU() {

  const sql = "SELECT * FROM Testes_Utilizados";
  try {
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.error("Erro ao executar query no listTU:", error);
    throw error;
  }

}

async function createTU(Descricao_Test, Quantidade, Custo, ID_Orcamento) {

  const sql = `INSERT INTO Testes_Utilizados (Descricao_Test, Quantidade, Custo, ID_Orcamento) VALUES (?, ?, ?, ?)`;
  const bdInfo = [Descricao_Test, Quantidade, Custo, ID_Orcamento];
  await pool.query(sql, bdInfo);
}

async function changeTU(id_orc) {

  const sql = "SELECT ID, Descricao_Test, Quantidade, Custo FROM Testes_Utilizados WHERE ID_Orcamento = ?;";

  const [rows] = await pool.query(sql, id_orc);

  return rows;
}

async function updateTU(Descricao_Test, Custo, ID) {

  const sql = `UPDATE Testes_Utilizados SET Descricao_Test = ?,  Custo = ? WHERE ID = ?`;

  const bdInfo = [Descricao_Test, Custo, ID];

  await pool.query(sql, bdInfo);

}

async function deleteTU(id) {

  const sql = `DELETE FROM Testes_Utilizados WHERE ID = ?`;

  await pool.query(sql, id);

}

async function deleteTUORC(id) {

  const SQL = 'delete from Testes_Utilizados where ID_Orcamento = ?';

  await pool.query(SQL, id);


}


export default { listTU, createTU, updateTU, changeTU, deleteTU, deleteTUORC };
