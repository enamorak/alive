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


function RsaPowMod(number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modula;
    }
    return result;
}

function RsaGetNumbers(phrase, len) {
    let result = []
    for (let i = 0; i < phrase.length; i += len) {
        result.push(Number(phrase.slice(i, i + len)));
    }
    return result
}

function RsaToString(number, len) {
    return number.toString().padStart(len, '0');
}

function RsaProto(letters, power, modula) {
    let result = []
    for (let i = 0; i < letters.length; i++){
        result.push(RsaPowMod(letters[i], power, modula));
    }
    return result;
}

function RsaPrime(n) { 
    let result = []; 
    for (let i = 2; i <= Math.pow(n, 0.5); i++) { 
        if (n % i == 0) { 
            result.push(i); 
            result.push(n / i); 
        } 
    } 
    return result; 
} 

function RsaCoprimes(num1, num2) {
    let smaller = num1 > num2 ? num1 : num2;
    for(let ind = 2; ind < smaller; ind++){
       let condition1 = num1 % ind == 0;
       let condition2 = num2 % ind == 0;
       if(condition1 && condition2){
          return false;
       };
    };
    return true;
};

function RsaEncrypt(phrase, n, e) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
    if (e >= n) throw new Error("E должно быть меньше либо равно n");
    let result = '';
    const len = n.toString().length;
    RsaProto(Array.from(phrase).map(letter => alphabet.indexOf(letter) + 1), e, n
        ).forEach(res => result += RsaToString(res, len));
    return result;
}

function RsaValidate(phrase, n, d) {
    if (d >= n) throw new Error("D должно быть меньше либо равно n");
    const len = n.toString().length;
    if (phrase.length % len !== 0) throw new Error("Invalid text length");
    const result = RsaGetNumbers(phrase, len);
    
    result.forEach(letter => {
        if (letter >= n) throw new Error("Invalid letter in text");
    });
    return result;
}

function RsaDecrypt(phrase, n, d) {
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let result = '';
    try {
        phrase = RsaValidate(phrase, n, d);
        const buffer = RsaProto(phrase, d, n);
        for (let num of buffer) {
            result += alphabet[num - 1];
        }
        return result;
    } catch (error) {
        return error;
    }
}

function RsaPrepairPhrase(text, n, e, typecr) {
    let newText = '';
    if (typecr) {
        newText = pointToText(text).toLocaleLowerCase();
    }
    let ntest = RsaPrime(n);
        if (ntest.length != 2) {
            document.getElementById('message-text').innerText =  'n - должно быть произведением двух простых чисел';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
        if (n < 32) {
            document.getElementById('message-text').innerText =  'n - должно быть больше 32';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
    if (typecr) {
        let eiler = (ntest[0] - 1) * (ntest[1] - 1);
        if (!RsaCoprimes(eiler, e)) {
            document.getElementById('message-text').innerText =  'e - дожно быть взаимнопростым с функцией эйлера от n и меньше ее';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }

        let sum = 1;
        for (let i = 0 ; i < eiler - 1; i ++) {
            sum = (sum * e) % eiler;
        }
        document.getElementById('D').value = sum;

        return RsaEncrypt(newText, n, e);

    } else {
        let eiler = (ntest[0] - 1) * (ntest[1] - 1);
        if (RsaCoprimes(eiler, e) == false) {
            document.getElementById('message-text').innerText =  'd - дожно быть взаимнопростым с функцией эйлера от n и меньше ее';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }

        newText = textToPoint(RsaDecrypt(text, n, e));
        return newText;
    }
}

// функции взаимодействия с интерфейсом
function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    let enN = Number(document.getElementById('N').value); 
    let enE = Number(document.getElementById('E').value);
    let encryptedText = "";
    let check = document.getElementById('chmobolotnoye').checked;

    if (check) {
        encryptedText = RsaPrepairPhrase(text, enN, enE, true);
    }else {
        encryptedText = RsaPrepairPhrase(text, enN, enE, true);
    }

    document.getElementById('result').value = encryptedText;
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    let deN = Number(document.getElementById('N').value); 
    let deD = Number(document.getElementById('D').value);
    let decryptedText = "";
    let check = document.getElementById('chmobolotnoye').checked;

    if (check) {
        decryptedText = RsaPrepairPhrase(text, deN, deD, false);
    } else {
        decryptedText = RsaPrepairPhrase(text, deN, deD, false);
    }

    document.getElementById('result').value = decryptedText;
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}