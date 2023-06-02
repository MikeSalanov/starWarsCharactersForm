const btn = document.querySelectorAll('button');
let gettedCharacter;

const switchDisplay = () => document.querySelectorAll('div#waitingBlock')[0].style.display === 'block' ? document.querySelectorAll('div#waitingBlock')[0].style.display = 'none' : document.querySelectorAll('div#waitingBlock')[0].style.display = 'block';

const getCharacter = (searchLink) => {
    switchDisplay();
    return new Promise(resolve => fetch(searchLink)
        .then(r => new Promise(resolve => resolve(r.json())))
        .then(res => {
            switchDisplay();
            resolve(res);
        }));
}

try {
    btn[0].addEventListener('click', () => {
        let nameOfCharacter;
        let id;
        const input = document.querySelectorAll('input#inputId');
        Number.isNaN(Number(input[0].value)) ? nameOfCharacter = input[0].value : id = input[0].value;
        if(nameOfCharacter) {
            getCharacter('https://swapi.dev/api/people/?search='.concat(nameOfCharacter)).then(character => {
                console.log(character.results[0]);
                gettedCharacter = character.results[0];
            });
        } else {
            getCharacter('https://swapi.dev/api/people/'.concat(id).concat('/')).then(character => {
                console.log(character);
                gettedCharacter = character;
            });
        }
    });

} catch(err) {
    console.log('Error', err);
    throw new Error(err);
}