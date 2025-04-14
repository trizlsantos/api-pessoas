import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const PORT = 3333

const app = express()
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())

const pessoas = []

app.get("/pessoas", (request, response) => {
    response.status(200).json(pessoas)
})
app.post("/pessoas", (request, response) => {
    const { nome, cargo } = request.body

    if (!nome) {
        response.status(400).json({ message: "Nome é obrigatório" })
        return
    }

    if (!cargo) {
        response.status(400).json({ message: "Cargo é obrigatório" })
        return
    }

    const pessoa = {
        id: uuidv4(),
        nome,
        cargo
    }

    pessoas.push(pessoa)
    response.status(201).json({ mensagem: "Cadastro realizado", pessoa })
})
app.get("/pessoas/:id", (request, response) => {
    const { id } = request.params
    /**[
     *  0:{id:10, nome:"Carlos", cargo:"instutor"},
     *  1:{id:11, nome:"Carlos", cargo:"instutor"},
     *  2:{id:12, nome:"Carlos", cargo:"instutor"}
     * ]
     */
    const encontrarPessoa = pessoas.findIndex((pessoa) => pessoa.id === id)
    if (encontrarPessoa === -1) {
        response.status(400).json({ message: "Pessoa não encontrada" })
        return
    }

    const pessoaEncontrada = pessoas[encontrarPessoa]
    response.status(200).json(pessoaEncontrada)
})

app.put("/pessoas/:id", (request, response) => {
    const { id } = request.params
    const {nome, cargo} = request.body

    const encontrarPessoa = pessoas.findIndex((pessoa) => pessoa.id === id)
    if (encontrarPessoa === -1) {
        response.status(400).json({ message: "Pessoa não encontrada" })
        return
    }

    if(!nome || !cargo){
        response.status(400).json({message: "Nome e Cargo é obrigatório"})
        return
    }

    const pessoaAtualizada = {
        id,
        nome,
        cargo
    }
    pessoas[encontrarPessoa] = pessoaAtualizada
    response.status(200).json({message:"Pessoa Atualizada", pessoaAtualizada})
})

app.delete("/pessoas/:id", (request, response) => {
    const { id } = request.params

    const encontrarPessoa = pessoas.findIndex((pessoa) => pessoa.id === id)
    if (encontrarPessoa === -1) {
        response.status(400).json({ message: "Pessoa não encontrada" })
        return
    }

    pessoas.splice(encontrarPessoa, 1)
    response.status(200).json({mensagem:"Pessoa Excluída"})
})

app.listen(PORT, () => {
    console.log("Olá, Mundo")
})