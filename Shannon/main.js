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

function SFunction(key, text, isEn) {
    let decryptedText = "";
    let encryptedText = "";
    if (isEn) {
        key = key.toUpperCase();
        text = text.toUpperCase();
        text = pointToText(text);
    } else {
        key = key.toUpperCase();
        text = text.toUpperCase();
    }
    let keys = key.split(" ");
    let a = Number(keys[0]);
    let c = Number(keys[1]);
    let t = Number(keys[2]);
    let m = ru.length;

    if (a % 4 != 1 || c % 2 != 1 || t < 0 || t > 31) {
        let value = "";
        if (a % 4 != 1) {
            value += '|| Введите a % 4 == 1 ||';
        }
        if (c % 2 != 1) {
            value += '|| Введите c % 2 == 1 ||';
        }
        if (t < 0 || t > 31) {
            value += '||Введите 0 <= t <= 31 ||';
        }
        document.getElementById('message-box').innerText = value;
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }



    let arr = new Array(ru.length);
    arr[0] = t;
    for (let i = 1 ; i < ru.length; i ++) {
        arr[i] = (arr[i-1] * a + c) % m;
    }

    for (let i = 0 ; i < text.length; i ++) {
        let result = 0;
        for (let j = 0 ; j < ru.length; j ++) {
            if (text[i] == ru[j]) {
                result = j;
                j = ru.length;
            }
        }
        if (isEn) {
            encryptedText += ru[(result + arr[i % arr.length]) % ru.length];
        } else {
            result -= arr[i % arr.length];
            while (result < 0) {
                result += ru.length;
            }
            decryptedText += ru[result];
        }
    }
    
    if (isEn) {
        return encryptedText;
    } else {
        decryptedText = textToPoint(decryptedText);
        return decryptedText;
    }
}

function encryptText() {
    // получение данных с формы
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;

    
    const encryptedText = SFunction(key, text, true);
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
    const decryptedText = SFunction(key, text, false);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}