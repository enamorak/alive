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


const AES = {
    NK: 4,
    NB: 4,
    NR: 10
}

const AESS = [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
];
const AESSReverse = [
    0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
    0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
    0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
    0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
    0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
    0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
    0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
    0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
    0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
    0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
    0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
    0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
    0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
    0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
    0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d,
];
const AESRCon = [
    [ 0x01, 0x00, 0x00, 0x00 ],
    [ 0x02, 0x00, 0x00, 0x00 ],
    [ 0x04, 0x00, 0x00, 0x00 ],
    [ 0x08, 0x00, 0x00, 0x00 ],
    [ 0x10, 0x00, 0x00, 0x00 ],
    [ 0x20, 0x00, 0x00, 0x00 ],
    [ 0x40, 0x00, 0x00, 0x00 ],
    [ 0x80, 0x00, 0x00, 0x00 ],
    [ 0x1b, 0x00, 0x00, 0x00 ],
    [ 0x36, 0x00, 0x00, 0x00 ],
];
const AESMix = [0x02, 0x03, 0x01, 0x01];
const AESInvMix = [0x0e, 0x0b, 0x0d, 0x09];

function AESKeyExpansion(key) {
    let keyArr = Array.from(key);
    keyArr = keyArr.concat(Array(4*AES.NK - keyArr.length).fill(0x01));
    let result = AESFillState(keyArr);
    for (let col = AES.NK; col < AES.NB * (AES.NR + 1); col++) {
        if (col % AES.NK === 0) {
            let tmp = [];
            for (let row = 1; row < 4; row++) {
                tmp.push(result[row][col - 1]);
            }
            tmp.push(result[0][col-1]);
            tmp = tmp.map(item => {
                let sboxElem = AESS[item];
                return sboxElem;
            });
            for (let row = 0; row < 4; row++) {
                let s = result[row][col - 4] ^ tmp[row] ^ AESRCon[Math.floor(col/AES.NK) - 1][row];
                result[row].push(s);
            }
        } else {
            result.forEach(row => {
                let s = row[col - 4] ^ row[col - 1];
                row.push(s);
            });
        }
    }
    return result;
}

function AESAddRoundKey(state, key_schedule, round) {
    let result = [
        Array(AES.NK).fill(0),
        Array(AES.NK).fill(0),
        Array(AES.NK).fill(0),
        Array(AES.NK).fill(0),
    ];
    for (let col = 0; col < AES.NK; col++) {
        let s0 = state[0][col] ^ key_schedule[0][AES.NB * round + col];
        let s1 = state[1][col] ^ key_schedule[1][AES.NB * round + col];
        let s2 = state[2][col] ^ key_schedule[2][AES.NB * round + col];
        let s3 = state[3][col] ^ key_schedule[3][AES.NB * round + col];
        result[0][col] = s0;
        result[1][col] = s1;
        result[2][col] = s2;
        result[3][col] = s3;
    }
    return result;
}

function AESSubBytes(state, sbox) {
    return state.map(line => {
        return line.map(item => {
            return sbox[item % 256];
        });
    });
}

function AESLeftShift(line, count) {
    let result = line.slice(count).concat(line.slice(0, count));
    return result;
}

function AESRightShift(line, count) {
    let result = line.slice(line.length - count).concat(line.slice(0, line.length - count));
    return result;
}

function AESShiftRows(state) {
    return state.map((line, i) => AESLeftShift(line, i));
}

function AESInvShiftRows(state) {
    return state.map((line, i) => AESRightShift(line, i));
}

function AESGfMul(left, right) {
    let result = 0;
    let hi_bit;
    for (let i = 0; i < 8; i++) {
        if ((right & 1) !== 0) {
            result ^= left;
        }
        hi_bit = left & 0x80;
        left <<= 1;
        if (hi_bit !== 0) {
            left ^= 0x1b;
        }
        right >>= 1;
    }
    return result;
}

function AESMix_columns(state, coef) {
    return Array(4).fill().map((_, i) => Array(AES.NB).fill().map((_, j) => {
        let s = 0;
        for (let k = 0; k < AESRightShift(coef, i).length; k++) {
            s ^= AESGfMul(state[k][j], AESRightShift(coef, i)[k]);
        }
        return s;
    }));
}

function AESFillState(input) {
    return Array(4).fill().map((_, r) => Array(AES.NB).fill().map((_, c) => input[r + 4 * c]));
}

function AESFillResult(state) {
    let result = [];
    for (let r = 0; r < 4; r++) {
        result.push(...state.map((line) => line[r]));
    }
    return result;
}

