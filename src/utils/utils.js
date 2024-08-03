export function truncate(text, l) {
    let newText = ""
    for(let i = 0; i < text.length; i++){
        if(i === l){
            return newText + "..."
        }
        newText += text[i]
    }
    return newText
}