import pool from '../repository/mysql.js';

async function recalcularFatores() {
    await pool.query(`
        UPDATE Maquinas 
        SET 
            energia_gas = energia_gas_base,
            mod_encargos = mod_encargos_base
        WHERE habilitado = true
    `);

    const [fatores] = await pool.query(`
        SELECT Reajuste_MAQ, Reajuste_MO 
        FROM Historico_de_mudanca_de_fator 
        ORDER BY Data_de_Atualizacao ASC
    `);

    for (const fator of fatores) {
        const reajusteMAQ = fator.Reajuste_MAQ;
        const reajusteMO = fator.Reajuste_MO;

        await pool.query(`
            UPDATE Maquinas 
            SET 
                energia_gas = energia_gas + (energia_gas_base * (? / 100)),
                mod_encargos = mod_encargos + (mod_encargos_base * (? / 100))
            WHERE habilitado = true
        `, [reajusteMAQ, reajusteMO]);
    }
}

// GET
async function listHMF() {
    const sql = "SELECT * FROM Historico_de_mudanca_de_fator";
    const [rows] = await pool.query(sql);
    return rows;
}

// GET: ID
async function changeHMF(ID_Fator) {
    const sql = `SELECT Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User 
                 FROM Historico_de_mudanca_de_fator 
                 WHERE ID_Fator = ?`;
    const [rows] = await pool.query(sql, [ID_Fator]);
    return rows;
}

// POST
async function createHMF(Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User) {
    const sqlInsert = `
        INSERT INTO Historico_de_mudanca_de_fator 
        (Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User) 
        VALUES (?, ?, ?, ?)`;

    const bdInfo = [Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User];
    await pool.query(sqlInsert, bdInfo);

    await recalcularFatores();
}


// PUT
async function updateHMF(Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User, ID_Fator) {
    const sql = `
        UPDATE Historico_de_mudanca_de_fator 
        SET Data_de_Atualizacao = ?, Reajuste_MAQ = ?, Reajuste_MO = ?, Altercao_User = ? 
        WHERE ID_Fator = ?`;

    const bdInfo = [Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User, ID_Fator];
    await pool.query(sql, bdInfo);
    await recalcularFatores();


}

// DELETE
async function deleteHMF(ID_Fator) {
    const sql = `DELETE FROM Historico_de_mudanca_de_fator WHERE ID_Fator = ?`;
    await pool.query(sql, [ID_Fator]);
    await recalcularFatores();

}

export default { listHMF, changeHMF, createHMF, updateHMF, deleteHMF, recalcularFatores };
