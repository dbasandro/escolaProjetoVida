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
    pageSolicitante: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();


            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_solicitante';
     
            
            var query = "SELECT tc.cod, tc.nome, tu.perfil as unidade FROM tb_solicitante tc inner join tb_unidade tu on tc.unidade=tu.cod AND tc.status = 1 AND unidade in (select unidade from tb_usuario where nome = '" + req.session.nome_login +"')" 

            db.query(query, (err, results, fields) => {
                
               

                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    DTMaterial: results,
                    DTUsuario: results,
                    DTPerfis: unidades,
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
                    CadSolicitante: 'active',
                    //Chat
                    ChatOpen: '',
                    Chat: '',
                    CadChat: ''
                });
                
                //Reinicia a variável
                status_Crud = '';

            });
           })();//async
    },
 
    addSolicitante: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa INSERT com imagem genérica
            let nome = req.body.nome_ADD;
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
            };

            let consulta1 = "SELECT * FROM `tb_usuario` WHERE nome= '" + req.session.nome_login + "'";           

            db.query(consulta1, (err, results, fields) => {

                unidade = results[0].unidade 

            //Verifica se o registro adicionado já existe
            let query = "SELECT * FROM `tb_solicitante` WHERE nome = '" + nome + "' AND unidade = '" + unidade + "' ";
            db.query(query, (err, results, fields) => {
                if (results.length > 0) {
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/solicitante');
                } else {
                    //Faz o INSERT com imagem genérica
                    let query = "INSERT INTO `tb_solicitante` " +
                        "(nome, unidade) VALUES ('" +
                        nome + "', '" +
                        unidade + "') " ;
                      
                    //Executa o INSERT
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/solicitante');
                        } else {
                            //INSERT finalizado
                            status_Crud = 'sim';
                            res.redirect('/solicitante');
                        }
                    });
                }
            });
        })

        } 
    },

    editSolicitante: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod = req.body.cod_EDIT;
            let nome = req.body.nome_EDIT;
            let unidade = req.body.unidade_EDIT;


            //Faz o UPDATE mantendo a imagem
            let query = "UPDATE `tb_solicitante` SET " +
                "`nome` = '" + nome + "' " +
                " WHERE `tb_solicitante`.`cod` = '" + cod + "'";

            //Executa o UPDATE
            db.query(query, (err, results, fields) => {
                if (err) {
                    console.log('Erro 009: ', err);
                    status_Crud = 'nao';
                    res.redirect('/solicitante');
                } else {
                    //UPDATE realizado com sucesso              
                    status_Crud = 'sim';
                    res.redirect('/solicitante');
                }
            });

        } 
    },

    delSolicitante: (req, res) => {
        let cod = req.params.id;
        let getImageQuery = 'SELECT foto FROM `tb_solicitante` WHERE cod = "' + cod + '"';
        let query = 'UPDATE `tb_solicitante` SET STATUS = 0 WHERE cod = "' + cod + '"';

        //Verifica se a imagem existe
        db.query(getImageQuery, (err, results, fields) => {
            if (err) {
                //console.log('Erro 013: ', err);

                //Executa do DELETE
                db.query(query, (err, results, fields) => {
                    if (err) {
                        console.log('Erro 014: ', err);
                        status_Crud = 'nao';
                        res.redirect('/solicitante');
                    }

                    //DELETE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/solicitante');
                });
            } else { //Existe imagem a deletar
                let image = results[0].foto;

                //Exclui a imagem do disco
                fse.unlink(`public/dist/img/materiais/${image}`, (err) => {

                    //Executa do DELETE
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 014: ', err);
                            status_Crud = 'nao';
                            res.redirect('/solicitante');
                        }

                        //DELETE realizado com sucesso
                        status_Crud = 'sim';
                        res.redirect('/solicitante');
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