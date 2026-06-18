// Seleciona o formulário da página atual
const form = document.querySelector(".form")

// Só roda se existir um formulário na página
if(form){
    form.addEventListener("submit", function(evento){
        // Impede o comportamento padrão do form
        // (que seria recarregar a página)
        evento.preventDefault()

        // pega os valores dos campos do formulário
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        // validação
        if(email === "" || password === ""){
            alert("Preencha todos os campos")
            return
        }
        if (password.length < 6){
            alert("A senha deve conter no mínimo 6 caracteres")
            return
        }

        window.location.href = "src/html/home.html"
    })
}
