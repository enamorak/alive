const ru = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И'
    , 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'
    , 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    , 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'
    , 'x', 'y', 'z'];

function closeMessageBox() {
    document.getElementById('message-box').setAttribute('hidden', true);
}

function pointToText(text) {
    let finalText = text.replaceAll('.','ТЧК');
    finalText = finalText.replaceAll('Ё','Е');
    finalText = finalText.replaceAll(',','ЗПТ');
    finalText = finalText.replaceAll('-','ТРЗ');
    finalText = finalText.replaceAll(' ','ПРБ');
    finalText = finalText.replaceAll('?','ВПЗ');
    finalText = finalText.replaceAll('!','ВСЗ');
    return finalText;
}

function textToPoint(text) {
    let finalText = text.replaceAll('ТЧК','.');
    finalText = finalText.replaceAll('ЗПТ',',');
    finalText = finalText.replaceAll('ТРЗ','-');
    finalText = finalText.replaceAll('ПРБ',' ');
    finalText = finalText.replaceAll('ВПЗ','?');
    finalText = finalText.replaceAll('ВСЗ','!');
    return finalText;
}

function decryptFunction(key, text) {

    key = key.toUpperCase();
    text = text.toUpperCase();
    let decryptedText = "";

    key = key[0];

    for (let i = 0; i < text.length; i++) {


        let indexKey = 0;
        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == key) {
                indexKey = j;
            }
        }

        let indexText = 0;
        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == text[i]) {
                indexText = j;
            }
        }

        let index = indexText - indexKey;
        
        if (index < 0) {
            index += ru.length; 
        }

        decryptedText += ru[index];
        key = ru[index];
    }

    decryptedText = textToPoint(decryptedText);
    return decryptedText;
}


function encryptFunction(key, text) {

    text = text.toUpperCase();
    text = pointToText(text);
    key = key.toUpperCase();
    key += text;
    
    let encryptedText = "";

    let indexKey = -1;
    let indexText = -1;

    for (let i = 0; i < text.length; i++) {

        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == text[i]) {
                indexText = j;
            }
        }

        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == key[i]) {
                indexKey = j;
            }
        }

        let index = indexKey + indexText;

        encryptedText += ru[index % ru.length];
    }

    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;

    
    const encryptedText = encryptFunction(key, text);
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;
    // Здесь нужно использовать алгоритм расшифрования
    const decryptedText = decryptFunction(key, text);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}