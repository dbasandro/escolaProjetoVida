//Variável que setamos a página do conteúdo central a ser incluído na tela
var page = './includes/default/3-content';
var status_Login = 'loginOK';

//================================================================== Funções recebidas da rota
module.exports = {

    //Pagina inicial de login ao acessar localhost:3000 ou fazer logoff
    pageLogin: (req, res) => {

        //Deleta a sessão do usuário do redis
        delete req.session.nome_login;
        var status_Login = 'loginOK';

        //Abre a página de login
        res.render('./pageLogin', {
            status_Login,
            body: req.body,
            
        });
    },

    //Função que verifica usuário e senha digitados na tela de login
    verificaLogin: (req, res) => {

        console.log (req.body)

        var username = req.body.usuario;
        var password = req.body.senha;
        let sql = "SELECT * FROM tb_usuario WHERE " +
            "usuario = '" + username + "' AND " +
            "senha = '" + password + "'";
            
        //Valida e executa o login na aplicação
        db.query(sql, (err, results, fields) => {
            if (results.length > 0) { 
            //Verifica se usuário e senha digitados conferem
            if (results[0].senha == "123mudar@"){
                let consulta = "UPDATE `tb_usuario` SET " +
				"`senha` = '" + req.body.imput_nova_senha + "'" +
				" WHERE `tb_usuario`.`usuario` = '" + username + "'";
                db.query(consulta, (err, results2, fields) => {
                })
            }
        }

        console.log(results)

            if (results.length > 0) {
                //Verifica se o usuário está ativo
                if (results[0].status == '1') {
                    //Seta o conteúdo da página                   
                    page = './includes/default/3-content';
                    //Grava dados do usuário logado na sessão do redis
                    req.session.cod_login = results[0].cod;
                    req.session.nome_login = results[0].nome;
                    req.session.foto_login = results[0].foto;
                    req.session.usuario_login = results[0].usuario;
                    req.session.perfil_login = results[0].perfil;
                    req.session.unidade = results[0].unidade;
                    req.session.id_perfil = results[0].id_perfil;
                    //Login OK - Passa o conteúdo das variáveis para a página index
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
                    
                    let cadastromenu= "select m.nome as nome from menu m inner join selecao s on s.cod=m.id_selecao inner join permissao p on s.cod=p.id_selecao inner join tb_usuario u on u.cod=p.id_usuario and u.cod in (select cod from tb_usuario where nome = '" + req.session.nome_login +"') and s.cod = 2 and p.status=1 and p.id_unidade='" + req.session.unidade + "'";
                    db.query(cadastromenu, (err, cadastromenu_resposta, fields) => {

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

                    res.render('./pageAdmin', {
                        cod_login: req.session.cod_login,
                        nome_login: req.session.nome_login,
                        foto_login: req.session.foto_login,
                        usuario_login: req.session.usuario_login, 
                        perfil_login: req.session.perfil_login,
                        id_perfil: req.session.id_perfil,
                        
                        DTUnidade: req.session.unidade,
                        page,
                        //Cadastros
                        Cadastro: 'active',
                        CadastroOpen: 'menu-open',
                        CadUsuario: '',
                        CadMaterial: '',
                        CadCategoria: 'active',
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
                        
                        
                        //Chat
                        ChatOpen: '',
                        Chat: '',
                        CadChat: '',

                        //Pedido
                        Pedido: '',
                        NovoPedido: '',

                        //Relatório
                        Relatorio: '',
                        Consulta: ''

                    });

                    //Limpa campos
                    req.body = {};
                    res.end();

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

                } else { //Usuário bloqueado
                    console.log('aqui')
                    status_Login = 'loginBloqueado';
                    res.render('./pageLogin', {
                        status_Login,
                        body: req.body
                    });
                    res.end();
                }
            
            } else { //Usuário e senha não conferem
                console.log('aqui2')
                status_Login = 'loginIncorreto';
                res.render('./pageLogin', {
                    status_Login,
                    body: req.body
                });
                res.end();
            }

            
        });
    },

    pageAdmin: (req, res) => {

        let consulta = "select perfil from tb_unidade"     
                db.query(consulta, (err, results2, fields) => {

        page = './includes/default/3-content';
        res.render('./pageAdmin', {
            cod_login: req.session.cod_login,
            nome_login: req.session.nome_login,
            foto_login: req.session.foto_login,
            usuario_login: req.session.usuario_login,
            perfil_login: req.session.perfil_login,
            id_perfil: req.session.id_perfil,
            
            DTUnidade: results2,
            page,
            //Cadastros
            CadastroOpen: '',
            Cadastro: '',
            CadUsuario: '',
            CadMaterial: '',
            //Chat
            ChatOpen: '',
            Chat: '',
            CadChat: '',

            //Pedido
            Pedido: '',
            NovoPedido: '',

            //Relatório
            Relatorio: '',
            Consulta: ''
        })
        });
        res.end();

    },
};