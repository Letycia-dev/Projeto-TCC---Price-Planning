create database Price_Planning;
drop database Price_Planning;
use Price_Planning;

							# MATERIA PRIMA
                            
create table Materia_Prima(

	 codigo 			varchar(6) not null primary key,
     unid_medida		char(2),
     descricao 			varchar(60) not null,
     comprimento_min 	int (6),
     comprimento_nom 	int (6),
     largura_min		int(4),
     largura_nom		int(4),
     espessura_min 		int(4),
     espessura_nom 		int(4),
     preco_c_imposto	decimal(10,6) not null,
     fator_conv     	decimal(10,6) not null,
     preco_s_imposto	decimal(10,6) not null,
     dt_ultimo_custo 	date not null,
     observacao_custo	varchar(40),
     habilitado			boolean default true

);

Select descricao, unid_medida, preco_s_imposto, dt_ultimo_custo from Materia_Prima where codigo = 22106;

select * from  Materia_Prima;

drop table Materia_Prima;

							# INSERTS MATERIA-PRIMA

INSERT INTO Materia_Prima VALUES 
('MP0001', 'MM', 'Espuma PU Poliester D23', 1000, 1200, 500, 600, 3, 5, 25.000000, 0.850000, 21.250000, '2025-06-01', 'Compra local', true);

INSERT INTO Materia_Prima VALUES 
('MP0002', 'M2', 'Chapa de Alumínio', 800, 1000, 600, 600, 2, 2, 18.500000, 0.900000, 16.650000, '2025-05-28', 'Fornecedor A', true);

INSERT INTO Materia_Prima VALUES 
('MP0003', 'UN', 'Tubo de PVC 50mm', 200, 250, 50, 50, 3, 3, 4.300000, 0.950000, 4.085000, '2025-06-05', 'Alta rotatividade', true);

INSERT INTO Materia_Prima VALUES 
('MP0004', 'KG', 'Cobre Eletrolítico', 500, 550, 100, 100, 1, 1, 76.000000, 0.920000, 69.920000, '2025-06-10', 'Oscilação de preço', true);

INSERT INTO Materia_Prima VALUES 
('MP0005', 'M2', 'Policarbonato Transparente', 600, 800, 700, 700, 4, 4, 32.000000, 0.870000, 27.840000, '2025-06-03', 'Importado', true);

INSERT INTO Materia_Prima VALUES 
('MP0006', 'L', 'Resina Epóxi', 0, 0, 0, 0, 0, 0, 55.000000, 0.890000, 48.950000, '2025-05-30', 'Usado em acabamento', true);

INSERT INTO Materia_Prima VALUES 
('MP0007', 'UN', 'Parafuso Inox M6', 0, 0, 0, 0, 0, 0, 0.150000, 0.970000, 0.145500, '2025-06-06', 'Pequeno insumo', true);

INSERT INTO Materia_Prima VALUES 
('MP0008', 'KG', 'Latão', 1200, 1300, 400, 500, 5, 5, 43.200000, 0.880000, 38.016000, '2025-06-08', 'Demanda sazonal', true);

INSERT INTO Materia_Prima VALUES 
('MP0009', 'M2', 'Madeira Compensada Naval', 1000, 1200, 1200, 1200, 10, 10, 28.000000, 0.910000, 25.480000, '2025-06-02', 'Alta resistência', true);

INSERT INTO Materia_Prima VALUES 
('MP0010', 'L', 'Óleo Lubrificante Industrial', 0, 0, 0, 0, 0, 0, 12.300000, 0.930000, 11.439000, '2025-06-04', 'Uso interno', true);

											#Usuarios
                                            
create table users(
	id_user 	int auto_increment primary key,
    name		varchar(90),
    password	varchar(64),
    department	Enum("Vendas", "Engenharia"),
    typeUser	enum('Administrador', 'Comum'),
    Enabled  	boolean default true
);

insert into users (name,password,department, typeUser) values ("João","123123",'Vendas','administrador');

insert into users (name,password,department, typeUser) values ("Leticia","123123",'Engenharia','comum');

insert into users (name,password,department, typeUser) values ("Lucas","123123",'Engenharia','administrador');

insert into users (name,password,department, typeUser) values ("Yohan","123123",'Engenharia','comum');

select * from  users;

drop table users;

update users set department = 'Engenharia' where id_user = 3;


							# HISTORICO DE ORÇAMENTO

