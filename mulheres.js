const express = require("express")
const router = express.Router()

const app = express() //cria o servidor
const porta = 3333

const mulheres = [
    {
        nome: 'Larissa Nogueira',
        imagem: 'imagem da mulher',
        minibio: 'Desenvolvedora'
    },

    {
        nome: 'Iana Chan',
        imagem: 'imagem da mulher',
        minibio: 'CEO da PrograMaria'
    },

    {
        nome: 'Simara Conceição',
        imagem: 'link da imagem',
        minibio: 'Desenvolvedora e instrutora'
    }
    ]

function mostraMulheres(request, response){
    response.json(mulheres) //envia o array de mullheres
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta",porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)