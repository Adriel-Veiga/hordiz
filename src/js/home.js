// Dados iniciais, usados só na primeira vez que o site rodar
const projetosIniciais = [
    {
        id: 1,
        nome: "Projeto Teste",
        tarefas: [
            { id: 1, titulo: "Criar cards de projeto", status: "concluido" },
            { id: 2, titulo: "Implementar funcionalidades", status: "fazendo" },
            { id: 3, titulo: "Criar página do quadro", status: "pendente" }
        ]
    },
    {
        id: 2,
        nome: "Rotina Teste",
        tarefas: [
            { id: 1, titulo: "Criar rotina de estudos", status: "concluido" },
            {id: 2, titulo: "Fazer exercícios práticos", status: "fazendo" },
            { id: 3, titulo: "Estudar JavaScript", status: "pendente" }
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

const themeToggleButton = document.getElementById("theme-toggle")
const savedTheme = localStorage.getItem("hordiz-theme")

function updateTheme(theme) {
    const isDark = theme === "dark"
    document.body.classList.toggle("dark", isDark)
    if (themeToggleButton) {
        themeToggleButton.textContent = isDark ? "Modo claro" : "Modo escuro"
    }
}

if (themeToggleButton) {
    const initialTheme = savedTheme || "light"
    updateTheme(initialTheme)

    themeToggleButton.addEventListener("click", function () {
        const nextTheme = document.body.classList.contains("dark") ? "light" : "dark"
        localStorage.setItem("hordiz-theme", nextTheme)
        updateTheme(nextTheme)
    })
}
