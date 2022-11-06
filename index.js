import {createRow} from './createRow.js';
import {createCard} from './createCard.js';
import {getRandomCardImgSrc} from './getRandomCardImgSrc.js';
import {flipUpsideDownCards} from './flipUpsideDownCards.js';
import {doSuccessClick} from './doSuccessClick.js';


const containerFluid = document.getElementsByClassName('container-fluid')[0];

const cardImgSrcMap = new Map();
const cardImgCountersMap = new Map();
for (let i = 1; i < 17; i++) {
    cardImgCountersMap.set(i, 0);
}

let successCoincidences = 0; // счётчик совпадений
let allCoincidences = 0;

for (let i = 0; i < 4; i++) { // цикл создания секций
    const row = createRow();
    containerFluid.appendChild(row); //добавляем строку в контейнер

    for (let j = 0; j < 8; j++) { // цикл создания карт
        const card = createCard();
        while(1) { // бесконечный цикл, который будет заканчиваться тогда, когда будет удачно отрандомлена картинка для новой карты
            const rndCardImgSrc = getRandomCardImgSrc(); // рандомим изображение для карт
            if (cardImgCountersMap.get(rndCardImgSrc) < 2) {
                cardImgCountersMap.set(rndCardImgSrc, cardImgCountersMap.get(rndCardImgSrc)+1);
                cardImgSrcMap.set(card, `./img/${rndCardImgSrc}.png`);
                row.appendChild(card); //добавляем к строке очередную карту
                break;
            }
        }
    }
}

let twoLinksArray = []; //массив, который будет содержать в себе ссылки на перевёрнутые карты
containerFluid.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        event.target.src = cardImgSrcMap.get(event.target);
        twoLinksArray.push(event.target);

        switch(twoLinksArray.length) {
            case 2:
                allCoincidences++;
                if (twoLinksArray[0].src === twoLinksArray[1].src && twoLinksArray[0] !== twoLinksArray[1]) {
                    successCoincidences = doSuccessClick(twoLinksArray[0], twoLinksArray[1], successCoincidences);
                    twoLinksArray = [];
                    if (successCoincidences === 16) {
                        document.write(`win. Число всех попыток: ${allCoincidences}`); 
                    }
                } 
            break;
            case 3:
                if (twoLinksArray[0].src === twoLinksArray[1].src && twoLinksArray[0] !== twoLinksArray[1]) {
                    successCoincidences = doSuccessClick(twoLinksArray[0], twoLinksArray[1], successCoincidences);
                    if (successCoincidences === 16) {
                        document.write(`win. Число всех попыток: ${allCoincidences}`);
                    }
                }
                else {
                    flipUpsideDownCards(twoLinksArray[0], twoLinksArray[1]);
                }
                twoLinksArray = [twoLinksArray[2]];
            break;
        }
    }
});





































//






// const card = document.querySelectorAll('.memory-card');

// let hasFlippedCard = false;
// let firstCard;
// let secondCard;

// // переворот карт
// function flipCard() {
//     this.classList.add('flip');
//     if (!hasFlippedCard) {
//         hasFlippedCard = true;
//         firstCard = this;
//         return;
//     }
// }


// // перемешивание карт
// function shuffleCard() {
//     card.forEach(card =>  {
//         let randomPos = Math.floor(Math.random() *32);
//         card.style.order = randomPos;
//     });
// }

// card.forEach(card => card.addEventListener('click',flipCard));

// const modal = document.querySelector('.modal-container');
// const closeButton = document.querySelector('.close');

// const openModal = function() {
//     modal.classList.add('is-open');
// }
// const closeModal = function() {
//     modal.classList.remove('is-open');
// }
// closeButton.addEventListener('click', closeModal);
