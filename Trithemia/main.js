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
    finalText = finalText.replaceAll(':','ДВЧ');
    return finalText;
}

function textToPoint(text) {
    let finalText = text.replaceAll('ТЧК','.');
    finalText = finalText.replaceAll('ЗПТ',',');
    finalText = finalText.replaceAll('ТРЗ','-');
    finalText = finalText.replaceAll('ПРБ',' ');
    finalText = finalText.replaceAll('ВПЗ','?');
    finalText = finalText.replaceAll('ВСЗ','!');
    finalText = finalText.replaceAll('ДВЧ',':');
    return finalText;
}

function decryptFunction(text) {

    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == text[i]) {
                let index = j - i;
                while (index < 0) {
                    index += ru.length;
                }
                encryptedText += ru[index];
            }
        }
    }

    encryptedText = textToPoint(encryptedText);
    return encryptedText;
}


function encryptFunction(text) {

    text = text.toUpperCase();
    text = pointToText(text);
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == text[i]) {
                encryptedText += ru[(i + j) % ru.length];
            }
        }
    }

    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;

    
    const encryptedText = encryptFunction(text);
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    // Здесь нужно использовать алгоритм расшифрования
    const decryptedText = decryptFunction(text);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}