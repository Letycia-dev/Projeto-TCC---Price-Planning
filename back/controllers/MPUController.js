import express from "express";
import service from '../service/MPUService.js'

const route = express.Router();

//GET
route.get("/Get", async (request, response) => {
    try {
        const mp_utilizada = await service.listMPU();
        if (mp_utilizada.length === 0) {
            return response.status(404).send({ message: "Matéria-prima não encontrada." });
        }
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(mp_utilizada);
    } catch (error) {
        console.error("Erro no GET", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//GET:Codigo
route.get("/Get/:ID", async (request, response) => {
    try {
        const { ID } = request.params;
        const mp_utilizada = await service.changeMPU(ID);
        if (mp_utilizada.length === 0) {
            return response.status(404).send({ message: "Matéria-prima não encontrada." });
        }
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(mp_utilizada);
    } catch (err) {
        console.log("Erro: ", err);
        return response.status(500).send(`Erro : ${err}`)
    }
});

//POST
route.post("/Post", async (request, response) => {
    const { Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento } = request.body;

    try {
        await service.createMPU(Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento)
        return response.status(201).send({ "message": "Matéria Prima cadastrada com sucesso" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).send(`Erro : ${err}`)
    }
})

//PUT
route.put("/Put/:ID", async (request, response) => {
    try {
        const { Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento } = request.body;
        const { ID } = request.params;

        await service.updateMPU(Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento, ID);
        return response.status(201).send({ message: "Matéria Prima atualizada com sucesso" });
    }
    catch (err) {
        return response.status(500).send(`Erro : ${err}`)
    }
})

export default route;