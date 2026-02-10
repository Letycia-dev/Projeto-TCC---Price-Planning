import express from "express";
import MPController from "./controllers/MPController.js";
import CMController from "./controllers/CMController.js"
import APController from "./controllers/APController.js"
import HMFController from "./controllers/HMFController.js"
import loginController from "./controllers/loginController.js"
import usersController from "./controllers/usersController.js"
import HOController from "./controllers/HOController.js"
import { verifyJWT } from "./middleware/jwt.js";

const routes = express();

routes.use("/Materia_prima", verifyJWT, MPController);
routes.use("/Custo_maquina", verifyJWT, CMController);
routes.use("/Historico_Aproveitamento",verifyJWT, APController);
routes.use("/Mudanca_Fator", verifyJWT, HMFController);
routes.use("/Login", loginController);
routes.use("/Usuario", verifyJWT, usersController);
routes.use("/Orcamentos", verifyJWT, HOController);

export default routes;