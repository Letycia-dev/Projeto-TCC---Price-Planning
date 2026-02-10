import service from '../service/OBVService.js';
import express from 'express';

const route = express.Router();


route.get("/Get", async (request, response) => {
    try {
        const observacao_vendas = await service.listOBV(); 
        
        if (observacao_vendas.length === 0) {
            return response.status(404).send({ message: "Observação não encontrada." });
        }

        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(observacao_vendas);

    } catch (error) {
        console.error("Erro no GET", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});


route.post("/Post", async (request, response) => {
    const { obs, id_orc } = request.body;

    try {
        await service.createOBV(obs, id_orc); 
        return response.status(201).send({ message: "Observação cadastrada com sucesso" });

    } catch (err) {
        console.log(err);
        return response.status(500).send(`Erro : ${err}`);
    }
});


route.put("/Put/:id", async (request, response) => {
    const { obs, id_orc } = request.body;
    const { id } = request.params;

    try {
        await service.updateOBV(id, obs, id_orc); 
        return response.status(201).send({ message: "Observação atualizada com sucesso" });

    } catch (err) {
        return response.status(500).send(`Erro : ${err}`);
    }
});

export default route;
