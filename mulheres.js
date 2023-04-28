const express = require("express")
const router = express.Router()
const cors = require('cors')
//const { v4: uuidv4 } = require('uuid') o MongoDB irá gerir os Ids a partir de agora.

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados();

const Mulher = require('./mulherModel')

const app = express() //cria o servidor
app.use(express.json())
app.use(cors())

const porta = 3333

/**retirada para implementação da comunicação com o banco de dados.
const mulheres = [ 
    {
        id: '1',
        nome: 'Larissa Nogueira',
        imagem: 'imagem da mulher',
        minibio: 'Desenvolvedora'
    },

    {
        id: '2',
        nome: 'Iana Chan',
        imagem: 'imagem da mulher',
        minibio: 'CEO da PrograMaria'
    },

    {
        id: '3',
        nome: 'Simara Conceição',
        imagem: 'link da imagem',
        minibio: 'Desenvolvedora e instrutora'
    }
    ] **/

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

// PATCH
async function corrigeMulher(request, response) {
    /**function encontraMulher(mulher){
        if (mulher.id === request.params.id) {
            return mulher
        }
        
    }**/

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
}

// DELETE
async function deletaMulher(request, response) {
    /**function todasMenosEla(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher
        }
    }**/

    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso! '})
    } catch(erro) {
        console.log(erro)
    }
    /**const mulheresQueFicaram = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicaram)**/
}

app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))


// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta)
