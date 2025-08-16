document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM que serão usados
    const nameInput = document.getElementById('nameInput');
    const addButton = document.getElementById('addButton');
    const drawButton = document.getElementById('drawButton');
    const nameList = document.getElementById('nameList');
    const resultName = document.getElementById('resultName');

    let names = []; // Array para armazenar os nomes

    // Adiciona um evento para o botão "Adicionar"
    addButton.addEventListener('click', addName);

    // Adiciona um evento para a tecla "Enter" no campo de texto
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addName();
        }
    });

    // Adiciona um evento para o botão "Sortear"
    drawButton.addEventListener('click', drawName);

    // Função para adicionar um nome à lista
    function addName() {
        // Remove espaços em branco do início e fim do nome
        const name = nameInput.value.trim();

        // Validação: verifica se o nome não está vazio e não é um duplicado
        if (name === '') {
            alert('Por favor, insira um nome válido.');
            return;
        }

        if (names.includes(name)) {
            alert('Este nome já está na lista!');
            return;
        }

        // Adiciona o nome ao array
        names.push(name);
        // Atualiza a lista exibida na tela
        updateNameList();
        // Limpa o campo de entrada
        nameInput.value = '';
    }

    // Função para remover um nome da lista
    function removeName(nameToRemove) {
        names = names.filter(name => name !== nameToRemove);
        updateNameList();
    }

    // Função para atualizar a lista de nomes na interface
    function updateNameList() {
        // Limpa a lista existente
        nameList.innerHTML = '';
        // Cria um item de lista (<li>) para cada nome
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;

            // Cria um botão de exclusão para cada nome
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                removeName(name);
            });

            listItem.appendChild(deleteButton);
            nameList.appendChild(listItem);
        });

        // Habilita ou desabilita o botão "Sortear"
        drawButton.disabled = names.length < 2;
    }

    // Função para sortear um nome
    function drawName() {
        // Verifica se há nomes na lista antes de sortear
        if (names.length === 0) {
            alert('Por favor, adicione nomes à lista antes de sortear.');
            return; // Interrompe a função
        }
        
        // Verifica se há nomes suficientes para o sorteio
        if (names.length < 2) {
             alert('Você precisa de pelo menos 2 nomes para realizar o sorteio!');
             return;
        }

        // Gera um índice aleatório
        const randomIndex = Math.floor(Math.random() * names.length);
        // Seleciona o nome sorteado
        const drawnName = names[randomIndex];

        // Remove o nome sorteado do array original
        names.splice(randomIndex, 1);

        // Exibe o nome sorteado
        resultName.textContent = drawnName;
        // Atualiza a lista na interface para refletir a remoção
        updateNameList();
    }
});