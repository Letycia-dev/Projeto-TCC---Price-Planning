import pool from "../repository/mysql.js";

async function login(name, password) {

  const sql = "SELECT * FROM users WHERE name = ? and password = ? and Enabled = 1";
  
  const dataLogin = [name, password];

  const [rows] = await pool.query(sql, dataLogin);

  return rows.length > 0 ? rows[0] : null;
}

export default { login};