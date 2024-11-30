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

function closeMessageBox() {
    document.getElementById('message-box').setAttribute('hidden', true);
}

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
    

    //функция шифрования строки, на выходе хекс
    

// соединение массива в 32 слово
function to_32(vec) {
    let result = vec[0];
    result = (result << 8) + vec[1];
    result = (result << 8) + vec[2];
    result = (result << 8) + vec[3];
    return result;
}

// разделение 32 слова на массив
function from_32(num) {
    let result = [];
    result.push((num >> 24) & 0xff);
    result.push((num >> 16) & 0xff);
    result.push((num >> 8) & 0xff);
    result.push(num & 0xff);
    return result;
}

// объединение двух строк
function add_32(left, right) {
    let left_32 = to_32(left);
    let right_32 = to_32(right);
    let result_32 = ((left_32 + right_32) % 0x100000000) >>> 0;
    return from_32(result_32);
}

// СБлок
function g(a, key) {
    let internal = add_32(a, key);
    internal = sblock(internal);
    let result_32 = to_32(internal);
    result_32 = ((result_32 << 11) | (result_32 >>> 21)) >>> 0;
    return from_32(result_32);
}

//Ксор слева и справа
function festXor32 (left, right) {
    return left.map((l, i) => l ^ right[i]);
}

// разделение ключей
function festExpandKey (key) {
    let result = [];
    for (let i = 0; i < 24; i++) {
        let i1 = (i * 4) % 32;
        let i2 = (i * 4 + 4) % 32;
        i2 = i2 === 0 ? i2 + 32 : i2;
        result.push(key.slice(i1, i2));
    }
    for (let i = 7; i >= 0; i--) {
        result.push(key.slice(i * 4, i * 4 + 4));
    }
    return result;
    
}

// одна итерация fest
function festNetNode (left, right, key) {
    return [right, festXor32(left, g(right, key))];
}

// проходимся по сетке 32 раза, меняем право и лево на последней итерации
function festNet32 (text, keys) {
    let left = text.slice(0, 4);
    let right = text.slice(4, 8);
    console.log(bytesToHex(left) + " " + bytesToHex(right));
    for (let key of keys) {
        let buffer = [...left];
        buffer.push(...right);
        [left, right] = festNetNode(left, right, key);
        console.log(bytesToHex(left) + " " + bytesToHex(right));
    }
    let temp = right;
    right = left;
    left = temp;
    let result = [...left];
    result.push(...right);
    return result;
}

// нарезаем текст
function festProto (text, keys) {
    text = hexToBytes(text);
    let result = "";
    for (let i = 0 ; i < text.length; i +=8) {
        let buffer = text.slice(i, i + 8);
        buffer = festNet32(buffer, keys);
        result += bytesToHex(buffer);
    }
    return result;
}

function magmaEncrypt(phrase, key)
{
    key = hexToBytes(key);
    let ekeys = festExpandKey(key);
    return festProto(phrase, ekeys);
}

function magmaDecrypt(phrase, key)
{
    key = hexToBytes(key);
    let ekeys = festExpandKey(key);
    ekeys.reverse();
    return festProto(phrase, ekeys);
}

function magmaPrepairPhrase(phrase, key, cryptType) {
    if (cryptType) {
        phrase = pointToText(phrase).toLocaleLowerCase();

        let phraseLen = phrase.length;
        if (phrase.length % 4 != 0) {
            for (let i = 0; i < 4 - (phraseLen % 4); i++) {
                phrase += 'ф';
            }
        }
        phrase = new TextEncoder().encode(phrase);
        phrase = bytesToHex(phrase);

        let newPhrase = ""
        phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 16) {
            let crypt_phrase = phrase.slice(k, k + 16);
            let temp = magmaEncrypt(crypt_phrase, key);
            newPhrase += temp;
        }
        return newPhrase;
    } else {
        let newPhrase = "";
        let phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 16) {
            let crypt_phrase = phrase.slice(k, k + 16);
            let temp = magmaDecrypt(crypt_phrase, key);
            newPhrase += temp;
        }

        newPhrase = hexToBytes(newPhrase);
        newPhrase = new TextDecoder().decode(newPhrase);
        while (newPhrase[newPhrase.length - 1] == "ф") {
            newPhrase = newPhrase.substring(0, newPhrase.length - 1);
        }

        newPhrase = textToPoint(newPhrase);
        return newPhrase;
    }
}


// функции взаимодействия с интерфейсом
function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;
    let encryptedText = "";

    let check = document.getElementById('chmobolotnoye').checked;

    if (check) {
        if (key.length != 64) {
            document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Введите ключ длинной 64 символа';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        } else {
            encryptedText = magmaPrepairPhrase(text, key, true);
        }
    } else {
        encryptedText = magmaEncrypt(text, key);
    }
    
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;

    let decryptedText = "";

    let check = document.getElementById('chmobolotnoye').checked;

    if (check) {
        if (key.length != 64) {
            document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Введите ключ длинной 64 символа';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        } else {
            decryptedText = magmaPrepairPhrase(text, key, false);
        }
    } else {
        decryptedText = magmaDecrypt(text, key);
    }

    document.getElementById('result').value = decryptedText;
 
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}