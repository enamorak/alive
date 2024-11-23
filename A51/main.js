const A51 = {
    R1MASK: 0x07FFFF,
    R2MASK: 0x3FFFFF,
    R3MASK: 0x7FFFFF,

    R1MID: 0x000100,
    R2MID: 0x000400,
    R3MID: 0x000400,

    R1TAPS: 0x072000,
    R2TAPS: 0x300000,
    R3TAPS: 0x700080,

    R1OUT: 0x040000,
    R2OUT: 0x200000,
    R3OUT: 0x400000,

    R1: 0,
    R2: 0,
    R3: 0
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

function parity(x) {
    x ^= x >> 16;
    x ^= x >> 8;
    x ^= x >> 4;
    x ^= x >> 2;
    x ^= x >> 1;
    return x & 1;
}

function clockone(reg, mask, taps) {
    let t = reg & taps;
    reg = (reg << 1) & mask;
    reg |= parity(t);
    return reg;
}

function majority() {
    let sum = parity(A51.R1 & A51.R1MID) + parity(A51.R2 & A51.R2MID) + parity(A51.R3 & A51.R3MID);
    return sum >= 2 ? 1 : 0;
}

function clock() {
    let maj = majority();
    if (((A51.R1 & A51.R1MID) != 0) == maj)
        A51.R1 = clockone(A51.R1, A51.R1MASK, A51.R1TAPS);
    if (((A51.R2 & A51.R2MID) != 0) == maj)
        A51.R2 = clockone(A51.R2, A51.R2MASK, A51.R2TAPS);
    if (((A51.R3 & A51.R3MID) != 0) == maj)
        A51.R3 = clockone(A51.R3, A51.R3MASK, A51.R3TAPS);
}

function clockallthree() {
    A51.R1 = clockone(A51.R1, A51.R1MASK, A51.R1TAPS);
    A51.R2 = clockone(A51.R2, A51.R2MASK, A51.R2TAPS);
    A51.R3 = clockone(A51.R3, A51.R3MASK, A51.R3TAPS);

}

function getBit() {
    return parity(A51.R1 & A51.R1OUT) ^ parity(A51.R2 & A51.R2OUT) ^ parity(A51.R3 & A51.R3OUT);
}

function keySetup(key, frame) {
    A51.R1 = A51.R2 = A51.R3 = 0;
    for (let i = 0; i < 64; i++) {
        clockallthree();
        let keyBit = (key[(i / 8) | 0] >> (i & 7)) & 1;
        A51.R1 ^= keyBit; A51.R2 ^= keyBit; A51.R3 ^= keyBit;
    }

    for (let i = 0; i < 22; i++) {
        clockallthree();
        let frameBit = (frame >> i) & 1;
        A51.R1 ^= frameBit; A51.R2 ^= frameBit; A51.R3 ^= frameBit;
    }

    for (let i = 0; i < 100; i++) {
        clock();
    }
}

function run(AtoBkeystream, BtoAkeystream) {
    for (let i = 0; i <= Math.floor(113 / 8); i++)
        AtoBkeystream[i] = BtoAkeystream[i] = 0;

    for (let i = 0; i < 114; i++) {
        clock();
        AtoBkeystream[Math.floor(i / 8)] |= getBit() << (7 - (i & 7));
    }

    for (let i = 0; i < 114; i++) {
        clock();
        BtoAkeystream[Math.floor(i / 8)] |= getBit() << (7 - (i & 7));
    }
}

function get_bits(number, ander, size) {
    let arr = []
    while (size > 0) {
        r = number & ander
        arr.push(r != 0 ? 1 : 0);
        ander >>= 1;
        size--;
    }
    return arr;
}

function split_gamma(gammas) {
    let spliters = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2];
    let res = []
    let val = 0;
    let len = 0;
    for (let gamma of gammas) {
        for (let [item, size] of gamma.map((it, i) => [it, spliters[i]])) {
            for (let bit of get_bits(item, 0xf0, size)) {
                if (len == 8) {
                    res.push(val);
                    val = 0;
                    len = 0;
                }
                val = (val << 1) | bit;
                len++;
            }
        }
    }
    return res;
}

function get_gamma(key, text_length_bits) {
    let frame = 0x21;
    let result = [];
    let count = (text_length_bits / 114) | 0 + text_length_bits % 114 != 0 ? 1 : 0;
    let AtoB = new Array(15), BtoA = new Array(15);
    for (let i = 0; i < count; i++) {
        keySetup(key, frame);
        run(AtoB, BtoA);
        result.push([...AtoB]);
    }
    return result;
}

/**
 * @param phrase Побайтовое представление строки
 * @param key Байтовый массив из 8 элементов
 */
function encryption(phrase, key) {
    let gammas = get_gamma(key, phrase.length * 8);
    let gamma = split_gamma(gammas)
    let result = [];
    for (let i = 0; i < phrase.length; i++) {
        result.push(phrase[i] ^ gamma[i])
    }
    return result;
}

function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;

    let encryptedText = pointToText(text);
    encryptedText = new TextEncoder().encode(encryptedText);

    if (key.length != 16) {
        document.getElementById('message-text').innerText = "Неправильная длина ключа";
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    } else {
        encryptedText = bytesToHex(encryption(encryptedText, hexToBytes(key)));
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

    let decryptedText = hexToBytes(text);

    if (key.length != 16) {
        document.getElementById('message-text').innerText = "Неправильная длина ключа";
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    } else {
        decryptedText = encryption(decryptedText, hexToBytes(key));
        decryptedText = hexToBytes(bytesToHex(decryptedText));
        decryptedText = new TextDecoder().decode(decryptedText);
        decryptedText = textToPoint(decryptedText);
    }

    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}