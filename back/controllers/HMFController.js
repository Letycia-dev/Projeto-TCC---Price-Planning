import express from "express";
import service from '../service/HMFService.js'
import usersService from "../service/usersService.js";

const route = express.Router();

//GET

route.get("/Get", async (request, response) => {

    try {

        const historico_mf = await service.listHMF();

        if (historico_mf.length === 0) {

            return response.status(404).send({ message: "Historico de mudanca de fator não encontrado." });

        }

        for (const mud_fator of historico_mf) {

            const [name_user] = await usersService.getUser(mud_fator.Altercao_User)

            mud_fator.Altercao_User = name_user.name

        }

        response.setHeader('Content-Type', 'application/json');

        return response.status(200).send(historico_mf);

    }

    catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });

    }

});


//POST

route.post("/Post", async (req, res) => {
    const { Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User } = req.body;

    try {
        await service.createHMF(Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User);
        return res.status(201).send({ message: "Fator cadastrado com sucesso." });
    } catch (err) {
        return res.status(500).send({
            message: "Erro interno ao cadastrar fator.",
            error: err.message
        });
    }
});


//PUT

route.put("/Put/:ID_Fator", async (req, res) => {
    const { Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User } = req.body;
    const { ID_Fator } = req.params;

    try {
        await service.updateHMF(Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User, ID_Fator);
        return res.status(200).send({ message: "Fator atualizado com sucesso." });
    } catch (err) {
        return res.status(500).send({
            message: "Erro interno ao atualizar fator.",
            error: err.message
        });
    }
});

route.delete("/Delete/:ID_Fator", async (request, response) => {

    const { ID_Fator } = request.params;

    await service.deleteHMF(parseInt(ID_Fator));
    return response.status(200).send({ message: "Ajuste deletado" });

});




export default route;