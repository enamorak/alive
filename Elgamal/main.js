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

function ElgGcd(a, b) { 
    if (a == 0) 
        return b; 
    return ElgGcd(b % a, a); 
} 

class ElgGen {
    constructor(phi, count, elems) {
        this.phi = phi;
        this.count = count;
        this.elems = elems ? [...elems] : null;
        this.index = 0;
    }

    next() {
        if (this.count > 0) {
            let elem;
            if (this.elems) {
                elem = this.elems[this.index];
                this.index = (this.index + 1) % this.elems.length;
            } else {
                do {
                    elem = Math.floor(Math.random() * (this.phi - 2)) + 2;
                } while (ElgGcd(this.phi, elem) != 1);
            }
            this.count -= 1;
            return elem;
        } else {
            return null;
        }
    }
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

function ElgCoprimes(num1, num2) {
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

function ElgGetNumbers(phrase, len) {
    let result = []
    for (let i = 0; i < phrase.length; i += len) {
        result.push(Number(phrase.slice(i, i + len)));
    }
    return result
}

function ElgPowMod(number, power, modul) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modul;
    }
    return result;
}

function ElgToString(number, len) {
    return number.toString().padStart(len, '0');
}

function ElgValidate(p, g) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let alphabetLength = alphabet.length;
    if (p <= alphabetLength) {
        throw new Error("InvalidIndex");
    }
    if (g >= p || g === 1) {
        throw new Error("InvalidIndex");
    }
}

function ElgValidateDec(phrase, x, p) {
    let alphabet = "0123456789";
    let len = p.toString().length;
    if (x >= p || x === 1) {
        throw new Error("x должно быть меньше p");
    }
    if (phrase.length % (len * 2) !== 0) {
        throw new Error("InvalidTextError");
    }
    let result = ElgGetNumbers(phrase, len)
        .map((_, i, arr) => i % 2 === 0 ? [arr[i], arr[i + 1]] : null)
        .filter(pair => pair);
    for (const [ai, bi] of result) {
        if (ai >= p || bi >= p) {
            throw new Error("InvalidTextError");
        }
    }
    return result;
}

function ElgCreateKeys(p, q) {
    let result = []
    let eiler = p - 1;
    while (result.length != q) {
        let rand = Math.floor(Math.random() * (eiler - 2) + 2);
        if (ElgCoprimes(eiler, rand)) {
            result.push(rand)
        }
    }

    return result
}

// длина текста - 2496, p = 2579, g = 71, y = 1200, x = 23
function ElgEncrypt(phrase, p, g, y, r) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    ElgValidate(p, g);
    let phi = p - 1;
    let len = p.toString().length;
    let gen = new ElgGen(phi, phrase.length, r);
    let result = '';
    for (const mi of phrase) {
        const ki = gen.next();
        const ai = ElgPowMod(g, ki, p);
        const bi = (ElgPowMod(y, ki, p) * (alphabet.indexOf(mi) + 1)) % p;
        result += ElgToString(ai, len) + ElgToString(bi, len);
    }
    return result;
}

function ElgDecrypt(phrase, p, x) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let validatedPhrase = ElgValidateDec(phrase, x, p);
    let buffer = validatedPhrase.map(([ai, bi]) => {
        return (bi * ElgPowMod(ElgPowMod(ai, x, p), p - 2, p)) % p - 1;
    });
    let result = '';
    for (const num of buffer) {
        result += alphabet[num];
    }
    return result;
}

function ElgPrepairPhrase(text, p, g, y, x, typecr) {
    if (typecr) {
        let newText = pointToText(text).toLocaleLowerCase();
        let lenText = newText.length;
        let ptest = ElgPrime(p);

        if (p <= 32) { //p <= lenText
            document.getElementById('message-text').innerText =  'p - должно быть больше длины алфавита';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
        if (ptest.length != 0) {
            document.getElementById('message-text').innerText =  'p - должно быть простым числом';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
        if (g <= 1 || g >= p) {
            document.getElementById('message-text').innerText =  'g - должно быть 1 < g < p';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
        console.log(newText.length)
        let keys = ElgCreateKeys(p, newText.length);
        // return ElgEncrypt(newText, p, g, [3,5,7]) // Для теста на своей фразе
        return ElgEncrypt(newText, p, g, y, keys)

    } else {
        let ptest = ElgPrime(p);

        if (ptest.length != 0) {
            document.getElementById('message-text').innerText =  'p - должно быть простым числом';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
        if (x <= 1 || x >= p) {
            document.getElementById('message-text').innerText =  'x - должно быть 1 < x < p';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }

        let newText = textToPoint(ElgDecrypt(text, p, x));
        return newText;
    }
}

function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;
    let enP = Number(document.getElementById('P').value); 
    let enG = Number(document.getElementById('G').value);
    let deX = Number(document.getElementById('X').value);
    let enY = ElgPowMod(enG, deX, enP);

    document.getElementById('Y').value = enY;

    let encryptedText = ElgPrepairPhrase(text, enP, enG, enY, 0, true);

    document.getElementById('result').value = encryptedText;
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    let enP = Number(document.getElementById('P').value); 
    let deX = Number(document.getElementById('X').value);

    let decryptedText =  ElgPrepairPhrase(text, enP, 0, 0, deX, false);

    document.getElementById('result').value = decryptedText;
    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}