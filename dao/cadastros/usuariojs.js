//NPM Install
const fse = require('fs-extra');

//Importando arquivo site-model.js que possui a classe com as funções de consulta
const DB = require('../listas/selects');
const mysql = require('mysql2');
const config = require('../../database/config');
const conn = mysql.createConnection(config);

//Importando o móduto routes/login.js 
const jsLogin = require('../login');

//Variáveis a serem utilizadas
var status_Crud = '';

//Variável que recebe a página do conteúdo central a incluir na tela
var page = './includes/default/3-content';

module.exports = {
    pageUsuario: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();


            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_usuario';




      
    
     // console.log(resultado)
     
            
 var query =  "SELECT us.cod, foto, nome, email, usuario, un.perfil as unidade, IF (status=1, 'Ativo', 'Inativo') as status FROM tb_usuario us inner join tb_unidade un on us.unidade=un.cod AND us.status =1 AND us.nome = '" + req.session.nome_login + "'";





           

//console.log(resultado)

let admin = "SELECT COD FROM TB_USUARIO WHERE NOME = '" + req.session.nome_login + "'"           
db.query(admin, (err, cod_resposta, fields) => {

   cod = cod_resposta[0].COD

   //console.log(cod)
          

            db.query(query, (err, results, fields) => {
                
                db.query("CALL sp_consulta_usuario(?,?)", [req.session.unidade, cod], 
                function (err, results) {

                    




 
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
                    

                    let cadastrosubmenu = "select m.nome as nome, pagina, icone from sub_menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and m.id_menu=2 and p.status=1 and p.id_unidade='" + req.session.unidade + "' order by m.nome";
                    let cadastromenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 2 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    db.query(cadastromenu, (err, cadastromenu_resposta, fields) => {
                    db.query(cadastrosubmenu, (err, cadastrosubmenu_reposta, fields) => {

                        

                          cadastrosubmenu_reposta[3].pagina = redireciona

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

//Adicionar
let Adiconaropcoesusuario= "select s.nome as adicionar from permissao p inner join selecao s on p.id_selecao=s.cod and p.status=1 and p.id_usuario ='" + cod + "' and s.cod=26";
db.query(Adiconaropcoesusuario, (err, adiconaropcoesusuario_resposta, fields) => {
//Editar
let Editaropcoesusuario= "select s.nome as editar from permissao p inner join selecao s on p.id_selecao=s.cod and p.status=1 and p.id_usuario ='" + cod + "' and s.cod=27";
db.query(Editaropcoesusuario, (err, editaropcoesusuario_resposta, fields) => {
//Elimina
let Eliminaropcoesusuario= "select s.nome as eliminar from permissao p inner join selecao s on p.id_selecao=s.cod and p.status=1 and p.id_usuario ='" + cod + "' and s.cod=28";
db.query(Eliminaropcoesusuario, (err, eliminaropcoesusuario_resposta, fields) => {
//Permissão
let Permissaoopcoesusuario= "select s.nome as permissao from permissao p inner join selecao s on p.id_selecao=s.cod and p.status=1 and p.id_usuario ='" + cod + "' and s.cod=31";
db.query(Permissaoopcoesusuario, (err, permissaoopcoesusuario_resposta, fields) => {


                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    DTUsuario: results[0],
                    DTPerfis: unidades,
                    status_Crud,
                    cod_login: req.session.cod_login,
                    nome_login: req.session.nome_login,
                    foto_login: req.session.foto_login,
                    usuario_login: req.session.usuario_login,
                    unidade_login: req.session.unidade_login,

                    

                  
                    
                    page,
                    Cadastrosubmenu: cadastrosubmenu_reposta,
                    Cadastromenu: cadastromenu_resposta,
                    Comunicacaosubmenu: comunicacaosubmenu_resposta,
                    Comunicacaomenu: comunicacaomenu_resposta,
                    Relatoriosubmenu: relatoriosubmenu_resposta,
                    Relatoriomenu: relatoriomenu_resposta,
                    //Cadastros
                    Cadastro: 'active',
                    CadastroOpen: 'menu-open',
                    CadUsuario: 'active',
                    CadMaterial: '',
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
                        Adicionarusuario: adiconaropcoesusuario_resposta,
                        Editarusuario: editaropcoesusuario_resposta,
                        Eliminarusuario: eliminaropcoesusuario_resposta,
                        Permissaousuario: permissaoopcoesusuario_resposta,
                    //Chat
                    ChatOpen: '',
                    Chat: '',
                    CadChat: ''
                    ,
                    

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
})
})
})
})
})





        })();//async
    },
 
    addUsuario: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa INSERT com imagem genérica
            let nome = req.body.nome_ADD.trim();
            let email = req.body.email_ADD.trim();
            let usuario = req.body.usuario_ADD.trim();
            let senha = req.body.senha_ADD.trim();
            let unidade = req.body.unidade_ADD;
            if (req.body.unidade_ADD == 'Novo Pátio') {
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


            //Lista
            let status = '1';
           

            //Definindo nome da imagem conforme arquivo selecionado
            //let uploadedFile = req.files.image_ADD;
            //let fileExtension = uploadedFile.mimetype.split('/')[1];
            //let image_name = uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;
            let image_name = usuario + '.png';

            //Verifica se o registro adicionado já existe
            let query = "SELECT * FROM `tb_usuario` WHERE usuario = '" + usuario + "'";
            db.query(query, (err, results, fields) => {
                if (results.length > 0) {
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/usuario');
                } else {
                    //Faz o INSERT com imagem genérica

                    let consulta1 = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

                    db.query(consulta1, (err, results, fields) => {
        
                        unidade = results[0].unidade 

                    let query = "INSERT INTO `tb_usuario` " +
                        "(nome, email, usuario, senha, unidade, status, foto) VALUES ('" +
                        nome + "', '" +
                        email + "', '" +
                        usuario + "', '" +
                        senha + "', '" +
                        unidade + "', '" +
                        status + "', '" +
                        image_name + "')";

                    //Executa o INSERT
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/usuario');
                        } else {
                            try {
                                //INSERT realizado com sucesso, agora faça uma cópia da imagem genérica para a pasta
                                fse.copyFile('public/dist/img/generic/usuario-no-image.png', 'public/dist/img/usuarios/' + image_name);
                            } catch (err) {
                                console.log('Erro 004: ', err);
                                status_Crud = 'imgErroCopia';
                                res.redirect('/usuario');
                            }
                            //INSERT finalizado
                            status_Crud = 'sim';
                            res.redirect('/usuario');
                        }
                    });
                })
                }
            });

        } else { //Selecionou uma imagem
            //Executa INSERT com a imagem selecionada
            let nome = req.body.nome_ADD.trim();
            let email = req.body.email_ADD.trim();
            let usuario = req.body.usuario_ADD.trim();
            let senha = req.body.senha_ADD.trim();
            

            let status = '';
            if (req.body.status_ADD == 'on') {
                status = '1';
            } else {
                status = '0';
            };

            //Definindo nome da imagem conforme arquivo selecionado
            let uploadedFile = req.files.image_ADD;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            let image_name = usuario + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;

            //Verifica se o registro adicionado já existe
            let query = "SELECT * FROM `tb_usuario` WHERE usuario = '" + usuario + "' AND STATUS=1";
            db.query(query, (err, results, fields) => {
                if (results.length > 0) {
                    //Já existe!
                    console.log('Erro 005: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/usuario');
                } else {
                    //Valida se a extenção da imagem selecionada é válida
                    if (uploadedFile.mimetype === 'image/png' ||
                        uploadedFile.mimetype === 'image/jpeg' ||
                        uploadedFile.mimetype === 'image/jpg' ||
                        uploadedFile.mimetype === 'image/gif') {

                        //Se válido, faz o upload da imagem para a pasta
                        uploadedFile.mv(`public/dist/img/usuarios/${image_name}`, (err) => {
                            if (err) {
                                //Erro ao fazer upload
                                console.log('Erro 006: ', err);
                                status_Crud = 'imgErroCopia';
                                res.redirect('/usuario');
                            } else {
                                //Faz o INSERT com foto selecionada
                                let query = "INSERT INTO `tb_usuario` " +
                                "(nome, email, usuario, senha, unidade, status, admin, foto) VALUES ('" +
                                nome + "', '" +
                                email + "', '" +
                                usuario + "', '" +
                                senha + "', '" +
                                unidade + "', '" +
                                status + "', '" +
                                image_name + "')";

                                //Executa o INSERT
                                db.query(query, (err, results, fields) => {
                                    if (err) {
                                        console.log('Erro 007: ', err);
                                        status_Crud = 'nao';
                                        res.redirect('/usuario');
                                    }

                                    //INSERT realizado com sucesso
                                    status_Crud = 'sim';
                                    res.redirect('/usuario');
                                });
                            }
                        });

                    } else { //Imagem inválida (extenção)                        
                        console.log('Erro 008: ', err);
                        status_Crud = 'imgErroExtensao';
                        res.redirect('/usuario');
                    }
                }
            });
        }
    },

    editUsuario: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod = req.body.cod_EDIT;
            let nome = req.body.nome_EDIT.trim();
            let email = req.body.email_EDIT.trim();
            let usuario = req.body.usuario_EDIT.trim();
            let senha = req.body.senha_EDIT.trim();



            //Combobox
            let status = '';
            if (req.body.status_EDIT == 'on') {
                status = '1';
            } else {
                status = '0';
            };

            //Faz o UPDATE mantendo a imagem
            let query = "UPDATE `tb_usuario` SET " +
                "`nome` = '" + nome + "', " +
                "`email` = '" + email + "', " +
                "`usuario` = '" + usuario + "', " +
                "`senha` = '" + senha + "' " +
                " WHERE `tb_usuario`.`cod` = '" + cod + "'";

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
                        req.session.nome_login = nome;
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
            let email = req.body.email_EDIT.trim();
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


            let status = '';
            if (req.body.status_EDIT == 'on') {
                status = '1';
            } else {
                status = '0';
            };

            //Definindo nome da imagem conforme arquivo selecionado
            let uploadedFile = req.files.image_EDIT;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            let image_name = usuario + '_' + uploadedFile.name.replace(/ /g, "_") + '.' + fileExtension;

            //Deleta a imagem antiga
            let getImageQuery = 'SELECT foto FROM `tb_usuario` WHERE cod = "' + cod + '"';
            db.query(getImageQuery, (err, results, fields) => {
                let image = results[0].foto;

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/usuarios/${image}`, (err) => {

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
                                //Faz o UPDATE com a imagem selecionada
                                let query = "UPDATE `tb_usuario` SET " +
                                "`nome` = '" + nome + "', " +
                                "`email` = '" + email + "', " +
                                "`usuario` = '" + usuario + "', " +
                                "`senha` = '" + senha + "', " +
                                "`status` = '" + status + "', " +
                               "`foto` = '" + image_name + "' " +
                                " WHERE `tb_usuario`.`cod` = '" + cod + "'";

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
                                        req.session.nome_login = nome;
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
                });
            });
        }
    },

    editUsuariopermissao: (req, res) => {


        console.log(req.body)

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod = req.body.cod_PERMISSAOEDIT;
        //COMUNICAÇÃO    
        if (req.body.comunicacao_PERMISSAOEDIT == 'on') {comunicacao = '1';} else {comunicacao = '0';};             
        if (req.body.chat_PERMISSAOEDIT == 'on') {chat = '1';} else {chat = '0';};
        //CADASTRO   
        if (req.body.cadastro_PERMISSAOEDIT == 'on') {cadastro = '1';} else {cadastro = '0';};
        if (req.body.categoria_PERMISSAOEDIT == 'on') {categoria = '1';} else {categoria = '0';};
        if (req.body.centrodecusto_PERMISSAOEDIT == 'on') {centrodecusto = '1';} else {centrodecusto = '0';};
        if (req.body.disciplina_PERMISSAOEDIT == 'on') {disciplina = '1';} else {disciplina = '0';};
        if (req.body.fornecedor_PERMISSAOEDIT == 'on') {fornecedor = '1';} else {fornecedor = '0';};
        if (req.body.material_PERMISSAOEDIT == 'on') {material = '1';} else {material = '0';};
        if (req.body.turma_PERMISSAOEDIT == 'on') {turma = '1';} else {turma = '0';};
        if (req.body.usuariomenu_PERMISSAOEDIT == 'on') {usuariomenu = '1';} else {usuariomenu = '0';};
        //PEDIDO    
        if (req.body.pedidos_PERMISSAOEDIT == 'on') {pedido = '1';} else {pedido = '0';};
        if (req.body.novo_PERMISSAOEDIT == 'on') {novo = '1';} else {novo = '0';};
        if (req.body.solicitacao_PERMISSAOEDIT == 'on') {solicitacao = '1';} else {solicitacao = '0';};
        //ENTREGAS    
        if (req.body.entregas_PERMISSAOEDIT == 'on') {entregas = '1';} else {entregas = '0';};
        if (req.body.aberto_PERMISSAOEDIT == 'on') {aberto = '1';} else {aberto = '0';};
        if (req.body.finalizadas_PERMISSAOEDIT == 'on') {finalizadas = '1';} else {finalizadas = '0';};
        //RELATÓRIOS    
        if (req.body.relatorio_PERMISSAOEDIT == 'on') {relatorio = '1';} else {relatorio = '0';};
        if (req.body.consulta_PERMISSAOEDIT == 'on') {consulta = '1';} else {consulta = '0';}; 
        if (req.body.auditoria_PERMISSAOEDIT == 'on') {auditoria = '1';} else {auditoria = '0';}; 
        //OPCOES
        if (req.body.adicionarusuario_PERMISSAOEDIT == 'on') {adicionarusuario = '1';} else {adicionarusuario = '0';};
        if (req.body.eliminausuario_PERMISSAOEDIT == 'on') {eliminausuario = '1';} else {eliminausuario = '0';};
        if (req.body.editarusuario_PERMISSAOEDIT == 'on') {editarusuario = '1';} else {editarusuario = '0';};
        if (req.body.baixa_produto_PERMISSAOEDIT == 'on') {baixa_produto = '1';} else {baixa_produto = '0';};
        if (req.body.entrada_produto_PERMISSAOEDIT == 'on') {entrada_produto = '1';} else {entrada_produto = '0';};
        if (req.body.permissao_PERMISSAOEDIT == 'on') {permissao = '1';} else {permissao = '0';};
        if (req.body.adicionarcategoria_PERMISSAOEDIT == 'on') {adicionarcategoria = '1';} else {adicionarcategoria = '0';};
        if (req.body.eliminarcategoria_PERMISSAOEDIT == 'on') {eliminarcategoria = '1';} else {eliminarcategoria = '0';};
        if (req.body.adicionarcentro_PERMISSAOEDIT == 'on') {adicionarcentro = '1';} else {adicionarcentro = '0';};
        if (req.body.eliminarcentro_PERMISSAOEDIT == 'on') {eliminarcentro = '1';} else {eliminarcentro = '0';};
        if (req.body.adicionardisciplina_PERMISSAOEDIT == 'on') {adicionardisciplina = '1';} else {adicionardisciplina = '0';};
        if (req.body.editardisciplina_PERMISSAOEDIT == 'on') {editardisciplina = '1';} else {editardisciplina = '0';};
        if (req.body.eliminardisciplina_PERMISSAOEDIT == 'on') {eliminardisciplina = '1';} else {eliminardisciplina = '0';};
        if (req.body.adicionarfornecedor_PERMISSAOEDIT == 'on') {adicionarfornecedor = '1';} else {adicionarfornecedor = '0';};
        if (req.body.editarfornecedor_PERMISSAOEDIT == 'on') {editarfornecedor = '1';} else {editarfornecedor = '0';};
        if (req.body.eliminarfornecedor_PERMISSAOEDIT == 'on') {eliminarfornecedor = '1';} else {eliminarfornecedor = '0';};
        if (req.body.adicionarmaterial_PERMISSAOEDIT == 'on') {adicionarmaterial = '1';} else {adicionarmaterial = '0';};
        if (req.body.editarmaterial_PERMISSAOEDIT == 'on') {editarmaterial = '1';} else {editarmaterial = '0';};
        if (req.body.eliminarmaterial_PERMISSAOEDIT == 'on') {eliminarmaterial = '1';} else {eliminarmaterial = '0';};
        if (req.body.adicionarturma_PERMISSAOEDIT == 'on') {adicionarturma = '1';} else {adicionarturma = '0';};
        if (req.body.eliminarrturma_PERMISSAOEDIT == 'on') {eliminarrturma = '1';} else {eliminarrturma = '0';};

        console.log(cod, comunicacao,chat,cadastro,categoria,centrodecusto,disciplina, fornecedor, material,turma,usuariomenu,pedido,novo,solicitacao,entregas,aberto,finalizadas,relatorio,consulta,auditoria,adicionarusuario,editarusuario,eliminausuario,baixa_produto,entrada_produto,permissao,adicionarcategoria,eliminarcategoria,adicionarcentro,eliminarcentro,adicionardisciplina,editardisciplina,eliminardisciplina,adicionarfornecedor,editarfornecedor,eliminarfornecedor,adicionarmaterial,editarmaterial,eliminarmaterial,adicionarturma,eliminarrturma)  

db.query("CALL sp_update_permissoes(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.session.unidade,cod, comunicacao,chat,cadastro,categoria,centrodecusto,disciplina, fornecedor, material,turma,usuariomenu,pedido,novo,solicitacao,entregas,aberto,finalizadas,relatorio,consulta,auditoria,adicionarusuario,editarusuario,eliminausuario,baixa_produto,entrada_produto,permissao,adicionarcategoria,eliminarcategoria,adicionarcentro,eliminarcentro,adicionardisciplina,editardisciplina,eliminardisciplina,adicionarfornecedor,editarfornecedor,eliminarfornecedor,adicionarmaterial,editarmaterial,eliminarmaterial,adicionarturma,eliminarrturma] ,
function (err, result) {
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
        
        }
    },

    delUsuario: (req, res) => {
        let cod = req.params.id;
        let getImageQuery = 'SELECT foto FROM `tb_usuario` WHERE cod = "' + cod + '"';
        let query = 'update `tb_usuario` set STATUS = 0 WHERE cod = "' + cod + '"';

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