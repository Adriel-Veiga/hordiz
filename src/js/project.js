// Pega tudo que vem depois do "?" na URL atual
const parametros = new URLSearchParams(window.location.search)

// Busca especificamente o valor de "id"
const idProjeto = parametros.get("id")

// Carrega os projetos salvos (mesma lógica de leitura que já usamos no home.js)
const dadosSalvos = localStorage.getItem("projetos")
const projetos = JSON.parse(dadosSalvos)

// Busca, dentro do array, o projeto cujo id bate com o da URL
const projetoAtual = projetos.find(function(projeto){
    return projeto.id === Number(idProjeto)
})

const tituloProjeto = document.querySelector("#nome-projeto")

if(projetoAtual){
    tituloProjeto.textContent = projetoAtual.nome
} else {
    tituloProjeto.textContent = "Projeto não encontrado"
}

const botaoSidebar = document.querySelector("#btn-sidebar")
const sidebar = document.querySelector("#project-sidebar")

if(botaoSidebar && sidebar){
    botaoSidebar.addEventListener("click", function(){
        sidebar.classList.toggle("sidebar-aberta")
    })
}

const nomesDias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

// Gera só os 7 dias da semana atual (segunda a domingo)
function getSemanaAtual(){
    const hoje = new Date()
    const diaSemanaHoje = hoje.getDay()
    const offsetParaSegunda = diaSemanaHoje === 0 ? 6 : diaSemanaHoje - 1

    const segunda = new Date(hoje)
    segunda.setDate(hoje.getDate() - offsetParaSegunda)

    const dias = []
    for(let i = 0; i < 7; i++){
        const dia = new Date(segunda)
        dia.setDate(segunda.getDate() + i)
        dias.push(dia)
    }

    return dias
}

function renderizarSemana(){
    const weekHeader = document.querySelector(".week-header")
    if(!weekHeader) return

    const dias = getSemanaAtual()
    const hoje = new Date()

    dias.forEach(function(dia){
        const diaCard = document.createElement("div")
        diaCard.classList.add("day-card")

        const indiceDiaSemana = dia.getDay() === 0 ? 6 : dia.getDay() - 1
        const dataFormatada = String(dia.getDate()).padStart(2, "0") + "/" + String(dia.getMonth() + 1).padStart(2, "0")

        diaCard.textContent = nomesDias[indiceDiaSemana] + " " + dataFormatada

        if(dia.toDateString() === hoje.toDateString()){
            diaCard.classList.add("day-today")
        }

        weekHeader.appendChild(diaCard)
    })
}

renderizarSemana()

if(projetoAtual){
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

