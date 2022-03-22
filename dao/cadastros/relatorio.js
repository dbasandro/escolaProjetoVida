//NPM Install
const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const mysql = require('mysql2');
const config = require('./../../database/config');
const conn = mysql.createConnection(config);
const excel = require('exceljs');
const express = require('express');

//Importando o móduto routes/login.js 
const jsLogin = require('./../login');
const { uriFragmentInSingleQuotedAttr } = require('xss-filters');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageRelatorio: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();
            let grupos = await DBModel.getGrupoMaterial();
            let Centrocusto = await DBModel.getCentrodecusto();
            let Materiais = await DBModel.getMateriais()

            let consulta2 ="SELECT unidade, id_perfil FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(consulta2, (err, results, fields) => {
             var unidade = results[0].unidade
             var perfil = results[0].id_perfil


             if (perfil != 1){
            const isUnidade = unidades => unidades.cod === unidade;

            const resultado = unidades.filter(isUnidade);

            unidades = resultado}



////////////////////////////////////////////////////////////////////
            const isUnidade4 = Materiais => Materiais.unidade === unidade;

            const resultado4 = Materiais.filter(isUnidade4);

            Materiais = resultado4
            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_relatorio';
            
            var query = "SELECT cod, grupo FROM tb_grupo_material WHERE STATUS =1 AND unidade in (select unidade from tb_usuario where nome = '" + req.session.nome_login +"')" 

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
                    DTGrupo: grupos,
                    DTCentroCusto: Centrocusto,
                    DTMateriais: Materiais,
                    status_Crud,
                    cod_login: req.session.cod_login,
                    nome_login: req.session.nome_login,
                    foto_login: req.session.foto_login,
                    Usuario_login: req.session.Usuario_login,
                    unidade_login: req.session.unidade_login,
                    admin_login: req.session.admin_login,
                  
                    
                    page,
                    //Cadastros
                    Cadastro: 'active',
                    CadastroOpen: 'menu-open',
                    CadUsuario: '',
                    CadMaterial: '',
                    CadRelatorio: 'active',
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
                
                //Reinicia a variável
                status_Crud = '';

            });
        })
           })();//async
    },
 
    Abaixo_Minimo: (req, res) => {

function one(){

    console.log(req.body.unidade_ADD)

var id_unidade_1
var id_unidade_2
var id_unidade_3

    if (req.body.unidade_ADD === '4') {
    id_unidade_1 = 1
    id_unidade_2 = 2
    id_unidade_3 = 3}

    if (req.body.unidade_ADD != '4') {
        id_unidade_1 = 0
        id_unidade_2 = 0
        id_unidade_3 = req.body.unidade_ADD}


        sql = "call sp_relatorio_minimo('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"')"

console.log(sql)
            // -> Query data from MySQL
	db.query(sql, function (err, tb_material, fields) {
		

		var jsontb_material = JSON.parse(JSON.stringify(tb_material[0]));



		let workbook = new excel.Workbook(); //creating workbook
		let worksheet = workbook.addWorksheet('relatorio_qtd_minimo'); //creating worksheet


	 
		//  WorkSheet Header
		worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
			{ header: 'Código', key: 'cod', width: 30 },
            { header: 'Produto', key: 'material', width: 30},
			{ header: 'Estoque', key: 'estoque', width: 30 },
			{ header: 'Mínimo', key: 'quantidade_min', width: 30, outlineLevel: 1
        }
		];

        worksheet.getCell('A1').font = {from: 'A1',
        to: 'C1',
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
        };
        worksheet.getCell('B1').font = {
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
        };
        worksheet.getCell('C1').font = {
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
        };
        worksheet.getCell('D1').font = {
          name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
        };
        worksheet.getCell('E1').font = {
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
          };

        worksheet.getCell('A1').border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };

        worksheet.getCell('B1').border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };

        worksheet.getCell('C1').border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };
        worksheet.getCell('D1').border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };
        worksheet.getCell('E1').border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };
	 
		// Add Array Rows
		worksheet.addRows(jsontb_material);
	 
		// Write to File
		workbook.xlsx.writeFile("abaixo_minimo.xlsx")
		.then(function() {
			console.log("file saved!");
            Two();
		});
    });
	
}

function Two(){
    res.redirect('/abaixo_minimo_download');
}

