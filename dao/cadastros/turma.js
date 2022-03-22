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
    pageTurma: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();
            let Periodos = await DBModel.getPeriodo();
            let Series = await DBModel.getSerie();
            let Classes = await DBModel.getClasse();

            //Atribuindo o conteúdo central
            page = './includes/cadastros/inc_turma';
     
            
            var consultacod = "select cod from tb_usuario where nome = '" + req.session.nome_login +"'"

            db.query(consultacod, (err, cod, fields) => {

            var query = "SELECT tc.cod, concat(tc.serie, ' ', tcl.classe) as classe, tp.periodo, tc.anoletivo, tu.perfil as unidade ,(select status as adicionar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=45) as adicionar, (select status as eliminar from permissao where id_usuario='" + cod[0].cod + "' and id_unidade='" + req.session.unidade + "' and id_selecao=46) as eliminar FROM tb_turma tc inner join tb_unidade tu on tc.unidade=tu.cod inner join tb_classe tcl on tcl.cod=tc.classe inner join tb_periodo tp on tc.periodo=tp.cod AND tc.status=1 AND unidade in (select unidade from tb_usuario where nome = '" + req.session.nome_login +"' and tc.cod not in (33,34,35))" 
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
                    DTPeriodos: Periodos,
                    DTSeries: Series,
                    DTClasses: Classes,
                    DTPermissoes: [results[0]],
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
                    CadTurma: 'active',
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
                     ,

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
 
    addTurma: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa INSERT com imagem genérica
            let anoletivo = new Date().getFullYear();;
            let serie = req.body.serie_ADD;
            let classe = req.body.classe_ADD;
            let periodo = req.body.periodo_ADD
            let unidade = req.session.unidade;


            console.log(req.body)


           
            //Verifica se o registro adicionado já existe
            let query = "SELECT * FROM `tb_turma` WHERE  anoletivo = '" + anoletivo + "'  AND periodo = '" + periodo + "' AND serie = '" + serie + "' AND unidade = '" + unidade + "' AND classe = '" + classe + "' ";
            db.query(query, (err, results, fields) => {
                console.log(results)
                if (results.length > 0) {
                    //Já existe!
                    console.log('Erro 002: ', err);
                    status_Crud = 'registroExiste';
                    res.redirect('/turma');
                } else {
                    //Faz o INSERT com imagem genérica
                    let query = "INSERT INTO `tb_turma` " +
                        "(anoletivo, serie, periodo, classe, unidade) VALUES ('" +
                        anoletivo + "', '" +
                        serie + "', '" +
                        periodo + "', '" +
                        classe + "', '" +
                        unidade + "') " ;
                      
                    //Executa o INSERT
                    db.query(query, (err, results, fields) => {
                        if (err) {
                            console.log('Erro 003: ', err);
                            status_Crud = 'nao';
                            res.redirect('/turma');
                        } else {
                            //INSERT finalizado
                            status_Crud = 'sim';
                            res.redirect('/turma');

                            conteudo =  "Inseriu a turma "  + anoletivo + periodo + classe

                            db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
            
                            function (err, result) {
                                status_Crud = 'sim';
                            
                            
                            })
                        }
                    });
                }
            });
        

        } 
    },

    editTurma: (req, res) => {

        //Verifica se selecionou uma imagem
        if (!req.files) {
            //Se não selecionou, executa UPDATE sem imagem, ou seja mantendo a imagem atual
            let cod = req.body.cod_EDIT
            let serie = req.body.serie_EDIT;
            let classe = req.body.classe_EDIT;
            if (req.body.classe_EDIT == 'A') {	
                classe = '15';}
                else if (req.body.classe_EDIT == 'B') {	
                classe = '16';}
                else if (req.body.classe_EDIT == 'C') {	
                classe = '17';}
                else if (req.body.classe_EDIT == 'D') {	
                classe = '18';}
                else if (req.body.classe_EDIT == 'E') {	
                classe = '19';}
                else if (req.body.classe_EDIT == 'F') {	
                classe = '20';}
                else if (req.body.classe_EDIT == '1') {	
                classe = '21';}
                else if (req.body.classe_EDIT == '2') {	
                classe = '22';}
                else if (req.body.classe_EDIT == '3') {	
                classe = '23';}
                else if (req.body.classe_EDIT == '4') {	
                classe = '24';}
                else if (req.body.classe_EDIT == '5') {	
                classe = '25';}
                else if (req.body.classe_EDIT == '6') {	
                classe = '26';}
                else if (req.body.classe_EDIT == '7') {	
                classe = '27';}
            
            let periodo = req.body.periodo_EDIT


            if (req.body.periodo_EDIT == 'Manhã') {
                periodo = '11';
            } else if (req.body.periodo_EDIT == 'Tarde')
            {
                periodo = '12';
            } else if (req.body.periodo_EDIT == 'Noite')
            {
                periodo = '13';
            }
            else if (req.body.periodo_EDIT == 'Integral')
            {
                periodo = '14';
            };

            //Faz o UPDATE mantendo a imagem
            let query = "UPDATE `tb_turma` SET " +
                "`serie` = '" + serie + "', " +
                "`periodo` = '" + periodo + "', " +
                "`classe` = '" + classe + "'" +
                " WHERE `tb_turma`.`cod` = '" + cod + "'";

            //Executa o UPDATE
            db.query(query, (err, results, fields) => {
                if (err) {
                    console.log('Erro 009: ', err);
                    status_Crud = 'nao';
                    res.redirect('/turma');
                } else {
                    //UPDATE realizado com sucesso              
                    status_Crud = 'sim';
                    res.redirect('/turma');

                    conteudo =  "Atualizou a turma "  + anoletivo + periodo + classe

                    db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
    
                    function (err, result) {
                        status_Crud = 'sim';
                    
                    
                    })
                }
            });

        } 
    },

    delTurma: (req, res) => {
        let cod = req.params.id;
        let getImageQuery = 'SELECT foto FROM `tb_turma` WHERE cod = "' + cod + '"';
        let query = 'UPDATE `tb_turma` SET STATUS = 0 WHERE cod = "' + cod + '"';
        let query2 = "select serie,periodo, classe from `tb_turma`  WHERE `cod` = '" + cod + "'";
        db.query(query2, (err, results2, fields) => {
       
            
                

                //Executa do DELETE
                db.query(query, (err, results, fields) => {
                    if (err) {
                        console.log('Erro 014: ', err);
                        status_Crud = 'nao';
                        res.redirect('/turma');
                    }

                    //DELETE realizado com sucesso
                    status_Crud = 'sim';
                    res.redirect('/turma');
                    conteudo =  "Excluiu a turma "  + results2[0].serie+results2[0].periodo+ results2[0].classe


                    db.query("CAll sp_auditoria(?,?,?)", [req.session.unidade, req.session.cod_login, conteudo], 
    
                    function (err, result) {


                    
                    
                    })
                });
          
    })
    },

    /**
     * Funções que passam o valor da variável para outro arquivo js */
    getStatusCrud() {
        return status_Crud;
    },

};