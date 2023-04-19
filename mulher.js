const express = require("express")
const router = express.Router()

const app = express() //cria o servidor
const porta = 3333

function mostraMulher(request, response) { //associa ao verbo get
    response.json({
        nome: 'Simara Conceição',
        imagem: 'link da imagem',
        minibio: 'Desenvolvedora e instrutora'
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta",porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)