CREATE TABLE historico_de_orcamento (
    id_orcamento 			 INT AUTO_INCREMENT,
    cod_cliente				 INT,
    nome_do_cliente 		 VARCHAR(41) NOT NULL,
    tipo 					 ENUM('RCA', 'MD', 'NB', 'PI') NOT NULL,
    codigo 				     INT(5) NOT NULL,
    versao_item 			 VARCHAR(2),
    planta 					 INT DEFAULT 1 NOT NULL,
    data 					 DATE NOT NULL,
    descricao 				 VARCHAR(60),
    codigo_desenho 			 VARCHAR(60),
    unidade 				 CHAR(2) NOT NULL,
    comprimento 			 INT(6) NOT NULL,
    largura 				 INT(6) NOT NULL,
    espessura 				 INT(6) NOT NULL,
    tipo_vlm 				 enum('Cliente', 'Lote Minimo') DEFAULT 'Cliente',
    volume_mes 			 	 INT NOT NULL,
	custo_total_MP           DECIMAL (10,6),
    observacao_MP			 varchar(150),
	custo_total_MQ           DECIMAL (10,6),
    observacao_MQ		     varchar(150),
    custo_total_Ferramenta   DECIMAL (10,6),
    observacao_Ferramenta	 varchar(150),
    custo_total_Teste        DECIMAL (8,2),
    observacao_Teste	 	 varchar(150),
    custo_total_Proc       	 DECIMAL (10,6),
    scrap					 decimal(3,1),
    CT_Proc_C_Scrap       	 DECIMAL (10,6),
    icms_considerado		 decimal(4,2),
    pis_considerado		 	 decimal(4,2),
    confins_considerado		 decimal(4,2),
    custo_fixo				 decimal(4,2),
    despesas_gerais			 decimal(4,2),
    custo_financeiro		 decimal(4,2),
    frete					 decimal(4,2),
    margem					 decimal(4,2),
    preco_final_s_imposto	 decimal(10,6),
    preco_final_c_imposto	 decimal(10,6),
    lta						 decimal(4,2),
    bussines_link			 decimal(4,2),
    custo_adicional			 decimal(4,2),
    department				 enum("Vendas", "Engenharia"),
    orcamentista			 int,
    
    
    CONSTRAINT pk_orcamento PRIMARY KEY (id_orcamento),
    constraint fk_orcamentista foreign key(orcamentista) references users(id_user)
);

select * from historico_de_orcamento;

drop table historico_de_orcamento;

							# INSERTS ORÇAMENTOS

INSERT INTO historico_de_orcamento (
    cod_cliente, nome_do_cliente, tipo, codigo, versao_item, planta, data, descricao,
    codigo_desenho, unidade, comprimento, largura, espessura, tipo_vlm, volume_mes,
    custo_total_MP, observacao_MP, custo_total_MQ, observacao_MQ, custo_total_Ferramenta,
    observacao_Ferramenta, custo_total_Teste, observacao_Teste, custo_total_Proc, scrap,
    CT_Proc_C_Scrap, icms_considerado, pis_considerado, confins_considerado, custo_fixo,
    despesas_gerais, custo_financeiro, frete, margem, preco_final_s_imposto,
    preco_final_c_imposto, lta, bussines_link, custo_adicional, department, orcamentista
) VALUES 
(101, 'Cliente A', 'RCA', 10001, 'A1', 1, '2025-06-01', 'Produto para linha A',
 'DES001', 'KG', 1200, 600, 5, 'Cliente', 5000, 2300.500000, 'Base em aço inox',
 1200.250000, 'Corte e dobra', 800.000000, 'Ferramenta padrão', 450.00, 'Teste elétrico',
 1320.750000, 2.5, 1353.769000, 18.00, 1.65, 7.60, 2.20, 4.50, 1.80, 3.20, 18.00,
 8032.350000, 8999.999999, 1.5, 0.8, 0.0, 'Vendas', 1),

(102, 'Cliente B', 'MD', 10002, 'B2', 1, '2025-06-02', 'Montagem de suporte metálico',
 'DES002', 'M2', 1000, 500, 3, 'Lote Minimo', 3000, 1800.000000, 'Chapa galvanizada',
 900.000000, 'Solda MIG', 450.000000, 'Nova ferramenta', 320.00, 'Teste mecânico',
 890.000000, 1.8, 906.020000, 17.00, 1.50, 7.00, 2.00, 4.00, 1.50, 2.80, 17.50,
 6265.070000, 7483.223000, 1.8, 1.2, 0.0, 'Engenharia', 2),

(103, 'Cliente C', 'NB', 10003, 'C1', 1, '2025-06-03', 'Perfil de alumínio',
 'DES003', 'KG', 1100, 550, 4, 'Cliente', 4000, 2100.750000, 'Liga 6061',
 1100.000000, 'Usinagem CNC', 700.000000, 'Ferramenta antiga', 200.00, 'Ensaio térmico',
 980.000000, 3.0, 1009.400000, 19.00, 1.65, 7.60, 2.10, 4.80, 1.70, 3.10, 18.50,
 7122.950000, 8585.311000, 1.6, 0.9, 0.2, 'Vendas', 3),

