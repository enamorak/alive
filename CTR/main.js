const ru = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И'
    , 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'
    , 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    , 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'
    , 'x', 'y', 'z'];


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
    let finalText = text.replaceAll('ТЧК','.');
    finalText = finalText.replaceAll('ЗПТ',',');
    finalText = finalText.replaceAll('ТРЗ','-');
    finalText = finalText.replaceAll('ДВЗ',':');
    finalText = finalText.replaceAll('ПРБ',' ');
    finalText = finalText.replaceAll('ВПЗ','?');
    finalText = finalText.replaceAll('ВСЗ','!');
    return finalText;
}

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

function g(a, key) {
    let internal = add_32(a, key);
    internal = sblock(internal);
    let result_32 = to_32(internal);
    result_32 = ((result_32 << 11) | (result_32 >>> 21)) >>> 0;
    return from_32(result_32);
}

function festXor32 (left, right) {
    return left.map((l, i) => l ^ right[i]);
}

function festNetNode (left, right, key) {
    return [right, festXor32(left, g(right, key))];
}

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

function Xor(left, right) {
    return left.map((leftValue, index) => leftValue ^ right[index])
}

function gamCtr(counter) {
    let buffer = 0;
    const bits = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01];
    let result = counter.slice().reverse().map((elem, index) => {
        buffer = elem + bits[bits.length - 1 - index] + (buffer >> 8);
        return buffer & 0xff;
    });
    return result.reverse();
}

function nullLen(vec) {
    let count = 0;
    for (let i = vec.length - 1; i >= 0; i--) {
        if (vec[i] === 0) count++;
        else break;
    }
    return count;
}

function gamCtrMagma(text, initV, key) {
    let initBytes = hexToBytes(initV, 4);
    let ctr = [...initBytes, 0x00, 0x00, 0x00, 0x00];
    let keyBytes = hexToBytes(key, 32);
    let keys = festExpandKey(keyBytes);
    let gamma;
    let textBytes = hexToBytes(text, 8);
    let nullCount = nullLen(textBytes);
    let result = [];

    for (let i = 0; i < textBytes.length; i += 8) {
        let part = textBytes.slice(i, i + 8);
        gamma = festNet32(ctr, keys);
        ctr = gamCtr(ctr);
        result.push(...Xor(part, gamma));
    }

    return bytesToHex(result.slice(0, result.length - nullCount));
 }

 function gamPrepairPhrase(text, iv, key, cryptType) {
    if (cryptType) {
        text = pointToText(text).toLocaleLowerCase();
    
        let textLen = text.length;
        if (text.length % 16 != 0) {
            for (let i = 0; i < 16 - (textLen % 16); i++) {
                text += 'ф';
            }
    
            text = new TextEncoder().encode(text);
            text = bytesToHex(text);
            
            let newtext = "";
            textLen = text.length;
            for (let k = 0; k < textLen; k += 64) {
                let crypt_text = text.slice(k, k + 64);
                let temp = gamCtrMagma(crypt_text, iv, key);
                newtext += temp;
            }
            return newtext;
        } 
    } else {
        let newtext = "";
        let textLen = text.length;
        for (let k = 0; k < textLen; k += 64) {
            let crypt_text = text.slice(k, k + 64);
            let temp = gamCtrMagma(crypt_text, iv, key);
            newtext += temp;
        }
        newtext = hexToBytes(newtext);
        newtext = new TextDecoder().decode(newtext);
        while (newtext[newtext.length - 1] == "ф") {
            newtext = newtext.substring(0, newtext.length - 1);
        }
        
        newtext = textToPoint(newtext);
        return newtext;
    }
}




function encryptText() {
    // получение данных с формы
    let iv = document.getElementById('iv').value;
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;
    let check = document.getElementById('chmobolotnoye').checked;

    let result = "";

    if (check) {
        if (key.length != 64) {
            document.getElementById('message-box').innerText = "Неправильная длина ключа";;
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        } else {
            result = gamPrepairPhrase(result, iv, key, true);
        }
    } else {
        result = gamCtrMagma(text, iv, key);
    }
    
    document.getElementById('result').value = result;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let iv = document.getElementById('iv').value;
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;
    let check = document.getElementById('chmobolotnoye').checked;
    
    let result = "";

    if (check) {
        if (key.length != 64) {
            document.getElementById('message-box').innerText = "Неправильная длина ключа";;
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        } else {
            result = gamPrepairPhrase(text, iv, key, false);
        }
    } else {
        result = gamCtrMagma(text, iv, key);
    }
    
    document.getElementById('result').value = result;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}