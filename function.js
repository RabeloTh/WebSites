// Obtendo os elementos
const listaClientes = document.getElementById("listaClientes");
const listaFornecedores = document.getElementById("listaFornecedores");
const listaTransacoes = document.getElementById("listaTransacoes");
const btnCadastrarCliente = document.getElementById("cadastrarCliente");
const btnCadastrarFornecedor = document.getElementById("cadastrarFornecedor");
const btnCadastrarTransacao = document.getElementById("cadastrarTransacao");
const btnFiltrarCliente = document.getElementById("filtrarCliente");
const btnFiltrarFornecedor = document.getElementById("filtrarFornecedor");
const btnFiltrarTransacao = document.getElementById("filtrarTransacao");
const btnGerarRelatorioFluxoCaixa = document.getElementById("gerarRelatorioFluxoCaixa");
const graficoDashboardCtx = document.getElementById("graficoDashboard").getContext("2d");
const graficoRelatorioCtx = document.getElementById("graficoRelatorio").getContext("2d");
const btnSuporte = document.getElementById("btnSuporte");
const imprimirDadosButton = document.getElementById('imprimirDados');

// Formulários de cadastro
const cadastroClienteForm = document.getElementById("cadastroClienteForm");
const cadastroFornecedorForm = document.getElementById("cadastroFornecedorForm");
const cadastroTransacaoForm = document.getElementById("cadastroTransacaoForm");
const overlay = document.getElementById("overlay");

// Dados iniciais (teste)
let clientes = [
    { id: 1, nome: "Jonas", cnpjCpf: "xxxxxxxxx", endereco: "xxx", contato: "xxxxx" },
    { id: 2, nome: "Caio", cnpjCpf: "xxxxxxxxxxx", endereco: "xxx", contato: "xxxxxx" },
];

let fornecedores = [
    { id: 1, nome: "Empresa X", cnpjCpf: "xxx", endereco: "xxx", contato: "xxx" },
    { id: 2, nome: "Empresa Y", cnpjCpf: "xxx", endereco: "xxx", contato: "xxx" },
];

let transacoes = [
    { id: 1, data: "2025-01-10", descricao: "Venda de produtos", valor: 1500.00, tipo: "receita" },
    { id: 2, data: "2025-01-15", descricao: "Pagamento de aluguel", valor: 500.00, tipo: "despesa" },
    { id: 3, data: "2025-01-20", descricao: "Compra de materiais", valor: 200.00, tipo: "despesa" },
    { id: 4, data: "2025-01-25", descricao: "Serviço prestado", valor: 1000.00, tipo: "receita" },
];

// Funções para exibir dados nas tabelas
function exibirClientes() {
    listaClientes.innerHTML = "";
    clientes.forEach((cliente) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.cnpjCpf}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.contato}</td>
            <td>
                <button class="btn-editar" onclick="editarCliente(${cliente.id})">Editar</button> 
                <button class="btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
        `;
        listaClientes.appendChild(row);
    });
}

function exibirFornecedores() {
    listaFornecedores.innerHTML = "";
    fornecedores.forEach((fornecedor) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpjCpf}</td>
            <td>${fornecedor.endereco}</td>
            <td>${fornecedor.contato}</td>
            <td>
                <button class="btn-editar" onclick="editarFornecedor(${fornecedor.id})">Editar</button> 
                <button class="btn-excluir" onclick="excluirFornecedor(${fornecedor.id})">Excluir</button>
            </td>
        `;
        listaFornecedores.appendChild(row);
    });
}

