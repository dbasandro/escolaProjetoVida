//Classe de consultas
class DB {

    //Construtor que recebe a conexão quando instanciado a classe
    constructor(db) {
        this.db = db;
    }

    //-------------------------------------------------------------------------------------- Funções internas

    //Consulta sem parâmetro
    async doQuery(queryToDo) {
        let pro = new Promise((resolve, reject) => {
            let query = queryToDo;

            //Executando a consulta
            this.db.query(query, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        })

        //Retornando o resultado
        return pro.then((val) => {
            return val;
        })
    }

    //Consulta com parâmetro
    async doQueryParams(queryToDo, array) {
        let pro = new Promise((resolve, reject) => {
            let query = queryToDo;

            //Executando a consulta com parâmetro
            this.db.query(query, array, function (err, result) {
                if (err) throw err;
                resolve(result);
            });
        })

        //Retornando o resultado
        return pro.then((val) => {
            return val;
        })
    }

    //-------------------------------------------------------------------------------------- Funções exportadas
    //Funções contendo os selects responsáveis por retornar o resultado caso chamado
//html
//async gethtml() {
 //       let query = "CALL sp_html_email(81)"
  //  return this.doQuery(query)

    
//}



    //Perfis de usuário
    async getPerfilUsuario() {
        let query = "SELECT * FROM tb_unidade ORDER BY perfil ASC";
        return this.doQuery(query)
    }

    //admin
    async getAdminUsuario() {
        let query = "SELECT cod FROM tb_usuario WHERE admin= 1";
        return this.doQuery(query)
    }

    //Materiais
    async getMateriais() {
        let query = "SELECT id_produto, nome from tb_produto"
        return this.doQuery(query)
    }

 

    //Familias de material
    async getFamiliaMaterial() {
        let query = "SELECT * FROM tb_familia_material ORDER BY familia ASC";
        return this.doQuery(query)
    }

    //Grupos de material
    async getGrupoMaterial() {
        let query = "SELECT * FROM tb_grupo_material where status =1 ORDER BY grupo ASC";
        return this.doQuery(query)
    }

    //Periodo
    async getPeriodo() {
        let query = "SELECT * FROM tb_periodo ORDER BY periodo ASC";
        return this.doQuery(query)
    }

     //sÉRIE
    async getSerie() {
        let query = "SELECT * FROM tb_serie ORDER BY serie ASC";
        return this.doQuery(query)
    }
     //Classe
     async getClasse() {
        let query = "SELECT * FROM tb_classe ORDER BY classe ASC";
        return this.doQuery(query)
    }

  

     //Centro de custo
     async getCentrodecusto() {
        let query = "SELECT nome,id,pedagogico FROM tb_centrodecusto where status=1 ORDER BY nome ASC";
        return this.doQuery(query)
    }

     //Disciplina
     async getDisciplina() {
        let query = "SELECT * FROM tb_disciplina WHERE STATUS=1 and cod not in (41,42,43) ORDER BY nome ASC";
        return this.doQuery(query)
    }

      //Turmas
     async getTurma() {
        let query = "SELECT unidade,CONCAT( tt.serie, ' ',  tc.classe, ' ', tp.periodo, ' ', tt.anoletivo ) as turma, tt.cod FROM tb_turma  tt inner join tb_classe tc on tt.classe=tc.cod inner join tb_periodo tp on tt.periodo=tp.cod and tt.status=1";
        return this.doQuery(query)
    }

     //Estado
     async getEstado() {
        let query = "SELECT * from tb_estado";
        return this.doQuery(query)
    }

         //Centro de Custo
         async getCentro() {
            let query = "SELECT * from tb_centrodecusto where status=1";
            return this.doQuery(query)
        }


           //Perfil
           async getPerfil() {
            let query = "SELECT id, perfil from tb_perfil";
            return this.doQuery(query)
        }

            //Produtos
            async getListaProdutos() {
                let query = "select id_produto as cod, nome from tb_produto where status=1 ";
                return this.doQuery(query)
            }
     //Requisições
    // async getREQ() {
     //   let query = "SELECT rm.update, rm.id_requisicao, s.nome,m.material, rm.qtd, vm.valor_uni,  (rm.qtd*vm.valor_uni) as total, s.unidade  FROM tb_requisicao_material rm  inner join tb_historico_valor_material vm  on rm.id_valor_material=vm.cod  inner join tb_material m on m.cod=vm.id_material  inner join tb_requisicao r on rm.id_requisicao = r.cod inner join tb_solicitante s on r.id_solicitante=s.cod"
     //   return this.doQuery(query)
    //}


};



//Exportando esta classe
module.exports = DB;