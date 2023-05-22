import React, { useEffect, useState } from 'react';

function Cabecalho() {
  return (
    <div>
      <h1>Lades</h1>
      <a href="adicionar.html">
        <button>Adicionar novo Professor</button>
      </a>
      <hr />
    </div>
  );
}

async function fetchProfessores() {
  try {
    const response = await fetch(
      'https://teste-firebase-lades-default-rtdb.firebaseio.com/professores.json'
    );
    const data = await response.json();

    const professores = [];

    for (const professorId in data) {
      if (data.hasOwnProperty(professorId)) {
        const professor = data[professorId];
        const nomeProfessor = professor.nome;
        professores.push(
          <li key={professorId}>
            {nomeProfessor}{' '}
            <button onClick={() => excluirProfessor(professorId)}>
              Excluir
            </button>
          </li>
        );
      }
    }

    return professores;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function excluirProfessor(id, setListaProfessores) {
  try {
    await fetch(
      `https://teste-firebase-lades-default-rtdb.firebaseio.com/professores/${id}.json`,
      {
        method: 'DELETE',
      }
    );
    alert('Professor excluído!');
    const professores = await fetchProfessores();
    setListaProfessores(professores);
  } catch (error) {
    console.error("Erro ao excluir o professor:", error);
  }
}

function App() {
  const [listaProfessores, setListaProfessores] = useState([]);

  useEffect(() => {
    const getProfessores = async () => {
      const professores = await fetchProfessores();
      setListaProfessores(professores);
    };

    getProfessores();
  }, []);

  return (
    <div>
      <header>
        <Cabecalho />
      </header>
      <main>
        <ol>{listaProfessores}</ol>
      </main>
    </div>
  );
}

export default App;