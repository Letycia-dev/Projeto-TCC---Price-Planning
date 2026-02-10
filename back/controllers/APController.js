import express from "express";
import service from '../service/APService.js'
import serviceMachine from '../service/CMService.js';
import usersService from "../service/usersService.js";

const route = express.Router();

//GET

route.get("/", async (request, response) => {

    try {

        const aprovs = await service.listAP();

        if (aprovs.length === 0) {

            return response.status(404).send({ message: "Historico de aproveitamento não encontrado." });
        }

        for (const aprov of aprovs) {

            const [name_user] = await usersService.getUser(aprov.user)

            aprov.user = name_user.name

        }

        return response.status(200).send(aprovs);

    } catch (error) {

        console.error(error);

        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//Get: Maquinas para Calculo de Aproveitamento

route.get('/Get/Machine', async (request, response) => {

    try {

        const maquina = await serviceMachine.changeCMAprv();

        if (maquina.length === 0) {

            return response.status(404).send({ message: "Máquina não encontrada." });

        }

        response.setHeader('Content-Type', 'application/json');

        return response.status(200).send(maquina);

    } catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });

    }

})

//POST

route.post("/", async (request, response) => {

    const { codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
        medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
        espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
        pecas_por_material, user } = request.body;

    try {

        await service.createAP(codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
            medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
            espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
            pecas_por_material, user)

        return response.status(201).send({ "message": "Aproveitamento cadastrado com sucesso" });

    } catch (err) {

        console.log(err)

        return response.status(500).send(err)
    }

})

//PUT

route.put("/:ID_Aprov", async (request, response) => {

    const { ID_Aprov } = request.params;

    const { codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
        medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
        espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
        pecas_por_material, user } = request.body;

    try {

        await service.updateAP(codigo, versão_Item, comprimento, largura, espessura, volumes_Mes, codigo_MP,
            medida_MP, codigo_Maq, cavidades_comp, cavidades_larg, cavidades_totais, tipo_de_cavidade,
            espaçamento_entre_cavidades, N_Blanks_MT, N_Blanks_LG, ordem_da_Batida, N_de_Batidas,
            pecas_por_material, user, ID_Aprov);

        return response.status(201).send({ message: "Historico de aproveitamento atualizado com sucesso" });

    } catch (err) {

        console.log(err)

        return response.status(404).send({ message: `Erro ao cadastrar o aproveitamento: ${err}` })

    }

})

//PUT: Atualizar Maquinas do Aproveitamento

route.put('/putMac/:codigo', async (request, response) => {


    const { codigo } = request.params;

    const { descricao, comprimento, largura, aprov, espac_lamina } = request.body;

    try {

        await serviceMachine.updateMacAprov(descricao, comprimento, largura, aprov, espac_lamina, codigo)

        return response.status(201).send({ "message": "Máquina Atualizada" });

    } catch (err) {

        return response.status(200).send(err)

    }


})

//DELETE

route.delete("/:codigo", async (request, response) => {

    const { codigo } = request.params;

    await service.deleteAP(parseInt(codigo));

    return response.status(200).send({ message: "Aproveitamento deletado" });

});

export default route;