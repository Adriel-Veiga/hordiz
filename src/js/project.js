// Pega tudo que vem depois do "?" na URL atual
const parametros = new URLSearchParams(window.location.search)

// Busca especificamente o valor de "id"
const idProjeto = parametros.get("id")

console.log("ID do projeto na URL:", idProjeto)

// Carrega os projetos salvos (mesma lógica de leitura que já usamos no home.js)
const dadosSalvos = localStorage.getItem("projetos")
const projetos = JSON.parse(dadosSalvos)

// Busca, dentro do array, o projeto cujo id bate com o da URL
const projetoAtual = projetos.find(function(projeto){
    return projeto.id === Number(idProjeto)
})

console.log(projetoAtual)

// Seleciona o elemento que criamos como placeholder
const tituloProjeto = document.querySelector("#nome-projeto")

if(projetoAtual){
    tituloProjeto.textContent = projetoAtual.nome
} else {
    tituloProjeto.textContent = "Projeto não encontrado"
}

if(projetoAtual){
    // Pra cada coluna, encontra o container certo e preenche com as tarefas daquele status
    const colunas = document.querySelectorAll(".board-column")

    colunas.forEach(function(coluna){
        const status = coluna.dataset.status
        const containerCards = coluna.querySelector(".column-cards")

        // Filtra só as tarefas que pertencem a esse status
        const tarefasDaColuna = projetoAtual.tarefas.filter(function(tarefa){
            return tarefa.status === status
        })

        tarefasDaColuna.forEach(function(tarefa){
            const card = document.createElement("div")
            card.classList.add("task-card")
            card.textContent = tarefa.titulo
            containerCards.appendChild(card)
        })
    })
}