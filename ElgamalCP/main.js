const ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й'
    , 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф'
    , 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

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

function isCoprime (a, b) {
    var num;
    while (b) {
        num = a % b;
        a = b;
        b = num;
    }
    if (Math.abs(a) == 1) {
        return true;
    }
    return false;
}


function FindElgamal(text, P, G, X) {
    for (let i = 2; i <= P/i; i++) {
        if (P % i == 0) {
            document.getElementById('message-text').innerText =  'P - должно быть простым!!!';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
    }
    if (G >= P) {
        document.getElementById('message-text').innerText =  'G - должно быть меньше P!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }
    if (X >= P || X <= 1) {
        document.getElementById('message-text').innerText =  'X - должен быть меньше P-1 и больше 1!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    let Y = 1;
    for (let i = 0 ; i < X ; i ++) {
        Y = (Y * G) % P;
    }

    document.getElementById('Y').value = Y;

    let a = 1;
    let K = Math.floor(Math.random() * ((P - 1) - 2) + 2);
    while (!isCoprime(K, P - 1)) {
        K = Math.floor(Math.random() * ((P - 1) - 2) + 2);
    }

    for (let i = 0 ; i < K; i ++) {
        a = (a * G) % P;
    }

    let m = 0;
    let j = 0;
    for (let i = 0; i < text.length; i++) {
        for (let n = 0; n < ru.length; n ++) {
            if (text[i] == ru[n]) {
                j = n + 1;
            }
        }
        m = ((m + j) * (m + j)) % P;
    }

    let b = ((m - X * a) % (P - 1) + P - 1) % (P - 1);
    let Eil = 1;
    let x = P - 1;
    let sum = 0;
    let mult = 1;
    for (let i = 2 ; i <= x; i ++) {
        while (x % i == 0) {
            sum ++;
            x /= i;
        }
        if (sum > 0) {
            if (sum > 1) {
                for (let j = 0; j < sum; j ++) {
                    mult *= i;
                }
                Eil *= (mult - mult / i);
            } else {
                Eil *= (i - 1);
            }
        }
        sum = 0;
        mult = 1;
    }
    console.log(Eil, K);
    for (let i = 0 ; i < Eil - 1; i ++) {
        b = (b * K) % (P - 1);
    }

    document.getElementById('a').value = a;
    document.getElementById('b').value = b;

    return [a, b];
}


function isRightElgamal(text, Y, P, G, a, b) {
    let m = 0;
    let j = 0;
    for (let i = 0; i < text.length; i++) {
        for (let n = 0; n < ru.length; n ++) {
            if (text[i] == ru[n]) {
                j = n + 1;
            }
        }
        m = ((m + j) * (m + j)) % P;
    }

    let A1 = 1;
    for (let i = 0 ; i < a; i ++) {
        A1 = (A1 * Y) % P;
    }
    for (let i = 0 ; i < b; i ++) {
        A1 = (A1 * a) % P;
    }

    let A2 = 1;
    for (let i = 0; i < m ; i ++) {
        A2 = (A2 * G) % P;
    }

    console.log('A1= ' + A1 + '\nA2= ' + A2);

    if (A1 == A2) {
        return true;
    } else {
        return false;
    }
}

// функции взаимодействия с интерфейсом
function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    text = pointToText(text).toLocaleLowerCase();
    let P = Number(document.getElementById('P').value); 
    let G = Number(document.getElementById('G').value);
    let X = Number(document.getElementById('X').value);

    document.getElementById('result').value = FindElgamal(text, P, G, X);
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    text = pointToText(text).toLocaleLowerCase();
    let P = Number(document.getElementById('P').value); 
    let G = Number(document.getElementById('G').value);
    let a = Number(document.getElementById('a').value);
    let b = Number(document.getElementById('b').value);
    let Y = Number(document.getElementById('Y').value);
    
    if (isRightElgamal(text, Y, P, G, a, b)) {
        document.getElementById('result').value = "Подпись верна";
    } else {
        document.getElementById('result').value = "Подпись не верна";
    }
    document.getElementById('message-box').removeAttribute('hidden');
}