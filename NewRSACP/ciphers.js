// Алфавиты
const lowAlphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
const upAlphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
// const allAlphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

// Переменные для замены знаков
const zpt = ",";
const zptRep = "зпт";
const tchk = ".";
const tchkRep = "тчк";
const tire = "-";
const tireRep = "тире";
const prob = " ";
const probRep = "прб";

// Состояние, какая страница активна
const state = {
    activeNvBar: document.querySelector('#srsaPage'),
    activeSection: document.querySelector('#srsa')
};

const matr = {
    matrSize: 3,
    matrActiveEn: "tableEn3",
    matrActiveDe: "tableDe3"
};

// Функция замены знаков на буквы
function markToChar(str) {
    str = str.replaceAll(zpt, zptRep);
    str = str.replaceAll(tchk, tchkRep);
    str = str.replaceAll(tire, tireRep);
    return str;
};

// Функция замены букв на знаки
function charToMark(str) {
    str = str.replaceAll(zptRep, zpt);
    str = str.replaceAll(tchkRep, tchk);
    str = str.replaceAll(tireRep, tire);
    return str;
};

// Функция удаления пробелов в тексте
function spaceWithout(str) {
    str = str.split(' ').join('');
    return str;
};

// Функция замены пробелов на буквы
function spaceWithStart(str) {
    str = str.split(' ').join("прб");
    return str;
};

// Функция замены букв на пробелы
function spaceWithEnd(str) {
    str = str.split("прб").join(' ');
    return str;
};

// Функция удаления одинаковых символов и пробелов из текста
function strToSet(str) {
    let newStr = String(str).toLocaleLowerCase();
    newStr = ((Array.from(new Set(newStr.split("")))).join("")).split(" ").join("");
    newStr = markToChar(newStr);
    return newStr;
};

//
// ЦП RSA
//
function SRsaSquareHash(phrase, modula) {
    let hi = 0;
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    Array.from(phrase).forEach(letter => {
        let index = alphabet.indexOf(letter) + 1;
        hi = Math.pow((hi + index), 2) % modula;
    });
    return hi;
}

function SRsaSign(phrase, p, q, d) {
    let m = SRsaSquareHash(phrase, p);
    let result = RsaPowMod(m, d, p*q);
    return result;
}

function SRsaSignCheck(phrase, p, q, e, s) {
    let m = SRsaSquareHash(phrase, p);
    let ms = RsaPowMod(s, e, p*q);
    return m == ms;
}

function SRsaPreparePhrase(phrase, p, q, e, s, crtype) {
    if (crtype) {
        phrase = markToChar(phrase).toLocaleLowerCase();
        let ptest = RsaPrime(p);
        let qtest = RsaPrime(q);
        if (ptest.length != 0) {
            return 'p - должно быть простым числом';
        }
        if (qtest.length != 0) {
            return 'q - должно быть простым числом';
        }

        let eiler = (p - 1) * (q - 1);
        let d = RsaGenKey(eiler, e);

        document.getElementById('srsaEnN').value = p*q;
        document.getElementById('srsaEnFN').value = eiler;
        if (!RsaCoprimes(eiler, e)) {
            return 'e - дожно быть взаимнопростым с функцией эйлера от n и меньше ее';
        }

        let signS = SRsaSign(phrase, p, q, d);
        document.getElementById('srsaDeS').value = signS;
        return signS;

    } else {
        phrase = markToChar(phrase).toLocaleLowerCase();
        let ptest = RsaPrime(p);
        let qtest = RsaPrime(q);
        if (ptest.length != 0) {
            return 'p - должно быть простым числом';
        }
        if (qtest.length != 0) {
            return 'q - должно быть простым числом';
        }

        let eiler = (p - 1) * (q - 1);

        document.getElementById('srsaDeN').value = p*q;
        document.getElementById('srsaDeFN').value = eiler;
        if (!RsaCoprimes(eiler, e)) {
            return 'e - дожно быть взаимнопростым с функцией эйлера от n и меньше ее';
        }

        let check = SRsaSignCheck(phrase, p, q, e, s);

        if (check) {
            return 'Цифровая подпись верна';
        } else {
            return 'Цифровая подпись НЕ верна'
        }
    }
}

