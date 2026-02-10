import express, { request, response } from "express";
import service from '../service/MPService.js'

const route = express.Router();

//GET
route.get("/Get", async (request, response) => {

    try {

        const materia_prima = await service.listMP();

        if (materia_prima.length === 0) {

            return response.status(404).send({ message: "Matéria-prima não encontrada." });

        }

        response.setHeader('Content-Type', 'application/json');

        return response.status(200).send(materia_prima);

    } catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });

    }

});

//GET:Codigo
route.get("/Get/:codigo", async (request, response) => {

    const { codigo } = request.params;

    console.log(codigo);

    try {

        const materia_prima = await service.changeMP(codigo);

        if (materia_prima.length === 0) {

            return response.status(404).send({ message: "Matéria-prima não encontrada." });

        }

        // Forçando o content-type para JSON
        response.setHeader('Content-Type', 'application/json');

        return response.status(200).send(materia_prima);

    } catch (err) {

        console.log("Erro: ", err);

        return response.status(500).send(`Erro : ${err}`)

    }

});

//GET: Orc

route.get('/Get/AutoFill/:cod', async (request, response) => {

    const { cod } = request.params;

    try {

        const dataMP = await service.autoFillOrc(cod);

        if (dataMP.length == 0) {

            return response.status(404).send({ message: "Matéria-prima não encontrada." });

        }

        return response.status(200).send({ message: dataMP })

    } catch (err) {

        console.log("Erro: ", err);

        return response.status(500).send(`Erro : ${err}`)

    }

})

//POST
route.post("/Post", async (request, response) => {

    const { codigo, unid_medida, descricao, comprimento_min,
        comprimento_nom, largura_min, largura_nom, espessura_min,
        espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto,
        dt_ultimo_custo, observacao_custo } = request.body;

    try {

        await service.createMP(codigo, unid_medida, descricao, comprimento_min,
            comprimento_nom, largura_min, largura_nom, espessura_min,
            espessura_nom, preco_c_imposto, fator_conv, preco_s_imposto,
            dt_ultimo_custo, observacao_custo)

        return response.status(201).send({ "message": "Materia Prima cadastrada com sucesso" });

    } catch (err) {

        console.log(err)

        return response.status(500).send(`Erro : ${err}`)

    }

})

//PUT
route.put("/Put/:codigo", async (request, response) => {

    try {

        const { unid_medida, descricao, comprimento_min, comprimento_nom,
            largura_min, largura_nom, espessura_min, espessura_nom,
            preco_c_imposto, fator_conv, preco_s_imposto, dt_ultimo_custo,
            observacao_custo, habilitado } = request.body;

        const { codigo } = request.params;

        await service.updateMP(unid_medida, descricao, comprimento_min,
            comprimento_nom, largura_min, largura_nom,
            espessura_min, espessura_nom, preco_c_imposto,
            fator_conv, preco_s_imposto, dt_ultimo_custo,
            observacao_custo, habilitado, codigo);

        return response.status(201).send({ message: "Materia Prima atualizada com sucesso" });

    } catch (err) {

        return response.status(500).send(`Erro : ${err}`)

    }

})

// PUT CUST
route.put("/atualiza_custo", async (request, response) => {

    try {

        const dadosRecebidos = request.body;

        for (let mp in dadosRecebidos) {

            const { codigo, custo, data } = dadosRecebidos[mp]

            await service.updateAC(codigo, custo, data)

        }

        return response.status(201).send({ message: "Deu bom" });

    } catch (error) {

        return response.status(500).send(`Erro : ${error}`)
    }

});


export default route;