export function getRandomCardImgSrc() {
    const randomImgSrc = (Math.floor(Math.random()*16));
    return randomImgSrc + 1;
}