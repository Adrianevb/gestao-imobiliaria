// Função para formatar data no padrão brasileiro (dd/mm/aaaa)
function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Máscara para WhatsApp
document.getElementById('whatsapp').addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }
    
    if (valor.length > 0) {
        valor = valor.replace(/(\d{2})(\d)/g, '($1) $2');
    }
    if (valor.length > 10) {
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    e.target.value = valor;
});

// Definir data atual como padrão
document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().substr(0, 10);
    document.getElementById('dataContato').value = dataFormatada;
    
    carregarClientes();
});

// Função para carregar clientes do localStorage
function carregarClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const tabela = document.querySelector('#tabelaClientes tbody');
    const semDados = document.getElementById('semDados');
    
    tabela.innerHTML = '';
    
    if (clientes.length === 0) {
        semDados.style.display = 'block';
        return;
    }
    
    semDados.style.display = 'none';
    
    clientes.forEach((cliente, indice) => {
        const novaLinha = tabela.insertRow();
        
        novaLinha.insertCell(0).textContent = cliente.nome;
        novaLinha.insertCell(1).textContent = cliente.whatsapp;
        novaLinha.insertCell(2).textContent = formatarData(cliente.dataContato);
        novaLinha.insertCell(3).textContent = cliente.tipoImovel;
        
        const cellAcoes = novaLinha.insertCell(4);
        cellAcoes.className = 'actions';
        
        const btnEditar = document.createElement('button');
        btnEditar.className = 'edit-btn';
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() { editarCliente(indice); };
        
        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'delete-btn';
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() { excluirCliente(indice); };
        
        cellAcoes.appendChild(btnEditar);
        cellAcoes.appendChild(btnExcluir);
    });
}

// Função para editar cliente
function editarCliente(indice) {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes[indice];
    
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('whatsapp').value = cliente.whatsapp;
    document.getElementById('dataContato').value = cliente.dataContato;
    document.getElementById('tipoImovel').value = cliente.tipoImovel;
    
    clientes.splice(indice, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    carregarClientes();
}

// Função para excluir cliente
function excluirCliente(indice) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.splice(indice, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        carregarClientes();
    }
}

// Cadastrar novo cliente
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cliente = {
        nome: document.getElementById('nome').value,
        whatsapp: document.getElementById('whatsapp').value,
        dataContato: document.getElementById('dataContato').value,
        tipoImovel: document.getElementById('tipoImovel').value
    };
    
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    document.getElementById('cadastroForm').reset();
    
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().substr(0, 10);
    document.getElementById('dataContato').value = dataFormatada;
    
    carregarClientes();
});
