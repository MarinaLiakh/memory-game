import {disappearedCards} from './disappearedCards.js';

export function doSuccessClick(firstCard, secondCard, successCoincidences) {
    disappearedCards(firstCard, secondCard);
    successCoincidences++;
    return successCoincidences;
}