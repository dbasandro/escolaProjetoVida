//NPM Install
const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const mysql = require('mysql2');
const config = require('./../../database/config');
const conn = mysql.createConnection(config);
var Promise = require('bluebird')




  

//Importando o móduto routes/login.js 
const jsLogin = require('./../login');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageUsuario: (req, res) => {


        let cod = req.body.cod_EDIT

        //console.log(cod)
    

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            
            


            let id_user ="SELECT cod FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(id_user, (err, results45, fields) => {
             var cod_user = results45[0].cod            

            let Unidadegeral ="SELECT unidade FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(Unidadegeral, (err, resultadounidade, fields) => {
             var unidade = resultadounidade[0].unidade
            

             let Permissao ="select (select status as permissao from permissao where id_usuario='" + req.session.cod_login + "' and id_selecao=31  and id_unidade='" + req.session.unidade + "') as permissao, (select status as adicionar from permissao where id_usuario='" + req.session.cod_login + "' and id_selecao=26 and id_unidade='" + req.session.unidade + "') as adicionar, (select status as editar from permissao where id_usuario='" + req.session.cod_login + "' and id_selecao=27 and id_unidade='" + req.session.unidade + "') as editar, (select status as eliminar from permissao where id_usuario='" + req.session.cod_login + "' and id_selecao=28  and id_unidade='" + req.session.unidade + "') as eliminar"
            db.query(Permissao, (err, resultadoPermissao, fields) => {
  


            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_usuario';

         
            db.query("call sp_consulta_pedidos(?)", [req.session.unidade], 
            function (err, result) {
            //console.log(result[0])

            db.query("call sp_consulta_usuarios(?,?,?,?)", [req.session.unidade, req.session.id_perfil, req.session.nome_login, req.session.cod_login], 
            function (err, itens_resposta) {

                console.log(req.session.unidade, req.session.id_perfil, req.session.nome_login)


            

                let permissoes1 = "select U.COD, S.NOME, S.descricao, IF (P.status=1, 'Ativo', 'Inativo') as STATUS, TU.PERFIL from permissao P inner join selecao S on S.COD=P.ID_SELECAO INNER JOIN TB_USUARIO U ON U.COD=P.ID_USUARIO INNER JOIN TB_UNIDADE TU ON TU.COD=P.ID_UNIDADE and p.id_unidade=1";
                let permissoes2 = "select U.COD, S.NOME, S.descricao, IF (P.status=1, 'Ativo', 'Inativo') as STATUS, TU.PERFIL from permissao P inner join selecao S on S.COD=P.ID_SELECAO INNER JOIN TB_USUARIO U ON U.COD=P.ID_USUARIO INNER JOIN TB_UNIDADE TU ON TU.COD=P.ID_UNIDADE and p.id_unidade=2";
                let permissoes3 = "select U.COD, S.NOME, S.descricao, IF (P.status=1, 'Ativo', 'Inativo') as STATUS, TU.PERFIL from permissao P inner join selecao S on S.COD=P.ID_SELECAO INNER JOIN TB_USUARIO U ON U.COD=P.ID_USUARIO INNER JOIN TB_UNIDADE TU ON TU.COD=P.ID_UNIDADE and p.id_unidade=3";
                db.query(permissoes1, (err, permissoes1_resposta, fields) => {
                    db.query(permissoes2, (err, permissoes2_resposta, fields) => {
                        db.query(permissoes3, (err, permissoes3_resposta, fields) => {

   

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


                        let tipoPerfil= "select id, perfil from tb_perfil where id >='" + req.session.id_perfil + "'";
                        db.query(tipoPerfil, (err, perfil_resposta, fields) => {    
                //Passa o conteúdo das variáveis para a página principal

               

                res.render('./pageAdmin', {
                    //DTUsuario: results,
                    
                    


                    DTMaterial:   itens_resposta[0],// result[0], 
                    Dtpermissao: resultadoPermissao,
                    Dtpermissao1: permissoes1_resposta,
                    Dtpermissao2: permissoes2_resposta,
                    Dtpermissao3: permissoes3_resposta,
                    Dtcompra: itens_resposta[0],
                    Dtperfil: perfil_resposta,
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
        })
    })

    })
                
                //Reinicia a variável
                status_Crud = '';
                
            });       
    })
})
})
        })();//async
    }
