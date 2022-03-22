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
    pageFornecedor: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            //let familias = await DBModel.getFamiliaMaterial();
            let grupos = await DBModel.getGrupoMaterial();
            let Estado = await DBModel.getEstado();

            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_fornecedor';

            //Consulta tabela para popular conteúdo da tabela

            var consultacod = "select cod from tb_usuario where nome = '" + req.session.nome_login +"'"

            db.query(consultacod, (err, cod, fields) => {

            let query = "SELECT * , (select status as adicionar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=39) as adicionar,(select status as editar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=40) as editar,(select status as eliminar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=41) as eliminar  FROM `tb_fornecedor` WHERE unidade= '" + req.session.unidade + "' AND status=1";
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
                    //DTFamilia: familias,
                    DTGrupo: grupos,
                    DTEstados: Estado,
                    DTPermissoes: [results[0]],
                    status_Crud,
                    cod_login: req.session.cod_login,
                    nome_login: req.session.nome_login,
                    foto_login: req.session.foto_login,
                    usuario_login: req.session.usuario_login,
                    perfil_login: req.session.perfil_login,
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
                

                //Reinicia a variável
                status_Crud = '';
            });
        })
        
        })();
    },

    addFornecedor: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa INSERT com imagem genérica
            let razao_social = req.body.razao_social_ADD;
            let nome_fantazia = req.body.nome_fantazia_ADD;
            let cnpj = req.body.cnpj_ADD;
            let inscrissao = req.body.inscrissao_ADD;
            let endereco = req.body.endereco_ADD;
            let bairro = req.body.bairro_ADD;
            let cidade = req.body.cidade_ADD;
            let uf = req.body.uf_ADD;
            let cep = req.body.cep_ADD;
            let telefone = req.body.telefone_ADD;
            let email = req.body.email_ADD;
            let contato = req.body.contato_ADD;
            let observacao = req.body.observacao_ADD;


            //Verifica se o registro adicionado já existe

        

                unidade =  req.session.unidade 

            let query = "SELECT count(*) as qtd FROM `tb_fornecedor` WHERE cnpj = '" + cnpj + "' AND STATUS=1";           
            
            


            db.query(query, (err, results, fields) => {
                if (results[0].qtd > 0) {
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/fornecedor');
                } else {
                    //Faz o INSERT com imagem genérica
                    let query = "INSERT INTO `tb_fornecedor` " +
                        "(razao_social, nome_fantazia, cnpj, inscrissao, endereco, bairro, cidade, uf, cep, telefone, email, contato, unidade, observacao) VALUES ('" +
                        razao_social + "', '" +
                        nome_fantazia + "', '" +
                        cnpj + "', '" +
                        inscrissao + "', '" +
                        endereco + "', '" +
                        bairro + "', '" +
                        cidade + "', '" +
                        uf + "', '" +
                        cep + "', '" +
                        telefone + "', '" +
                        email + "', '" +
                        contato + "', '" +
                        unidade + "', '" +
                        observacao + "')";

                    //Executa o INSERT
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/fornecedor');
                        } else {
                            //INSERT realizado com sucesso                            
                          
                            //INSERT finalizado
                            status_Crud = 'sim';
                            res.redirect('/fornecedor');

                            conteudo =  "Inseriu o fornecedor "  + razao_social 

                            db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
            
                            function (err, result) {
                                status_Crud = 'sim';
                            
                            
                            })
                        }
                    });
                }
            });
       

        } else { //Selecionou uma imagem
            //Executa INSERT com a imagem selecionada
            let razao_social = req.body.razao_social_ADD;
            let nome_fantazia = req.body.nome_fantazia_ADD;
            let cnpj = req.body.cnpj_ADD;
            let inscrissao = req.body.inscrissao_ADD;
            let endereco = req.body.endereco_ADD;
            let bairro = req.body.bairro_ADD;
            let cidade = req.body.cidade_ADD;
            let uf = req.body.uf_ADD;
            let cep = req.body.cep_ADD;
            let telefone = req.body.telefone_ADD;
            let email = req.body.email_ADD;
            let contato = req.body.contato_ADD;
            let observacao = req.body.observacao_ADD;

            //Verifica se o registro adicionado já existe
            let query = "SELECT count(*) as qtd FROM `tb_fornecedor` WHERE cnpj = '" + cnpj + "'";
            db.query(query, (err, results, fields) => {
                if (results[0].qtd > 0) {
                    //Já existe!
                    console.log('Erro 005: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/fornecedor');
                } else {
                    //Valida se a extenção da imagem selecionada é válida
                    if (uploadedFile.mimetype === 'image/png' ||
                        uploadedFile.mimetype === 'image/jpeg' ||
                        uploadedFile.mimetype === 'image/jpg' ||
                        uploadedFile.mimetype === 'image/gif') {

                        //Se válido, faz o upload da imagem para a pasta
                        uploadedFile.mv(`public/dist/img/materiais/${image_name}`, (err) => {
                            if (err) {
                                //Erro ao fazer upload
                                console.log('Erro 006: ', err);
                                status_Crud = 'nao';
                                res.redirect('/fornecedor');
                            } else {
                                //Faz o INSERT com foto selecionada
                                let query = "INSERT INTO `tb_fornecedor` " +
                                    "(razao_social, nome_fantazia, cnpj, inscrissao, endereco, bairro, cidade, uf, cep, telefone, email, contato) VALUES ('" +
                                    razao_social + "', '" +
                                    nome_fantazia + "', '" +
                                    cnpj + "', '" +
                                    inscrissao + "', '" +
                                    endereco + "', '" +
                                    bairro + "', '" +
                                    cidade + "', '" +
                                    uf + "', '" +
                                    cep + "', '" +
                                    telefone + "', '" +
                                    email + "', '" +
                                    contato + "', '" +
                                    observacao + "')";

                                //Executa o INSERT
                                db.query(query, (err, results, fields) => {
                                    if (err) {
                                        console.log('Erro 007: ', err);
                                        status_Crud = 'nao';
                                        res.redirect('/fornecedor');
                                    }

                                    //INSERT realizado com sucesso
                                    status_Crud = 'sim';
                                    res.redirect('/fornecedor');
                                });
                            }
                        });

                    } else { //Imagem inválida (extenção)                        
                        console.log('Erro 008: ', err);
                        status_Crud = 'imgErroExtensao';
                        res.redirect('/fornecedor');
                    }
                }
            });
        }
    },

    editFornecedor: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod = req.body.cod_EDIT;
            let razao_social = req.body.razao_social_EDIT;
            let nome_fantazia = req.body.nome_fantazia_EDIT;
            let cnpj = req.body.cnpj_EDIT;
            let inscrissao = req.body.inscrissao_EDIT;
            let endereco = req.body.endereco_EDIT;
            let bairro = req.body.bairro_EDIT;
            let cidade = req.body.cidade_EDIT;
            let uf = req.body.uf_EDIT;
            let cep = req.body.cep_EDIT;
            let telefone = req.body.telefone_EDIT;
            let email = req.body.email_EDIT;
            let contato = req.body.contato_EDIT;
            let observacao = req.body.observacao_EDIT;

            //Faz o UPDATE mantendo a imagem
            let query = "UPDATE `tb_fornecedor` SET " +
            "`razao_social` = '" + razao_social  + "', " +
            "`nome_fantazia` = '" + nome_fantazia + "', " +
            "`cnpj` = '" + cnpj + "', " +
            "`inscrissao` = '" + inscrissao + "', " +
            "`endereco` = '" + endereco + "', " +
            "`bairro` = '" + bairro + "', " +
            "`cidade` = '" + cidade + "', " +
            "`uf` = '" + uf + "', " +
            "`cep` = '" + cep + "', " +
            "`telefone` = '" + telefone + "', " +
            "`email` = '" + email + "', " +
            "`contato` = '" + contato + "', " +
            "`observacao` = '" + observacao + "'" +
            " WHERE `tb_fornecedor`.`cod` = '" + cod + "'";

            //Executa o UPDATE
            db.query(query, (err, results, fields) => {
                if (err) {
                    console.log('Erro 009: ', err);
                    status_Crud = 'nao';
                    res.redirect('/fornecedor');
                } else {
                    //UPDATE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/fornecedor');

                    let query2 = "select razao_social from `tb_fornecedor`  WHERE `cod` = '" + cod + "'";

                    db.query(query2, (err, results2, fields) => {
                        conteudo =  "Atualizou o fornecedor "  + results2[0].razao_social 


                        db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
        
                        function (err, result) {
    
    
                        
                        
                        })


                });
                }
            });

        } else { //Selecionou uma imagem
            //Executa UPDATE com a imagem selecionada
            let cod = req.body.cod_EDIT;
            let razao_social = req.body.razao_social_EDIT;
            let nome_fantazia = req.body.nome_fantazia_EDIT;
            let cnpj = req.body.cnpj_EDIT;
            let inscrissao = req.body.inscrissao_EDIT;
            let endereco = req.body.endereco_EDIT;
            let bairro = req.body.bairro_EDIT;
            let cidade = req.body.cidade_EDIT;
            let uf = req.body.uf_EDIT;
            let cep = req.body.cep_EDIT;
            let telefone = req.body.telefone_EDIT;
            let email = req.body.email_EDIT;
            let contato = req.body.contato_EDIT;
            let observacao = req.body.observacao_EDIT;

            //Deleta a imagem antiga

            
            let getImageQuery = 'SELECT foto FROM `tb_fornecedor` WHERE cod = "' + cod + '"';
            db.query(getImageQuery, (err, results, fields) => {
                let image = results[0].foto;

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/materiais/${image}`, (err) => {

                    //Valida se a extenção da imagem selecionada é válida
                    if (uploadedFile.mimetype === 'image/png' ||
                        uploadedFile.mimetype === 'image/jpeg' ||
                        uploadedFile.mimetype === 'image/jpg' ||
                        uploadedFile.mimetype === 'image/gif') {

                        //Se válido, faz o upload da imagem para a pasta
                        uploadedFile.mv(`public/dist/img/materiais/${image_name}`, (err) => {
                            if (err) {
                                console.log('Erro 010: ', err);
                                status_Crud = 'imgErroCopia';
                                res.redirect('/fornecedor');
                            } else {

                                //Faz o UPDATE com a imagem selecionada
                                let query = "UPDATE `tb_fornecedor` SET " +
                                "`razao_social` = '" + razao_social  + "', " +
                                "`nome_fantazia` = '" + nome_fantazia + "', " +
                                "`cnpj` = '" + cnpj + "', " +
                                "`inscrissao` = '" + inscrissao + "', " +
                                "`endereco` = '" + endereco + "', " +
                                "`bairro` = '" + bairro + "', " +
                                "`cidade` = '" + cidade + "', " +
                                "`uf` = '" + uf + "', " +
                                "`cep` = '" + cep + "', " +
                                "`telefone` = '" + telefone + "', " +
                                "`email` = '" + email + "', " +
                                "`contato` = '" + contato + "', " +
                                "`observacao` = '" + observacao + "'" +
                                " WHERE `tb_fornecedor`.`cod` = '" + cod + "'";
                                

                                //Executa o UPDATE
                                db.query(query, (err, results, fields) => {
                                    if (err) {
                                        console.log('Erro 011: ', err);
                                        status_Crud = 'nao';
                                        res.redirect('/fornecedor');
                                    }

                                    //UPDATE realizado com sucesso
                                    status_Crud = 'sim';
                                    res.redirect('/fornecedor');

                                    let query2 = "select razao_social from `tb_fornecedor`  WHERE `cod` = '" + cod + "'";

                                    db.query(query2, (err, results2, fields) => {
                                        conteudo =  "Atualizou o fornecedor "  + results2[0].razao_social 


                                        db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
                        
                                        function (err, result) {
                    
                    
                                        
                                        
                                        })


                                });
                            });
                            }
                        });

                    } else { //Imagem inválida (extenção)                
                        console.log('Erro 012: ', err);
                        status_Crud = 'imgErroExtensao';
                        res.redirect('/fornecedor');
                    }
                });
            });
        }
    },

    delFornecedor: (req, res) => {
        let cod = req.params.id;
        let getImageQuery = 'SELECT foto FROM `tb_fornecedor` WHERE cod = "' + cod + '"';
        let query = 'UPDATE `tb_fornecedor` SET STATUS= 0 WHERE cod = "' + cod + '"';

        //Verifica se a imagem existe
        

                //Executa do DELETE
                db.query(query, (err, results, fields) => {
                    if (err) {
                        console.log('Erro 014: ', err);
                        status_Crud = 'nao';
                        res.redirect('/fornecedor');


                    }
else {
                    //DELETE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/fornecedor');
                    console.log(results, cod);
                    let query2 = "select razao_social from `tb_fornecedor`  WHERE `cod` = '" + cod + "'";

                    db.query(query2, (err, results2, fields) => {
                        conteudo =  "Excluiu o fornecedor "  + results2[0].razao_social 


                        db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
        
                        function (err, result) {
    
    
                        
                        
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