function exibirTransacoes() {
    listaTransacoes.innerHTML = "";
    transacoes.forEach((transacao) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transacao.data}</td>
            <td>${transacao.descricao}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>${transacao.tipo}</td>
            <td>
                <button class="btn-editar" onclick="editarTransacao(${transacao.id})">Editar</button> 
                <button class="btn-excluir" onclick="excluirTransacao(${transacao.id})">Excluir</button>
            </td>
        `;
        listaTransacoes.appendChild(row);
    });
}

// Funções para cadastrar novos dados (usando formulários)
function abrirCadastroCliente() {
    cadastroClienteForm.style.display = "block";
    overlay.style.display = "block";
}

function abrirCadastroFornecedor() {
    cadastroFornecedorForm.style.display = "block";
    overlay.style.display = "block";
}

function abrirCadastroTransacao() {
    cadastroTransacaoForm.style.display = "block";
    overlay.style.display = "block";
}

function fecharCadastroCliente() {
    cadastroClienteForm.style.display = "none";
    overlay.style.display = "none";
}

function fecharCadastroFornecedor() {
    cadastroFornecedorForm.style.display = "none";
    overlay.style.display = "none";
}

function fecharCadastroTransacao() {
    cadastroTransacaoForm.style.display = "none";
    overlay.style.display = "none";
}

function salvarCliente() {
    const nome = document.getElementById("nomeCliente").value;
    const cnpjCpf = document.getElementById("cnpjCpfCliente").value;
    const endereco = document.getElementById("enderecoCliente").value;
    const contato = document.getElementById("contatoCliente").value;
    if (nome && cnpjCpf && endereco && contato) {
        const novoId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
        clientes.push({ id: novoId, nome, cnpjCpf, endereco, contato });
        exibirClientes();
        fecharCadastroCliente();
        alert("Cliente cadastrado com sucesso!");
    } else {
        alert("Preencha todos os campos!");
    }
}

function salvarFornecedor() {
    const nome = document.getElementById("nomeFornecedor").value;
    const cnpjCpf = document.getElementById("cnpjCpfFornecedor").value;
    const endereco = document.getElementById("enderecoFornecedor").value;
    const contato = document.getElementById("contatoFornecedor").value;
    if (nome && cnpjCpf && endereco && contato) {
        const novoId = fornecedores.length > 0 ? fornecedores[fornecedores.length - 1].id + 1 : 1;
        fornecedores.push({ id: novoId, nome, cnpjCpf, endereco, contato });
        exibirFornecedores();
        fecharCadastroFornecedor();
        alert("Fornecedor cadastrado com sucesso!");
    } else {
        alert("Preencha todos os campos!");
    }
}

function salvarTransacao() {
    const data = document.getElementById("dataTransacao").value;
    const descricao = document.getElementById("descricaoTransacao").value;
    const valor = parseFloat(document.getElementById("valorTransacao").value);
    const tipo = document.getElementById("tipoTransacao").value.toLowerCase();
    if (data && descricao && !isNaN(valor) && (tipo === "receita" || tipo === "despesa")) {
        const novoId = transacoes.length > 0 ? transacoes[transacoes.length - 1].id + 1 : 1;
        transacoes.push({ id: novoId, data, descricao, valor, tipo });
        exibirTransacoes();
        fecharCadastroTransacao();
        alert("Transação cadastrada com sucesso!");
    } else {
        alert("Preencha os campos corretamente!");
    }
}

// Funções para editar e excluir dados
function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        const novoNome = prompt("Novo nome:", cliente.nome);
        const novoCnpjCpf = prompt("Novo CNPJ/CPF:", cliente.cnpjCpf);
        const novoEndereco = prompt("Novo endereço:", cliente.endereco);
        const novoContato = prompt("Novo contato:", cliente.contato);
        if (novoNome && novoCnpjCpf && novoEndereco && novoContato) {
            cliente.nome = novoNome;
            cliente.cnpjCpf = novoCnpjCpf;
            cliente.endereco = novoEndereco;
            cliente.contato = novoContato;
            exibirClientes();
            alert("Cliente atualizado com sucesso!");
        }
    }
}

function excluirCliente(id) {
    clientes = clientes.filter(c => c.id !== id);
    exibirClientes();
    alert("Cliente excluído com sucesso!");
}

function editarFornecedor(id) {
    const fornecedor = fornecedores.find(f => f.id === id);
    if (fornecedor) {
        const novoNome = prompt("Novo nome:", fornecedor.nome);
        const novoCnpjCpf = prompt("Novo CNPJ/CPF:", fornecedor.cnpjCpf);
        const novoEndereco = prompt("Novo endereço:", fornecedor.endereco);
        const novoContato = prompt("Novo contato:", fornecedor.contato);
        if (novoNome && novoCnpjCpf && novoEndereco && novoContato) {
            fornecedor.nome = novoNome;
            fornecedor.cnpjCpf = novoCnpjCpf;
            fornecedor.endereco = novoEndereco;
            fornecedor.contato = novoContato;
            exibirFornecedores();
            alert("Fornecedor atualizado com sucesso!");
        }
    }
}

function excluirFornecedor(id) {
    fornecedores = fornecedores.filter(f => f.id !== id);
    exibirFornecedores();
    alert("Fornecedor excluído com sucesso!");
}

function editarTransacao(id) {
    const transacao = transacoes.find(t => t.id === id);
    if (transacao) {
        const novaData = prompt("Nova data:", transacao.data);
        const novaDescricao = prompt("Nova descrição:", transacao.descricao);
        const novoValor = parseFloat(prompt("Novo valor:", transacao.valor));
        const novoTipo = prompt("Novo tipo (receita/despesa):", transacao.tipo).toLowerCase();
        if (novaData && novaDescricao && !isNaN(novoValor) && (novoTipo === "receita" || novoTipo === "despesa")) {
            transacao.data = novaData;
            transacao.descricao = novaDescricao;
            transacao.valor = novoValor;
            transacao.tipo = novoTipo;
            exibirTransacoes();
            alert("Transação atualizada com sucesso!");
        }
    }
}

function excluirTransacao(id) {
    transacoes = transacoes.filter(t => t.id !== id);
    exibirTransacoes();
    alert("Transação excluída com sucesso!");
}

// Funções para filtrar dados (simulando filtros)
function filtrarClientes() {
    const pesquisa = document.getElementById("pesquisaCliente").value.toLowerCase();
    const clientesFiltrados = clientes.filter((cliente) => {
        return (
            cliente.nome.toLowerCase().includes(pesquisa) ||
            cliente.cnpjCpf.includes(pesquisa) ||
            cliente.endereco.toLowerCase().includes(pesquisa)
        );
    });
    listaClientes.innerHTML = "";
    clientesFiltrados.forEach((cliente) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.cnpjCpf}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.contato}</td>
            <td>
                <button class="btn-editar" onclick="editarCliente(${cliente.id})">Editar</button> 
                <button class="btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
        `;
        listaClientes.appendChild(row);
    });
}

