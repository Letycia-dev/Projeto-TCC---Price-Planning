// import database from '../repository/mysql.js'

// //GET

// async function listMDF(codigoBusca) {
//     const sql = "SELECT * FROM Historico_de_mudanca_de_fator WHERE deletado = 0 AND codigo = ?";
//     const conn = await database.connectDB();

//     try {
//         const [rows] = await conn.query(sql, [codigoBusca]);
//         return rows
//     } catch (error) {
//         console.error("Erro ao executar query no listMDF:", error);
//         throw error;
//     }   finally {
//         conn.end();
//     }
// }


// //POST


// async function createMDF(codigo, ano_base, fator_de_ajuste_MOD, fator_de_ajuste_MAQ) {
//     const sql = "INSERT INTO Historico_de_mudanca_de_fator(codigo, ano_base, fator_de_ajuste_MOD, fator_de_ajuste_MAQ) VALUES (?,?,?,?)";

//     const bdInfo = [codigo, ano_base, fator_de_ajuste_MOD, fator_de_ajuste_MAQ];

//     const conn = await database.connectDB();
//     await conn.query(sql, bdInfo);
//     conn.end();
// }


// /*
// async function Atualizar_maq({ajuste_Maq, ajuste_MO, Data, User}) {

//     // Query para o banco para atulizar o custo de maquina

//     const sql = `UPDATE Maquinas SET energia_gas_anterior = energia_gas, energia_gas = energia_gas * ?, mod_encargos_anterior = mod_encargos ,  mod_encargos = mod_encargos * ?; 
//                  insert into Historico_de_mudanca_de_fator(Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User) value(?, ?, ?, ?);`;

//     const bdInfo = [ajuste_Maq, ajuste_MO, Data, ajuste_Maq, ajuste_MO, User]

//     // Conectar ao banco de dados
//     const conn = await database.connectDB();

//     await conn.query(sql, bdInfo)
    
//     conn.end()

// }

// */



// //PUT


// async function updateMDF(codigo, ano_base, fator_de_ajuste_MOD, fator_de_ajuste_MAQ) {

//     const sql = "UPDATE Historico_de_mudanca_de_fator SET codigo = ?, ano_base = ?, fator_de_ajuste_MOD = ? , fator_de_ajuste_MAQ = ?"

//     const bdInfo = [codigo, ano_base, fator_de_ajuste_MOD, fator_de_ajuste_MAQ]

//     const conn = await database.connectDB();

//     await conn.query(sql, bdInfo)
//     conn.end();
// }

// //DELETE


// async function deleteMDF(codigo) {
//     const sql = "UPDATE Historico_de_mudanca_de_fator SET deletado = 1 WHERE codigo = ?"

//     const conn = await database.connectDB();
//     await conn.query(sql, codigo);
//     conn.end();
// }

// export default { createMDF, updateMDF, deleteMDF, listMDF };