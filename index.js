import express from "express";
import db from './repository/index.js';

const app = express();
const port = 3000;
app.use(express.json())

app.post('/api/v1/tarefa', (req, res) => {
    const { id, descricao, data} = req.body
 
    if ( !id || !descricao || !data) {
        res.send({ message: "Cadastro não efetuado."})
        return
    }
    db.push({ id, descricao, data, concluido: false})
    res.send({ message: "tarefa cadastrado com sucesso!"})
});

// R
app.get('/api/v1/tarefa/:id', (req, res) => {
  const { id } = req.params;
  const tarefa = db.find(p => p.id == id);
 
  if (!tarefa) {
    return res.send({ message: 'tarefa não encontrado.' });
  }
 
  res.send(tarefa);
});
// aaaa pera aew = aquele erro ali era pq nao foi executado o npm i na maquina saca? agora deve ter resolvido em PARTES o problema
app.get('/api/v1/tarefa/status/teste', (req, res) => {
    const {concluido} = req.params;
    const tarefa = db.filter(p=> p.concluido == false);

    if(!tarefa) {
        return res.send({ message: 'Nenhuma tarefa concluida.'});
    }

    res.send(tarefa);
})
// U
app.put('/api/v1/tarefa/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = db.find(p => p.id == id);
    const { descricao, data, concluido } = req.body;
 
    if (!tarefa) {
        return res.status(404).send({ message: 'tarefa não encontrado.' });
    }

    if (!descricao && !data && !concluido){
        return res.status(400).send({ message: 'Insira alguma descrição para modificar!'});
    }
 
    if (descricao) tarefa.descricao = descricao;
    if (data) tarefa.data = data;
    if (concluido) tarefa.concluido = concluido;
 
    res.send(tarefa);
});

app.put('/api/v1/tarefa/status/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = db.find(p => p.id == id);
 
    if (!tarefa) {
        return res.status(404).send({ message: 'tarefa não encontrado.' });
    }

    tarefa.concluida = !tarefa.concluida;

    res.send(tarefa);
});

// D
app.delete('/api/v1/tarefa/:id', (req, res) => {
    const { id } = req.params;
    const index = db.findIndex(p => p.id == id);
 
    if (index === -1) {
        return res.status(404).send({ message: 'tarefa não encontrado.' });
    }
 
    db.splice(index, 1);
 
    res.send({ message: 'tarefa deletado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});