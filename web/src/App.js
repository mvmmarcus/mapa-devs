import React from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username" >Usuário do Github</label>
            <input name="github_username" id="github_username" required></input>
          </div>
          <div className="input-block">
            <label htmlFor="techs" >Tecnologias</label>
            <input name="github_username" id="github_username" required></input>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude" >Latitude</label>
              <input name="latitude" id="latitude" required></input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude" >Longitude</label>
              <input name="longitude" id="longitude" required></input>
            </div>
          </div>
          
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/51442820?s=460&v=4" alt="Marcus"/>
              <div className="user-info">
                <strong>Marcus vinicius</strong>
                <span>Javascript, NodeJs</span>
              </div>
            </header>
            <p>Estudante de engenharia de computação, empolgado com desenvolvimento de aplicações</p>
            <a href="https://github.com/mvmmarcus/">Acessar perfil do Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/51442820?s=460&v=4" alt="Marcus"/>
              <div className="user-info">
                <strong>Marcus vinicius</strong>
                <span>Javascript, NodeJs</span>
              </div>
            </header>
            <p>Estudante de engenharia de computação, empolgado com desenvolvimento de aplicações</p>
            <a href="https://github.com/mvmmarcus/">Acessar perfil do Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/51442820?s=460&v=4" alt="Marcus"/>
              <div className="user-info">
                <strong>Marcus vinicius</strong>
                <span>Javascript, NodeJs</span>
              </div>
            </header>
            <p>Estudante de engenharia de computação, empolgado com desenvolvimento de aplicações</p>
            <a href="https://github.com/mvmmarcus/">Acessar perfil do Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/51442820?s=460&v=4" alt="Marcus"/>
              <div className="user-info">
                <strong>Marcus vinicius</strong>
                <span>Javascript, NodeJs</span>
              </div>
            </header>
            <p>Estudante de engenharia de computação, empolgado com desenvolvimento de aplicações</p>
            <a href="https://github.com/mvmmarcus/">Acessar perfil do Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
