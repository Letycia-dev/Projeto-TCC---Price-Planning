import pool from "../repository/mysql.js";

async function listOBV() {

  const sql = "SELECT * FROM observacao_vendas";
  const [rows] = await pool.query(sql);
  return rows;
}

async function createOBV(obs, id_orc) {

  const sql = `INSERT INTO observacao_vendas (obs, id_orc) VALUES (?, ?)`;
  const bdInfo = [obs, id_orc];
  await pool.query(sql, bdInfo);

}

async function updateOBV(id, obs, id_orc) {

  const sql = `UPDATE observacao_vendas SET obs = ?, id_orc = ? WHERE id = ?`;
  const bdInfo = [obs, id_orc, id];
  await pool.query(sql, bdInfo);
  
}

export default { listOBV, createOBV, updateOBV };
