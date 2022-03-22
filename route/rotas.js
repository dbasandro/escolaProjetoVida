


module.exports = (io) => { //Aqui recebo o socket.io lá do app.js

    //Instanciando o Router do express
    var express = require('express');
    var rotas = express.Router();
    

    //Trecho que verifica se a seção está ativa
    rotas.use(function(req, res, next){
        //Se a rota for diferente da página inicial e nome_login da seção redis estiver vazio
        if (['/'].indexOf(req.url) === -1 && req.session.nome_login == undefined) {
            //Redireciona para a página de login
            res.redirect('/')
        } else {//senão
            //Passa para as próximas rotas abaixo 
            next();
        }        
    });



    rotas.get('/abaixo_minimo_download',function(req,res){
        res.download(__dirname +'/../abaixo_minimo.xlsx','abaixo_minimo.xlsx');
    })

    rotas.get('/baixa_produdo_download',function(req,res){
        res.download(__dirname +'/../baixa_produdo.xlsx','baixa_produdo.xlsx');
    })

    rotas.get('/entrada_produdo_download',function(req,res){
        res.download(__dirname +'/../entrada_produdo.xlsx','entrada_produdo.xlsx');
    })

    rotas.get('/consumo_item_download',function(req,res){
        res.download(__dirname +'/../consumo_item.xlsx','consumo_item.xlsx');
    })

    rotas.get('/consumo_categoria_download',function(req,res){
        res.download(__dirname +'/../consumo_categoria.xlsx','consumo_categoria.xlsx');
    })

    rotas.get('/consumo_centrodecusto_download',function(req,res){
        res.download(__dirname +'/../consumo_centrodecusto.xlsx','consumo_centrodecusto.xlsx');
    })

    rotas.get('/consumo_diario_download',function(req,res){
        res.download(__dirname +'/../consumo_diario.xlsx','consumo_diario.xlsx');
    })

    rotas.get('/serie_download',function(req,res){
        res.download(__dirname +'/../serie.xlsx','serie.xlsx');
    })

    rotas.get('/solicitante_download',function(req,res){
        res.download(__dirname +'/../solicitante.xlsx','solicitante.xlsx');
    })

    rotas.get('/produto_download',function(req,res){
        res.download(__dirname +'/../produto.xlsx','produto.xlsx');
    })

    rotas.get('/requisicoes_download',function(req,res){
        res.download(__dirname +'/../requisicoes.xlsx','requisicoes.xlsx');
    })

    const DB = require('../dao/listas/selects.js');
    const mysql = require('mysql2');
    const config = require('../database/config');
    const conn = mysql.createConnection(config);

    rotas.get('/atualizaStatusUser/:cod/:status',function(req,res){

        let sql = 'UPDATE `tb_usuario` SET STATUS="' + req.params.status + '"  WHERE cod = "' + req.params.cod + '"';
    db.query(sql, (err, results, fields) => {
        
    })

    // res.redirect('/usuario');

    })

    rotas.get('/ConsultaPermissaoUser/:cod/:unidade',function(req,res){
        //p.status
        db.query("call sp_consulta_permissao(?,?)", [req.params.unidade, req.params.cod], 
        function (err, result) {
        res.send(result[0]);
    })
    })


    //atualizar permisão de usuário
    rotas.get('/atualizaPermissaoUser/:cod/:permissao',function(req,res){
        //p.status
        db.query("call sp_atualiza_user(?,?)", [req.params.cod, req.params.permissao], 
        function (err, result) {
            res.sendStatus(200);
        
    })
    })

    rotas.get('/atualizaVisualizaUser/:status/:unidade/:produto',function(req,res){
        //p.status
    db.query("call sp_visualiza_user(?,?,?)", [req.params.status,req.params.unidade, req.params.produto], 
    function (err, result) {
            res.sendStatus(200);
    })
    })    

    rotas.get('/consultaEstoque/:unidade/:pagina/:tipo',function(req,res){
        //p.status


        db.query("call sp_consulta_produto2(?,?)", [req.params.unidade, req.session.cod_login], 
        function (err, results) {

            function l(items, p, l) {
                let result = [];
                let tP = Math.ceil(items.length / l);
                let count = (p * l) - l;
                let delimiter = count + l;
                if (p <= tP) {
                for (let i = count; i < delimiter; i++) {
                if (items[i] != null) {
                result.push(items[i]);
                }count++;}}
            
                res.send(result);
            };
              
            
console.log(req.params.unidade,req.params.pagina,req.params.tipo)
            

if (req.params.tipo == 'busca'){
    
                l(results[0],req.params.pagina,100);
            }

            if (req.params.tipo == 'filtro'){

                function retornaEletronico (value){
                    if (value.cod == req.params.pagina)
                    return value;

                    
                }
                var produtosEletronico = results[0].filter(retornaEletronico);
                Envia(produtosEletronico);

           
               
    function Envia(dados){
       res.send(dados);
    }
                            
                        }            
            
           
        
    })
    })


    rotas.get('/qtsPagina',function(req,res){
        //p.status
        db.query("select CEILING(count(id_produto)/100) as paginas from tb_produto where status=1", 
        function (err, results) {

            res.send(results); 
           
        
    })
    })

    

    //================================================================== Setando as rotas da aplicação
     //Rotas para a página de "Login"
    const { pageLogin, verificaLogin, pageAdmin } = require('../dao/login.js');
    rotas.get('/', pageLogin); //localhost:3000 - Tela inicial de login
    rotas.post('/', verificaLogin); //localhost:3000 - Usado no post do botão "Entrar" da tela de login
    rotas.get('/', pageAdmin); //localhost:3000/admin - Tela inicial da página administrativa   
    
         //Rotas para a página de "Login"
         const { pageDashboard,  } = require('../dao/cadastros/dashboard.js');
         rotas.get('/', pageDashboard); //localhost:3000 - Tela inicial de login
     
     //================================================================== CADASTROS
    //Rotas para a página de "Categoria"
    const { pageCategoria, addCategoria, delCategoria, } = require('../dao/cadastros/categoria.js');
    rotas.get('/Categoria', pageCategoria); //localhost:3000/Categoria (ao clicar no menu da sidebar: Cadastros > Categoria (C"R"UD))
    rotas.post('/addCategoria', addCategoria); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.get('/delCategoria/:id', delCategoria); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    
    
     //Rotas para a página de "Centro de Custo"
    const { pageCentroDeCusto, addCentroDeCusto, editCentroDeCusto, delCentroDeCusto, } = require('../dao/cadastros/centrodecusto.js');
    rotas.get('/centrodecusto', pageCentroDeCusto); //localhost:3000/centrodecusto (ao clicar no menu da sidebar: Cadastros > centrodecusto (C"R"UD))
    rotas.post('/addcentrodecusto', addCentroDeCusto); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editcentrodecusto/:id', editCentroDeCusto); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delcentrodecusto/:id', delCentroDeCusto); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    
     //Rotas para a página de "Disciplina"
     const { pageDisciplina, addDisciplina, editDisciplina, delDisciplina, } = require('../dao/cadastros/disciplina.js');
     rotas.get('/disciplina', pageDisciplina); //localhost:3000/Disciplina (ao clicar no menu da sidebar: Cadastros > Disciplina (C"R"UD))
     rotas.post('/addDisciplina', addDisciplina); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
     rotas.post('/editDisciplina/:id', editDisciplina); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
     rotas.get('/delDisciplina/:id', delDisciplina); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")   
    
    //Rotas para a página de "Cadastro de Fornecedor"
    const { pageFornecedor, addFornecedor, editFornecedor, delFornecedor, } = require('../dao/cadastros/fornecedor.js');
    rotas.get('/fornecedor', pageFornecedor); //localhost:3000/Fornecedor (ao clicar no menu da sidebar: Cadastros > Fornecedor (C"R"UD))
    rotas.post('/addFornecedor', addFornecedor); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editFornecedor/:id', editFornecedor); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delFornecedor/:id', delFornecedor); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")

    //Rotas para a página de "estoque_fundamental"
    const { pageMaterial_fundamental, addMaterial_fundamental, editMaterial_fundamental, delMaterial_fundamental, editAdicionaMaterial_fundamental, editBaixaMaterial_fundamental, } = require('../dao/cadastros/estoque_fundamental.js');
    rotas.get('/material_fundamental', pageMaterial_fundamental); //localhost:3000/material (ao clicar no menu da sidebar: Cadastros > Material (C"R"UD))
    rotas.post('/addMaterial_fundamental', addMaterial_fundamental); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editMaterial_fundamental/:id', editMaterial_fundamental); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delMaterial_fundamental/:id', delMaterial_fundamental); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/editAdicionaMaterial_fundamental/:id', editAdicionaMaterial_fundamental); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.post('/editBaixaMaterial_fundamental/:id', editBaixaMaterial_fundamental); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)

        //Rotas para a página de "estoque_infantil"
    const { pageMaterial_infantil, addMaterial_infantil, editMaterial_infantil, delMaterial_infantil, editAdicionaMaterial_infantil, editBaixaMaterial_infantil, } = require('../dao/cadastros/estoque_infantil.js');
    rotas.get('/material_infantil', pageMaterial_infantil); //localhost:3000/material (ao clicar no menu da sidebar: Cadastros > Material (C"R"UD))
    rotas.post('/addMaterial_infantil', addMaterial_infantil); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editMaterial_infantil/:id', editMaterial_infantil); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delMaterial_infantil/:id', delMaterial_infantil); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/editAdicionaMaterial_infantil/:id', editAdicionaMaterial_infantil); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.post('/editBaixaMaterial_infantil/:id', editBaixaMaterial_infantil); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)

        //Rotas para a página de "estoque_novopatio"
    const { pageMaterial_novopatio, addMaterial_novopatio, editMaterial_novopatio, delMaterial_novopatio, editAdicionaMaterial_novopatio, editBaixaMaterial_novopatio, } = require('../dao/cadastros/estoque_novopatio.js');
    rotas.get('/material_novopatio', pageMaterial_novopatio); //localhost:3000/material (ao clicar no menu da sidebar: Cadastros > Material (C"R"UD))
    rotas.post('/addMaterial_novopatio', addMaterial_novopatio); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editMaterial_novopatio/:id', editMaterial_novopatio); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delMaterial_novopatio/:id', delMaterial_novopatio); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/editAdicionaMaterial_novopatio/:id', editAdicionaMaterial_novopatio); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.post('/editBaixaMaterial_novopatio/:id', editBaixaMaterial_novopatio); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)

    //Rotas para a página de "Cadastro de Requisições"
    const { pageRequisicao_sandro, addRequisicao_sandro, editRequisicao_sandro, delRequisicao_sandro, addProduto_sandro, } = require('../dao/cadastros/requisicao_sandro.js');
    rotas.get('/requisicao_sandro', pageRequisicao_sandro); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/pageRequisicao_sandro:id', pageRequisicao_sandro); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/addRequisicao_sandro', addRequisicao_sandro); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editRequisicao_sandro/:id', editRequisicao_sandro); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delRequisicao_sandro/:id', delRequisicao_sandro); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/addProduto_sandro', addProduto_sandro); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)

    //Rotas para a página de "Cadastro de Requisições"
    const { pageRequisicao_fundamental, addRequisicao_fundamental, editRequisicao_fundamental, delRequisicao_fundamental, addProduto_fundamental, } = require('../dao/cadastros/requisicao_fundamental.js');
    rotas.get('/requisicao_fundamental', pageRequisicao_fundamental); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/pageRequisicao_fundamental:id', pageRequisicao_fundamental); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/addRequisicao_fundamental', addRequisicao_fundamental); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editRequisicao_fundamental/:id', editRequisicao_fundamental); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delRequisicao_fundamental/:id', delRequisicao_fundamental); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/addProduto_fundamental', addProduto_fundamental); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)

        //Rotas para a página de "Cadastro de Requisições"
    const { pageRequisicao_infantil, addRequisicao_infantil, editRequisicao_infantil, delRequisicao_infantil, addProduto_infantil, } = require('../dao/cadastros/requisicao_infantil.js');
    rotas.get('/requisicao_infantil', pageRequisicao_infantil); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/pageRequisicao_infantil:id', pageRequisicao_infantil); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/addRequisicao_infantil', addRequisicao_infantil); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editRequisicao_infantil/:id', editRequisicao_infantil); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delRequisicao_infantil/:id', delRequisicao_infantil); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/addProduto_infantil', addProduto_infantil); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)

        //Rotas para a página de "Cadastro de Requisições"
    const { pageRequisicao_novopatio, addRequisicao_novopatio, editRequisicao_novopatio, delRequisicao_novopatio, addProduto_novopatio, } = require('../dao/cadastros/requisicao_novopatio.js');
    rotas.get('/requisicao_novopatio', pageRequisicao_novopatio); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/pageRequisicao_novopatio:id', pageRequisicao_novopatio); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/addRequisicao_novopatio', addRequisicao_novopatio); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editRequisicao_novopatio/:id', editRequisicao_novopatio); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delRequisicao_novopatio/:id', delRequisicao_novopatio); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/addProduto_novopatio', addProduto_novopatio); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)

    //Rotas para a página de "Cadastro de Solicitação de compra"
    const { pageSolicitacao_compra, addSolicitacaoProduto, } = require('../dao/cadastros/solicitacaocompra.js');
    rotas.get('/solicitacaocompra', pageSolicitacao_compra); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/addSolicitacaoProduto', addSolicitacaoProduto); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)

    //Rotas para a página de "Cadastro de Solicitação de compra"
    const { pageSolicitacao_compra_sandro, addSolicitacaoProduto_sandro, } = require('../dao/cadastros/solicitacaocompra_sandro.js');
    rotas.get('/solicitacaocompra_sandro', pageSolicitacao_compra_sandro); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/addSolicitacaoProduto_sandro', addSolicitacaoProduto_sandro); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)



        //Rotas para a página de "Cadastro de Solicitação de compras"
    const { pageEntrega, addEntrega, editEntrega, delEntrega} = require('../dao/cadastros/entrega_produto.js');
    rotas.get('/entrega_produto', pageEntrega); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/addEntrega', addEntrega); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editEntrega', editEntrega); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.get('/delEntrega/:id', delEntrega); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)

    //Rotas para a página de "Produtos entregues"
    const { pageEntrega_finalizada, } = require('../dao/cadastros/entrega_finalizada.js');
    rotas.get('/entrega_finalizada', pageEntrega_finalizada); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))



    //Rotas para a página de "Solicitante"
    const { pageSolicitante, addSolicitante, editSolicitante, delSolicitante, } = require('../dao/cadastros/solicitante.js');
    rotas.get('/solicitante', pageSolicitante); //localhost:3000/Solicitante (ao clicar no menu da sidebar: Cadastros > Solicitante (C"R"UD))
    rotas.post('/addSolicitante', addSolicitante); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editSolicitante/:id', editSolicitante); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delSolicitante/:id', delSolicitante); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")

    //Rotas para a página de "Turma"
    const { pageTurma, addTurma, editTurma, delTurma, } = require('../dao/cadastros/turma.js');
    rotas.get('/turma', pageTurma); //localhost:3000/Turma (ao clicar no menu da sidebar: Cadastros > Turma (C"R"UD))
    rotas.post('/addTurma', addTurma); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editTurma/:id', editTurma); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delTurma/:id', delTurma); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")

    //Rotas para a página de "Cadastro de Usuário"
    const { pageUsuario, addUsuario, editUsuario,editUsuariopermissao, delUsuario, } = require('../dao/cadastros/usuario.js');
    rotas.get('/usuario', pageUsuario); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/addUsuario', addUsuario); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/editUsuario/:id', editUsuario); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.post('/editUsuariopermissao/:id', editUsuariopermissao); //Usado no post do botão "Salvar" do modal que altera um registro (CR"U"D)
    rotas.get('/delUsuario/:id', delUsuario); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")



    //Rotas para a página de "Cadastro de Usuário"
    const { pageRelatorio, Abaixo_Minimo, baixa_produto, entrada_produto, consumo_categorias, consumo_centrodecusto, consumo_diario, serie, consumo_solicitante, consumo_produto, requisicoes} = require('../dao/cadastros/relatorio.js');
    rotas.get('/relatorio', pageRelatorio); //localhost:3000/usuario (ao clicar no menu da sidebar: Cadastros > Usuário (C"R"UD))
    rotas.post('/Abaixo_Minimo', Abaixo_Minimo); //Usado no post do botão "Salvar" do modal que cadastra um novo registro ("C"RUD)
    rotas.post('/baixa_produto', baixa_produto); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/entrada_produto', entrada_produto); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/consumo_categorias', consumo_categorias); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/consumo_centrodecusto', consumo_centrodecusto); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/consumo_diario', consumo_diario); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/serie', serie); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/consumo_solicitante', consumo_solicitante); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/consumo_produto', consumo_produto); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")
    rotas.post('/requisicoes', requisicoes); //Usado no get do botão "Sim, eliminar" do modal que deleta um registro (CRU"D")


    

    //================================================================== Chat
    //Rotas para a página de "Chat"
    const { pageChat, } = require('../dao/chat/chat.js');
    rotas.get('/chat', pageChat); //localhost:3000/chat (ao clicar no menu da sidebar: Comunicação > Chat

    //Exportando este módulo
    return rotas;
};