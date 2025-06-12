// Dados iniciais
const alunos = [];

// Atualizar opções nos selects
function atualizarOpcoes(select, lista, propriedade) {
    select.innerHTML = '<option value="">Selecione</option>';
    lista.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = item[propriedade];
        select.appendChild(option);
    });
}

// Exibir dados cadastrados
function exibirDados() {
    const dadosAlunos = document.getElementById('dados-alunos');
    dadosAlunos.innerHTML = '';

    alunos.forEach((aluno, index) => {
        const alunoDiv = document.createElement('div');
        alunoDiv.classList.add('aluno');
        alunoDiv.innerHTML = `
            <h3>${aluno.nome}</h3>
            <ul>
                ${aluno.disciplinas.map(d => `<li>${d.nome} - Nota: ${d.nota}</li>`).join('')}
            </ul>
            <button class="editar" data-index="${index}">Editar</button>
        `;
        dadosAlunos.appendChild(alunoDiv);
    });
}

// Adicionar evento para o botão Sair
document.getElementById('sair').onclick = () => {
    if (confirm('Deseja realmente sair?')) {
        window.location.reload();
    }
};

// Evento para cadastrar aluno
document.getElementById('form-aluno').onsubmit = (event) => {
    event.preventDefault();
    const nomeAluno = document.getElementById('nome-aluno').value;

    if (nomeAluno) {
        alunos.push({ nome: nomeAluno, disciplinas: [] });
        document.getElementById('nome-aluno').value = '';
        atualizarOpcoes(document.getElementById('aluno-associado'), alunos, 'nome');
        atualizarOpcoes(document.getElementById('aluno-associado-nota'), alunos, 'nome');
        exibirDados();
    }
};

// Evento para cadastrar disciplina
document.getElementById('form-disciplina').onsubmit = (event) => {
    event.preventDefault();
    const alunoIndex = document.getElementById('aluno-associado').value;
    const nomeDisciplina = document.getElementById('nome-disciplina').value;

    if (alunoIndex !== '' && nomeDisciplina) {
        alunos[alunoIndex].disciplinas.push({ nome: nomeDisciplina, nota: null });
        document.getElementById('nome-disciplina').value = '';
        atualizarOpcoes(document.getElementById('disciplina-associada'), alunos[alunoIndex].disciplinas, 'nome');
        exibirDados();
    }
};

// Evento para registrar nota
document.getElementById('form-notas').onsubmit = (event) => {
    event.preventDefault();
    const alunoIndex = document.getElementById('aluno-associado-nota').value;
    const disciplinaIndex = document.getElementById('disciplina-associada').value;
    const nota = document.getElementById('nota').value;

    if (alunoIndex !== '' && disciplinaIndex !== '' && nota !== '') {
        alunos[alunoIndex].disciplinas[disciplinaIndex].nota = nota;
        document.getElementById('nota').value = '';
        exibirDados();
    }
};

// Evento para editar aluno ou disciplina
document.getElementById('dados-alunos').onclick = (event) => {
    if (event.target.classList.contains('editar')) {
        const alunoIndex = event.target.dataset.index;
        const novoNome = prompt('Editar nome do aluno:', alunos[alunoIndex].nome);

        if (novoNome) {
            alunos[alunoIndex].nome = novoNome;
            atualizarOpcoes(document.getElementById('aluno-associado'), alunos, 'nome');
            atualizarOpcoes(document.getElementById('aluno-associado-nota'), alunos, 'nome');
            exibirDados();
        }
    }
};


