import express from "express";
import service from '../service/MQUService.js'

const route = express.Router();

//GET
route.get("/Get", async (request, response) => {
    try {
        const mq_utilizada = await service.listMQU();
        if (mq_utilizada.length === 0) {
            return response.status(404).send({ message: "Maquinas não encontrada." });
        }
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(mq_utilizada);
    } catch (error) {
        console.error("Erro no GET", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//GET:Codigo
route.get("/Get/:ID_Proc", async (request, response) => {
    try {
        const { ID_Proc } = request.params;
        const mq_utilizada = await service.changeMQU(ID_Proc);
        if (mq_utilizada.length === 0) {
            return response.status(404).send({ message: "Maquinas não encontrada." });
        }
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(mq_utilizada);
    } catch (err) {
        console.log("Erro: ", err);
        return response.status(500).send(`Erro : ${err}`)
    }
});

//POST
route.post("/Post", async (request, response) => {
    const { Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento } = request.body;

    try {
        await service.createMQU(Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)
        return response.status(201).send({ "message": "Maquinas cadastrada com sucesso" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).send(`Erro : ${err}`)
    }
})

//PUT
route.put("/Put/:ID_Proc", async (request, response) => {
    try {
        const { Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento } = request.body;
        const { ID_Proc } = request.params;

        await service.updateMQU(Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento, ID_Proc);
        return response.status(201).send({ message: "Maquinas atualizada com sucesso" });
    }
    catch (err) {
        return response.status(500).send(`Erro : ${err}`)
    }
})

export default route;