function filtrarFornecedores() {
    const pesquisa = document.getElementById("pesquisaFornecedor").value.toLowerCase();
    const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
        return (
            fornecedor.nome.toLowerCase().includes(pesquisa) ||
            fornecedor.cnpjCpf.includes(pesquisa) ||
            fornecedor.endereco.toLowerCase().includes(pesquisa)
        );
    });
    listaFornecedores.innerHTML = "";
    fornecedoresFiltrados.forEach((fornecedor) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpjCpf}</td>
            <td>${fornecedor.endereco}</td>
            <td>${fornecedor.contato}</td>
            <td>
                <button class="btn-editar" onclick="editarFornecedor(${fornecedor.id})">Editar</button> 
                <button class="btn-excluir" onclick="excluirFornecedor(${fornecedor.id})">Excluir</button>
            </td>
        `;
        listaFornecedores.appendChild(row);
    });
}

function filtrarTransacoes() {
    const dataInicio = document.getElementById("filtroDataInicio").value;
    const dataFim = document.getElementById("filtroDataFim").value;
    const tipo = document.getElementById("filtroTipo").value.toLowerCase();
    const pesquisa = document.getElementById("pesquisaTransacao").value.toLowerCase();

    const transacoesFiltradas = transacoes.filter((transacao) => {
        const dataTransacao = new Date(transacao.data);

        const dataValida =
            (!dataInicio || new Date(dataInicio) <= dataTransacao) &&
            (!dataFim || new Date(dataFim) >= dataTransacao);

        const tipoValido = !tipo || transacao.tipo === tipo;

        const pesquisaValida =
            transacao.descricao.toLowerCase().includes(pesquisa);

        return dataValida && tipoValido && pesquisaValida;
    });

    listaTransacoes.innerHTML = "";
    transacoesFiltradas.forEach((transacao) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transacao.data}</td>
            <td>${transacao.descricao}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>${transacao.tipo}</td>
            <td>
                <button class="btn-editar" onclick="editarTransacao(${transacao.id})">Editar</button> 
                <button class="btn-excluir" onclick="excluirTransacao(${transacao.id})">Excluir</button>
            </td>
        `;
        listaTransacoes.appendChild(row);
    });
}

