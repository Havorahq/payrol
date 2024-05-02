export const capitalizeFirst = (text) =>{
    if(text){
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}

export const capitalizeFirstWord = (words) => {
    if(words) {
        return words.split(' ').map(word => capitalizeFirst(word)).join(" ");
    }
}