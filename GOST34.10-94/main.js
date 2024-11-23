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

function ElgPrime(n) { 
    let result = []; 
    for (let i = 2; i <= Math.pow(n, 0.5); i++) { 
        if (n % i == 0) {
            result.push(i); 
            result.push(n / i); 
        } 
    } 
    return result; 
}

function G94SquareHash(phrase, modula) {
    let hi = 0 ;
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    Array.from(phrase).forEach(letter => {
        let index = alphabet.indexOf(letter) + 1;
        hi = Math.pow((hi + index), 2) % modula;
    });
    return hi;
}

function G94PowMod (number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i ++) {
        result *= number;
        result %= modula;
    }
    return result;
}

function G94Modd(x, p) {
    return ((x % p) + p) % p;
}

function G94Sign (phrase, p, q, a, x, modula) {
    let h = G94SquareHash(phrase, modula);
    let k = Math.floor(Math.random() * (q - 2) + 2);
    let r = G94Modd(G94PowMod(a, k, p), q);
    while (r == 0) {
        k = Math.floor(Math.random() * (q - 2) + 2);
        r = G94Modd(G94PowMod(a, k, p), q);
    }
    let s = G94Modd(x * r + k * h, q);
    return [r, s];
}

function G94SignCheck(phrase, p, q, a, y, r, s, modula) {
    let h = G94SquareHash(phrase, modula);
    let v = G94PowMod(h, q - 2, q);
    let z1 = G94Modd(s * v, q);
    let z2 = G94Modd((q - r) * v, q);
    let u = G94Modd(G94Modd(G94PowMod(a, z1, p) * G94PowMod(y, z2, p), p), q);
    return u == r;
}

function G94PrepairePhrase(phrase, p, q, a, x, y, r, s, crtype) {
    
    phrase = pointToText(phrase).toLocaleLowerCase();
    let ptest = ElgPrime(p);
    let atest = G94PowMod(a, q, p);
    if (p <= 32) {
        document.getElementById('message-box').value = "p - должно быть больше длины алфавита";
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error;
    }
    if (ptest.length != 0) {
        document.getElementById('message-box').value = "p - должно быть простым числом";
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error;
    }
    if (a <= 1 || a >= p-1) {
        document.getElementById('message-box').value = "a - должно быть 1 < a < p - 1";
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error;
    }
    if (atest != 1) {
        document.getElementById('message-box').value = "a - должно быть (a**q)modp == 1";
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error;
    }
    
    if (crtype) {
        [r, s] = G94Sign(phrase, p, q, a, x, p);
        y = G94PowMod(a, x, p);
        document.getElementById('EY').value = y;
        document.getElementById('DY').value = y;

        document.getElementById('DR').value = r;
        document.getElementById('DS').value = s;
     
        return `[${r}, ${s}]`
    } else {
        // let check = G94SignCheck(phrase, p, q, a, y, r, s, 11);
        return check = G94SignCheck(phrase, p, q, a, y, r, s, p);
    }
}


// функции взаимодействия с интерфейсом
function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    let EP = Number(document.getElementById('EP').value); 
    let EQ = Number(document.getElementById('EQ').value);
    let EA = Number(document.getElementById('EA').value);
    let EX = Number(document.getElementById('EX').value);

    let encryptedText = G94PrepairePhrase(text, EP, EQ, EA, EX, 0, 0, 0, true);
    document.getElementById('result').value = encryptedText;
    document.getElementById('message-box').value = 'Подпись сгенерирована'
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    let EP = Number(document.getElementById('EP').value); 
    let EQ = Number(document.getElementById('EQ').value);
    let EA = Number(document.getElementById('EA').value);
    let EX = Number(document.getElementById('EX').value);
    let DY = Number(document.getElementById('DY').value);
    let DR = Number(document.getElementById('DR').value);
    let DS = Number(document.getElementById('DS').value);

    if (G94PrepairePhrase(text, EP, EQ, EA, EX, DY, DR, DS, false)) {
        document.getElementById('result').value = "Подпись верна";
    } else {
        document.getElementById('result').value = "Подпись не верна";
    }
    document.getElementById('message-box').removeAttribute('hidden');
}