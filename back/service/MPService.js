import pool from '../repository/mysql.js';

//GET

async function listMP() {

    const sql = "SELECT * FROM Materia_Prima";

    const [rows] = await pool.query(sql);

    return rows;
}

//GET: ORC

async function autoFillOrc(cod) {

    const SQL = 'Select descricao, unid_medida, preco_s_imposto, dt_ultimo_custo from Materia_Prima where codigo = ? and habilitado = true';

    const [rows] = await pool.query(SQL, cod);

    return rows;

}

//GET: Codigo

async function changeMP(codigo) {

    const sql = "SELECT comprimento_min,comprimento_nom,largura_min,largura_nom,espessura_min,espessura_nom  FROM Materia_Prima WHERE codigo = ? and habilitado = 1;";

    const bdInfo = [codigo]

    const [rows] = await pool.query(sql, bdInfo);

    return rows;
}

//POST

async function createMP(codigo, unid_medida, descricao, comprimento_min, comprimento_nom, largura_min, largura_nom, espessura_min, espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto, dt_ultimo_custo, observacao_custo) {
    const sql = "INSERT INTO Materia_Prima(codigo, unid_medida, descricao, comprimento_min, comprimento_nom, largura_min, largura_nom, espessura_min, espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto, dt_ultimo_custo, observacao_custo ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    const bdInfo = [codigo, unid_medida, descricao, comprimento_min, comprimento_nom, largura_min, largura_nom, espessura_min, espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto, dt_ultimo_custo, observacao_custo];

    await pool.query(sql, bdInfo);
}

//PUT

async function updateMP(unid_medida, descricao, comprimento_min, comprimento_nom, largura_min, largura_nom, espessura_min, espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto, dt_ultimo_custo, observacao_custo, habilitado, codigo) {

    const sql = "UPDATE Materia_Prima SET unid_medida = ?, descricao = ?, comprimento_min = ?, comprimento_nom = ?, largura_min = ?, largura_nom = ?, espessura_min = ?, espessura_nom = ?, preco_c_imposto = ?, fator_conv = ?, preco_s_imposto = ?, dt_ultimo_custo = ?, observacao_custo = ?, habilitado = ? WHERE codigo = ? "

    const bdInfo = [unid_medida, descricao, comprimento_min, comprimento_nom, largura_min, largura_nom, espessura_min, espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto, dt_ultimo_custo, observacao_custo, habilitado, codigo]

    await pool.query(sql, bdInfo)
}

// PUT COST

async function updateAC(codigo, custo, data_custo) {

    const sql = `UPDATE Materia_Prima SET preco_s_imposto = ?, dt_ultimo_custo = ?, preco_c_imposto = ?, fator_conv = 0 WHERE codigo = ?`;

    const bdInfo = [custo, data_custo, custo, codigo];

    await pool.query(sql, bdInfo);
}


export default { listMP, changeMP, createMP, updateMP, updateAC, autoFillOrc };