(104, 'Cliente D', 'PI', 10004, 'D1', 1, '2025-06-04', 'Capa protetora plástica',
 'DES004', 'UN', 20, 20, 20, 'Lote Minimo', 10000, 3500.000000, 'Material reciclado',
 2000.000000, 'Molde injetado', 950.000000, 'Desgaste moderado', 150.00, 'Ensaios de impacto',
 1450.000000, 1.5, 1471.750000, 16.00, 1.50, 6.00, 1.80, 3.70, 1.60, 2.50, 16.50,
 7830.000000, 8999.999999, 1.4, 1.0, 0.3, 'Engenharia', 4),

(105, 'Cliente E', 'RCA', 10005, 'E2', 1, '2025-06-05', 'Base para motor',
 'DES005', 'KG', 1300, 600, 6, 'Cliente', 6000, 2600.000000, 'Chapa de aço carbono',
 1300.000000, 'Corte laser', 900.000000, 'Projeto novo', 370.00, 'Teste de vibração',
 1190.000000, 2.0, 1213.800000, 18.50, 1.60, 7.20, 2.40, 4.60, 1.60, 3.30, 18.80,
 8610.500000, 9321.390000, 1.3, 1.1, 0.1, 'Vendas', 1),

(106, 'Cliente F', 'MD', 10006, 'F1', 1, '2025-06-06', 'Gabinete metálico',
 'DES006', 'M2', 1250, 750, 3, 'Lote Minimo', 4500, 2100.000000, 'Montagem soldada',
 1050.000000, 'Solda TIG', 850.000000, 'Ajuste fino', 290.00, 'Teste funcional',
 1250.000000, 2.7, 1284.750000, 17.80, 1.55, 6.90, 2.20, 4.20, 1.70, 3.00, 17.80,
 7820.000000, 8999.999999, 1.9, 0.8, 0.0, 'Engenharia', 2),

(107, 'Cliente G', 'NB', 10007, 'G1', 1, '2025-06-07', 'Tampa de proteção',
 'DES007', 'UN', 150, 150, 10, 'Cliente', 2000, 900.000000, 'ABS injetado',
 600.000000, 'Usinagem leve', 400.000000, 'Sem desgaste', 180.00, 'Teste de trinca',
 640.000000, 1.6, 652.240000, 15.90, 1.50, 6.20, 1.70, 3.60, 1.50, 2.30, 15.90,
 4620.000000, 5641.800000, 1.7, 1.3, 0.1, 'Vendas', 3),

(108, 'Cliente H', 'PI', 10008, 'H2', 1, '2025-06-08', 'Perfil extrudado',
 'DES008', 'KG', 1000, 500, 5, 'Lote Minimo', 3200, 1500.000000, 'Alumínio estrutural',
 700.000000, 'Fresa manual', 600.000000, 'Ferramenta especial', 140.00, 'Teste estrutural',
 790.000000, 2.1, 811.590000, 16.30, 1.55, 6.50, 2.00, 3.90, 1.40, 2.70, 16.00,
 6490.000000, 7938.300000, 1.5, 1.0, 0.2, 'Engenharia', 4),

(109, 'Cliente I', 'RCA', 10009, 'I1', 1, '2025-06-09', 'Estrutura reforçada',
 'DES009', 'M2', 1600, 800, 6, 'Cliente', 5500, 2400.000000, 'Chapa de aço reforçado',
 1250.000000, 'Corte plasma', 1000.000000, 'Protótipo', 420.00, 'Teste dinâmico',
 1300.000000, 2.8, 1336.400000, 19.00, 1.70, 7.80, 2.50, 4.90, 1.80, 3.60, 18.90,
 8640.000000, 9381.920000, 1.6, 1.2, 0.3, 'Vendas', 1),

(110, 'Cliente Internacional', 'MD', 10010, 'J2', 1, '2025-06-10', 'Tubo flangeado',
 'DES010', 'KG', 950, 400, 4, 'Cliente', 3700, 1700.000000, 'Tubo inox',
 800.000000, 'Curvamento', 500.000000, 'Ferramenta simples', 240.00, 'Teste de pressão',
 890.000000, 1.9, 907.910000, 17.60, 1.60, 7.30, 2.00, 4.30, 1.60, 3.10, 17.70,
 6570.000000, 7883.610000, 1.4, 0.9, 0.2, 'Engenharia', 2);


							# OBSERVAÇÃO DE VENDAS
                            
