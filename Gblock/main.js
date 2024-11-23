const PTable = [
    [1, 7, 14, 13, 0, 5, 8, 3, 4, 15, 10, 6, 9, 12, 11, 2],
    [8, 14, 2, 5, 6, 9, 1, 12, 15, 4, 11, 0, 13, 10, 3, 7],
    [5, 13, 15, 6, 9, 2, 12, 10, 11, 7, 8, 1, 4, 3, 14, 0],
    [7, 15, 5, 10, 8, 1, 6, 13, 0, 9, 3, 14, 11, 4, 2, 12],
    [12, 8, 2, 1, 13, 4, 15, 6, 7, 0, 10, 5, 3, 14, 9, 11],
    [11, 3, 5, 8, 2, 15, 10, 13, 14, 1, 7, 4, 12, 9, 6, 0],
    [6, 8, 2, 3, 9, 10, 5, 12, 1, 14, 4, 7, 11, 13, 0, 15],
    [12, 4, 6, 2, 10, 5, 11, 9, 14, 8, 13, 7, 0, 3, 15, 1]
];

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
    let finalText = text.replaceAll('тчк','.');
    finalText = finalText.replaceAll('зпт',',');
    finalText = finalText.replaceAll('трз','-');
    finalText = finalText.replaceAll('двз',':');
    finalText = finalText.replaceAll('прб',' ');
    finalText = finalText.replaceAll('впз','?');
    finalText = finalText.replaceAll('всз','!');
    return finalText;
}


    // перевод строки в байтовый массив, возвращает байтовый массив, принимает строку
    
function stringToUint8(str, border) {
    // return new TextEncoder().encode(str);
    const buffer = new TextEncoder().encode(str);
    let length = buffer.length;
    if (buffer.length % border !== 0) {
        length += border - buffer.length % border;
    }
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        result[i] = i < buffer.length ? buffer[i] : 0;
    }
    return result;
} 

    // функция перевода байтового массива в строку
function uint8ToString(data) {
    return new TextDecoder().decode(data);
}


    // Функция для работы реверса птаблицы
    
function findIndexPTable(elem, row) {
    for (let i = 0; i < 16; i++) {
        if (elem === PTable[row][i]) return i;
    }
    return 0;
}


    // функция шифрования байтового массива
    
function sblock(data) {
    let result = new Uint8Array(4);
    
    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let leftPartByte = (temp & 0xf0) >> 4;
        let rightPartByte = (temp & 0x0f);
        leftPartByte = PTable[i * 2][leftPartByte];
        rightPartByte = PTable[i * 2 + 1][rightPartByte];
        result[i] = (leftPartByte << 4) | rightPartByte;
    }
    
    return result;
}


    //функция расшифрования байтового массива
    
function sblockReverse(data) {
    let result = new Uint8Array(4);
    
    for (let i = 0; i < data.length; i++) {
        let temp = data[i];
        let leftPartByte = (temp & 0xf0) >> 4;
        let rightPartByte = (temp & 0x0f);
        leftPartByte = findIndexPTable(leftPartByte, i * 2);
        rightPartByte = findIndexPTable(rightPartByte, i * 2 + 1);
        result[i] = (leftPartByte << 4) | rightPartByte;
    }
    
    return result;
}
    //функция преобразования хекса в байтовый массив
    
function hexToBytes(text) {
    let includAlphabet = "0123456789abcdef";
    let result = new Uint8Array(text.length / 2);
    
    for (let i = 0; i < text.length / 2; i++) {
        let letter1 = text[i * 2];
        let letter2 = text[i * 2 + 1];
        if (includAlphabet.includes(letter1) && includAlphabet.includes(letter2)) {
            let num1 = includAlphabet.indexOf(letter1);
            let num2 = includAlphabet.indexOf(letter2);
            result[i] = (num1 << 4) | num2;
        }
    }
    
    return result;
}
    //функция преобразования байтового массива в хекс
    
function bytesToHex(bytes) {
    let result = "";
    let validAlphabet = "0123456789abcdef";
    
    for (let i = 0; i < bytes.length; i++) {
        let num1 = (bytes[i] & 0xf0) >> 4;
        let num2 = bytes[i] & 0x0f;
        let letter1 = validAlphabet[num1];
        let letter2 = validAlphabet[num2];
        result += letter1.toString() + letter2.toString();
    }
    
    return result;
}
    //функция шифрования строки, на выходе хекс
    
function encryptFunction(str) {
    let buffer = stringToUint8(str, 4);
    let result = "";
    
    for (let i = 0; i <= buffer.length - 4; i += 4) {
        let buffer_4 = buffer.slice(i, i + 4);
        let encoded = sblock(buffer_4);
        let hex = bytesToHex(encoded);
        result += hex;
    }
    
    return result;
}

    //функция расшифрования из хекса в строку
    
function decryptFunction(str) {
    let buffer = hexToBytes(str);
    
    for (let i = 0; i <= buffer.length - 4; i += 4) {
        let buffer4 = buffer.slice(i, i + 4);
        let decoded = sblockReverse(buffer4);
        for (let j = i; j < i + 4; j++) {
            buffer[j] = decoded[j - i];
        }
    }
    
    buffer = uint8ToString(buffer);
    buffer = textToPoint(buffer);
    return buffer;
}



function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;

    let encryptedText = "";

    let check = document.getElementById('chmobolotnoye').checked;

    if (check) {
        text = pointToText(text);
        text = text.toLowerCase();
        encryptedText = encryptFunction(text);
    } else {
        encryptedText = bytesToHex(sblock(hexToBytes(text)));
    }
    
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;

    let decryptedText = "";

    let check = document.getElementById('chmobolotnoye').checked;

    if (check) {
        decryptedText = decryptFunction(text);
    } else {
        decryptedText = bytesToHex(sblockReverse(hexToBytes(text)));
    }

    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}