one();

    },

    ///////////////////////////////////////////////////////////////////////////////////

    baixa_produto: (req, res) => {

 var id_unidade_1
var id_unidade_2
var id_unidade_3

    if (req.body.unidade_ADD === '4') {
    id_unidade_1 = 1
    id_unidade_2 = 2
    id_unidade_3 = 3}

    if (req.body.unidade_ADD != '4') {
        id_unidade_1 = 0
        id_unidade_2 = 0
        id_unidade_3 = req.body.unidade_ADD}

        
     inicio = req.body.data_i+' 00:00:00'
     fim =  req.body.data_f+' 23:59:59'
      

   //   console.log(inicio, fim)

      function one(){

sql = "call sp_relatorio_baixa('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"


        // -> Query data from MySQL
db.query(sql, function (err, baixa_produdo, fields) {
    
    var jsonbaixa_produdo = JSON.parse(JSON.stringify(baixa_produdo[0]));

    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet('baixa_produdo'); //creating worksheet
 
    //  WorkSheet Header
    worksheet.columns = [
        { header: 'Relatório', key: 'relatorio', width: 30 },
        { header: 'Data', key: 'data', width: 30 },
        { header: 'Nome', key: 'nome', width: 30},
        { header: 'Produto', key: 'produto', width: 30 },
        { header: 'Quantidade', key: 'quantidade', width: 30 },
        { header: 'Valor', key: 'valor', width: 30 },
        { header: 'Classificação', key: 'classificacao', width: 30 },
        { header: 'Unidade', key: 'unidade', width: 30 },
        { header: 'Motivo', key: 'Motivo', width: 30, outlineLevel: 1
    }
    ];
    
    worksheet.getCell('A1').font = {from: 'A1',
    to: 'C1',
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
    };
    worksheet.getCell('B1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
    };
    worksheet.getCell('C1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
    };
    worksheet.getCell('D1').font = {
      name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
    };
    worksheet.getCell('E1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
      };
    worksheet.getCell('F1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
      };     
      worksheet.getCell('G1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
      };  
      worksheet.getCell('H1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
      };  
      worksheet.getCell('I1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
      };   

    worksheet.getCell('A1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };

    worksheet.getCell('B1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };

    worksheet.getCell('C1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };

    worksheet.getCell('D1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };

    worksheet.getCell('E1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('F1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('G1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('H1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('I1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };

    // Add Array Rows
    worksheet.addRows(jsonbaixa_produdo);
 
    // Write to File
    workbook.xlsx.writeFile("baixa_produdo.xlsx")
    .then(function() {
        console.log("file saved!");
        Two();
    });
    
});
}

function Two(){
res.redirect('/baixa_produdo_download');
}

one();
    },

    entrada_produto: (req, res) => {

        var id_unidade_1
        var id_unidade_2
        var id_unidade_3
        var id_entrada_1
        var id_entrada_2
        var id_entrada_3
        
            if (req.body.unidade_ADD === '4') {
            id_unidade_1 = 1
            id_unidade_2 = 2
            id_unidade_3 = 3}
        
            if (req.body.unidade_ADD != '4') {
                id_unidade_1 = 0
                id_unidade_2 = 0
                id_unidade_3 = req.body.unidade_ADD}

                if (req.body.entrada_ADD === '0') {
                    id_entrada_1 = 1
                    id_entrada_2 = 2
                    id_entrada_3 = 3}
                
                    if (req.body.entrada_ADD != '0') {
                        id_entrada_1 = 0
                        id_entrada_2 = 0
                        id_entrada_3 = req.body.entrada_ADD}

        
        inicio = req.body.data_i_entrada+' 00:00:00'
        fim =  req.body.data_f_entrada+' 23:59:59'
         
   
      //   console.log(inicio, fim)
   
         function one(){


sql = "call sp_relatorio_entrada_produto('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"','" + id_entrada_1 +"','" + id_entrada_2 +"','" + id_entrada_3 +"')"

 console.log(sql)  
           // -> Query data from MySQL
   db.query(sql, function (err, entrada_produdo, fields) {
       
       var jsonentrada_produdo = JSON.parse(JSON.stringify(entrada_produdo[0]));
   
       let workbook = new excel.Workbook(); //creating workbook
       let worksheet = workbook.addWorksheet('entrada_produdo'); //creating worksheet
    
       //  WorkSheet Header
       worksheet.columns = [
           { header: 'Relatório', key: 'relatorio', width: 30 },
           { header: 'data', key: 'data', width: 30 },
           { header: 'Registrador', key: 'nome', width: 30},
           { header: 'Material', key: 'produto', width: 30 },
           { header: 'Quantidade', key: 'QTD_Add', width: 30 },
           { header: 'Valor_Unitario', key: 'valor_unitario', width: 30 },
           { header: 'Total', key: 'total', width: 30 },
           { header: 'Unidade', key: 'unidade', width: 30 },
           { header: 'Motivo', key: 'descricao', width: 30, outlineLevel: 1
       }
       ];
       
       worksheet.getCell('A1').font = {from: 'A1',
       to: 'C1',
           name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
       };
       worksheet.getCell('B1').font = {
           name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
       };
       worksheet.getCell('C1').font = {
           name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
       };
       worksheet.getCell('D1').font = {
         name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
       };
       worksheet.getCell('E1').font = {
           name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
         };
       worksheet.getCell('F1').font = {
           name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
         };   
         worksheet.getCell('G1').font = {
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
          };  
          worksheet.getCell('H1').font = {
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
          };  
          worksheet.getCell('I1').font = {
            name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
          };     
   
       worksheet.getCell('A1').border = {
           top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
       };
   
       worksheet.getCell('B1').border = {
           top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
       };
   
       worksheet.getCell('C1').border = {
           top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
       };
   
       worksheet.getCell('D1').border = {
           top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
       };
   
       worksheet.getCell('E1').border = {
           top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
       };
       worksheet.getCell('F1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('G1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('H1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
    worksheet.getCell('I1').border = {
        top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
    };
   
       // Add Array Rows
       worksheet.addRows(jsonentrada_produdo);
    
       // Write to File
       workbook.xlsx.writeFile("entrada_produdo.xlsx")
       .then(function() {
           console.log("file saved!");
           Two();
       });
       
   });
   }
   
   function Two(){
   res.redirect('/entrada_produdo_download');
   }
   
   one();
       },

/////////////consumo_categoria//////////////////////////////consumo_categoria///////////////////////////////////consumo_categoria
consumo_categorias: (req, res) => {

        
    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_categoria+' 00:00:00'
    fim =  req.body.data_f_categoria+' 23:59:59'
    categoria = req.body.categoria_ADD


     function one(){

sql = "call sp_relatorio_categoria('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"

console.log(sql)
       // -> Query data from MySQL
db.query(sql, function (err, consumo_categoria, fields) {
   
   var jsonconsumo_categoria = JSON.parse(JSON.stringify(consumo_categoria[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('consumo_categoria'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'Categoria', key: 'categoria', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Total', key: 'total', width: 30 },
            { header: 'Unidade', key: 'unidade', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   // Add Array Rows
   worksheet.addRows(jsonconsumo_categoria);

   // Write to File
   workbook.xlsx.writeFile("consumo_categoria.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/consumo_categoria_download');
}

one();
   },
/////////////consumo_centrodecusto//////////////////////////////consumo_centrodecusto///////////////////////////////////consumo_centrodecusto
consumo_centrodecusto: (req, res) => {

    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_centrocusto+' 00:00:00'
    fim =  req.body.data_f_centrocusto+' 23:59:59'
    centrodecusto = req.body.centrodecusto_ADD 

    sql = "call sp_relatorio_centrodecusto('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"','" + centrodecusto +"')"

console.log(sql)

     function one(){

       // -> Query data from MySQL
db.query(sql, function (err, consumo_centrodecusto, fields) {
   
   var jsonconsumo_centrodecusto = JSON.parse(JSON.stringify(consumo_centrodecusto[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('consumo_centrodecusto'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'CentrodeCusto', key: 'centrodecusto', width: 30 },
            { header: 'Nome', key: 'nome', width: 30 },
            { header: 'Produto', key: 'produto', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Total', key: 'total', width: 30 },
            { header: 'Unidade', key: 'unidade', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };   
     worksheet.getCell('G1').font = {
        name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
      };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('F1').border = {
    top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
};

worksheet.getCell('G1').border = {
    top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
};

   // Add Array Rows
   worksheet.addRows(jsonconsumo_centrodecusto);

   // Write to File
   workbook.xlsx.writeFile("consumo_centrodecusto.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/consumo_centrodecusto_download');
}

one();
   },

/////////////consumo_diario//////////////////////////////consumo_diario///////////////////////////////////consumo_diario
consumo_diario: (req, res) => {

    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_diario+' 00:00:00'
    fim =  req.body.data_f_diario+' 23:59:59'
     

     function one(){

    sql = "call sp_relatorio_diario('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"


       // -> Query data from MySQL
db.query(sql, function (err, consumo_diario, fields) {
   
   var jsonconsumo_diario = JSON.parse(JSON.stringify(consumo_diario[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('consumo_diario'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'Data', key: 'data', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Valor', key: 'valor_total', width: 30 },
            { header: 'Unidade', key: 'unidade', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   // Add Array Rows
   worksheet.addRows(jsonconsumo_diario);

   // Write to File
   workbook.xlsx.writeFile("consumo_diario.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/consumo_diario_download');
}

one();
   },

/////////////serie//////////////////////////////serie///////////////////////////////////serie
serie: (req, res) => {

   


    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_serie+' 00:00:00'
    fim =  req.body.data_f_serie+' 23:59:59'
     

     function one(){

    sql = "call sp_relatorio_serie('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"

    console.log(sql)

       // -> Query data from MySQL
db.query(sql, function (err, serie, fields) {
   
   var jsonserie = JSON.parse(JSON.stringify(serie[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('serie'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'Série', key: 'serie', width: 30 },
            { header: 'Classe', key: 'classe', width: 30 },
            { header: 'Período', key: 'periodo', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Valor_total', key: 'valor_total', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   // Add Array Rows
   worksheet.addRows(jsonserie);

   // Write to File
   workbook.xlsx.writeFile("serie.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/serie_download');
}

one();
   },

   /////////////solicitante//////////////////////////////solicitante///////////////////////////////////solicitante
consumo_solicitante: (req, res) => {

    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_solicitante+' 00:00:00'
    fim =  req.body.data_f_solicitante+' 23:59:59'
     

     function one(){

    sql = "call sp_relatorio_solicitante('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"

    console.log(sql)

       // -> Query data from MySQL
db.query(sql, function (err, solicitante, fields) {
   
   var jsonsolicitante = JSON.parse(JSON.stringify(solicitante[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('solicitante'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'Solicitante', key: 'solicitante', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Valor_total', key: 'valor_total', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   // Add Array Rows
   worksheet.addRows(jsonsolicitante);

   // Write to File
   workbook.xlsx.writeFile("solicitante.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/solicitante_download');
}

one();
   },

/////////////consumo_produto//////////////////////////////consumo_produto///////////////////////////////////consumo_produto
consumo_produto: (req, res) => {

   

    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_produto+' 00:00:00'
    fim =  req.body.data_f_produto+' 23:59:59'
     

     function one(){

    sql = "call sp_relatorio_produto('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"

    console.log(sql)

       // -> Query data from MySQL
db.query(sql, function (err, produto, fields) {
   
   var jsonproduto = JSON.parse(JSON.stringify(produto[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('produto'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'Produto', key: 'produto', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Valor_total', key: 'valor_total', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   // Add Array Rows
   worksheet.addRows(jsonproduto);

   // Write to File
   workbook.xlsx.writeFile("produto.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/produto_download');
}

one();
   },
///////////////////////////////requisicoes/////////////////////////////////////////
requisicoes: (req, res) => {

   

    var id_unidade_1
    var id_unidade_2
    var id_unidade_3
 
    
        if (req.body.unidade_ADD === '4') {
        id_unidade_1 = 1
        id_unidade_2 = 2
        id_unidade_3 = 3}
    
        if (req.body.unidade_ADD != '4') {
            id_unidade_1 = 0
            id_unidade_2 = 0
            id_unidade_3 = req.body.unidade_ADD}

    inicio = req.body.data_i_requisicoes+' 00:00:00'
    fim =  req.body.data_f_requisicoes+' 23:59:59'
     

     function one(){

    sql = "call sp_relatorio_requisicao('" + id_unidade_1 +"','" + id_unidade_2 +"','" + id_unidade_3 +"','" + inicio +"','" + fim +"')"

    console.log(sql)
       // -> Query data from MySQL
db.query(sql, function (err, requisicoes, fields) {
   
   var jsonrequisicoes = JSON.parse(JSON.stringify(requisicoes[0]));

   let workbook = new excel.Workbook(); //creating workbook
   let worksheet = workbook.addWorksheet('requisicoes'); //creating worksheet


          //  WorkSheet Header
          worksheet.columns = [
            { header: 'Relatório', key: 'relatorio', width: 30 },
            { header: 'Data', key: 'data', width: 30 },
            { header: 'Nome', key: 'solicitante', width: 30 },
            { header: 'Protudo', key: 'produto', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 30 },
            { header: 'Total', key: 'valor_total', width: 30, outlineLevel: 1
        }
        ];
   
   worksheet.getCell('A1').font = {from: 'A1',
   to: 'C1',
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('B1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('C1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('D1').font = {
     name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
   };
   worksheet.getCell('E1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };
   worksheet.getCell('F1').font = {
       name: 'Arial Black', color: { argb: '001A00' }, family: 2, size: 11, negrito: true
     };      

   worksheet.getCell('A1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('B1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('C1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('D1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   worksheet.getCell('E1').border = {
       top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
   };

   // Add Array Rows
   worksheet.addRows(jsonrequisicoes);

   // Write to File
   workbook.xlsx.writeFile("requisicoes.xlsx")
   .then(function() {
       console.log("file saved!");
       Two();
   });
   
});
}

function Two(){
res.redirect('/requisicoes_download');
}

one();
   },


    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};