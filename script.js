var clientesSalvos = [];
var clienteEmEdicao = null;

// Carregar dados do armazenamento local ao carregar a página
window.onload = function () {
    var clientesSalvosLocalStorage = localStorage.getItem('clientesSalvos');
    if (clientesSalvosLocalStorage) {
        clientesSalvos = JSON.parse(clientesSalvosLocalStorage);
        atualizarTabelaClientes();
    }
};

function exibirInformacoes(event) {
    event.preventDefault();

    var idCliente = clientesSalvos.length + 1; // Gera um novo ID
    var nomeCorretor = document.getElementById('nomeCorretor').value;
    var nomeCliente = document.getElementById('nomeCliente').value;
    var telefone = document.getElementById('telefone').value;
    var endereco = document.getElementById('endereco').value;
    var valorImovel = document.getElementById('valorImovel').value;
    var dataContatoCorretor = document.getElementById('dataContatoCorretor').value;
    var informacoes = document.getElementById('informacoes').value;

    var cliente = {
        idCliente,
        nomeCorretor,
        nomeCliente,
        telefone,
        endereco,
        valorImovel,
        dataContatoCorretor,
        informacoes
    };

    if (clienteEmEdicao !== null) {
        // Editar cliente existente
        cliente.idCliente = clientesSalvos[clienteEmEdicao].idCliente;
        clientesSalvos[clienteEmEdicao] = cliente;
        clienteEmEdicao = null;
    } else {
        // Adicionar novo cliente
        clientesSalvos.push(cliente);
    }

    document.getElementById('nomeCorretor').value = '';
    document.getElementById('nomeCliente').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('valorImovel').value = '';
    document.getElementById('dataContatoCorretor').value = '';
    document.getElementById('informacoes').value = '';

    // Atualizar o armazenamento local
    localStorage.setItem('clientesSalvos', JSON.stringify(clientesSalvos));

    // Atualizar a tabela
    atualizarTabelaClientes();
}

function removerClienteSalvo(index) {
    clientesSalvos.splice(index, 1);
    localStorage.setItem('clientesSalvos', JSON.stringify(clientesSalvos));
    atualizarTabelaClientes();
}

function editarCliente(index) {
    clienteEmEdicao = index;
    var cliente = clientesSalvos[index];

    document.getElementById('idCliente').value = cliente.idCliente;
    document.getElementById('nomeCorretor').value = cliente.nomeCorretor;
    document.getElementById('nomeCliente').value = cliente.nomeCliente;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('endereco').value = cliente.endereco;
    document.getElementById('valorImovel').value = cliente.valorImovel;
    document.getElementById('dataContatoCorretor').value = cliente.dataContatoCorretor;
    document.getElementById('informacoes').value = cliente.informacoes;
}

function formatarValorImovel(valorImovel) {
    return valorImovel ? 'R$ ' + valorImovel : 'nulo';
}

function atualizarTabelaClientes() {
    var clientesSalvosBody = document.getElementById('clientesSalvosBody');
    clientesSalvosBody.innerHTML = '';

    clientesSalvos.forEach(function (cliente, index) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + cliente.idCliente + '</td>' +
            '<td>' + cliente.nomeCorretor + '</td>' +
            '<td>' + cliente.nomeCliente + '</td>' +
            '<td>' + cliente.telefone + '</td>' +
            '<td>' + cliente.endereco + '</td>' +
            '<td>' + formatarValorImovel(cliente.valorImovel) + '</td>' +
            '<td>' + cliente.dataContatoCorretor + '</td>' +
            '<td>' + cliente.informacoes + '</td>' +
            '<td class="actions-container">' +
            '<button class="edit" onclick="editarCliente(' + index + ')">Editar</button>' +
            '<button class="delete" onclick="removerClienteSalvo(' + index + ')">Apagar dados</button>' +
            '</td>';

        clientesSalvosBody.appendChild(row);
    });

    var infoSalvas = document.getElementById('infoSalvas');
    infoSalvas.style.display = clientesSalvos.length > 0 ? 'block' : 'none';
}
