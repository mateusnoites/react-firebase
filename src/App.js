import './App.css';
import { useEffect, useState } from 'react';

//////////////////////////////////////////         CÓDIGO         ///////////////////////////////////////////////////////////////

function Cabecalho() {
  return (
    <div>
      <h1>Lades</h1>
      <hr/>
    </div>
  );
}

function App() {
  const [listaProfessores, setListaProfessores] = useState([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await fetch('https://teste-firebase-lades-default-rtdb.firebaseio.com/professores.json');
        const data = await response.json();

        const professores = [];

        for (const professorId in data) {
          if (data.hasOwnProperty(professorId)) {
            const professor = data[professorId];
            const nomeProfessor = professor.nome;
            professores.push(<li key ={professorId}>{nomeProfessor}</li>)
          }
        }

        setListaProfessores(professores);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfessores();
  })

  return (
    <div>
      <header>
        <Cabecalho />
      </header>
      <main>
        <ol>
          {listaProfessores}
        </ol>
      </main>
    </div>
  );
}

export default App;