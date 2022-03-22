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
    pageEntrega: (req, res) => {


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
            let Departamentos = await DBModel.getCentrodecusto();
            let Disciplinas = await DBModel.getDisciplina();
            let Turmas = await DBModel.getTurma();
            let Materiais = await DBModel.getMateriais();
            
            let centro = await DBModel.getCentro();


            let id_user ="SELECT cod FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(id_user, (err, results45, fields) => {
             var cod_user = results45[0].cod            

            let Unidadegeral ="SELECT unidade FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(Unidadegeral, (err, resultadounidade, fields) => {
             var unidade = resultadounidade[0].unidade
            
            //- Materiais pegando somente da unidade do usuario
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
            page = './includes/cadastros/inc_entrega_produto';

         
            db.query("call sp_consulta_pedidos(?,?)", [req.session.unidade, req.session.cod_login], 
            function (err, result) {
            //console.log(result[0])

            db.query("call sp_consulta_estoque(?)", [req.session.unidade], 
            function (err, itens_resposta) {
            

            let itens = "select  ID_PEDIDO, NOME, QTD, VALOR_MATERIAL AS VALOR_UNITARIO, VALOR_TOTAL AS SUBTOTAL from tb_pedido_item tp inner join tb_produto tpd on tpd.id_produto=tp.id_produto and tp.id_unidade='" + req.session.unidade + "' and tp.entregue=0"
            db.query(itens, (err, itens_resposta2, fields) => {
   

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
                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    //DTUsuario: results,

                    
                    DTPerfis: unidades,
                    DTPeriodos: Periodos,
                    DTClasses: Classes,
                    DTSeries: Series,
                    DTDepartamentos: Departamentos,
                    DTDisciplinas: Disciplinas,
                    DTTurmas: Turmas,
                    DTMaterial: result[0], 
                    Dtcompra: itens_resposta[0],
                    DTMateriais: Materiais,
                    DTCentro: centro,
                    status_Crud,
                    cod_login: req.session.cod_login,
                    nome_login: req.session.nome_login,
                    foto_login: req.session.foto_login,
                    usuario_login: req.session.usuario_login,
                    unidade_login: req.session.unidade_login,
                    admin_login: req.session.admin_login,
                    Dtusuario: req.session.id_perfil,
                  
                    
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
    })
                
                //Reinicia a variável
                status_Crud = '';
                
            });       
    })
})
        })();//async
    },
    
 


    

    addEntrega: (req, res) => {

        array0 = req.body
        for (let i = 0; i < array0.length; i++) {
        array1 = array0[i]
        id_pedido = array1[0]
        id_produto = array1[1]
        id_entrega = array1[2]

        

    let cod_user = req.session.cod_login
    let cod_unidade = req.session.unidade

    console.log(id_pedido,cod_user, id_produto, id_entrega, cod_unidade)

           
         
    
            db.query("CALL atualiza_SAIDA_ESTOQUE(?,?,?,?,?)", [id_pedido,cod_user, id_produto, id_entrega, cod_unidade], 
            function (error, results41, fields) {
                if (error) {
                    status_Crud = 'nao';
                    res.redirect('/entrega_produto');
                }
                else {
               
                }


               
            })
          
        }

        
        
    },


    editEntrega: (req, res) => {

        let cod = req.body.cod_EDIT;
        let qtd = req.body.qtd_solicitada_EDIT;
       

        console.log(req.body)



        db.query("call sp_atualiza_entrega(?,?)", [cod, qtd], 
        function (err, results) {
            console.log(err,results)
            res.redirect('/entrega_produto');
        })
        
    },


    delEntrega: (req, res) => {

console.log(req.params)


        let cod = req.params.id;
        let query = 'delete from tb_pedido_item WHERE id = "' + cod + '"';




                    //Executa do DELETE
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 014: ', err);
                            status_Crud = 'nao';
                            res.redirect('/entrega_produto');
                        }

                        //DELETE realizado com sucesso
                        status_Crud = 'sim';
                        res.redirect('/entrega_produto');
                    });

    
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};