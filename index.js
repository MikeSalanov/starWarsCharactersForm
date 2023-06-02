const btn = document.querySelectorAll('button');
let gettedCharacter;

const switchDisplayWaitingBlock = () => document.querySelectorAll('div#waitingBlock')[0].style.display === 'block' ? document.querySelectorAll('div#waitingBlock')[0].style.display = 'none' : document.querySelectorAll('div#waitingBlock')[0].style.display = 'block';

const getCharacter = (searchLink) => {
    switchDisplayWaitingBlock();
    return new Promise(resolve => fetch(searchLink)
        .then(r => new Promise(resolve => resolve(r.json())))
        .then(res => {
            switchDisplayWaitingBlock();
            resolve(res);
        }));
}

const switchBlockFormOfPerson = () => {
    document.querySelectorAll('div#infoFormOfCharacter')[0].style.display === 'block' ? document.querySelectorAll('div#infoFormOfCharacter')[0].style.display = 'none' : document.querySelectorAll('div#infoFormOfCharacter')[0].style.display = 'block';
}

const createFormOfPerson = (person) => {
    console.log('into createFormOfPerson()', person);
    document.querySelectorAll('img#imgOfCharacter')[0].src = person.formingLinkToImageOfCharacter();
    document.querySelectorAll('div#name')[0].innerText = person.name;
    document.querySelectorAll('div#height')[0].innerText = person.height;
    document.querySelectorAll('div#mass')[0].innerText = person.name;
    document.querySelectorAll('div#hair_color')[0].innerText = person.hair_color;
    document.querySelectorAll('div#skin_color')[0].innerText = person.skin_color;
    document.querySelectorAll('div#eye_color')[0].innerText = person.eye_color;
    document.querySelectorAll('div#birth_year')[0].innerText = person.birth_year;
    document.querySelectorAll('div#gender')[0].innerText = person.gender;
    document.querySelectorAll('div#homeworld')[0].innerText = person.homeworld;
}

Object.prototype.formingLinkToImageOfCharacter = function() {
    const idOfCharacter = this.url.slice(-2, -1);
    return `https://starwars-visualguide.com/assets/img/characters/${idOfCharacter}.jpg`;
}

try {
    btn[0].addEventListener('click', () => {
        let nameOfCharacter;
        let id;
        const input = document.querySelectorAll('input#inputId');
        Number.isNaN(Number(input[0].value)) ? nameOfCharacter = input[0].value : id = input[0].value;
        let setObjGettedCharacter;
        if(nameOfCharacter) {
            setObjGettedCharacter = new Promise(resolve => {
                    getCharacter('https://swapi.dev/api/people/?search='.concat(nameOfCharacter)).then(character => {
                    console.log(character.results[0]);
                    gettedCharacter = character.results[0];
                    resolve(gettedCharacter);
                });
            });
        } else {
            setObjGettedCharacter = new Promise(resolve => {
                    getCharacter('https://swapi.dev/api/people/'.concat(id).concat('/')).then(character => {
                    console.log(character);
                    gettedCharacter = character;
                    resolve(gettedCharacter);
                });
            });
        }
        setObjGettedCharacter.then(person => {
            switchBlockFormOfPerson();
            createFormOfPerson(person);
        });
    });

} catch(err) {
    console.log('Error', err);
    throw new Error(err);
}