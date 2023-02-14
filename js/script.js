const pokemonName = document.querySelector('.pokemon__name'); /*A declaração const cria uma variável cujo o valor */
const pokemonNumber = document.querySelector('.pokemon__number'); /*querySelector, gera uma exceção SYNTAX_ERR se o grupo de seletores utilizado for inválido. querySelector() foi introduzido com a API de seletores */
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1; /*let permite que você declare variáveis limitando seu escopo no bloco, instrução, ou em uma expressão na qual ela é usada*/

const fetchPokemon = async (pokemon) => { /*A API Fetch fornece uma interface JavaScript para acessar e manipular partes do pipeline HTTP*/
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);  /* await, a expressão await faz a execução de uma função async pausar, para esperar pelo retorno da Promise , e resume a execução da função async quando o valor da Promise é resolvido*/

  if (APIResponse.status === 200) { /* if Existem casos em que precisamos executar um código caso uma condição seja verdadeira*/
    const data = await APIResponse.json(); 
    return data; /*return finaliza a execução de uma função e especifica os valores que devem ser retonados para onde a função foi chamada */
  }
}

const renderPokemon = async (pokemon) => { /*async significa que o valor de retorno da função será, "por baixo dos panos", uma Promise */

  pokemonName.innerHTML = 'Loading...'; /*innerHTML obtém ou define a marcação HTML ou XML contida no elemento  */
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block'; /*style, contém informações de estilo para um documento ou uma parte do documento */ /*display, define se um elemento é tratado como um bloco ou elemento inline */
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; /*input, é usado para criar controles interativos para formulários baseados na web para receber dados do usuário */
    searchPokemon = data.id;
  } else { /*if Se for falsa, executa as afirmações dentro de else */
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => { /*form, campo que representa o nome da pessoa que está submetendo o formulário. */
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => { /*addEventListener() permite que você configure funções a serem chamadas quando um evento especificado acontece */
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