function fillSRsaEn() {
    let text = document.querySelector('#srsaEnArea').value;
    let enP = Number(document.querySelector('#srsaEnP').value);
    let enQ = Number(document.querySelector('#srsaEnQ').value);
    let enE = Number(document.querySelector('#srsaEnE').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = SRsaPreparePhrase(newText, enP, enQ, enE, 0, true);

    document.getElementById('srsaAfterEn').value = newText;
};

function fillSRsaDe() {
    let text = document.querySelector('#srsaDeArea').value;
    let deP = Number(document.querySelector('#srsaDeP').value);
    let deQ = Number(document.querySelector('#srsaDeQ').value); 
    let deE = Number(document.querySelector('#srsaDeE').value);
    let deS = Number(document.querySelector('#srsaDeS').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = SRsaPreparePhrase(newText, deP, deQ, deE, deS, false);

    document.getElementById('srsaAfterDe').value = newText;
};

//
// ГОСТ Р 34.10-94
//
function G94SquareHash(phrase, modula) {
    let hi = 0;
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    Array.from(phrase).forEach(letter => {
        let index = alphabet.indexOf(letter) + 1;
        hi = Math.pow((hi + index), 2) % modula;
    });
    return hi;
}

function G94PowMod(number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modula;
    }
    return result;
}

function G94Modd(x, p) {
    return ((x % p) + p) % p;
}

function G94Sign(phrase, p, q, a, x, modula) {
    let h = G94SquareHash(phrase, modula);
    let k = Math.floor(Math.random() * (q - 2) + 2);
    // let k = 11;
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

function G94PreparePhrase(phrase, p, q, a, x, y, r, s, crtype) {
    if (crtype) {
        phrase = markToChar(phrase).toLocaleLowerCase();
        let ptest = ElgPrime(p);
        let atest = G94PowMod(a, q, p);
        if (p <= 32) {
            return 'p - должно быть больше длины алфавита';
        }
        if (ptest.length != 0) {
            return 'p - должно быть простым числом';
        }
        if (a <= 1 || a >= p-1) {
            return 'a - должно быть 1 < a < p - 1';
        }
        if (atest != 1) {
            return 'a - должно быть (a**q)modp == 1';
        }
        if (q <= 1) {
            return 'q - Должно быть q > 1'
        }
        if (x <= 1) {
            return 'x - Должно быть x > 1'
        }
        // для теста
         [r, s] = G94Sign(phrase, p, q, a, x, 11);
        //[r, s] = G94Sign(phrase, p, q, a, x, p);

        y = G94PowMod(a, x, p);
        document.getElementById('g94EnY').value = y;
        document.getElementById('g94DeY').value = y;

        document.getElementById('g94DeR').value = r;
        document.getElementById('g94DeS').value = s;
     
        return `[${r}, ${s}]`

    } else {
        phrase = markToChar(phrase).toLocaleLowerCase();
        let ptest = ElgPrime(p);
        let atest = G94PowMod(a, q, p);
        if (p <= 32) {
            return 'p - должно быть больше длины алфавита';
        }
        if (ptest.length != 0) {
            return 'p - должно быть простым числом';
        }
        if (a <= 1 || a >= p-1) {
            return 'a - должно быть 1 < a < p - 1';
        }
        if (atest != 1) {
            return 'a - должно быть (a**q)modp == 1';
        }
        if (q <= 1) {
            return 'q - Должно быть q > 1'
        }
        if (y <= 1) {
            return 'y - Должно быть y > 1'
        }
        if (r <= 1) {
            return 'r - Должно быть r > 1'
        }
        if (s <= 1) {
            return 's - Должно быть s > 1'
        }
        

        // let check = G94SignCheck(phrase, p, q, a, y, r, s, 11);
        let check = G94SignCheck(phrase, p, q, a, y, r, s, p);

        if (check) {
            return 'Цифровая подпись верна';
        } else {
            return 'Цифровая подпись НЕ верна'
        }
    }
}

function fillG94En() {
    let text = document.querySelector('#g94EnArea').value;
    let enP = Number(document.querySelector('#g94EnP').value);
    let enQ = Number(document.querySelector('#g94EnQ').value);
    let enA = Number(document.querySelector('#g94EnA').value);
    let enX = Number(document.querySelector('#g94EnX').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = G94PreparePhrase(newText, enP, enQ, enA, enX, 0, 0, 0, true);

    document.getElementById('g94AfterEn').value = newText;
};

function fillG94De() {
    let text = document.querySelector('#g94DeArea').value;
    let deP = Number(document.querySelector('#g94DeP').value);
    let deQ = Number(document.querySelector('#g94DeQ').value); 
    let deA = Number(document.querySelector('#g94DeA').value);
    let deY = Number(document.querySelector('#g94DeY').value);
    let deR = Number(document.querySelector('#g94DeR').value);
    let deS = Number(document.querySelector('#g94DeS').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = G94PreparePhrase(newText, deP, deQ, deA, 0, deY, deR, deS, false);

    document.getElementById('g94AfterDe').value = newText;
};

//
// Diffie–Hellman
//
const DH = {
    a: 0,
    n: 0,
    y: 0,
    k: 0
}

function DHPowMod(number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modula;
    }
    return result;
}

function DHGenY(a, n) {
    let k = Math.floor(Math.random() * (n - 2) + 2);
    // let k = 4;
    let y = DHPowMod(a, k, n);
    return [y, k];
}

function DHCheck(y, k, n) {
    let kb = DHPowMod(y, k, n);
    return kb;
}

function fillDhEn() {
    let enA = Number(document.querySelector('#dhEnA').value);
    let enN = Number(document.querySelector('#dhEnN').value);
    let enK = Number(document.querySelector('#dhEnK').value);

    if (enA <= 1 || enN <= 1) {
        document.querySelector('#dhYArea').value = 'a и n должны быть больше 1';
    }
    if (enA >= enN) {
        document.querySelector('#dhYArea').value = 'a - должно быть 1 < a < n';
    }

    let enY = DHPowMod(enA, enK, enN);
    document.querySelector('#dhEnY').value = enY;

    DH.a = enA;
    DH.n = enN;
    let temp2 = DHGenY(DH.a, DH.n);
    DH.y = temp2[0];
    DH.k = temp2[1]

    document.querySelector('#dhDeA').value = enA;
    document.querySelector('#dhDeN').value = enN;
    document.querySelector('#dhDeY').value = DH.y;
}

function fillDhDe() {
    let deA = Number(document.querySelector('#dhDeA').value);
    let deN = Number(document.querySelector('#dhDeN').value);
    let deK = Number(document.querySelector('#dhEnK').value);
    let deY = Number(document.querySelector('#dhDeY').value);
    let enY = Number(document.querySelector('#dhEnY').value);

    if (deA <= 1 || deN <= 1) {
        document.querySelector('#dhKArea').value = 'a и n должны быть больше 1';
    }
    if (deA >= deN) {
        document.querySelector('#dhKArea').value = 'a - должно быть 1 < a < n';
    }

    let check1 = Number(DHCheck(deY, deK, deN));
    let check2 = Number(DHCheck(enY, DH.k, DH.n));

    if (check1 == check2) {
        document.querySelector('#dhKa').value = check1;
        document.querySelector('#dhKb').value = check2;
        document.querySelector('#dhAfterDe').value = 'Равенство выполняется';
    } else {
        document.querySelector('#dhAfterDe').value = 'Равенство НЕ выполняется';
    }   

    if (check1 == 1 && check2 == 1) {
        document.querySelector('#dhAfterDe').value = 'Общий секретный ключ НЕ должен быть равен 1. Создайте новые открытые ключи.';
    } 
}


//
//
//
// 


window.onload = () => {
    // События на кнопки
    document.querySelector('#srsaEnBtn').
        addEventListener('click', event => {
            fillSRsaEn();
        });
    document.querySelector('#srsaDeBtn').
        addEventListener('click', event => {
            fillSRsaDe();
        });
    document.querySelector('#g94EnBtn').
        addEventListener('click', event => {
            fillG94En();
        });
    document.querySelector('#g94DeBtn').
        addEventListener('click', event => {
            fillG94De();
        });
    document.querySelector('#dhEnYBtn').
        addEventListener('click', event => {
            fillDhEn();
        });
    document.querySelector('#dhDeKBtn').
        addEventListener('click', event => {
            fillDhDe();
        });

    //
    //
    
    // События на переключение страниц шифров
    document.querySelector('#srsaPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#srsa').classList.remove('hidden');
        state.activeSection = document.querySelector('#srsa');
    });
    document.querySelector('#g94Page').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#g94').classList.remove('hidden');
        state.activeSection = document.querySelector('#g94');
    });
    document.querySelector('#dhPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#dh').classList.remove('hidden');
        state.activeSection = document.querySelector('#dh');
    });

    //
    //

    // Отслеживание режима работы с пробелами


    // document.querySelector("#srsaSpaceType").addEventListener('click', event => {
    //     spaceTypes.srsaSpace = document.querySelector("#srsaSpaceType").checked;
    // });
    

};