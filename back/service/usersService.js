import pool from '../repository/mysql.js';

//GET
async function getUsers() {

    const sql = "SELECT * FROM users";

    try {

        const [rows] = await pool.query(sql);

        return rows

    } catch (error) {

        console.error("Erro ao executar query no getUsers:", error);

        throw error;

    }
}

//GET NAME_USER
async function getUser(id_user) {

    const sql = "SELECT name FROM users where id_user = ?";

    try {

        const [row] = await pool.query(sql, id_user);

        return row

    } catch (error) {

        console.error("Erro ao executar query no getUsers:", error);

        throw error;

    }
}

//POST
async function createUsers(name, password, department, typeUser) {

    const sql = "INSERT INTO users(name, password, department, typeUser) VALUES (?,?,?,?)";

    const bdInfo = [name, password, department, typeUser];

    console.log("Executando query:", sql, bdInfo);

    try {

        await pool.query(sql, bdInfo);

    }
    catch (error) {

        console.error("Erro ao executar query no createUsers:", error);

        throw error;
    }
}

//PUT
async function updateUsers(name, password, department, typeUser, Enabled, id) {

    const sql = "UPDATE users SET name = ?, password = ?, department = ?,  typeUser = ?, Enabled = ? WHERE id_user = ?"

    const bdInfo = [name, password, department, typeUser, Enabled, id]

    await pool.query(sql, bdInfo)

}


export default { getUsers, createUsers, updateUsers, getUser }; 