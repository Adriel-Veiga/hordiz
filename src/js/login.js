// Aplica tema persistente, se houver
const savedTheme = localStorage.getItem("hordiz-theme")
if (savedTheme !== null) {
    document.body.classList.toggle("dark", savedTheme === "dark")

}

// Seleciona o formulário da página atual
const form = document.querySelector(".form")

// Só roda se existir um formulário na página
if (form) {
    form.addEventListener("submit", function (evento) {
        // Impede o comportamento padrão do form
        // (que seria recarregar a página)
        evento.preventDefault()

        // pega os valores dos campos do formulário
        const email = document.querySelector("#email")?.value.trim() || ""
        const password = document.querySelector("#password")?.value || ""
        const confirmPassword = document.querySelector("#confirm_password")?.value || ""

        // validação
        if (email === "" || password === "") {
            alert("Preencha todos os campos")
            return
        }

        if (password.length < 8) {
            alert("A senha deve conter no mínimo 8 caracteres")
            return
        }

        if (confirmPassword !== "" && password !== confirmPassword) {
            alert("As senhas não coincidem")
            return
        }

        const currentPath = window.location.pathname
        const targetPath = currentPath.includes("/src/html/") || currentPath.endsWith("/register.html")
            ? "home.html"
            : "src/html/home.html"

        window.location.href = targetPath
    })
}
