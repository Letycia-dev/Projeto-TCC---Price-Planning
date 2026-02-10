import express from "express";
import service from '../service/CMService.js'

const route = express.Router();

//GET

route.get("/Get", async (request, response) => {

    try {
        const maquina = await service.listCM();
        if (maquina.length === 0) {
            return response.status(404).send({ message: "Máquina não encontrada." });
        }

        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(maquina);

    } catch (error) {
        console.error("Erro no GET", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//GET:Codigo

route.get("/Get/:Codigo_Maquina", async (request, response) => {

    try {
        const { Codigo_Maquina } = request.params;
        const maquina = await service.changeCM(Codigo_Maquina);
        console.log("Dados de maquina:", maquina);
        if (maquina.length === 0) {
            return response.status(404).send({ message: "Maquina não encontrada." });
        }
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(maquina);
    } catch (err) {
        console.log("Erro: ", err);
        return response.status(500).send(`Erro : ${err}`)
    }
})

route.post("/Post", async (request, response) => {
    const formData = request.body;
    try {
        await service.createCM(
            formData.Codigo_Maquina || 0,
            formData.descricao || '',
            formData.comprimento || 0,
            formData.largura || 0,
            formData.pecas_hora || 0,
            formData.custo_reposicao || 0,
            formData.amortizacao || 0,
            formData.cust_maquina || 0,
            formData.manutencao || 0,
            formData.energia_gas || 0,
            formData.insumo || 0,
            formData.total_maq || 0,
            formData.qtd_operadores || 0,
            formData.mod_encargos || 0,
            formData.total_mod || 0,
            formData.eficiencia_maq || 0,
            formData.eficiencia_ope || 0,
            formData.eficiencia_pro || 0,
            formData.taxa_hora || 0,
            formData.unidade || 'M',
            formData.ano_base || null,
            formData.mod_auxiliar_encargos || 0
        );
        return response.status(201).send({ message: "Custo máquina cadastrado com sucesso" });
    } catch (err) {
        console.error("Erro no POST /Custo_maquina/Post:", err);
        return response.status(500).send({
            message: "Erro interno ao cadastrar máquina",
            error: err.message
        });
    }
});

route.put("/Put/:Codigo_Maquina", async (request, response) => {
    const formData = request.body;
    const { Codigo_Maquina } = request.params;

    try {
        await service.updateCM(
            formData.descricao || '',
            formData.comprimento || 0,
            formData.largura || 0,
            formData.pecas_hora || 0,
            formData.custo_reposicao || 0,
            formData.amortizacao || 0,
            formData.cust_maquina || 0,
            formData.manutencao || 0,
            formData.energia_gas || 0,
            formData.insumo || 0,
            formData.total_maq || 0,
            formData.qtd_operadores || 0,
            formData.mod_encargos || 0,
            formData.total_mod || 0,
            formData.eficiencia_maq || 0,
            formData.eficiencia_ope || 0,
            formData.eficiencia_pro || 0,
            formData.taxa_hora || 0,
            formData.unidade || 'M',
            Codigo_Maquina
        );
        return response.status(200).send({ message: "Custo Máquina atualizado com sucesso" });
    } catch (err) {
        console.error("Erro no PUT /Custo_maquina/Put:", err);
        return response.status(500).json({
            message: "Erro interno ao atualizar máquina",
            error: err.message,
            stack: err.stack
        });
    }
});

route.put("/Delete/:Codigo_Maquina", async (request, response) => {
    const { Codigo_Maquina } = request.params;

    await service.deleteCM(parseInt(Codigo_Maquina));
    return response.status(200).send({ message: "Maquina desativada" });
});

export default route;