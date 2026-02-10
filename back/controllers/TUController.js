import express from 'express';
import service from '../service/TUService.js';

const route = express.Router();

route.get("/Get", async (request, response) => {

  try {
    const teste_utilizado = await service.listTU();
    if (teste_utilizado.length === 0) {
      return response.status(404).send({ message: "Teste não encontrado." });
    }
    response.setHeader('Content-Type', 'application/json');
    return response.status(200).send(teste_utilizado);
  } catch (error) {
    console.error("Erro no GET", error);
    return response.status(500).send({ message: "Erro interno do servidor." });
  }

});

route.post("/Post", async (request, response) => {

  const { Descricao_Test, Custo, ID_Orcamento } = request.body;

  try {
    
    await service.createTU(Descricao_Test, Custo, ID_Orcamento);
    return response.status(201).send({ message: "Teste cadastrado com sucesso" });
  } catch (err) {
    console.log(err);
    return response.status(500).send(`Erro : ${err}`);
  }

});

route.put("/Put/:ID", async (request, response) => {

  const { Descricao_Test, Custo, ID_Orcamento } = request.body;
  const { ID } = request.params;

  try {
    await service.updateTU(Descricao_Test, Custo, ID_Orcamento, ID);
    return response.status(201).send({ message: "Teste atualizado com sucesso" });
  } catch (err) {
    return response.status(500).send(`Erro : ${err}`);
  }
  
});

export default route;
