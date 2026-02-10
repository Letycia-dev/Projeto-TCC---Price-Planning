import express from "express";
import service from '../service/usersService.js'

const route = express.Router();

//GET
route.get("/Get", async (request, response) => {

    try {

        const users = await service.getUsers();

        if (users.length === 0) {

            return response.status(404).send({ message: "Usuario não encontrado." });
        }

        return response.status(200).send(users);

    } catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//GET USER
route.get("/Get/:id_user", async (request, response) => {

    const { id_user } = request.params;

    try {

        const user = await service.getUser(id_user);

        if (user.length === 0) {

            return response.status(404).send({ message: "Usuario não encontrado." });
        }

        return response.status(200).send(user);

    } catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

//POST
route.post("/Post", async (req, res) => {

    const { name, password, department, typeUser } = req.body;

    if (!name || !password || !department || !typeUser) {

        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {

        await service.createUsers(name, password, department, typeUser);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

    } catch (err) {

        console.error("Erro no POST:", err);

        return res.status(500).json({ error: err.message });

    }
});

//PUT
route.put("/Put/:id", async (request, response) => {

    const { name, password, department, typeUser, enabled } = request.body;

    const { id } = request.params;

    await service.updateUsers(name, password, department, typeUser, enabled, id);

    return response.status(201).send({ message: "Usuario atualizado com sucesso" });

});

export default route;