import React, { useEffect, useState } from 'react';
import api from './services/api';
/* useEffect - serve para disparar uma função toda vez que uma informação alterar ou uma única vez */

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem/index';

function App() {
  const [devs, setDevs] = useState([]); // iniciiando como um array vazio pq são multiplos os devs
  // armazenando todas as informações do formulário dentro dre variáveis no estado do componente
  // fazendo isso, temos acesso em tempo real do que o usuário digitou no input
  const [latitude, setLatitude] = useState(''); //usando o conceito de estado para definir a varavel para latitude (usa-se esse conceito pois essa variavel nao tem um valor fixo)
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => { /* recebe dois parametros: 1- qual função executar; 2- quando executar ([] vazio significa que a função será executada uma unica vez) */
    navigator.geolocation.getCurrentPosition( /* tem acesso a localização do usuário */
      (position) => { /* se conseguir pegar a localização entra aqui */
        const { latitude, longitude, } = position.coords; //pegando a geolocalização do usuário

        setLatitude(latitude); // passando para o estado as coords
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  useEffect(() => { // usar para buscar os devs na api - quero que essa busca aconteça apenas uma unica vez
    async function loadDevs() {
      const response = await api.get('/devs'); // é preciso armazenar esses devs em um estado, pra que seja possivel mostrar em tela
    
      setDevs(response.data); // usar .data sempre que for usar o que vem da api
    }

    loadDevs(); // executa a função asism que o useEffect for executado
  }, []);

  async function handleAddDev(e) { // função que será acionada no sbmit do forms
    e.preventDefault(); // usamos isso para ele não jogar o usuario para outra tela ao clicar no submit do forms
  
    const response = await api.post('/devs',{ //'post' pois estamos criando um dev
      // atribuindo às nossas variaveis de estado os valores de cada info dos inputs
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');

    // incluindo o dev no final do array de devs, fazendo isso os devs aparecem instantaneamente na tela assim que sao cadastrados 
    setDevs([...devs, response.data]); 
    // com "...devs" eu copio todos os devs que ja estao cadastrados no vetor de devs, daí usando o response eu adiciono esse novo dev
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}> 
          <div className="input-block">
            <label htmlFor="github_username" >Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs" >Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required value={techs}
              onChange={e => setTechs(e.target.value)}
              />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude" >Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required value={latitude}
                onChange={e => setLatitude(e.target.value)} // toda vez que o valor da latitude for alterado, vai pegar o evento do html e usando o target pega o input e passa como valor
                // Essa é a form ausada pelo HTML de adicionar o valor de um input dentro de um estado
              /> 
            </div>
            <div className="input-block">
              <label htmlFor="longitude" >Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          { // map faz percorrer todo o vetor
            // o "()" depois da seta indica que eu estou alterando o retorno da função
            // se usaasse "{}" eu estaria alterando o corpo da função
          }
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} /> 
          ))}
        </ul>
      </main>
    </div>
  );
}
export default App;
