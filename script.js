// Dados de exemplo (simulando um banco de dados)
const imoveis = [
    { id: 1, tipo: "Casa", preco: 250000 },
    { id: 2, tipo: "Apartamento", preco: 180000 }
];

// Mostra imóveis na página
function carregarImoveis() {
    const lista = document.getElementById("imoveis-lista");
    lista.innerHTML = imoveis.map(imovel => 
        `<p>${imovel.tipo} - R$ ${imovel.preco.toLocaleString()}</p>`
    ).join("");
}

carregarImoveis();