create table observacao_vendas(

	id		int auto_increment,
    obs		varchar(100),
    id_orc	int,
    
    constraint PK_ObsVendas primary key(id),
    constraint FK_Orc foreign key(id_orc) references historico_de_orcamento(id_orcamento)

);

select * from observacao_vendas;

drop table observacao_vendas;

							# INSERTS DE OBSERVAÇÃO DE VENDAS
                            
INSERT INTO observacao_vendas (obs, id_orc) VALUES 
('Cliente solicitou entrega em até 15 dias.', 1),
('Revisar custo da matéria-prima para próxima versão.', 2),
('Solicitado envio de amostra antes do pedido final.', 3),
('Projeto aprovado pelo cliente em reunião técnica.', 4),
('Cliente pediu desconto de 5% no total.', 5),
('Aguardando retorno do cliente sobre moldes.', 6),
('Entrega condicionada à aprovação da engenharia.', 7),
('Solicitação de mudança na especificação do material.', 8),
('Orçamento com prioridade alta, pedido previsto.', 9),
('Cliente recomendou análise de concorrência.', 10);


							# MATERIA-PRIMA UTILIZADA 
                    
create table MP_Utilizada(

	ID					int auto_increment,
    Codigo_MP			varchar(6) Not Null,
    Ordem				int(2) Not Null,
    Quantidade			decimal(8,6),
    Preco_Considerado	decimal(10,6) Not Null,
    ID_Orcamento		int,

	constraint pk_ID_MP_Utilizada primary key (ID),
    constraint fk_Codigo_MP foreign key(Codigo_MP) references Materia_Prima(codigo),
    constraint fk_ID_Orc_MP foreign key(ID_Orcamento) references historico_de_orcamento(id_orcamento)
    
);

drop table MP_Utilizada;

select * from MP_Utilizada;

						
							#INSERTS DE MATERIA-PRIMA UTILIZADA
                            
INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0001', 1, 12.500000, 23.000000, 1),
('MP0002', 2, 8.000000, 10.000000, 1),
('MP0003', 3, 5.000000, 15.000000, 1);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0004', 1, 20.000000, 30.000000, 2),
('MP0005', 2, 7.500000, 22.000000, 2),
('MP0006', 3, 3.000000, 18.500000, 2);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0007', 1, 6.000000, 25.000000, 3),
('MP0008', 2, 4.000000, 14.000000, 3),
('MP0009', 3, 10.000000, 17.750000, 3);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0010', 1, 18.000000, 12.300000, 4),
('MP0001', 2, 9.000000, 23.000000, 4),
('MP0002', 3, 6.000000, 10.000000, 4);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0003', 1, 14.000000, 15.000000, 5),
('MP0004', 2, 11.500000, 30.000000, 5),
('MP0005', 3, 5.000000, 22.000000, 5);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0006', 1, 3.500000, 18.500000, 6),
('MP0007', 2, 7.000000, 25.000000, 6),
('MP0008', 3, 4.000000, 14.000000, 6);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0009', 1, 8.500000, 17.750000, 7),
('MP0010', 2, 6.000000, 12.300000, 7),
('MP0001', 3, 10.000000, 23.000000, 7);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0002', 1, 5.000000, 10.000000, 8),
('MP0003', 2, 12.000000, 15.000000, 8),
('MP0004', 3, 7.000000, 30.000000, 8);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0005', 1, 6.000000, 22.000000, 9),
('MP0006', 2, 4.000000, 18.500000, 9),
('MP0007', 3, 3.000000, 25.000000, 9);

INSERT INTO MP_Utilizada (Codigo_MP, Ordem, Quantidade, Preco_Considerado, ID_Orcamento) VALUES
('MP0008', 1, 9.000000, 14.000000, 10),
('MP0009', 2, 6.500000, 17.750000, 10),
('MP0010', 3, 5.000000, 12.300000, 10);

							# TESTES UTILIZADOS 
                    
create table Testes_Utilizados(

	ID					int auto_increment,
    Descricao_Test		varchar(90) Not Null,
    Quantidade			int(2) Not Null,
    Custo				decimal(8,2),
    ID_Orcamento	int,

	constraint pk_ID_Teste_Utilizado primary key (ID),
    constraint fk_ID_Orc_T foreign key(ID_Orcamento) references historico_de_orcamento(id_orcamento)
    
);

drop table Testes_Utilizados;

select * from Testes_Utilizados;

							# INSERTS DE TESTES UTILIZADOS
                            