function AESEnc(input, key_schedule) {
    let state = AESFillState(input);
    state = AESAddRoundKey(state, key_schedule, 0);
    for (let rnd = 1; rnd < AES.NR; rnd++) {
        // console.log(bytesToHex(state[0]), bytesToHex(state[1]), bytesToHex(state[2]), bytesToHex(state[3]))

        state = AESSubBytes(state, AESS);
        // console.log(bytesToHex(state[0]), bytesToHex(state[1]), bytesToHex(state[2]), bytesToHex(state[3]))

        state = AESShiftRows(state);
        // console.log(bytesToHex(state[0]), bytesToHex(state[1]), bytesToHex(state[2]), bytesToHex(state[3]))

        state = AESMix_columns(state, AESMix);
        // console.log(bytesToHex(state[0]), bytesToHex(state[1]), bytesToHex(state[2]), bytesToHex(state[3]))

        state = AESAddRoundKey(state, key_schedule, rnd);
        // console.log(bytesToHex(state[0]), bytesToHex(state[1]), bytesToHex(state[2]), bytesToHex(state[3]))
    }
    state = AESSubBytes(state, AESS);
    state = AESShiftRows(state);
    state = AESAddRoundKey(state, key_schedule, AES.NR);
    return AESFillResult(state);
}

function AESDec(input, key_schedule) {
    let state = AESFillState(input);
    state = AESAddRoundKey(state, key_schedule, AES.NR);
    for (let rnd = AES.NR - 1; rnd >= 1; rnd--) {
        state = AESInvShiftRows(state);
        state = AESSubBytes(state, AESSReverse);
        state = AESAddRoundKey(state, key_schedule, rnd);
        state = AESMix_columns(state, AESInvMix);
    }
    state = AESInvShiftRows(state);
    state = AESSubBytes(state, AESSReverse);
    state = AESAddRoundKey(state, key_schedule, 0);
    return AESFillResult(state);
}

// 2b7e151628aed2a6abf7158809cf4f3c
// 3243f6a8885a308d313198a2e0370734

// 3925841d02dc09fbdc118597196a0b32
function AESEncrypt(phrase, key) {
    // Фраза это текст
    // Ключ это хекс
    phrase = new TextEncoder().encode(phrase);
    key = hexToBytes(key);
    key = AESKeyExpansion(key);
    // Фраза байтовый массив
    // Ключ байтовый массив расширенный, много массивов
    let newPhrase = ""
    let phraseLen = phrase.length;
    for (let k = 0; k < phraseLen; k += 16) {
        let crypt_phrase = phrase.slice(k, k + 16);
        let temp = bytesToHex(AESEnc(crypt_phrase, key));
        newPhrase += temp;
    }
    return newPhrase;
}

function AESDecrypt(phrase, key) {
    // Фраза хекс
    // Ключ хекс
    phrase = hexToBytes(phrase);
    key = hexToBytes(key);
    key = AESKeyExpansion(key);
    let newPhrase = ""
    let phraseLen = phrase.length;
    for (let k = 0; k < phraseLen; k += 16) {
        let crypt_phrase = phrase.slice(k, k + 16);
        let temp = bytesToHex(AESDec(crypt_phrase, key));
        newPhrase += temp;
    }

    newPhrase = hexToBytes(newPhrase);
    newPhrase = new TextDecoder().decode(newPhrase);
    return newPhrase;
}

function AESPrepairPhrase(phrase, key, cryptType) {
    if (cryptType) {
        phrase = pointToText(phrase).toLocaleLowerCase();

        let phraseLen = phrase.length;
        if (phrase.length % 8 != 0) {
            for (let i = 0; i < 8 - (phraseLen % 8); i++) {
                phrase += 'ф';
            }
        }
        let newPhrase = ""
        // console.log(phrase);
        newPhrase = AESEncrypt(phrase, key);
        return newPhrase;
    } else {
        let newPhrase = "";
        newPhrase = AESDecrypt(phrase, key);
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
        if (key.length != 32) {
            document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Введите ключ длинной 32 символа!';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        } else {
            encryptedText = AESPrepairPhrase(text, key, true);
        }
    } else {
        let newKeys = AESKeyExpansion(hexToBytes(key));
        encryptedText = hexToBytes(text);
        encryptedText = bytesToHex(AESEnc(encryptedText, newKeys));
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
        if (key.length != 32) {
            document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Введите ключ длинной 32 символа!';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        } else {
            decryptedText = AESPrepairPhrase(text, key, false);
        }
    } else {
        let newKeys = AESKeyExpansion(hexToBytes(key));
        decryptedText = hexToBytes(text);
        decryptedText = bytesToHex(AESDec(decryptedText, newKeys));
    }

    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}