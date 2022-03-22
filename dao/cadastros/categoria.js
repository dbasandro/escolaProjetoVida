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
    pageCategoria: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();


            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_categoria';
     

            var consultacod = "select cod from tb_usuario where nome = '" + req.session.nome_login +"'"

            db.query(consultacod, (err, cod, fields) => {

            
            var query = "SELECT cod, grupo, (select status as adicionar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=32) as adicionar,(select status as eliminar from permissao where id_usuario='" + cod[0].cod +"' and id_unidade='" + req.session.unidade+ "' and id_selecao=33) as eliminar FROM tb_grupo_material WHERE STATUS =1"



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
                
               console.log(cadastrosubmenu_reposta)

                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    DTMaterial: results,
                    DTUsuario: results,
                    DTPerfis: [results[0]],
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
           })();//async
    },
 
    addCategoria: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa INSERT com imagem genérica
            let grupo = req.body.grupo_ADD;
            let unidade = req.body.unidade_ADD;


            let consulta1 = "SELECT * FROM `tb_Usuario` WHERE nome= '" + req.session.nome_login + "'";           

            db.query(consulta1, (err, results, fields) => {

                unidade = results[0].unidade 

            //Verifica se o registro adicionado já existe
            let query = "SELECT grupo FROM `tb_grupo_material` WHERE grupo = '" + grupo + "' AND status = 1";
            db.query(query, (err, results, fields) => {
                if (results.length > 0) {
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/Categoria');
                } else {
                    //Faz o INSERT com imagem genérica
                    let query = "INSERT INTO `tb_grupo_material` " +
                        "(grupo) VALUES ('" +
                        grupo + "') " ;
                      
                    //Executa o INSERT
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/Categoria');
                        } else {
                            //INSERT finalizado
                            status_Crud = 'sim';
                            res.redirect('/Categoria');
                        }
                    });

                   


                }


             conteudo =  "Inseriu categoria "  + grupo 


                db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 

                function (err, result) {

                
                
                })

            });
        })

        } 

   
    },

    

    delCategoria: (req, res) => {
        let cod = req.params.id;
        let getImageQuery = 'SELECT grupo FROM `tb_grupo_material` WHERE cod = "' + cod + '"';
        let query = 'UPDATE `tb_grupo_material` SET STATUS = 0 WHERE cod = "' + cod + '"';

        //Verifica se a imagem existe
        db.query(getImageQuery, (err, results, fields) => {
            if (err) {
                //console.log('Erro 013: ', err);
                let grupo = results[0].grupo;


                conteudo =  "Excluiu a categoria "  + grupo 

                db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 

                function (err, result) {
                    if (err) {
                        console.log('Erro 014: ', err);
                        status_Crud = 'nao';
                        res.redirect('/Categoria');
                    }

                    //DELETE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/Categoria');
                

                //Executa do DELETE
                db.query(query, (err, results, fields) => {
                    if (err) {
                        console.log('Erro 014: ', err);
                        status_Crud = 'nao';
                        res.redirect('/Categoria');
                    }

                    //DELETE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/Categoria');
                })
                });
            } else { //Existe imagem a deletar
                let image = results[0].foto;

                let grupo = results[0].grupo;

                conteudo =  "Excluiu a categoria "  + grupo 

                db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 

                function (err, result) {
                

               
               

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/materiais/${image}`, (err) => {

                    //Executa do DELETE
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 014: ', err);
                            status_Crud = 'nao';
                            res.redirect('/Categoria');
                        }

                        //DELETE realizado com sucesso
                        status_Crud = 'sim';
                        res.redirect('/Categoria');
                    });
                })
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