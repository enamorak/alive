const ru = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И'
    , 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'
    , 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Э', 'Ю', 'Я'];
function closeMessageBox() {
    document.getElementById('message-box').setAttribute('hidden', true);
}

function pointToText(text) {
    let finalText = text.replaceAll('.','ТЧК');
    finalText = finalText.replaceAll('Ё','Е');
    finalText = finalText.replaceAll('Й','И');
    finalText = finalText.replaceAll('Ъ','И');
    finalText = finalText.replaceAll(',','ЗПТ');
    finalText = finalText.replaceAll('-','ТРЗ');
    finalText = finalText.replaceAll(' ','ПРБ');
    finalText = finalText.replaceAll(':','ДВЗ');
    finalText = finalText.replaceAll('?','ВПЗ');
    finalText = finalText.replaceAll('!','ВСЗ');
    return finalText;
}
    
    function textToPoint(text) {
        let finalText = text.replaceAll('ТЧК','.');
        finalText = finalText.replaceAll('ЗПТ',',');
        finalText = finalText.replaceAll('ТРЗ','-');
        finalText = finalText.replaceAll('ДВЗ',':');
        finalText = finalText.replaceAll('ПРБ',' ');
        finalText = finalText.replaceAll('ВПЗ','?');
        finalText = finalText.replaceAll('ВСЗ','!');
        return finalText;
    }

function encryptFunction(key, text, desc) {

    key = key.toUpperCase();
    for (let i = 0; i < key.length; i++) {
        for (let j = i + 1; j < key.length; j++) {
            if (key[i] == key[j]) {
                document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Введите ключ: слово не имеющее одинаковых букв!!!';
                document.getElementById('message-box').removeAttribute('hidden');
                throw new Error();
            }
        }
    }
    let ruNew = [];
    for (let i = 0 ; i < ru.length; i++) {
        if (i < key.length) {
            ruNew.push(key[i]);
        } else {
            for (let j = 0 ; j < ru.length; j++) {
                let isNotIn = true;
                for (let m = 0 ; m < ruNew.length; m++) {
                    if (ru[j] == ruNew[m]) {
                        isNotIn = false;
                    }
                }
                if (isNotIn) {
                    ruNew.push(ru[j]);
                }
            }
        }
    }

    text = text.toUpperCase();
    text = pointToText(text);
    let encryptedText = "";

    for (let i = 0; i < text.length; i += 2) {
        let ifDouble = false;
        let indexFirst = -1;
        let indexSecond = -1;
        for (let j = 0 ; j < ruNew.length; j++) {
            if (ruNew[j] == text[i]) {
                indexFirst = j;
            }
            if ((i + 1 < text.length)) {
                if (text[i] != text[i + 1]) {
                    if (ruNew[j] == text[i + 1]) {
                        indexSecond = j;
                    }
                } else {
                    ifDouble = true;
                }
            } else {
                for (let j = 0 ; j < ruNew.length; j++) {
                    if (ruNew[j] == 'Ь') {
                        indexSecond = j;
                    }
                }
            }
        }

        if (ifDouble) {
            i--;
            for (let j = 0 ; j < ruNew.length; j++) {
                if (ruNew[j] == 'Ь') {
                    indexSecond = j;
                }
            }
        }

        let x1 = Math.floor(indexFirst / 6);
        let y1 = indexFirst % 6;
        let x2 = Math.floor(indexSecond / 6);
        let y2 = indexSecond % 6;
        if (x1 == x2) {
            if (desc) {
                y1 = (y1 + 5) % 6;
                y2 = (y2 + 5) % 6;
            } else {
                y1 = (y1 + 1) % 6;
                y2 = (y2 + 1) % 6;
            }
        } else {
            if (y1 == y2) {
                if (desc) {
                    x1 = (x1 + 4) % 5;
                    x2 = (x2 + 4) % 5;
                } else {
                    x1 = (x1 + 1) % 5;
                    x2 = (x2 + 1) % 5;
                }
            } else {
                [x1, x2] = [x2, x1];
            }
        }

        let index1 = x1*6 + y1;
        let index2 = x2*6 + y2;
        encryptedText += ruNew[index1 % ruNew.length];
        encryptedText += ruNew[index2 % ruNew.length];
    }

    if (desc) {

        let decryptedText = "";
        for (let i = 0 ; i < encryptedText.length - 2; i ++) {
            if (encryptedText[i] == encryptedText[i + 2] && encryptedText[i + 1] == "Ь") {
                decryptedText += encryptedText[i];
                i += 2;
            }
            decryptedText += encryptedText[i];
        }
        let last = encryptedText.length - 1;
        decryptedText += encryptedText[last - 1] + encryptedText[last];

        decryptedText = textToPoint(decryptedText);
        if (decryptedText[decryptedText.length - 1] == 'Ь') {
            decryptedText = decryptedText.substring(0, decryptedText.length - 1);
        }

        return decryptedText;
    }
    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;

    
    const encryptedText = encryptFunction(key, text, false);
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
    const decryptedText = encryptFunction(key, text, true);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}