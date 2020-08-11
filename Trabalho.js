import { promises as fs } from 'fs';

let allcityState = [];
var global_state = [];
var global_city = [];
let amount = [];
let last_five;
let first_five;
const bigname = [];
const smallname = [];

start();

async function start() {
  global_state = JSON.parse(await fs.readFile('Estados.json'));
  global_city = JSON.parse(await fs.readFile('Cidades.json'));

  Write_File();
  High_city();
  High_name();
}

async function High_name() {
  global_state.forEach((state) => {
    const cities = global_city.filter((city) => city.Estado === state.ID);
    const array = cities.map((city) => city.Nome);
    array.sort();

    allcityState.push({
      ...state,
      nome: array,
    });
  });
  allcityState.forEach((state) => {
    const cities1 = state.nome;
    cities1.sort((a, b) => b.length - a.length);
    bigname.push(`${cities1.slice(0, 1)} - ${state.Sigla}`);
  });
  console.log(bigname);

  allcityState.forEach((state) => {
    const cities1 = state.nome;
    cities1.sort((a, b) => a.length - b.length);
    smallname.push(`${cities1.slice(0, 1)} - ${state.Sigla}`);
  });
  console.log(smallname);

  High_and_small();
}

async function High_and_small() {
  const biggercity = bigname;
  biggercity.sort((a, b) => b.length - a.length);
  console.log(biggercity.slice(0, 1));

  const smallercity = smallname;
  smallercity.sort();
  smallercity.sort((a, b) => a.length - b.length);
  console.log(smallercity.slice(0, 1));
}

async function Write_File() {
  for (var i = 0; i < global_state.length; i++) {
    var name = global_state[i].Sigla + '.json';
    const filter_city = global_city.filter((city) => {
      return city.Estado === global_state[i].ID;
    });
    await fs.writeFile(name, JSON.stringify(filter_city, null, 2));
  }
}

async function High_city() {
  for (var i = 0; i < global_state.length; i++) {
    let m = 0;
    var number = 1;
    var File = global_state[i].Sigla + '.json';
    var state = JSON.parse(await fs.readFile(File));
    for (var q = 1; q <= state.length; q++) {
      number = q;
    }

    amount.push({
      Nome: global_state[i].Nome,
      Sigla: global_state[i].Sigla,
      Quantidade: number,
    });
  }

  console.log(amount);
  let order = amount.sort((a, b) => {
    return b.Quantidade - a.Quantidade;
  });

  first_five = order.slice(0, 5);

  let order2 = amount.sort((a, b) => {
    return a.Quantidade - b.Quantidade;
  });

  last_five = order2.slice(0, 5);

  console.log('5 primeiros');
  console.log(first_five);
  console.log('5 ultimos');
  console.log(last_five);
}