INSERT INTO Testes_Utilizados (Descricao_Test, Quantidade, Custo, ID_Orcamento) VALUES
('Teste de resistência mecânica', 1, 150.00, 1),
('Teste de condutividade elétrica', 1, 95.50, 2),
('Teste de tração', 1, 180.00, 3),
('Teste de impacto', 1, 130.00, 4),
('Teste de abrasão superficial', 1, 110.75, 5),
('Teste de temperatura', 1, 140.00, 6),
('Teste de fadiga cíclica', 1, 200.00, 7),
('Teste de corrosão salina', 1, 160.00, 8),
('Teste de dureza Rockwell', 1, 105.00, 9),
('Teste de flexão em três pontos', 1, 145.00, 10);

							# FERRAMENTA UTILIZADA
                    
create table Ferramentas_Utilizadas(

	id						int auto_increment,
	Codigo_Ferramenta		varchar(6),
    Descricao_Ferramenta	varchar(90) Not Null,
    Quantidade				int(2) Not Null,
    Custo					decimal(8,2),
    Diluicao_Meses			int(2),
    Diluicao_Pecas			int(6),
    ID_Orcamento			int,

	constraint pk_codigo_ferramenta primary key (id),
    constraint fk_ID_Orc_F foreign key(ID_Orcamento) references historico_de_orcamento(id_orcamento)
    
);

drop table Ferramentas_Utilizadas;

select * from Ferramentas_Utilizadas;

							# INSERTS FERRAMENTA UTILIZADA
                            
INSERT INTO Ferramentas_Utilizadas (Codigo_Ferramenta, Descricao_Ferramenta, Quantidade, Custo, Diluicao_Meses, ID_Orcamento) VALUES
('FER001', 'Matriz de corte padrão', 1, 1500.00, 12, 1),
('FER002', 'Molde injetora 25x30cm', 1, 2300.00, 18, 2),
('FER003', 'Gabarito de montagem simples', 2, 600.00, 10, 3),
('FER004', 'Estampo progressivo', 1, 4800.00, 24, 4),
('FER005', 'Matriz de dobra personalizada', 1, 1750.00, 14, 5),
('FER006', 'Forma de extrusão alumínio', 1, 2600.00, 20, 6),
('FER007', 'Dispositivo de fixação CNC', 1, 850.00, 12, 7),
('FER008', 'Matriz de termoformagem', 1, 1950.00, 15, 8),
('FER009', 'Molde para polimerização', 1, 2100.00, 16, 9),
('FER010', 'Estampo de precisão 60mm', 1, 3200.00, 18, 10);


									# CUSTO DA MAQUINA 

create table Maquinas(
	Codigo_Maquina 			int(3) not null,
    descricao				varchar(35) not null,
    comprimento				int(4),
    largura					int(4),
    pecas_hora				int(3),
    custo_reposicao 		decimal(9,2),
    amortizacao				int(3) NOT null,
    cust_maquina			decimal(8,4),
    cust_maquina_anterior 	decimal(8,4),
    manutencao				decimal(8,5),
    energia_gas_vlr_base	decimal(7,4),
    energia_gas				decimal(7,4),
    insumo					decimal(6,4),
    total_maq				decimal(8,4),
    qtd_operadores			int(2),
    mod_encargos_vlr_base	decimal(7,4),
    mod_encargos			decimal(7,4),
    total_mod_anterior		decimal(7,4),
    total_mod				decimal(7,4),
    eficiencia_maq			decimal(3,2) not null,
    eficiencia_ope			decimal(3,2) not null,
    eficiencia_pro			decimal(3,2) not null,
    taxa_hora				decimal(8,4) not null,
    aprov                   boolean default false, #validação para puxar saber se é para puxar na tela de aproveitamento
    espacamento_cav			int(2) default 0,
	habilitado				boolean default true,
    unidade 				enum("MT", "PL", "BO", "PC"),
    
    constraint pk_maquina primary key(Codigo_Maquina)

);

select * from maquinas;

drop table maquinas;

select Codigo_Maquina, descricao, pecas_hora, taxa_hora, unidade from Maquinas where habilitado = true;


# Mudar os inserts com o novo campo de vlr base

									# INSERTS DE MAQUINAS
       
