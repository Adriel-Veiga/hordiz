// Dados iniciais, usados só na primeira vez que o site rodar
const projetosIniciais = [
    {
        id: 1,
        nome: "Hordiz",
        tarefas: [
            { id: 1, titulo: "Criar cards de projeto", status: "concluido" },
            { id: 2, titulo: "Estruturar localStorage", status: "fazendo" },
            { id: 3, titulo: "Criar página do quadro", status: "pendente" }
        ]
    },
    {
        id: 2,
        nome: "TCC",
        tarefas: [
            { id: 1, titulo: "Levantamento de requisitos", status: "concluido" },
            { id: 2, titulo: "Diagrama de casos de uso", status: "pendente" }
        ]
    }
]

// Verifica se já existem projetos salvos no localStorage
function carregarProjetos(){
    const dadosSalvos = localStorage.getItem("projetos")

    if(dadosSalvos === null){
        // Nada salvo ainda: usa os dados iniciais e já salva
        localStorage.setItem("projetos", JSON.stringify(projetosIniciais))
        return projetosIniciais
    }

    // Já existe algo salvo: usa o que está lá
    return JSON.parse(dadosSalvos)
}

const projetos = carregarProjetos()
console.log(projetos)

// Seleciona o container onde os cards de projeto vão entrar
const taskBoard = document.querySelector(".task-board")

if(taskBoard){
    projetos.forEach(function(projeto){
        // Cria o card como um link real (<a>), não uma div
        const card = document.createElement("a")
        card.classList.add("project-card")
        card.href = "project.html?id=" + projeto.id

        // Título do projeto
        const titulo = document.createElement("h4")
        titulo.textContent = projeto.nome

        // Quantidade de tarefas (informação extra, tipo o "6" que aparece no seu print do Trello)
        const contagem = document.createElement("p")
        contagem.textContent = projeto.tarefas.length + " tarefas"

        card.appendChild(titulo)
        card.appendChild(contagem)

        taskBoard.appendChild(card)
    })
}