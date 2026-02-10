import express from "express";
import service from '../service/HOservice.js'
import userSevice from '../service/usersService.js'
import machineService from '../service/CMService.js'
import fuService from '../service/FUService.js'
import mpuService from "../service/MPUService.js"
import mquService from "../service/MQUService.js"
import tuService from "../service/TUService.js"

const route = express.Router();

//                                                               CÓDIGO ORCAMENTO

//GET

route.get("/Get", async (request, response) => {

    try {

        const orcamentos = await service.listOrcs();

        if (orcamentos.length === 0) {

            return response.status(404).send({ message: "Orçamento não encontrado." });

        }

        const orcamentosFormatados = [];

        for (const orc of orcamentos) {

            const [name_user] = await userSevice.getUser(orc.orcamentista);

            const MP_Utilizada = await mpuService.changeMPU(orc.id_orcamento);

            const Maquinas_Utilizadas = await mquService.changeMQU(orc.id_orcamento);

            const Ferramentas_Utilizadas = await fuService.changeFU(orc.id_orcamento);

            const Testes_Utilizados = await tuService.changeTU(orc.id_orcamento);

            const updatedOrc = {

                ...orc,

                orcamentista: name_user.name,
                MP_Utilizada: MP_Utilizada,
                Maquinas_Utilizadas: Maquinas_Utilizadas,
                Ferramentas_Utilizadas: Ferramentas_Utilizadas,
                Testes_Utilizados: Testes_Utilizados


            };

            orcamentosFormatados.push(updatedOrc);
        }

        response.setHeader('Content-Type', 'application/json');

        return response.status(200).send(orcamentosFormatados);
    }
    catch (error) {

        console.error("Erro no GET", error);

        return response.status(500).send({ message: "Erro interno do servidor." });

    }
});

//Get para Puxar as Maquinas

route.get('/Machines', async (request, response) => {

    try {

        const machines = await machineService.changeCMOrc();

        if (machines.length == 0) {

            return response.status(404).send({ message: "Orçamento não encontrado." });

        }

        return response.status(200).send({ message: machines });

    } catch (err) {

        console.error("Erro no GET", err);

        return response.status(500).send({ message: "Erro interno do servidor." });

    }

});

//POST