// Função para gerar gráfico de fluxo de caixa
function gerarRelatorioFluxoCaixa() {
    const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);

    graficoRelatorioCtx.clearRect(0, 0, graficoRelatorioCtx.canvas.width, graficoRelatorioCtx.canvas.height);
    new Chart(graficoRelatorioCtx, {
        type: 'bar',
        data: {
            labels: ['Receitas', 'Despesas'],
            datasets: [{
                label: 'Fluxo de Caixa',
                data: [receitas, despesas],
                backgroundColor: ['#088e97', '#cc0430'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Relatório de Fluxo de Caixa',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para gerar gráfico do dashboard
function gerarGraficoDashboard() {
    const receitaTotal = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const despesaTotal = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
    const saldoAtual = receitaTotal - despesaTotal;

    // Atualiza os valores dos cards
    document.querySelector(".card:nth-child(1) p").textContent = `R$ ${receitaTotal.toFixed(2)}`;
    document.querySelector(".card:nth-child(2) p").textContent = `R$ ${despesaTotal.toFixed(2)}`;
    document.querySelector(".card:nth-child(3) p").textContent = `R$ ${saldoAtual.toFixed(2)}`;

    const total = receitaTotal + despesaTotal + saldoAtual;

    const data = {
        labels: ['Receitas', 'Despesas', 'Saldo'],
        datasets: [{
            data: [receitaTotal, despesaTotal, saldoAtual],
            backgroundColor: ['#088e97', '#cc0430', '#003366'],
            hoverOffset: 10
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                font: {
                    size: 20
                }
            },
            datalabels: {
                color: 'white',
                formatter: (value, context) => {
                    if (!context.chart.data.datasets[context.datasetIndex].data[context.dataIndex]) return '';
                    const percentage = Math.round((value / total) * 100);
                    return `${percentage}%`;
                },
                font: {
                    size: 16
                }
            }
        }
    };

    // Remove o gráfico anterior se existir
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }

    // Cria um novo gráfico de pizza
    window.myPieChart = new Chart(graficoDashboardCtx, {
        type: 'pie',
        data: data,
        options: options
    });
}

// Função para contatar o suporte via WhatsApp
function contatarSuporte() {
    const numeroWhatsApp = "24999493209";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}`;
    window.open(linkWhatsApp, '_blank');
}

// Função para imprimir dados detalhados
function imprimirDadosDetalhados() {
    let janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write('<html><head><title>Dados Detalhados</title>');
    janelaImpressao.document.write('<style>');
    janelaImpressao.document.write('table { width: 100%; border-collapse: collapse; }');
    janelaImpressao.document.write('th, td { border: 1px solid black; padding: 8px; text-align: left; }');
    janelaImpressao.document.write('th { background-color: #f2f2f2; }');
    janelaImpressao.document.write('</style>');
    janelaImpressao.document.write('</head><body>');

    janelaImpressao.document.write('<h2>Clientes</h2>');
    janelaImpressao.document.write('<table>');
    janelaImpressao.document.write('<tr><th>Nome</th><th>CNPJ/CPF</th><th>Endereço</th><th>Contato</th></tr>');
    clientes.forEach(cliente => {
        janelaImpressao.document.write(`<tr><td>${cliente.nome}</td><td>${cliente.cnpjCpf}</td><td>${cliente.endereco}</td><td>${cliente.contato}</td></tr>`);
    });
    janelaImpressao.document.write('</table><br>');

    janelaImpressao.document.write('<h2>Fornecedores</h2>');
    janelaImpressao.document.write('<table>');
    janelaImpressao.document.write('<tr><th>Nome</th><th>CNPJ/CPF</th><th>Endereço</th><th>Contato</th></tr>');
    fornecedores.forEach(fornecedor => {
        janelaImpressao.document.write(`<tr><td>${fornecedor.nome}</td><td>${fornecedor.cnpjCpf}</td><td>${fornecedor.endereco}</td><td>${fornecedor.contato}</td></tr>`);
    });
    janelaImpressao.document.write('</table><br>');

    janelaImpressao.document.write('<h2>Transações</h2>');
    janelaImpressao.document.write('<table>');
    janelaImpressao.document.write('<tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Tipo</th></tr>');
    transacoes.forEach(transacao => {
        janelaImpressao.document.write(`<tr><td>${transacao.data}</td><td>${transacao.descricao}</td><td>R$ ${transacao.valor.toFixed(2)}</td><td>${transacao.tipo}</td></tr>`);
    });
    janelaImpressao.document.write('</table>');

    janelaImpressao.document.write('</body></html>');
    janelaImpressao.document.close();
    janelaImpressao.focus();
    janelaImpressao.print();
    janelaImpressao.close();
}


// Event listeners
btnCadastrarCliente.addEventListener("click", abrirCadastroCliente);
btnCadastrarFornecedor.addEventListener("click", abrirCadastroFornecedor);
btnCadastrarTransacao.addEventListener("click", abrirCadastroTransacao);
btnFiltrarCliente.addEventListener("click", filtrarClientes);
btnFiltrarFornecedor.addEventListener("click", filtrarFornecedores);
btnFiltrarTransacao.addEventListener("click", filtrarTransacoes);
btnGerarRelatorioFluxoCaixa.addEventListener("click", gerarRelatorioFluxoCaixa);
btnSuporte.addEventListener("click", contatarSuporte);

// Eventos para os formulários de cadastro
document.getElementById("salvarCliente").addEventListener("click", salvarCliente);
document.getElementById("cancelarCliente").addEventListener("click", fecharCadastroCliente);
document.getElementById("salvarFornecedor").addEventListener("click", salvarFornecedor);
document.getElementById("cancelarFornecedor").addEventListener("click", fecharCadastroFornecedor);
document.getElementById("salvarTransacao").addEventListener("click", salvarTransacao);
document.getElementById("cancelarTransacao").addEventListener("click", fecharCadastroTransacao);

// Exibir dados iniciais e gerar gráficos
exibirClientes();
exibirFornecedores();
exibirTransacoes();
gerarGraficoDashboard();
gerarRelatorioFluxoCaixa();

// Evento de clique para imprimir os dados
imprimirDadosButton.addEventListener('click', imprimirDadosDetalhados);

// Função para inicializar o chat de suporte
function inicializarChatSuporte() {
    const chatHeader = document.getElementById('chat-header');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send-button');
    const chatMessages = document.getElementById('chat-messages');
    const headerIcon = chatHeader.querySelector('i');

    let chatOpen = false;
    const mensagens = [];

    chatHeader.addEventListener('click', () => {
        chatOpen = !chatOpen;
        if (chatOpen) {
            chatHeader.classList.remove('closed');
            chatHeader.classList.add('open');
            headerIcon.classList.remove('ph-caret-up');
            headerIcon.classList.add('ph-caret-down');
            chatWindow.style.display = 'flex';
        } else {
            chatHeader.classList.remove('open');
            chatHeader.classList.add('closed');
            headerIcon.classList.remove('ph-caret-down');
            headerIcon.classList.add('ph-caret-up');
            chatWindow.style.display = 'none';
        }
    });

    chatSendButton.addEventListener('click', () => {
        const mensagem = chatInput.value;
        if (mensagem.trim() !== '') {
            mensagens.push({ texto: mensagem, tipo: 'user' });
            chatMessages.innerHTML += `<div class="message user">${mensagem}</div>`;
            chatInput.value = '';

            setTimeout(() => {
                const resposta = gerarRespostaSuporte(mensagem);
                mensagens.push({ texto: resposta, tipo: 'support' });
                chatMessages.innerHTML += `<div class="message support">${resposta}</div>`;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSendButton.click();
        }
    });

    function gerarRespostaSuporte(mensagem) {
        mensagem = mensagem.toLowerCase();
        if (mensagem.includes('cadastro')) {
            return "Para cadastrar um novo item, clique no botão correspondente (Cliente, Fornecedor, Transação) e preencha o formulário.";
        } else if (mensagem.includes('filtro')) {
            return "Para filtrar os dados, clique no botão 'Filtrar' na seção desejada e preencha os critérios de filtro.";
        } else if (mensagem.includes('gráfico') || mensagem.includes('relatório')) {
            return "O gráfico de fluxo de caixa é gerado automaticamente ao cadastrar transações. Clique em 'Gerar Relatório de Fluxo de Caixa' para atualizá-lo.";
        } else if (mensagem.includes('imprimir')) {
            return "Clique no botão 'Imprimir Dados' para gerar uma versão para impressão dos dados exibidos.";
        } else {
            return "Desculpe, não entendi sua pergunta. Por favor, seja mais específico.";
        }
    }
}

// Inicializar o chat de suporte
inicializarChatSuporte();