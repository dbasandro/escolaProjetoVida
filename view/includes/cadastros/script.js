const adicionar = document.getElementById("adicionar");

adicionar.addEventListener("click", function (event) {

var table = document.getElementById("tabela");
var row = table.insertRow(2);

row.insertCell(0).innerHTML = "Cód. Produto:";
row.insertCell(1).innerHTML = `<input type="text" name="codProduto[]" placeholder="CodProduto"> `;
row.insertCell(2).innerHTML = "Quantidade";
row.insertCell(3).innerHTML = `<input type="text" name="razao[]" placeholder="Quantidade">`;
row.insertCell(4).innerHTML = "Desconto";
row.insertCell(5).innerHTML = `<input type="text" name="desconto[]" placeholder="Desconto">`;

});