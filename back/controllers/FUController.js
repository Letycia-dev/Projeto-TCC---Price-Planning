import express from "express";
import service from '../service/FUService.js'; 

const route = express.Router();

route.get("/Get", async (request, response) => {

    try {
        const ferramentas = await service.listFU();
        if (ferramentas.length === 0) {
            return response.status(404).send({ message: "Ferramenta não encontrada." });
        }
        response.setHeader('Content-Type', 'application/json');
        return response.status(200).send(ferramentas);
    } catch (error) {
        console.error("Erro no GET", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }

});

route.post("/Post", async (request, response) => {

    const { Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo,
            Diluicao_Meses, Diluicao_Pecas, ID_Orcamento } = request.body;

    try {
        await service.createFU(Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo, 
                               Diluicao_Meses, Diluicao_Pecas, ID_Orcamento);
        return response.status(201).send({ message: "Ferramenta cadastrada com sucesso" });
    } catch (err) {
        console.log(err);
        return response.status(500).send(`Erro : ${err}`);
    }

});

route.put("/Put/:Codigo_Ferramenta", async (request, response) => {

    const { Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, ID_Orcamento } = request.body;
    const { Codigo_Ferramenta } = request.params;

    try {
        await service.updateFU(Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, Diluicao_Pecas, ID_Orcamento, Codigo_Ferramenta);
        return response.status(201).send({ message: "Ferramenta atualizada com sucesso" });
    } catch (err) {
        return response.status(500).send(`Erro : ${err}`);
    }
    
});

export default route;
