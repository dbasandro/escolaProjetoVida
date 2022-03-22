//NPM Install
const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('./../listas/selects');
const FUNCOES = require('./../util/funcoes');
const mysql = require('mysql2');
const config = require('./../../database/config');
const conn = mysql.createConnection(config);



//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageMaterial_infantil: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
         //  let familias = await DBModel.getFamiliaMaterial();
            let grupos = await DBModel.getGrupoMaterial();
            let produtos = await DBModel.getListaProdutos();

            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_material_infantil';

            let id_user ="SELECT cod FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(id_user, (err, results45, fields) => {
             var cod_user = results45[0].cod   

            let consulta2 ="SELECT unidade FROM `tb_usuario` where nome= '" + req.session.nome_login + "' "
            db.query(consulta2, (err, results, fields) => {
             var unidade = results[0].unidade

            

       let resposta = "select (select status as baixa from permissao where id_usuario='" + cod_user + "' and id_unidade='" + 1 + "' and id_selecao=29) as baixa,(select status as produto from permissao where id_usuario='" + cod_user + "' and id_unidade='" + 1 + "' and id_selecao=30) as produto,  (select status as adicionar from permissao where id_usuario='" + cod_user + "' and id_unidade='" + 1 + "' and id_selecao=42) as adicionar,(select status as editar from permissao where id_usuario='" + cod_user + "' and id_unidade='" + 1 + "' and id_selecao=43) as editar,  (select status as eliminar from permissao where id_usuario='" + cod_user + "' and id_unidade='" + 1 + "' and id_selecao=44) as eliminar"
       db.query(resposta, (err, permissao_resultado, fields) => {


db.query("CALL sp_consulta_produto(?,?)", [1, cod_user], 


function (err, result) {
 
  permissoes = result[0]

  console.log(permissao_resultado)

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

                        let perfil= "SELECT * FROM tb_usuario where nome = '" + req.session.nome_login +"' and id_perfil  in (1,2)";
                        db.query(perfil, (err, perfil_resposta, fields) => { 

                        

                //console.log(results)
                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    
                    DTMaterial: result[0],
                   // DTFamilia: familias,
                    DTGrupo: grupos,
                    DTPermissoes: permissao_resultado,
                    DTProdutos: produtos,
                    status_Crud,
                    cod_login: req.session.cod_login,
                    nome_login: req.session.nome_login,
                    foto_login: req.session.foto_login,
                    usuario_login: req.session.usuario_login,
                    perfil_login: req.session.perfil_login,
                    id_perfil: req.session.id_perfil,
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
    });
        })();

        
    },

  


    addMaterial_infantil: (req, res) => {


            //Se não selecionou, executa INSERT com imagem genérica
            let material = req.body.material_ADD;
            let descricao = req.body.descricao_ADD;
            let categoria = req.body.categoria_ADD;
            let unidade = req.body.unidade_ADD;
            if (!req.files) {
                image_name = 'sem_foto_big.jpg'
            } else {
                        //Definindo nome da imagem conforme arquivo selecionado
             uploadedFile = req.files.image_ADD;
             fileExtension = uploadedFile.mimetype.split('/')[1];
             image_name = material + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;
            }
            let consulta1 = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

            db.query(consulta1, (err, results, fields) => {

                unidade = 1

            //Verifica se o registro adicionado já existe
            let query = "SELECT * FROM `tb_produto` WHERE nome = '" + material + "' AND status=1";           

//console.log (material, descricao )

            db.query(query, (err, results, fields) => {
                if (results.length > 0) {
                    
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/material_infantil');
                } else {
                    if (!req.files) {}
                    else{
                    uploadedFile.mv(`public/dist/img/materiais/${image_name}`, (err) => {
                        if (err) {
                            //Erro ao fazer upload
                            console.log('Erro 006: ', err);
                            status_Crud = 'nao';
                            res.redirect('/material_infantil');
                        } else {}
                    })
                    }
                    let consulta = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

                    
                    db.query(consulta, (err, results, fields) => {

                        
                        material = material
                        descricao = descricao
                        categoria = categoria
                        unidade = 1             
                    //Faz o INSERT do produto
                    db.query("CALL sp_insert_produto(?,?,?,?,?)", [material, descricao, categoria,unidade,image_name], 
                        function (err, result) {
                            if (err) {
                                console.log('Erro 003: ', err);
                                status_Crud = 'nao';
                                res.redirect('/material_infantil');
                            } else {
                                //INSERT finalizado
                                status_Crud = 'sim';
                                res.redirect('/material_infantil');



                                conteudo =  "Inseriu o material "  + material 

                            db.query("CAll sp_auditoria(?,?,?)", [1, req.session.cod_login, conteudo], 
            
                            function (err, result) {
                                status_Crud = 'sim';
                            
                            
                            })
                            }
                        
                        });
                })
                
                }
            })
        })
    },

    editMaterial_infantil: (req, res) => {

        //Verifica se selecionou uma imagem
    
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod = req.body.cod_EDIT;
            let material = req.body.material_EDIT;
            let descricao = req.body.descricao_EDIT;
            let categoria = req.body.categoria_EDIT;
            let quantidade_min = req.body.quantidade_min_EDIT;
            let valor_uni = req.body.valor_uni_EDIT.replace(",", ".")
               if (!req.files) {
                
            } else {
                        //Definindo nome da imagem conforme arquivo selecionado
             uploadedFile = req.files.image_EDIT;
             fileExtension = uploadedFile.mimetype.split('/')[1];
             image_name = material + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;
            }
            
            

            let consulta1 = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

            db.query(consulta1, (err, results, fields) => {

                unidade = 1
                id_usuario = results[0].cod


            let consulta2 = "select cod from tb_grupo_material where grupo='" + categoria + "'"

            db.query(consulta2, (err, results2, fields) => {

               
        categoria = results2[0].cod


        if (!req.files) {}
        else{
        uploadedFile.mv(`public/dist/img/materiais/${image_name}`, (err) => {
            if (err) {
                //Erro ao fazer upload
                console.log('Erro 006: ', err);
                status_Crud = 'nao';
                res.redirect('/material_infantil');
            } else {}
        })
        }


        if (!req.files) {
            //Faz o UPDATE mantendo a foto
            db.query("CALL sp_atualiza_produto(?,?,?,?,?,?,?,?)", [cod, material, descricao,categoria,quantidade_min,valor_uni, unidade, id_usuario], 
            function (err, result) {
                if (err) {
                    console.log('Erro 003: ', err);
                    status_Crud = 'nao';
                    res.redirect('/material_infantil');
                } else {
                    //INSERT finalizado
                    status_Crud = 'sim';
                    res.redirect('/material_infantil');

                    conteudo =  "Atualizou o material "  + material 

                            db.query("CAll sp_auditoria(?,?,?)", [1, req.session.cod_login, conteudo], 
            
                            function (err, result) {
                                status_Crud = 'sim';
                            
                            
                            })
                }
        console.log(result);
            });
        } else {
                       //Faz o UPDATE com nova foto
                       db.query("CALL sp_atualiza_produto_foto(?,?,?,?,?,?,?,?,?)", [cod, material, descricao,categoria,quantidade_min,valor_uni, unidade, id_usuario,image_name], 
                       function (err, result) {
                           if (err) {
                               console.log('Erro 003: ', err);
                               status_Crud = 'nao';
                               res.redirect('/material_infantil');
                           } else {
                               //INSERT finalizado
                               status_Crud = 'sim';
                               res.redirect('/material_infantil');
           
                               conteudo =  "Atualizou o material "  + material 
           
                                       db.query("CAll sp_auditoria(?,?,?)", [1, req.session.cod_login, conteudo], 
                       
                                       function (err, result) {
                                           status_Crud = 'sim';
                                       
                                       
                                       })
                           }
                   
                       });
        }
        })
    })

        
    },

    editAdicionaMaterial_infantil: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let consulta1 = "SELECT COD FROM TB_USUARIO WHERE nome= '" + req.session.nome_login + "'"
            let consulta2 = "SELECT UNIDADE FROM TB_USUARIO WHERE nome= '" + req.session.nome_login + "'"
            let id_produto = req.body.cod_EDITADD;
            let qtd_add = req.body.entrada_EDITADD
            let valor_unidade = req.body.valor_uni_EDITADD.replace(",", ".")
            let doacao = '';
            if (req.body.doacao_EDITADD == 'on') {
                doacao = '1';
            } else {
                doacao = '0';
            };
            if (req.body.devolucao_EDITADD == 'on') {
                devolucao = '1';
            } else {
                devolucao = '0';
            };

            let descricao = req.body.observacao_EDITADD

            if (valor_unidade == '') {
                valor_unidade ='0.00'
            }
            

            
            db.query(consulta1, (err, resultado, fields) => {
                id_usuario = resultado[0].COD



            db.query(consulta2, (err, results, fields) => {

                id_unidade = 1

                console.log (valor_unidade)

                //console.log (id_usuario, id_unidade, id_produto, qtd_add,valor_unidade, doacao, descricao)

            //Faz insert para registrar o autor que adicionou no estoque
            db.query("CALL sp_insert_entrada(?,?,?,?,?,?,?,?)", [id_usuario, id_unidade, id_produto, qtd_add,valor_unidade, doacao, devolucao, descricao], 
            function (err, result) {
                if (err) {
                    console.log('Erro 003: ', err);
                    status_Crud = 'nao';
                    res.redirect('/material_infantil');
                } else {
                    //INSERT finalizado
                    status_Crud = 'sim';
                    res.redirect('/material_infantil');
                }
            
            });

            
        })
        })


         
        }
    },

    editBaixaMaterial_infantil: (req, res) => {

    console.log(req.body)

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod_material = req.body.cod_EDITBAIXA;
            let valor = req.body.valor_uni_EDITBAIXA
                
            let total_estoque = req.body.total_estoque_EDITBAIXA
            let saida = req.body.saida_EDITBAIXA
            let classificacao = req.body.classificacao_EDITBAIXA
            let observacao = req.body.observacao_EDITBAIXA
            let quantidade_min = req.body.quantidade_min_EDITBAIXA
            if (parseInt(total_estoque)<=parseInt(quantidade_min)) {
                image_name = 'alerts.gif';
            }    
            else {
                image_name = 'branco.png';
            }   
            let consulta = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'"; 
            

            db.query(consulta, (err, results, fields) => {

                cod_usuario = results[0].cod

            //Faz insert para registrar o autor que adicionou no estoque


            db.query("CALL atualiza_BAIXA_ESTOQUE(?,?,?,?,?,?)", [cod_usuario,saida,observacao,cod_material,1,classificacao], 
            function (err, result) {
                if (err) {
                    console.log('Erro 003: ', err);
                    status_Crud = 'nao';
                    res.redirect('/material_infantil');
                } else {
                    //INSERT finalizado
                    status_Crud = 'sim';
                    res.redirect('/material_infantil');
    
                  
                }
            })
        })

    
      
        
        }
    }

        
     
    ,

    delMaterial_infantil: (req, res) => {
        let cod = req.params.id;
        
        let consulta = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'"; 
        let query2 = "select nome from `tb_produto`  WHERE `id_produto` = '" + cod + "'";
        
        db.query(query2, (err, results2, fields) => {

        db.query(consulta, (err, results, fields) => {

            cod_usuario = results[0].cod
        
        db.query("CALL sp_inativa_produto(?)", [cod], 
        function (err, result) {
            if (err) {
                console.log('Erro 003: ', err);
                status_Crud = 'nao';
                res.redirect('/material_infantil');
            } else {
                //INSERT finalizado
                status_Crud = 'sim';
                res.redirect('/material_infantil');

                conteudo =  "Excluiu o produto "  + results2[0].nome 

                db.query("CAll sp_auditoria(?,?,?)", [1, req.session.cod_login, conteudo], 
    
                    function (err, result) {


                    
                    
                    })
              
            }
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