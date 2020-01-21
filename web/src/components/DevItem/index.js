import React from 'react';

import './styles.css';

function DevItem({ dev }) { //desestruturação pra poder usar a propriedade dev (la no app essa propriedade tb tem q se chamar 'dev' - essa propriedade é como se fosse um "type" de qualquer componente html)
    return(
        <li className="dev-item">
              {/* quando a gnt percorre um array (map), o primeiro item dentro desse map precisa ter uma 
              propriedade chamada "key", onde seu valor tem que ser algo unico em todos os devs
              por isso usamos "de._id" */}
              <header>
                <img src={dev.avatar_url} alt={dev.nome}/>
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')} {/* usando o join pra separar o array com uma virgula */}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do Github</a>
               {/* usando template strings `` essa informação será atribuida apos o usuario informar o seu user do git*/} 
            </li>
    )
}

export default DevItem;