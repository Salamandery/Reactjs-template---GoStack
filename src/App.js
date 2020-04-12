import React, { useState, useEffect } from "react";

import Header from "./Components/Header";
import parseStringAsArray from './Utils/parseStringAsArray';

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    // Chama função de atribuir lista
    GetRepository();
  }, []);

  async function GetRepository() {
    try {
      // Pega Lista de tecnologias
      const res = await api.get(`/repositories`);
      // Lista de repositorios
      const repository = res.data;
      // Verifica requisição
      if (res.status === 200) {
        // Atribuir a lista
        setRepositories(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddRepository() {
    try {
      // Converte string to array
      const arrTechs = parseStringAsArray(techs);

      // Requisição de cadastro da tecnologia
      const res = await api.post(`/repositories`, {
        title,
        url,
        techs: arrTechs,
      });
      // Pega dados da tecnologia cadastrada
      const repository = res.data;
      // Adiciona a lista
      setRepositories([...repositories, repository]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    // Variável auxiliar temporária

    try {
      // Requisição de deletar repositorio da lista
      const res = await api.delete(`/repositories/${id}`);

      // Verifica se foi deletado
      if (res.status === 204) {
        // Atualiza a lista
        setRepositories(repositories.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header title="GoStack Repo - Lista de Repositórios" />
      <form className="repository-form">
        <input placeholder="TÍTULO" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="URL" value={url} onChange={e=>setUrl(e.target.value)} />
        <input placeholder="TECNOLOGIAS" value={techs} onChange={e => setTechs(e.target.value)} />

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        {repositories.length > 0
          ? repositories.map((r) => (
              <li key={r.id}>
                {r.title === "" ? "SEM TÍTULO" : r.title }
                <button onClick={() => handleRemoveRepository(r.id)}>
                  Remover
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;