INSERT INTO Maquinas (
	Codigo_Maquina, descricao, comprimento, largura, pecas_hora, custo_reposicao,
	amortizacao, cust_maquina, cust_maquina_anterior, manutencao,
	energia_gas_vlr_base, energia_gas, insumo, total_maq,
	qtd_operadores, mod_encargos_vlr_base, mod_encargos,
	total_mod_anterior, total_mod, eficiencia_maq, eficiencia_ope, eficiencia_pro,
	taxa_hora, aprov, espacamento_cav, habilitado, unidade
) VALUES
(201, 'Corte Laser 2KW', 3000, 2000, 120, 150000.00, 60, 75.0000, 72.5000, 5.25000, 3.2000, 3.5000, 1.2000, 84.9500, 2, 4.1500, 4.4000, 8.3000, 8.8000, 0.95, 0.90, 0.93, 95.0000, true, 0, true, 'PC'),
(202, 'Injetora 200T', 2500, 1500, 90, 220000.00, 72, 88.0000, 86.0000, 6.10000, 3.8000, 4.0000, 1.5000, 99.6000, 2, 5.0000, 5.2500, 10.0000, 10.5000, 0.90, 0.92, 0.88, 102.0000, false, 2, true, 'PC'),
(203, 'Estampo Progressivo', 2000, 1000, 70, 185000.00, 84, 79.5000, 77.0000, 4.80000, 3.1000, 3.3000, 1.0000, 88.6000, 1, 3.8000, 4.0000, 7.8000, 8.0000, 0.85, 0.87, 0.90, 92.5000, true, 0, true, 'PC'),
(204, 'Fresadora CNC', 1800, 900, 50, 120000.00, 48, 70.0000, 68.0000, 4.20000, 2.8000, 3.0000, 1.1000, 80.3000, 1, 4.0000, 4.2000, 8.0000, 8.4000, 0.87, 0.85, 0.88, 90.0000, false, 0, true, 'PL'),
(205, 'Dobradeira Hidráulica', 2200, 1100, 100, 95000.00, 36, 64.0000, 62.0000, 3.75000, 2.5000, 2.6000, 0.9500, 71.3000, 1, 3.6000, 3.8000, 7.2000, 7.6000, 0.92, 0.89, 0.91, 85.0000, true, 0, true, 'PL'),
(206, 'Prensa Excêntrica 63T', 2100, 1000, 110, 78000.00, 48, 59.0000, 58.0000, 3.10000, 2.1000, 2.3000, 0.9000, 65.5000, 1, 3.2000, 3.5000, 6.4000, 7.0000, 0.93, 0.88, 0.90, 82.0000, true, 0, true, 'PC'),
(207, 'Cortadeira Rotativa', 2000, 800, 95, 60000.00, 36, 52.0000, 50.0000, 2.95000, 1.8000, 2.0000, 0.8500, 58.8000, 1, 3.0000, 3.2000, 6.0000, 6.4000, 0.89, 0.87, 0.85, 76.0000, false, 1, true, 'BO'),
(208, 'Extrusora Dupla Rosca', 3000, 1500, 80, 200000.00, 60, 85.0000, 83.0000, 5.50000, 3.6000, 3.8000, 1.3000, 95.6000, 2, 4.8000, 5.0000, 9.6000, 10.0000, 0.91, 0.90, 0.92, 98.0000, true, 0, true, 'MT'),
(209, 'Máquina de Teste de Vedação', 1500, 700, 40, 30000.00, 24, 45.0000, 44.0000, 2.00000, 1.2000, 1.4000, 0.6000, 49.0000, 1, 2.4000, 2.6000, 4.8000, 5.2000, 0.80, 0.85, 0.82, 60.0000, true, 0, true, 'PC'),
(210, 'Injetora 120T', 2400, 1300, 85, 180000.00, 66, 82.0000, 80.0000, 4.30000, 2.7000, 2.9000, 1.2000, 90.4000, 2, 4.4000, 4.7000, 8.8000, 9.4000, 0.89, 0.91, 0.90, 93.0000, false, 0, true, 'PC'),
(365, 'Prensa K3/K4', 400, 350, 85, 180000.00, 66, 82.0000, 80.0000, 4.30000, 2.7000, 2.9000, 1.2000, 90.4000, 2, 4.4000, 4.7000, 8.8000, 9.4000, 0.89, 0.91, 0.90, 93.0000, false, 0, true, 'PC');



								# HISTORICO DE MUDANÇA

create table Historico_de_mudanca_de_fator(
	ID_Fator				int auto_increment,
    Data_de_Atualizacao		date not null,
    Reajuste_MAQ			Decimal(6,4),
    Reajuste_MO				Decimal(6,4),
    Altercao_User			int(1),
    
    constraint pk_Fator primary key (ID_Fator),
    constraint fk_alteracao_user foreign key (Altercao_User) references users(id_user)
);

select * from Historico_de_mudanca_de_fator;

drop table Historico_de_mudanca_de_fator;

									# INSERTS DE HISTORICO DE MUDANÇA DE FATOR
                                    
