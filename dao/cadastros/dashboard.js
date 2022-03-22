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
    pageDashboard: (req, res) => {

        //Executa certas funções em tempo de execução passando para a página
        let DBModel = new DB(conn);
        (async function () {

            //Consultas diversas para popular elementos
            let unidades = await DBModel.getPerfilUsuario();
            let Periodos = await DBModel.getPeriodo();
            let Series = await DBModel.getSerie();
            let Classes = await DBModel.getClasse();

            //Atribuindo o conteúdo central
            page = './includes/default/3-content';
     
            
            var query = "SELECT tc.cod, concat(tc.serie, ' ', tcl.classe) as classe, tp.periodo, tc.anoletivo, tu.perfil as unidade FROM tb_turma tc inner join tb_unidade tu on tc.unidade=tu.cod inner join tb_classe tcl on tcl.cod=tc.classe inner join tb_periodo tp on tc.periodo=tp.cod AND tc.status=1 AND unidade in (select unidade from tb_usuario where nome = '" + req.session.nome_login +"')" 

            db.query(query, (err, results, fields) => {
                
               

                //Passa o conteúdo das variáveis para a página principal
                res.render('./pageAdmin', {
                    DTMaterial: results,
                   // DTUsuario: results,
                    DTPerfis: unidades,
                    DTPeriodos: Periodos,
                    DTSeries: Series,
                    DTClasses: Classes,
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
                    CadDashboard: 'active',
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

           addDashboard: (req, res) => {

           
        },
    
        editDashboard: (req, res) => {
    
        },
    
        delDashboard: (req, res) => {
            
        },
    
        /**
         * Funções que passam o valor da variável para outro arquivo js */
        getStatusCrud() {
            return status_Crud;
        },
    
    };