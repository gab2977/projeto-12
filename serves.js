const express = require('express');
const app = express();

app.use(express.json());

let alunos = [];
let id = 1;

// Listar alunos
app.get('/alunos', (req, res) => {
    res.json(alunos);
});

// Cadastrar aluno
app.post('/alunos', (req, res) => {
    const aluno = {
        id: id++,
        nome: req.body.nome,
        idade: req.body.idade,
        curso: req.body.curso
    };

    alunos.push(aluno);
    res.status(201).json(aluno);
});

// Buscar por ID
app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id == req.params.id);

    if (!aluno) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    res.json(aluno);
});

// Atualizar aluno
app.put('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id == req.params.id);

    if (!aluno) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    aluno.nome = req.body.nome || aluno.nome;
    aluno.idade = req.body.idade || aluno.idade;
    aluno.curso = req.body.curso || aluno.curso;

    res.json(aluno);
});

// Deletar aluno
app.delete('/alunos/:id', (req, res) => {
    alunos = alunos.filter(a => a.id != req.params.id);
    res.json({ mensagem: 'Aluno removido' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
