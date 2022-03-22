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
    pageSolicitacao_compra: (req, res) => {


        let cod = req.body.cod_EDIT

        //console.log(cod)
    

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();
            let Materiais = await DBModel.getMateriais();
           


            let id_user ="SELECT cod FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(id_user, (err, results45, fields) => {
             var cod_user = results45[0].cod            

            let Unidadegeral ="SELECT unidade FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(Unidadegeral, (err, resultadounidade, fields) => {
             var unidade = resultadounidade[0].unidade
            






            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_solicitacao_compra';

         
            db.query("CALL sp_consulta_produto(?,?)", [req.session.unidade, cod_user], 
            function (err, result) {
                //console.log(result[0])
                
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

                          a  = [{name: 'teste1',age: 1},{name: 'teste2',age: 2}]

                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    //DTUsuario: results,
                    DTPerfis: unidades,
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
                    students : a,
                        

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
})
        })();//async
    },
    
 


    

    addSolicitacaoProduto: (req, res) => {



        console.log(req.body)

            let codigouser = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

                    db.query(codigouser, (err, codreseult, fields) => {
        
                        id_solicitante = codreseult[0].cod 
            
            let produtonovo = req.body.valor_uni_EDITADD;
            let produtoatual = req.body.id_departamento_ADD;
            let quantidade = req.body.quantidade_ADD;
            let observacao = req.body.observacao_ADD;


        if(produtonovo === '') {
        produtoselecionado = produtoatual}
        else {
            produtoselecionado = produtonovo
        }


                    let insertpedito = "INSERT INTO `TB_SOLICITACAO_COMPRA` " +
                        "(nome, quantidade, observacao, id_usuario, id_unidade) VALUES ('" +
                        produtoselecionado + "', '" +
                        quantidade + "', '" +
                        observacao + "', '" +
                        id_solicitante + "', '" +
                        req.session.unidade + "')";

                    //Executa o INSERT
                    db.query(insertpedito, (err, resultadoinsertpedito, fields) => {
                        if (err) {
                        
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/solicitacaocompra');
                        } else {
                          
                            //INSERT finalizado
                            status_Crud = 'sim';
                            res.redirect('/solicitacaocompra');
                        };
                    });
               

                sqlQuery1(db, id_solicitante);

            });

function sqlQuery1 (db, id_solicitante) {
    db.query("CALL sp_consulta_id_solicitacao_compra(?)", [id_solicitante], function (error, results41, fields) {
        if (error) console.log(error)
       //db.end()
        queryResults = results41
  
       // console.log(queryResults)
        var a = queryResults[0]
        pedido = a[0].VAR_ID_solicitacao_compra
        
       //console.log(pedido)


        sqlQuery(db, pedido);
  
    })
  };
        

  function sqlQuery (db, pedido) {

    

    db.query("CALL sp_html_email_solicitacao_compra(?)", [pedido], function (error, results40, fields) {
        if (error) console.log(error)
       //db.end()
       queryResults1 = results40[0]
    
        a = queryResults1[0]
  
        html = a.html;

        //
        if (req.session.unidade == 3){
            destino = 'almoxarifado@novopatio.com.br' 
        }
        if (req.session.unidade == 2){
            destino = 'almoxarifado.fundamental@escolapv.com.br'
        }
        if (req.session.unidade == 1){
            destino = 'almoxarifado.infantil@escolapv.com.br'
        }
  
        var emailASerEnviado = {

            
            
          from: '"' + req.session.nome_login +'" <' + req.session.usuario_login + '>',
          to: destino,
          subject: "SOLICITAÇÃO DE ABASTECIMENTO DE ESTOQUE Nº '" + pedido + "'",
          html: html,
          };
      
          remetente.sendMail(emailASerEnviado, function(error){
              if (error) {
              console.log(error);
              } else {
              console.log('Email enviado com sucesso.');
              };
              });
    });
  
    
  };


    },

    
    delRequisicao: (req, res) => {
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