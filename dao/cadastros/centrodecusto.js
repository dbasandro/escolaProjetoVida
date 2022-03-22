//NPM Install
const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const mysql = require('mysql2');
const config = require('./../../database/config');
const conn = mysql.createConnection(config);

//Importando o móduto routes/login.js 
const jsLogin = require('./../login');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
	pageCentroDeCusto: (req, res) => {

		//Executa certas funções em tempo de execução passando para a página
		let DBModel = new DB(conn);
		(async function () {

			//Consultas diversas para popular elementos
			let unidades = await DBModel.getPerfilUsuario();
			let centro = await DBModel.getCentro();


			//Atribuindo o conteúdo central
			page = './includes/cadastros/inc_centrodecusto';

            var consultacod = "select cod from tb_usuario where nome = '" + req.session.nome_login +"'"

            db.query(consultacod, (err, cod, fields) => {

			var query = "SELECT *,(select status as adicionar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=34) as adicionar, (select status as adicionar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=47) as editar, (select status as eliminar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=35) as eliminar  FROM tb_centrodecusto tc where status=1"

			//us inner join tb_unidade un on us.unidade=un.cod AND  us.unidade in (select unidade from tb_usuario where nome = '" + req.session.nome_login + "'"

			db.query(query, (err, results, fields) => {

                    //PERMISSOES COMUNICAÇÃO 
                    let Comunicacaosubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=1 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    let Comunicacaomenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 1 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    db.query(Comunicacaosubmenu, (err, comunicacaosubmenu_resposta, fields) => {
                    db.query(Comunicacaomenu, (err, comunicacaomenu_resposta, fields) => {
                   //PERMISSOES  CADASTRO      
				   let paginas = req.session.unidade 



				   let redireciona
				   let res_requisicao



				   if (paginas == 1){
						redireciona = '/material_infantil'
						res_requisicao = '/requisicao_infantil'
				   }
				   if (paginas == 2){
						redireciona = '/material_fundamental'
						res_requisicao = '/requisicao_fundamental'
				   }
				   if (paginas == 3){
						redireciona = '/material_novopatio'
						res_requisicao = '/requisicao_novopatio'
				   }
				   

				  // let cadastrosubmenu = "select m.nome as nome, '" + redireciona + "' pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=2 and p.status=1 and p.id_unidade='" + req.session.unidade + "' order by m.nome";
				   let cadastromenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 2 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
				   db.query(cadastromenu, (err, cadastromenu_resposta, fields) => {
				  // db.query(cadastrosubmenu, (err, cadastrosubmenu_reposta, fields) => {

					   
					   db.query("call sp_paginas(?)", [req.session.nome_login], 
					   function (err, resposta) {
					   
						   cadastrosubmenu_reposta = resposta[0]


				   //PERMISSOES PEDIDOS    
				   let Pedidosubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=19 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
				   let Pedidomenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 19 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
				   db.query(Pedidosubmenu, (err, pedidosubmenu_resposta, fields) => {
				   db.query(Pedidomenu, (err, pedidomenu_resposta, fields) => {   

					   pedidosubmenu_resposta[0].pagina = res_requisicao


				   if (results[0].id_perfil == 1) {
					 //  pedidosubmenu_resposta[0].pagina = res_requisicao
				   }

				   if (results[0].id_perfil == 2) {
					   pedidosubmenu_resposta[0].pagina = res_requisicao
				   }

				   if (results[0].id_perfil == 3) {
					   pedidosubmenu_resposta[0].pagina = res_requisicao
				   }
				   

                    //PERMISSOES ENTREGAS    
                    let Entregasubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=22 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    let Entregamenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 22 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    db.query(Entregasubmenu, (err, entregasubmenu_resposta, fields) => {
                    db.query(Entregamenu, (err, entregamenu_resposta, fields) => {

                    //PERMISSOES RELATORIO    
                    let Relatoriosubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=3 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    let Relatoriomenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 3 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    db.query(Relatoriosubmenu, (err, relatoriosubmenu_resposta, fields) => {
                    db.query(Relatoriomenu, (err, relatoriomenu_resposta, fields) => {    

				//Passa o conteúdo das variáveis para a página principal
				res.render('./pageAdmin', {
					DTMaterial: results,

 
					DTUsuario: results,
					DTPerfis: unidades,
					DTCentro: centro,
					DTPermissoes:[results[0]],
					status_Crud,
					cod_login: req.session.cod_login,
					nome_login: req.session.nome_login,
					foto_login: req.session.foto_login,
					usuario_login: req.session.usuario_login,
					unidade_login: req.session.unidade_login,
					admin_login: req.session.admin_login,


					page,
					//Cadastros
					Cadastro: 'active',
                    CadastroOpen: 'menu-open',
                    CadUsuario: '',
                    CadMaterial: '',
                    CadCategoria: 'active',
					//Chat
					ChatOpen: '',
					Chat: '',
					CadChat: ''
					,
					                        //permissoes
                        Comunicacaosubmenu: comunicacaosubmenu_resposta,
                        Comunicacaomenu: comunicacaomenu_resposta,
                        Cadastrosubmenu: cadastrosubmenu_reposta,
                        Cadastromenu: cadastromenu_resposta,
                        Relatoriosubmenu: relatoriosubmenu_resposta,
                        Relatoriomenu: relatoriomenu_resposta,
                        Pedidosubmenu: pedidosubmenu_resposta,
                        Pedidomenu: pedidomenu_resposta,
                        Entregasubmenu: entregasubmenu_resposta,
                        Entregamenu: entregamenu_resposta,

                    //Pedido
                    Pedido: '',
                    NovoPedido: '',

                     //Relatório
                     Relatorio: '',
                     Consulta: ''


				});


				//Reinicia a variável
				status_Crud = '';

			});
		})
	})
})
})
})
	})
})
})
})
})
})
		})(); //async
	},

	addCentroDeCusto: (req, res) => {

			//Se não selecionou, executa INSERT com imagem genérica
			let nome = req.body.centrodecusto_ADD;
			let pedagogico = req.body.pedagogico_ADD;
			if (req.body.pedagogico_ADD == 'on') {pedagogico = '1';} else {pedagogico = '0';};


			console.log(nome,pedagogico)

			conteudo =  "Inseriu centro de custo "  + nome + " pedagógico= " + pedagogico


			db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 

			function (err, result) {

			console.log(err)
			
			})

			db.query("CAll sp_insert_centrodecusto(?,?)", [nome, pedagogico], 

			function (err, result) {

				if (err) {
					console.log('Erro 009: ', err);
					status_Crud = 'nao';
					res.redirect('/centrodecusto');
				} else {
					//UPDATE realizado com sucesso              
					status_Crud = 'sim';
					res.redirect('/centrodecusto');	
				}
			
			})

	},

	editCentroDeCusto: (req, res) => {

		//Verifica se selecionou uma imagem
		if (!req.files) {
			//Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
			let id = req.body.id_EDIT;
			let pedagogico = req.body.pedagogico_EDIT;
			if (req.body.pedagogico_EDIT == 'on') {pedagogico = '1';} else {pedagogico = '0';};

console.log(id, pedagogico)


let query2 = "select nome, pedagogico from `tb_centrodecusto`  WHERE `id` = '" + id + "'";

db.query(query2, (err, results2, fields) => {

conteudo =  "Editou o centro de custo " + id + " de pedagógico "  + results2[0].pedagogico + " para " + pedagogico

db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 

function (err, result) {

})
});


			//Faz o UPDATE mantendo a imagem
			let query = "UPDATE `tb_centrodecusto` SET " +
				"`pedagogico` = '" + pedagogico + "'" +
				" WHERE `tb_centrodecusto`.`id` = '" + id + "'";




			//Executa o UPDATE
			db.query(query, (err, results, fields) => {
				if (err) {
					console.log('Erro 009: ', err);
					status_Crud = 'nao';
					res.redirect('/centrodecusto');
				} else {
					//UPDATE realizado com sucesso              
					status_Crud = 'sim';
					res.redirect('/centrodecusto');	
				}
			});
	
		}
	},

	delCentroDeCusto: (req, res) => {
		let centrodecusto = req.params.id;

		

		let query = 'UPDATE `tb_centrodecusto` SET STATUS = 0 WHERE ID = "' + centrodecusto + '"';


					//Executa do DELETE
					db.query(query, (err, results, fields) => {
						if (err) {
							console.log('Erro 014: ', err);
							status_Crud = 'nao';
							res.redirect('/centrodecusto');
						}

						//DELETE realizado com sucesso
						status_Crud = 'sim';
						res.redirect('/centrodecusto');

						let query2 = "select nome from `tb_centrodecusto`  WHERE `id` = '" + centrodecusto + "'";

						db.query(query2, (err, results2, fields) => {
		


						conteudo =  "Excluiu o centro de custo "  + results2[0].nome

						db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
					
						function (err, result) {
		
						
						
						})
					})
					});
				
	
	},

	/**
	 * Funções que passam o valor da variável para outro arquivo js */
	getStatusCrud() {
		return status_Crud;
	},

};