INSERT INTO Historico_de_mudanca_de_fator (Data_de_Atualizacao, Reajuste_MAQ, Reajuste_MO, Altercao_User) VALUES
('2025-06-01', 2.0 , 1.3, 1),
('2025-03-01', 1.75 , 1.2, 2),
('2024-12-01', 1.8 , 1.4, 3),
('2024-09-01', 1.9 , 1.35, 4);


							# MAQUINAS UTILIZADAS
                    
create table Maquinas_Utilizadas(

	ID_Proc					int auto_increment,
	Codigo_Maquina 			int(3) not null,
    Ordem					int(2),
    Descricao_Operacao		varchar(90),
    Unidade_Operacao		char(2),
    Qtd_Por_Operecao		Decimal(13,4),
    Pecas_Hora				Int(6),
    Taxa_Hora_Considerada	decimal(8,4),
    ID_Orcamento			int,

	constraint pk_codigo_proc primary key (ID_Proc),
    constraint fk_ID_Orc_MAQ_Uti foreign key(ID_Orcamento) references historico_de_orcamento(id_orcamento),
    constraint fk_Mac foreign key(Codigo_Maquina) references Maquinas(Codigo_Maquina)
    
    
);

drop table Maquinas_Utilizadas;

select * from Maquinas_Utilizadas;

									# INSERTS DE MAQUINAS UTILIZADAS

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento) VALUES
(201, 1, 'Corte Laser', 'PC', 1.0000, 120, 95.0000, 1),
(202, 2, 'Dobradeira', 'PC', 1.0000, 100, 85.0000, 1),
(203, 3, 'Estampo', 'PC', 1.0000, 70, 75.0000, 1),
(204, 4, 'Fresadora', 'PC', 1.0000, 50, 90.0000, 1);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(205, 1, 'Injetora 200T', 'PC', 1.0000, 90, 102.0000, 2),
(206, 2, 'Prensa 63T', 'PC', 1.0000, 110, 82.0000, 2),
(207, 3, 'Cortadora Rotativa', 'PC', 1.0000, 95, 78.0000, 2),
(208, 4, 'Extrusora', 'KG', 1.0000, 80, 98.0000, 2);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(209, 1, 'Teste Vedação', 'PC', 1.0000, 40, 60.0000, 3),
(210, 2, 'Injetora 120T', 'PC', 1.0000, 85, 93.0000, 3),
(201, 3, 'Corte Laser', 'PC', 1.0000, 120, 95.0000, 3),
(202, 4, 'Dobradeira', 'PC', 1.0000, 100, 85.0000, 3);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(203, 1, 'Estampo', 'PC', 1.0000, 70, 75.0000, 4),
(204, 2, 'Fresadora', 'PC', 1.0000, 50, 90.0000, 4),
(205, 3, 'Injetora 200T', 'PC', 1.0000, 90, 102.0000, 4),
(206, 4, 'Prensa 63T', 'PC', 1.0000, 110, 82.0000, 4);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(207, 1, 'Cortadora Rotativa', 'PC', 1.0000, 95, 78.0000, 5),
(208, 2, 'Extrusora', 'KG', 1.0000, 80, 98.0000, 5),
(209, 3, 'Teste Vedação', 'PC', 1.0000, 40, 60.0000, 5),
(210, 4, 'Injetora 120T', 'PC', 1.0000, 85, 93.0000, 5);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(201, 1, 'Corte Laser', 'PC', 1.0000, 120, 95.0000, 6),
(202, 2, 'Dobradeira', 'PC', 1.0000, 100, 85.0000, 6),
(203, 3, 'Estampo', 'PC', 1.0000, 70, 75.0000, 6),
(204, 4, 'Fresadora', 'PC', 1.0000, 50, 90.0000, 6);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento) VALUES
(205, 1, 'Injetora 200T', 'PC', 1.0000, 90, 102.0000, 7),
(206, 2, 'Prensa 63T', 'PC', 1.0000, 110, 82.0000, 7),
(207, 3, 'Cortadora Rotativa', 'PC', 1.0000, 95, 78.0000, 7),
(208, 4, 'Extrusora', 'KG', 1.0000, 80, 98.0000, 7);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(209, 1, 'Teste Vedação', 'PC', 1.0000, 40, 60.0000, 8),
(210, 2, 'Injetora 120T', 'PC', 1.0000, 85, 93.0000, 8),
(201, 3, 'Corte Laser', 'PC', 1.0000, 120, 95.0000, 8),
(202, 4, 'Dobradeira', 'PC', 1.0000, 100, 85.0000, 8);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(203, 1, 'Estampo', 'PC', 1.0000, 70, 75.0000, 9),
(204, 2, 'Fresadora', 'PC', 1.0000, 50, 90.0000, 9),
(205, 3, 'Injetora 200T', 'PC', 1.0000, 90, 102.0000, 9),
(206, 4, 'Prensa 63T', 'PC', 1.0000, 110, 82.0000, 9);