,
    
 


    

    addUsuario: (req, res) => {


        nome = req.body.nome_ADD
        perfil = req.body.perfil_ADD
        usuario = req.body.usuario_ADD
        senha = req.body.senha_ADD
        status = 1
        foto = 'teste.png'
////
let consultaCod ='select max(cod)+1 as cod from tb_usuario'
db.query(consultaCod, (err, results_cod, fields) => {

cod = results_cod[0].cod        

let query = "insert into tb_usuario " +
"(cod,foto, nome, id_perfil, usuario, senha,status,unidade) VALUES ('" +
cod + "', '" +
foto + "', '" +
nome + "', '" +
perfil + "', '" +
usuario + "', '" +
senha + "', '" +
status + "', '" +
req.session.unidade + "') " ;   

db.query(query, (err, results, fields) => {
    console.log(query)
    if (err) {
        console.log('Erro 003: ', err);
        status_Crud = 'nao';
        res.redirect('/usuario');
    } else {


        //INSERT finalizado
        status_Crud = 'sim';
        res.redirect('/usuario');
    }
});
});
    },

    

    editUsuario: (req, res) => {
 //Verifica se selecionou uma imagem
 if (!req.files) {
    //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
    let cod = req.body.cod_EDIT;
    let usuario = req.body.usuario_EDIT.trim();
    let senha = req.body.senha_EDIT.trim();

    if (senha.length > 0) {

    //Faz o UPDATE mantendo a imagem
     query = "UPDATE `tb_usuario` SET " +
        "`usuario` = '" + usuario + "', " +
        "`senha` = '" + senha + "' " +
        " WHERE `tb_usuario`.`cod` = '" + cod + "'";
    }
    else {
    query =   "UPDATE `tb_usuario` SET " +
    "`nome` = '" + nome + "', " +
    "`usuario` = '" + usuario + "' " +
    " WHERE `tb_usuario`.`cod` = '" + cod + "'";
    }

    //Executa o UPDATE
    db.query(query, (err, results, fields) => {
        if (err) {
            console.log('Erro 009: ', err);
            status_Crud = 'nao';
            res.redirect('/usuario');
        } else {
            //Atualiza dados da seção
            if (cod == req.session.cod_login) {
                req.session.cod_login = cod;
     //           req.session.nome_login = nome;
                //req.session.foto_login = image_name;
                req.session.usuario_login = usuario;

            } else {
                //Não faça nada
            }

            //UPDATE realizado com sucesso              
            status_Crud = 'sim';
            res.redirect('/usuario');
        }
    });
    
} else { //Selecionou uma imagem
    //Executa UPDATE com a imagem selecionada
    let cod = req.body.cod_EDIT;
    let nome = req.body.nome_EDIT.trim();
    let usuario = req.body.usuario_EDIT.trim();
    let senha = req.body.senha_EDIT.trim();
    if (req.body.unidade_EDIT == 'Novo Pátio') {
        unidade = '3';
    } else if (req.body.unidade_ADD == 'Projeto Vida - Fundamental')
    {
        unidade = '2';
    }
    else if (req.body.unidade_ADD == 'Projeto Vida Infantil')
    {
        unidade = '1';
    }
    ;


  

    //Definindo nome da imagem conforme arquivo selecionado
    let uploadedFile = req.files.image_EDIT;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    let image_name = usuario + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;

    //Deleta a imagem antiga
    let getImageQuery = 'SELECT foto FROM `tb_usuario` WHERE cod = "' + cod + '"';
    db.query(getImageQuery, (err, results, fields) => {
        let image = results[0].foto;

        //Exclui a imagem do disco
      //  fse.unlink(`public/dist/img/usuarios/${image}`, (err) => {

            //Valida se a extenção da imagem selecionada é válida
            if (uploadedFile.mimetype === 'image/png' ||
                uploadedFile.mimetype === 'image/jpeg' ||
                uploadedFile.mimetype === 'image/jpg' ||
                uploadedFile.mimetype === 'image/gif') {

                //Se válido, faz o upload da imagem para a pasta
                uploadedFile.mv(`public/dist/img/usuarios/${image_name}`, (err) => {
                    if (err) {
                        console.log('Erro 010: ', err);
                        status_Crud = 'imgErroCopia';
                        res.redirect('/usuario');
                    } else {


                        if (senha.length > 0) {
                        //Faz o UPDATE com a imagem selecionada
                         query = "UPDATE `tb_usuario` SET " +
                        "`nome` = '" + nome + "', " +
                        "`usuario` = '" + usuario + "', " +
                        "`senha` = '" + senha + "', " +
                       "`foto` = '" + image_name + "' " +
                        " WHERE `tb_usuario`.`cod` = '" + cod + "'";
                        }
                        else {
                            query = "UPDATE `tb_usuario` SET " +
                            "`nome` = '" + nome + "', " +
                            "`usuario` = '" + usuario + "', " +
                           "`foto` = '" + image_name + "' " +
                            " WHERE `tb_usuario`.`cod` = '" + cod + "'";
                        }

                        //Executa o UPDATE
                        db.query(query, (err, results, fields) => {
                            if (err) {
                                console.log('Erro 011: ', err);
                                status_Crud = 'nao';
                                res.redirect('/usuario');
                            }

                            //Atualiza dados da seção
                            if (cod == req.session.cod_login) {
                                req.session.cod_login = cod;
                          //      req.session.nome_login = nome;
                                req.session.foto_login = image_name;
                                req.session.usuario_login = usuario;

                            } else {
                                //Não faça nada
                            }

                            //UPDATE realizado com sucesso              
                            status_Crud = 'sim';
                            res.redirect('/usuario');
                        });
                    }
                });

            } else { //Imagem inválida (extenção)                
                console.log('Erro 012: ', err);
                status_Crud = 'imgErroExtensao';
                res.redirect('/usuario');
            }
       // });
    });
}
},

    editUsuariopermissao: (req, res) => {
    },


    delUsuario: (req, res) => {
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