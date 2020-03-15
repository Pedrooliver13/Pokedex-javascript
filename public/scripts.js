const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`; // Usando o id

//pegando o id o nome e o types(se é eletrico ,fogo etc)
// o map. que vai executar para cada um dos items dessa função ,que pega o name ( lembrando que o map está retornando um array de string ) e usa o separador join

const geratePokemonPromise = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then(results => results.json())// é uma promise e passamos o results como json(para passar como corpo de um arquivo json)
    );

// pegando info da url fetch ele retorna uma promise
const gerateHTML = pokemons => pokemons.reduce((accumulator, { name, types, id }) => {
  const elementsTypes = types.map(typeInfo => typeInfo.type.name);//pegando o tipo do pokemon

  accumulator += `
    <li class="card ${elementsTypes[0]}">
      <img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png">
      <h2 class="card-title">${id}.${name}</h2> 
      <p class="card-subtitle">${elementsTypes.join(" | ")}</p>
    </li>
    `;

  return accumulator;
}, "");

const pokemonPromise = geratePokemonPromise();

const insertPokemonInThePage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

//E EXECUTAMOS A promise *lembrando que esse pokemons(dos parametros) está vindo do promisse.all(que está recebendo o geratePromise)
Promise.all(pokemonPromise)
  .then(gerateHTML)
// pegamos ele (dentro dele ta vindo as infos do pokemons) então 'só' falta colocar ele no html
  .then(insertPokemonInThePage);



//Ferramentas usadas
//fetch = pega as infos de outro lugar ex: url e retorna em uma promise

//reducer = ele executa a função para cada um dos arrays, seu valor de inicio é colocado por ultimo no caso 
//(reducer((accumulator , pokemons)=>{}, '') depois das chaves , o accumulator(parametro começa com zero , e após a execução do código ele recebe o valor da ultima vez que foi executado)

//map = executa uma função para todos do array , e modifica(ele cria um novo array) o  array original , ele tbm pode receber três parâmetros (item = item que está sendo alterado atualmente | index = posição no array | array = proprio array que esta sendo alterado)

//fill =  preenche todos os valores do array a partir do índice inicial a um índice final com um valor estático.