INSERT INTO Maquinas_Utilizadas (Codigo_Maquina, Ordem, Descricao_Operacao, Unidade_Operacao, Qtd_Por_Operecao, Pecas_Hora, Taxa_Hora_Considerada, ID_Orcamento)  VALUES
(207, 1, 'Cortadora Rotativa', 'PC', 1.0000, 95, 78.0000, 10),
(208, 2, 'Extrusora', 'KG', 1.0000, 80, 98.0000, 10),
(209, 3, 'Teste Vedação', 'PC', 1.0000, 40, 60.0000, 10),
(210, 4, 'Injetora 120T', 'PC', 1.0000, 85, 93.0000, 10);



							# HISTORICO DE APROVEITAMENTO
                            
create table historico_de_aproveitamento(

	ID_Aprov						int auto_increment,
	codigo 							INT(5) NOT NULL,
	versão_Item 					VARCHAR(2),
	comprimento 					INT(6) NOT NULL,
	largura 						INT(6) NOT NULL,
	espessura 						INT(6) NOT NULL,
	volumes_Mes 					INT(7) NOT NULL,
	codigo_MP						VARCHAR(6) NOT NULL,
    medida_MP                       ENUM("Mínimo","Nominal") NOT NULL,
	codigo_Maq 						int(3) not null,
	cavidades_comp 					INT(2) NOT NULL,
	cavidades_larg 					INT(2) NOT NULL,
	cavidades_totais 				INT(2) NOT NULL,
	tipo_de_cavidade 				ENUM("Junta","Separada") NOT NULL,
	espaçamento_entre_cavidades 	INT(3),
	N_Blanks_MT 					INT(4) NOT NULL,
	N_Blanks_LG 					INT(4) NOT NULL,
	ordem_da_Batida 				ENUM("Largura","Comprimento") NOT NULL,
	N_de_Batidas 					INT(3) NOT NULL,
	pecas_por_material 				INT(7) NOT NULL,
    user							int,

	constraint pk_historico_de_aproveitamento primary key(ID_Aprov),
	constraint fk_MP foreign key(codigo_MP) references Materia_Prima(codigo),
	constraint fk_Maq foreign key(codigo_Maq) references Maquinas(Codigo_Maquina),
    constraint fk_user foreign key(user) references users(id_user)
);

select * from historico_de_aproveitamento;	

drop table historico_de_aproveitamento;

									# INSERTS DE MAQUINAS UTILIZADAS

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10001, 'A1', 1200, 60, 5, 500, 'MP0002', 'Nominal', 203, 2, 2, 4, 'Junta', 10, 100, 100, 'Largura', 2, 1000, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10002, 'B2', 1000, 550, 4, 600, 'MP0005', 'Nominal', 206, 3, 2, 6, 'Separada', 12, 110, 120, 'Comprimento', 3, 1200, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10003, 'C1', 1100, 550, 4, 550, 'MP0008', 'Nominal', 201, 2, 3, 6, 'Junta', 11, 105, 110, 'Largura', 2, 1100, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10004, 'D1', 20, 20, 20, 620, 'MP0001', 'Nominal', 206, 3, 3, 9, 'Separada', 14, 115, 125, 'Comprimento', 3, 1300, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10005, 'E2', 1300, 600, 6, 580, 'MP0004', 'Nominal', 209, 2, 2, 4, 'Junta', 10, 108, 118, 'Largura', 2, 1150, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10006, 'F1', 1250, 750, 3, 540, 'MP0007', 'Nominal', 203, 3, 2, 6, 'Separada', 12, 107, 115, 'Comprimento', 3, 1120, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10007, 'G1', 150, 150, 10, 610, 'MP0010', 'Nominal', 206, 2, 3, 6, 'Junta', 11, 112, 120, 'Largura', 2, 1180, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10008, 'H2', 1000, 500, 5, 640, 'MP0003', 'Nominal', 201, 3, 3, 9, 'Separada', 15, 120, 130, 'Comprimento', 3, 1350, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10009, 'I1', 1600, 800, 6, 590, 'MP0006', 'Nominal', 206, 2, 2, 4, 'Junta', 10, 110, 115, 'Largura', 2, 1200, 1);

INSERT INTO historico_de_aproveitamento VALUES
(NULL, 10010, 'J2', 950, 400, 4, 630, 'MP0009', 'Nominal', 209, 3, 3, 9, 'Separada', 14, 118, 128, 'Comprimento', 3, 1300, 1);