route.post("/Post", async (request, response) => {

    const { cod_cliente, nome_do_cliente, tipo, codigo, versao_item,
        planta, data, descricao, codigo_desenho, unidade, comprimento,
        largura, espessura, tipo_vlm, volume_mes, custo_total_MP,
        observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta,
        observacao_Ferramenta, custo_total_Teste, observacao_Teste,
        custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado,
        pis_considerado, confins_considerado, custo_fixo,
        despesas_gerais, custo_financeiro, frete, margem,
        preco_final_s_imposto, preco_final_c_imposto, lta,
        bussines_link, custo_adicional, department,
        orcamentista, MP_Utilizada, Maquinas_Utilizadas, Ferramentas_Utilizadas,
        Testes_Utilizados } = request.body;

    try {

        const id_Orc = await service.createOrcs(cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta,
            data, descricao, codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm,
            volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ,
            custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste,
            custo_total_Proc, scrap, CT_Proc_C_Scrap, icms_considerado, pis_considerado,
            confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem,
            preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista);

        MP_Utilizada.map(async (MP) => {

            await mpuService.createMPU(MP.Codigo_MP, MP.Ordem, MP.Quantidade, MP.Preco_Considerado, id_Orc)

        });

        Maquinas_Utilizadas.map(async (Maq) => {

            await mquService.createMQU(Maq.Codigo_Maquina, Maq.Ordem, Maq.Descricao_Operacao, Maq.Unidade_Operacao, Maq.Qtd_Por_Operecao,
                Maq.Pecas_Hora, Maq.Taxa_Hora_Considerada, id_Orc)

        });

        Ferramentas_Utilizadas.map(async (Ferr) => {

            await fuService.createFU(Ferr.Codigo_Ferramenta, Ferr.Descricao_Ferramenta, Ferr.Quantidade, Ferr.Custo, Ferr.Diluicao_Meses, Ferr.Diluicao_Pecas, id_Orc)

        });

        Testes_Utilizados.map(async (Test) => {

            await tuService.createTU(Test.Descricao_Test, Test.Quantidade, Test.Custo, id_Orc)

        });

        return response.status(201).send({ "message": "Orcamento cadastrado com sucesso" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).send(`Erro : ${err}`)
    }

});

//PUT

route.put("/Put/:id_orcamento", async (request, response) => {

    const { id_orcamento } = request.params;

    const { cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao,
        codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes,
        custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta,
        observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap,
        CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo,
        despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto, preco_final_c_imposto,
        lta, bussines_link, custo_adicional, department, orcamentista, MP_Utilizada,
        Maquinas_Utilizadas, Ferramentas_Utilizadas, Testes_Utilizados } = request.body;

    try {

        await service.updateOrcs(cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao, codigo_desenho, unidade,
            comprimento, largura, espessura, tipo_vlm, volume_mes, custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ,
            custo_total_Ferramenta, observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap, CT_Proc_C_Scrap,
            icms_considerado, pis_considerado, confins_considerado, custo_fixo, despesas_gerais, custo_financeiro, frete, margem,
            preco_final_s_imposto, preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista, id_orcamento);

        MP_Utilizada.map(async (MP) => {

            if (MP.ID !== null && MP.Ordem !== null) {

                await mpuService.updateMPU(MP.Codigo_MP, MP.Ordem, MP.Quantidade, MP.Preco_Considerado, MP.ID)

            }

            else if (MP.ID == null && MP.Ordem !== null) {

                await mpuService.createMPU(MP.Codigo_MP, MP.Ordem, MP.Quantidade, MP.Preco_Considerado, id_orcamento);
            }

            else {

                await mpuService.deleteMPU(MP.ID)

            }

        });

        Maquinas_Utilizadas.map(async (Maq) => {

            if (Maq.ID_Proc !== null && Maq.Ordem !== null) {

                await mquService.updateMQU(Maq.Codigo_Maquina, Maq.Ordem, Maq.Descricao_Operacao, Maq.Unidade_Operacao, Maq.Qtd_Por_Operecao, Maq.Pecas_Hora,
                    Maq.Taxa_Hora_Considerada, Maq.ID_Proc)
            }

            else if (Maq.ID_Proc == null && Maq.Ordem !== null) {

                await mquService.createMQU(Maq.Codigo_Maquina, Maq.Ordem, Maq.Descricao_Operacao, Maq.Unidade_Operacao, Maq.Qtd_Por_Operecao,
                    Maq.Pecas_Hora, Maq.Taxa_Hora_Considerada, id_orcamento)
            }

            else {

                await mquService.deleteMQU(Maq.ID_Proc)

            }


        });

        Ferramentas_Utilizadas.map(async (Ferr) => {

            if (Ferr.id !== null && Ferr.Codigo_Ferramenta !== null) {

                await fuService.updateFU(Ferr.Descricao_Ferramenta, Ferr.Quantidade, Ferr.Custo, Ferr.Diluicao_Meses,
                    Ferr.Diluicao_Pecas, Ferr.Codigo_Ferramenta)

            }

            else if (Ferr.id == null && Ferr.Codigo_Ferramenta !== null) {

                await fuService.createFU(Ferr.Codigo_Ferramenta, Ferr.Descricao_Ferramenta, Ferr.Quantidade,
                    Ferr.Custo, Ferr.Diluicao_Meses, Ferr.Diluicao_Pecas, id_orcamento)

            }

            else {

                await fuService.deleteFU(Ferr.id)

            }
        });

        Testes_Utilizados.map(async (Test) => {

            if (Test.ID !== null && Test.Descricao_Test !== null) {

                await tuService.updateTU(Test.Descricao_Test, Test.Custo, Test.ID)

            }

            else if (Test.ID == null && Test.Descricao_Test !== null) {

                await tuService.createTU(Test.Descricao_Test, Test.Quantidade, Test.Custo, id_orcamento)

            }

            else {

                await tuService.deleteTU(Test.ID)

            }
        });

        return response.status(201).send({ "message": "Orcamento atualizado com sucesso" });
    }
    catch (err) {

        console.log(err)

        return response.status(500).send(`Erro : ${err}`)
    }

});

//DELETE

route.delete("/Delete/:id_orcamento", async (request, response) => {

    const { id_orcamento } = request.params;

    try {

        await mpuService.deleteMPUORC(id_orcamento);

        await mquService.deleteMQUORC(id_orcamento);

        await fuService.deleteFUORC(id_orcamento);

        await tuService.deleteTUORC(id_orcamento);

        await service.deleteOrcs(id_orcamento);

        return response.status(200).send({ message: "Orçamento deletado" });

    }
    catch (err) {

        console.log(err)

        return response.status(500).send(`Erro : ${err}`)
    }
});


export default route;