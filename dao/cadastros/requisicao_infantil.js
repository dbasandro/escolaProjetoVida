//NPM Install
const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const mysql = require('mysql2');
const config = require('./../../database/config');
const conn = mysql.createConnection(config);
const nodemailer = require('nodemailer');
var Promise = require('bluebird')

//var remetente = nodemailer.createTransport({
 ///   host: 'smtp.gmail.com',
  //  service: 'smtp.gmail.com',
  //  port: 587,
  //  secure: true,
  //  auth:{
  //  user: 'estoque.projetovida@escolapv.com.br',
  //  pass: '@S1stemas@' }
  //  });


    const remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com', // mx.example.com
        port: 587, // 143
        secureConnection: false, // TLS requires secureConnection to be false
        auth: {
            user: 'estoque.projetovida@escolapv.com.br',
            pass: '@S1stemas@'
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

//Importando o móduto routes/login.js 
const jsLogin = require('./../login');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageRequisicao_infantil: (req, res) => {


        let cod = req.body.cod_EDIT

        //console.log(cod)
    

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();
            let Periodos = await DBModel.getPeriodo();
            let Series = await DBModel.getSerie();
            let Classes = await DBModel.getClasse();
            let CentrodeCusto = await DBModel.getCentrodecusto();
            let Disciplinas = await DBModel.getDisciplina();
            let Turmas = await DBModel.getTurma();
            let Materiais = await DBModel.getMateriais();
            //let html = await DBModel.gethtml(f);


            let id_user ="SELECT cod FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(id_user, (err, results45, fields) => {
             var cod_user = results45[0].cod            

            let Unidadegeral ="SELECT unidade FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(Unidadegeral, (err, resultadounidade, fields) => {
             var unidade = resultadounidade[0].unidade
            
            // Materiais pegando somente da unidade do usuario
            const isUnidade = Materiais => Materiais.unidade === unidade;

            const resultado = Materiais.filter(isUnidade);

            Materiais = resultado


            // Disciplinas pegando somente da unidade do usuario
            const isUnidade4 = Disciplinas => Disciplinas.unidade === unidade;

            const resultado4 = Disciplinas.filter(isUnidade4);

            Disciplinas = resultado4

            // Turmas pegando somente da unidade do usuario
            const isUnidade5 = Turmas => Turmas.unidade === unidade;

            const resultado5 = Turmas.filter(isUnidade5);

            Turmas = resultado5



            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_requisicao_infantil';

         
            db.query("CALL sp_consulta_produto(?,?)", [1, cod_user], 
            function (err, result) {
                //console.log(result[0])
                
                     //PERMISSOES COMUNICAÇÃO 
                     let Comunicacaosubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=1 and p.status=1 and p.id_unidade=1";
                     let Comunicacaomenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 1 and p.status=1 and p.id_unidade=1";
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



 
 
                     //PERMISSOES ENTREGAS    
                     let Entregasubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=22 and p.status=1 and p.id_unidade=1";
                     let Entregamenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 22 and p.status=1 and p.id_unidade=1";
                     db.query(Entregasubmenu, (err, entregasubmenu_resposta, fields) => {
                     db.query(Entregamenu, (err, entregamenu_resposta, fields) => {
 
                     //PERMISSOES RELATORIO    
                     let Relatoriosubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=3 and p.status=1 and p.id_unidade=1";
                     let Relatoriomenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 3 and p.status=1 and p.id_unidade=1";
                     db.query(Relatoriosubmenu, (err, relatoriosubmenu_resposta, fields) => {
                     db.query(Relatoriomenu, (err, relatoriomenu_resposta, fields) => { 
                         
                        let perfil= "SELECT * FROM tb_usuario where nome = '" + req.session.nome_login + "' and id_perfil in (1,2)";
                        db.query(perfil, (err, perfil_resposta, fields) => {

                            console.log(perfil_resposta)
                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    //DTUsuario: results,
                    //DThtml: html,
                    DTPerfis: unidades,
                    DTPeriodos: Periodos,
                    DTClasses: Classes,
                    DTSeries: Series,
                    DTDepartamentos: CentrodeCusto,
                    DTDisciplinas: Disciplinas,
                    DTTurmas: Turmas,
                    DTMaterial: result[0], 
                    DTMateriais: Materiais,
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
                        Perfil :perfil_resposta,

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
})
                
                //Reinicia a variável
                status_Crud = '';
                
            });       
    })
})
        })();//async
    },
    
 


    

    addRequisicao_infantil: (req, res) => {


            let codigouser = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

                    db.query(codigouser, (err, codreseult, fields) => {
        
                        id_solicitante = codreseult[0].cod 
            
            let id_centrodecusto = req.body.id_departamento_ADD;


           centrodecusto = id_centrodecusto.replace(',1', '')
           centro = centrodecusto.replace(',0', '')
            
            let id_turma = req.body.id_turma_ADD;
            let id_disciplina = req.body.id_disciplina_ADD;
            let observacao = req.body.observacao_ADD;
            console.log(id_turma)
            
atualizabox = req.body.id_departamento_ADD

         // se não tiver turma setar numeração que não tem dados na base
         if (atualizabox.substr(-1) == 0) {
            id_turma = 33
            id_disciplina = 41
        }

       
                var insertpedito = "INSERT INTO `tb_pedido` " +
                "(id_solicitante, id_centrodecusto, id_turma, id_disciplina, observacao) VALUES ('" +
                id_solicitante + "', '" +
                centro + "', '" +
                id_turma + "', '" +
                id_disciplina + "', '" +
                observacao + "')";
            

           

                        
         

                    //Executa o INSERT
                    db.query(insertpedito, (err, resultadoinsertpedito, fields) => {
                        if (err) {
                        console.log(resultadoinsertpedito)
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/requisicao_infantil');
                        } else {
                          
                            //INSERT finalizado
                            status_Crud = 'sim';
                            sqlQuery1(db);
                           res.redirect('/requisicao_infantil');

                        };
                    });
                });

                function sqlQuery1 (db) {
                    db.query("CALL sp_consulta_id_pedido(?)", [req.session.nome_login], function (error, results41, fields) {
                        if (error) console.log(error)
                       //db.end()
                        queryResults = results41
                  
                       // console.log(queryResults)
                        var a = queryResults[0]
                        pedido = a[0].VAR_ID_PEDIDO
                        
                       
                        sqlQuery(db, pedido);
                        
                  
                    })
                  };
                
                
                  
                
                
                
                
                
                
                function sqlQuery (db, pedido) {
                

                    if (atualizabox.substr(-1) == 0) {
                        sql = "CALL sp_html_email_2(?)"}
                        else {
                            sql = "CALL sp_html_email(?)"
                        }
                    
                    
                
                  db.query(sql, [pedido], function (error, results40, fields) {
                      if (error) console.log(error)
                     //db.end()
                     queryResults1 = results40[0]
                  
                      a = queryResults1[0]
                
                      html = a.html;
                
                      var emailASerEnviado = {
                        from: 'estoque.projetovida@escolapv.com.br',
                        to: 'almoxarifado.infantil@escolapv.com.br',
                        subject: 'SOLICITAÇÃO DE PRODUTO',
                        html: html,
                        };
                    
                        remetente.sendMail(emailASerEnviado, function(error){
                            if (error) {
                            console.log(error);
                            } else {
                            console.log('Email enviado com sucesso.');
                            status_Crud = 'sim';
                            res.redirect('/requisicao_infantil');
                            };
                            });
                
                                    
                  });
                }
        
    },

    ///////////////////////////////////////////////////////////////////////////////////////////
    addProduto_infantil: (req, res) => {

        
 
console.log(req.body)


var sql = "INSERT INTO tb_pedido_item (id_produto, valor_total, valor_material, qtd, id_unidade, id_usuario, id_pedido) VALUES ?";
var values = req.body
conn.query(sql, [values], function(err) {
    if (err) {
        console.log('Erro 003: foi aqui q deu o erro', err);
    //    status_Crud = 'nao';
     //   res.redirect('/requisicao_infantil');
    } else {

        //INSERT finalizado
        status_Crud = 'sim';
     //   res.redirect('/requisicao_infantil');
       
    };
});


    },
    ////////////////////////////////////////////////////////////////////////////////////////////

    editRequisicao_infantil: (req, res) => {

        
  

        },

    delRequisicao_infantil: (req, res) => {
        let cod = req.params.id;
        let getImageQuery = 'SELECT foto FROM `tb_usuario` WHERE cod = "' + cod + '"';
        let query = 'DELETE FROM `tb_usuario` WHERE cod = "' + cod + '"';

        //Verifica se a imagem existe
        db.query(getImageQuery, (err, results, fields) => {
            if (err) {
                console.log('Erro 013: ', err);

                //Executa do DELETE
                db.query(query, (err, results, fields) => {
                    if (err) {
                        console.log('Erro 014: ', err);
                        status_Crud = 'nao';
                        res.redirect('/usuario');
                    }

                    //DELETE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/usuario');
                });
            } else { //Existe imagem a deletar
                let image = results[0].foto;

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/usuarios/${image}`, (err) => {

                    //Executa do DELETE
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 014: ', err);
                            status_Crud = 'nao';
                            res.redirect('/usuario');
                        }

                        //DELETE realizado com sucesso
                        status_Crud = 'sim';
                        res.redirect('/usuario');
                    });
                });
            }
        });
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};