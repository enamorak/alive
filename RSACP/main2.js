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
    activeNvBar: document.querySelector('#atbashPage'),
    activeSection: document.querySelector('#atbash')
};

// Состояние использования пробелов в тексте
const spaceTypes = {
    atbashSpace: false,
    caesarSpace: false,
    polibiSpace: false,
    tritemSpace: false,
    belazoSpace: false,
    vishenerSpace: false,
    sblokSpace: false,
    matrSpace: false,
    playfairSpace: false,
    vertSpace: false,
    cardanoSpace: false,
    festSpace: false,
    shenSpace: false,
    gamSpace: false,
    magmaSpace: false,
    aesSpace: false,
    kuzSpace: false,
    rsaSpace: false,
    elgSpace: false,
    eccSpace: false,

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
//
//
//

//
// Шифр АТБАШ
//
function Atbash(str) {
    let newStr = "";
    str = markToChar(str);

    for (let i = 0; i < str.length; i++) {
        if (lowAlphabet.indexOf(str[i]) != -1){
            let numChar = lowAlphabet.indexOf(str[i]);
            newStr += lowAlphabet[lowAlphabet.length - 1 - numChar];
        } else if (upAlphabet.indexOf(str[i]) != -1) {
            let numChar = upAlphabet.indexOf(str[i]);
            newStr += upAlphabet[upAlphabet.length - 1 - numChar];
        } else {
            newStr += " ";
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function fillAtbashEn() {
    let text = document.querySelector('#atbashEnArea').value;
    let newText = "";
    if (spaceTypes.atbashSpace) {
        newText = spaceWithStart(text);
        newText = Atbash(newText);
    } else {
        newText = spaceWithout(text);
        newText = Atbash(newText);
    }
    document.getElementById('atbashAfterEn').value = newText;
};

function fillAtbashDe() {
    let text = document.querySelector('#atbashDeArea').value;
    let newText = "";
    if (spaceTypes.atbashSpace) {
        newText = Atbash(text);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = Atbash(newText);
    }
    document.getElementById('atbashAfterDe').value = newText;
};


//
// Шифр Цезаря
//
function caesarEncrypt(str, key) {
    let newStr = "";
    str =  markToChar(str);
    if ((key % lowAlphabet.length) == 0) {
        newStr = "Error: ключ не должен быть кратен алфавиту!";
    } else {
        for (let i = 0; i < str.length; i++) {
            if (lowAlphabet.indexOf(str[i]) != -1){
                let newIndex = (lowAlphabet.indexOf(str[i]) + key) % lowAlphabet.length;
                newStr += lowAlphabet[newIndex];
            } else if (upAlphabet.indexOf(str[i]) != -1) {
                let newIndex = (upAlphabet.indexOf(str[i]) + key) % upAlphabet.length;
                newStr += upAlphabet[newIndex];
            } else {
                newStr += " ";
            }
        }
    }
    newStr = charToMark(newStr);
    return newStr;
};

function caesarDecrypt(str, key) {
    let newStr = "";
    str = markToChar(str);

    if ((key % lowAlphabet.length) == 0) {
        newStr = "Error: ключ не должен быть кратен алфавиту!";
    } else {
        for (let i = 0; i < str.length; i++) {
            if (lowAlphabet.indexOf(str[i]) != -1) {
                let newIndex = (lowAlphabet.indexOf(str[i]) - 
                (key % lowAlphabet.length) + lowAlphabet.length) % lowAlphabet.length;
                newStr += lowAlphabet[newIndex];
            } else if (upAlphabet.indexOf(str[i]) != -1) {
                let newIndex = (upAlphabet.indexOf(str[i]) - 
                (key % upAlphabet.length) + upAlphabet.length) % upAlphabet.length;
                newStr += upAlphabet[newIndex];
            } else {
                newStr += " ";
            }    
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function fillCaesarEn() {
    let text = document.querySelector('#caesarEnArea').value;
    let keyEn = Number(document.querySelector("#caesarEnKey").value);
    let newText = "";
    if (spaceTypes.caesarSpace) {
        newText = spaceWithStart(text);
        newText = caesarEncrypt(newText, keyEn);
    } else {
        newText = spaceWithout(text);
        newText = caesarEncrypt(newText, keyEn);
    }
    document.getElementById('caesarAfterEn').value = newText;
};

function fillCaesarDe() {
    let text = document.querySelector('#caesarDeArea').value;
    let keyDe = Number(document.querySelector('#caesarDeKey').value);
    let newText = "";
    if (spaceTypes.caesarSpace) {
        newText = caesarDecrypt(text, keyDe);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = caesarDecrypt(newText, keyDe);
    }
    document.getElementById('caesarAfterDe').value = newText;
};


//
// Шифр Полибия
//
function polibiEncrypt(str, row, col) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if ((row > 9) || (col > 9)) {
        newStr = "Error: кол-во строк или столбцов не должно быть больше 9";
    } else if ((row * col) < lowAlphabet.length) {
        newStr = "Error: не хватает клеток таблиц для всего алфавита (32 буквы)";
    } else {
        for (let i = 0; i < str.length; i++) {
            if (lowAlphabet.indexOf(str[i]) != -1) {
                let tempIndex = lowAlphabet.indexOf(str[i]);
                newStr += String(`${(Math.floor(tempIndex/col)) + 1}${(tempIndex%col) + 1}`);
            }
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function polibiDecrypt(str, row, col) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if ((row > 9) || (col > 9)) {
        newStr = "Error: кол-во строк или столбцов не должно быть больше 9"
    } else if ((row * col) < lowAlphabet.length) {
        newStr = "Error: не хватает клеток таблиц для всего алфавита (32 буквы)"
    } else {
        for (let i = 0; i < str.length; i += 2) {
            let tempRow = Number(str[i]) - 1;
            let tempCol = Number(str[i + 1]) - 1;
            newStr += lowAlphabet[(col * tempRow) + tempCol]
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function fillPolibiEn() {
    let text = document.querySelector('#polibiEnArea').value;
    let enRow = Number(document.querySelector('#polibiEnRow').value); 
    let enCol = Number(document.querySelector('#polibiEnCol').value);
    let newText = "";
    if (spaceTypes.polibiSpace) {
        newText = spaceWithStart(text);
        newText = polibiEncrypt(newText, enRow, enCol);
    }else {
        newText = spaceWithout(text);
        newText = polibiEncrypt(newText, enRow, enCol);
    }
    document.getElementById('polibiAfterEn').value = newText;
};

function fillPolibiDe() {
    let text = document.querySelector('#polibiDeArea').value;
    let deRow = Number(document.querySelector('#polibiDeRow').value); 
    let deCol = Number(document.querySelector('#polibiDeCol').value);
    let newText = "";
    if (spaceTypes.polibiSpace) {
        newText = polibiDecrypt(text, deRow, deCol);
        newText = spaceWithEnd(newText);
    }else {
        newText = spaceWithout(text);
        newText = polibiDecrypt(newText, deRow, deCol);
    }
    document.getElementById('polibiAfterDe').value = newText;
};


//
// Шифр Тритемия
//
function tritemEncrypt(str) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    for (let i = 0; i < str.length; i++) {
        let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) + i) % lowAlphabet.length];
        newStr += temp;
    }
    newStr = charToMark(newStr);

    return newStr;
};

function tritemDecrypt(str) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    for (let i = 0; i < str.length; i++) {
        let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) - (i % lowAlphabet.length) + lowAlphabet.length) % lowAlphabet.length];
        newStr += temp;
    }
    newStr = charToMark(newStr);

    return newStr;
};

function fillTritemEn() {
    let text = document.querySelector('#tritemEnArea').value;
    let newText = "";
    if (spaceTypes.tritemSpace) {
        newText = spaceWithStart(text);
        newText = tritemEncrypt(newText);
    } else {
        newText = spaceWithout(text);
        newText = tritemEncrypt(newText);
    }
    document.getElementById('tritemAfterEn').value = newText;
};

function fillTritemDe() {
    let text = document.querySelector('#tritemDeArea').value;
    let newText = "";
    if (spaceTypes.tritemSpace) {
        newText = tritemDecrypt(text);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = tritemDecrypt(newText);
    }
    document.getElementById('tritemAfterDe').value = newText;
};


//
// Шифр Белазо
//
function belazoEncrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();
    key = String(key).toLocaleLowerCase();

    for (let i = 0; i < str.length; i += key.length) {
        for (let j = 0; j < key.length; j++) {
            if ((i + j) == str.length) {
                break;
            } else {
                let temp = lowAlphabet[(lowAlphabet.indexOf(str[i + j]) + lowAlphabet.indexOf(key[j])) % lowAlphabet.length];
                newStr += temp;
            }
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function belazoDecrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();
    key = String(key).toLocaleLowerCase();

    for (let i = 0; i < str.length; i += key.length) {
        for (let j = 0; j < key.length; j++) {
            if ((i + j) == str.length) {
                break;
            } else {
                let temp = lowAlphabet[(lowAlphabet.indexOf(str[i + j]) - lowAlphabet.indexOf(key[j]) + 
                    lowAlphabet.length) % lowAlphabet.length];
                newStr += temp;
            }
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function fillBelazoEn() {
    let text = document.querySelector('#belazoEnArea').value;
    let keyEn = document.querySelector('#belazoEnKey').value;
    let newText = "";
    if (spaceTypes.belazoSpace) {
        newText = spaceWithStart(text);
        newText = belazoEncrypt(newText, keyEn);
    } else {
        newText = spaceWithout(text);
        newText = belazoEncrypt(newText, keyEn);
    }
    document.getElementById('belazoAfterEn').value = newText;
};

function fillBelazoDe() {
    let text = document.querySelector('#belazoDeArea').value;
    let keyDe = document.querySelector('#belazoDeKey').value;
    let newText = "";
    if (spaceTypes.belazoSpace) {
        newText = belazoDecrypt(text, keyDe);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = belazoDecrypt(newText, keyDe);
    }
    document.getElementById('belazoAfterDe').value = newText;
};


//
// Шифр Виженера
//
function vishenerEncrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if (key.length != 1) {
        newStr = "Error: ключ должен быть одной буквой";
    } else {
        str = String(key).toLocaleLowerCase() + str;
        for (let i = 1; i < str.length; i++) {
            let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) + lowAlphabet.indexOf(str[i - 1])) % lowAlphabet.length]
            newStr += temp;
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function vishenerDecrypt(str, key) {
    let newStr = "";
    str = String(markToChar(str)).toLocaleLowerCase();

    if (key.length != 1) {
        newStr = "Error: ключ должен быть одной буквой";
    } else {
        str = String(key).toLocaleLowerCase() + str;
        newStr += lowAlphabet[(lowAlphabet.indexOf(str[1]) - lowAlphabet.indexOf(str[0]) + lowAlphabet.length) % lowAlphabet.length]
        for (let i = 2; i < str.length; i++) {
            let temp = lowAlphabet[(lowAlphabet.indexOf(str[i]) - lowAlphabet.indexOf(newStr[i - 2]) + lowAlphabet.length) % lowAlphabet.length]
            
            newStr += temp;
        }
    }
    newStr = charToMark(newStr);

    return newStr;
};

function fillVishenerEn() {
    let text = document.querySelector('#vishenerEnArea').value;
    let keyEn = document.querySelector('#vishenerEnKey').value;
    let newText = "";
    if (spaceTypes.vishenerSpace) {
        newText = spaceWithStart(text);
        newText = vishenerEncrypt(newText, keyEn);
    } else {
        newText = spaceWithout(text);
        newText = vishenerEncrypt(newText, keyEn);
    }
    document.getElementById('vishenerAfterEn').value = newText;
};

function fillVishenerDe() {
    let text = document.querySelector('#vishenerDeArea').value;
    let keyDe = document.querySelector('#vishenerDeKey').value;
    let newText = "";
    if (spaceTypes.vishenerSpace) {
        newText = vishenerDecrypt(text, keyDe);
        newText = spaceWithEnd(newText);
    } else {
        newText = spaceWithout(text);
        newText = vishenerDecrypt(newText, keyDe);
    }
    document.getElementById('vishenerAfterDe').value = newText;
};


//
// S-блок
//
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

function stringToUint8(str, border) {
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

function uint8ToString(data) {
    return new TextDecoder().decode(data);
}

function findIndexPTable(elem, row) {
    for (let i = 0; i < 16; i++) {
        if (elem === PTable[row][i]) return i;
    }
    return 0;
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

function stringToBytes(str) {
    let buffer = stringToUint8(str, 4);
    let result = "";

    for (let i = 0; i <= buffer.length - 4; i += 4) {
        let buffer4 = buffer.slice(i, i + 4);
        let encoded = sblock(buffer4);
        let hex = bytesToHex(encoded);
        result += hex;
    }

    return result;
}

function bytesToString(str) {
    let buffer = hexToBytes(str);

    for (let i = 0; i <= buffer.length - 4; i += 4) {
        let buffer4 = buffer.slice(i, i + 4);
        let decoded = sblockReverse(buffer4);
        for (let j = i; j < i + 4; j++) {
           buffer[j] = decoded[j - i];
        }
    }

    buffer = uint8ToString(buffer);
    return buffer;
}

function fillSblokEn() {
    let text = document.querySelector('#sblokEnArea').value;
    let newText = "";
    if (spaceTypes.sblokSpace) {
        newText = spaceWithStart(text);
        newText = String(markToChar(newText)).toLocaleLowerCase();
        newText = stringToBytes(newText);
    } else {
        newText = spaceWithStart(text);
        newText = String(markToChar(newText)).toLocaleLowerCase();
        newText = bytesToHex(sblock(hexToBytes(newText)));
    }
    document.getElementById('sblokAfterEn').value = newText;
};

function fillSblokDe() {
    let text = document.querySelector('#sblokDeArea').value;
    let newText = "";
    if (spaceTypes.sblokSpace) {
        newText = bytesToString(text);
        newText = String(charToMark(newText)).toLocaleLowerCase();
        newText = spaceWithEnd(newText);
    } else {
        newText = bytesToHex(sblockReverse(hexToBytes(text)));
        newText = String(charToMark(newText)).toLocaleLowerCase();
        newText = spaceWithEnd(newText);
    }
    document.getElementById('sblokAfterDe').value = newText;
};


//
// Матричный шифр
//

let matrShifrFlag = false;
function matrMult(a, b) {
    let aNumRows = a.length;
    let aNumCols = a[0].length;
    let bNumRows = b.length;
    let bNumCols = b[0].length;
    let arr = new Array(aNumRows);
    for (let r = 0; r < aNumRows; ++r) {
        arr[r] = new Array(bNumCols);
        for (let c = 0; c < bNumCols; ++c) {
            arr[r][c] = 0;
            for (let i = 0; i < aNumCols; ++i) {
                arr[r][c] += a[r][i] * b[i][c];
            }
        }
    }

    for (let r = 0; r < aNumRows; ++r){
        for (let c = 0; c < bNumCols; ++c) {
            arr[r][c] = Math.round(arr[r][c]);
        }
    }

    return arr;
}

function matrDeterminant(A) {
    let N = A.length
    let B = []
    let denom = 1
    let exchanges = 0;

    for (let i = 0; i < N; ++i) { 
        B[i] = [];
        for (let j = 0; j < N; ++j){
            B[i][j] = A[i][j];
        }
    }

    for (let i = 0; i < N-1; ++i) {
        let maxN = i, maxValue = Math.abs(B[i][i]);
        for (let j = i+1; j < N; ++j) { 
            let value = Math.abs(B[j][i]);
            if (value > maxValue) { 
                maxN = j; maxValue = value; 
            }
        }

        if (maxN > i) { 
            let temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
            ++exchanges;
        } else if (maxValue == 0) {
            return maxValue; 
        }

        let value1 = B[i][i];
        for (let j = i+1; j < N; ++j) { 
            let value2 = B[j][i];
            B[j][i] = 0;
            for (let k = i+1; k < N; ++k) {
                B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
            }
        }
        denom = value1;
    }

    if (exchanges % 2) {
        return -B[N-1][N-1];
    } else {
        return B[N-1][N-1];
    }
}

function matrAdjugate(A) {                                        
    let N = A.length
    let adjA = [];
    for (let i = 0; i < N; i++) { 
        adjA[i] = [];
        for (let j = 0; j < N; j++) { 
            let B = []
            let sign = ((i + j) % 2 == 0) ? 1 : -1;

            for (let m = 0; m < j; m++) { 
                B[m] = [];
                for (let n = 0; n < i; n++) { B[m][n] = A[m][n] };
                for (let n = i + 1; n < N; n++) { B[m][n-1] = A[m][n] };
            }

            for (let m = j+1; m < N; m++) { 
                B[m-1] = [];
                for (let n = 0; n < i; n++) { B[m-1][n] = A[m][n] };
                for (let n = i + 1; n < N; n++) { B[m-1][n-1] = A[m][n] };
            }

            adjA[i][j] = sign * matrDeterminant(B);
        }
    }
    return adjA;
}

function matrInverse(A) {   
    let det = matrDeterminant(A);
    if (det == 0) {
        matrShifrFlag = true;
        return A;
    } 
    let N = A.length
    A = matrAdjugate(A);
    for (let i = 0; i < N; i++) { 
        for (let j = 0; j < N; j++) {
            A[i][j] /= det;
        }  
    }
    return A;
}

function matrFromTableEn() {
    let mat = []
    for (let i = 0; i < matr.matrSize; i++) {
        let temp = []
        for (let j = 0; j < matr.matrSize;  j++) {
            temp.push(Number(document.querySelector(`#cellEn${matr.matrSize}${i}${j}`).childNodes[1].value));
        }
        mat.push(temp);
    }
    return mat;
}

function matrFromTableDe() {
    let mat = []
    for (let i = 0; i < matr.matrSize; i++) {
        let temp = []
        for (let j = 0; j < matr.matrSize;  j++) {
            temp.push(Number(document.querySelector(`#cellDe${matr.matrSize}${i}${j}`).childNodes[1].value));
        }
        mat.push(temp);
    }
    return mat;
}

function matrToTableDe() {
    let matrEn = matrFromTableEn();
    matrEn = matrInverse(matrEn);
    for (let i = 0; i < matr.matrSize; i++) {
        for (let j = 0; j < matr.matrSize;  j++) {
            document.querySelector(`#cellDe${matr.matrSize}${i}${j}`).childNodes[1].value = matrEn[i][j];
        }
    }
}

function stringToMatr(str) {
    str = String(markToChar(str)).toLocaleLowerCase();
    let mat = [];
    for (let i = 0; i < str.length; i++) {
        let temp = [];
        temp.push(lowAlphabet.indexOf(str[i]) + 1);
        mat.push(temp);
    }

    if (mat.length % matr.matrSize != 0) {
        let count = matr.matrSize - (mat.length % matr.matrSize)
        for (let j = 0; j < count; ++j) {
            mat.push([33])
        }
    }
    let newMat = []
    let matrEn = matrFromTableEn();
    let matrBySize = [];
    for (let i = 0; i < mat.length; i += Number(matr.matrSize)) {
        matrBySize = [];
        
        for (let k = 0; k < matr.matrSize; k++) {
            matrBySize.push(mat[Number(i) + Number(k)]);
        }
        let tempMatr = matrMult(matrEn, matrBySize);
        for (let j = 0; j < tempMatr.length; j++) {
            newMat.push(tempMatr[j]);
        }
    }

    return newMat;
}

function matrToString(mat) {
    let newMat = []
    let matrDe = matrFromTableDe();
    for (let i = 0; i < mat.length; i += Number(matr.matrSize)) {

        let matrBySize = []
        for (let k = 0; k < matr.matrSize; k++) {
            matrBySize.push(mat[Number(i) + Number(k)]);
        }

        let tempMatr = matrMult(matrDe, matrBySize);
        for (let j = 0; j < tempMatr.length; j++) {
            newMat.push(tempMatr[j])
        }
    }

    let str = "";
    for (let i = 0; i < newMat.length; i++) {
        if (newMat[i] != 33) {
            str += lowAlphabet[newMat[i] - 1]
        }
    }
    str = charToMark(str)

    return str;
}

function fillMatrEn() {
    matrToTableDe();
    let text = document.querySelector('#matrEnArea').value;
    let newText = "";
    if (spaceTypes.matrSpace) {
        newText = spaceWithStart(text);
        newText = stringToMatr(newText);
    } else {
        newText = spaceWithout(text);
        newText = stringToMatr(newText);
    }
    if (matrShifrFlag) {
        document.getElementById('matrAfterEn').value = "Матрица имеет дискриминант 0";
        matrShifrFlag = false;
    } else {
        document.getElementById('matrAfterEn').value = newText;
    }
};

function fillMatrDe() {
    let text = document.querySelector('#matrDeArea').value;
    let newText = [];
    text = text.split(",");
    for (let i = 0; i < text.length; i++) {
        newText.push([Number(text[i])]);
    }

    if (spaceTypes.matrSpace) {
        newText = matrToString(newText);
        newText = spaceWithEnd(newText);
    } else {
        newText = matrToString(newText);
        newText = spaceWithout(newText);
    }
    document.getElementById('matrAfterDe').value = newText;

};


//
// Шифр Плэйфера
//
const fairplay = {
    rows: 5,
    cols: 6,
    tableKey:   [
                ["а", "р", "б", "у", "з", "в"],
                ["г", "д", "е", "ж", "и", "к"],
                ["л", "м", "н", "о", "п", "с"],
                ["т", "ф", "х", "ц", "ч", "ш"],
                ["щ", "ь", "ы", "э", "ю", "я"]
                ],
    playAlphabet: "абвгдежзиклмнопрстуфхцчшщьыэюя"
};

function playfairCoord(xCoord, yCoord){
    return fairplay.tableKey[Number(xCoord)][Number(yCoord)];
}

function playfairReplace(str) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "й") { newStr += "и" }
        else if (str[i] == "ъ") { newStr += "ь" }
        else if (str[i] == "ё") { newStr += "е" }
        else { newStr += str[i] }
    }
    return newStr;
}

function playfairTableKey(str) {
    str = strToSet(str);
    let newStr = str;
    for (let m = 0; m < fairplay.playAlphabet.length; m++) {
        if (!newStr.includes(fairplay.playAlphabet[m])) {
            newStr += fairplay.playAlphabet[m];
        }
    }

    fairplay.tableKey = [];
    for (let i = 0; i < 5; i++) {
        fairplay.tableKey.push([]);
        for (let j = 0; j < 6; j++) {
            fairplay.tableKey[i].push(newStr[i * 6 + j])
        }
    }
}

function playfairEncrypt(str){
	let newStr = "";
	let x1, y1, x2, y2;
    // let teststr = playfairReplace(String(markToChar(str)).toLocaleLowerCase());
    // if (str.length != teststr.length) {
        
    //     newStr = "Ключ не должен содержать одинаковые буквы";
    //     return newStr;
    // }
    str = playfairReplace(String(markToChar(str)).toLocaleLowerCase());
    if (str.length % 2 == 1) {
        str += "прб";
    }
    let strLen = str.length;

	for (let k = 0; k < strLen; k += 2){
        x1 = -1, x2 = -1, y1 = -1, y2 = -1;
        for (let i = 0; i < fairplay.rows; i++) {
            for (let j = 0; j < fairplay.cols; j++) {
                if (x1 == -1) {
                    if (str[k] == fairplay.tableKey[i][j]) {
                        x1 = i, y1 = j;
                    }
                }
                if (x2 == -1) {
                    if (str[k + 1] == fairplay.tableKey[i][j]) {
                        x2 = i, y2 = j;
                    }
                }
            }
        }

        // Если имеют одинаковую строку сместить вправо
		if (x1 == x2){
			y1 += 1; y1 %= fairplay.cols;
			newStr += playfairCoord(x1, y1);
			y2 += 1; y2 %= fairplay.cols;
			newStr += playfairCoord(x2, y2);
        // Если имеют одинаковый столбик смесстить вниз
		} else if (y1 == y2){
			x1 += 1; x1 %= fairplay.rows;
			newStr += playfairCoord(x1, y1);
			x2 += 1; x2 %= fairplay.rows;
			newStr += playfairCoord(x2, y2);
        // Смена по углам
		} else {
			newStr += playfairCoord(x1, y2);			
			newStr += playfairCoord(x2, y1);
		}
	}
	
	return newStr;
}

function playfairDecrypt(str){
	let newStr = "";
	let strLen = str.length;
	let x1, y1, x2, y2;
	
	for (let k = 0; k < strLen; k += 2) {
		x1 = -1, x2 = -1, y1 = -1, y2 = -1;
        for (let i = 0; i < fairplay.rows; i++) {
            for (let j = 0; j < fairplay.cols; j++) {
                if (x1 == -1) {
                    if (str[k] == fairplay.tableKey[i][j]) {
                        x1 = i, y1 = j;
                    }
                }
                if (x2 == -1) {
                    if (str[k + 1] == fairplay.tableKey[i][j]) {
                        x2 = i, y2 = j;
                    }
                }
            }
        }
		
		// Если имеют одинаковую строку сместить влево
		if (x1 == x2){
			if (y1 > 0) {
				y1--;
			} else {
				y1 = fairplay.cols - 1;
			}
			newStr += playfairCoord(x1, y1);

			if (y2 > 0) {
				y2--;
			} else {
				y2 = fairplay.cols - 1;
			}
			newStr += playfairCoord(x2, y2);
		// Если имеют одинаковый столбик сместить вверх
		} else if (y1 == y2){
			
			if (x1 > 0) {
				x1--;
			} else {
				x1 = fairplay.rows - 1;
			}
			newStr += playfairCoord(x1, y1);

			if(x2 > 0){
				x2--;
			} else {
				x2 = fairplay.rows - 1;
			}
			newStr += playfairCoord(x2, y2);
		// Смена по углам
		} else {
			newStr += playfairCoord(x1, y2);
			newStr += playfairCoord(x2, y1); 
		}
	}
    newStr = charToMark(newStr);
    newStr = newStr.replaceAll(probRep, prob);
	
	return newStr;
}

function fillPlayfairEn() {
    let text = document.querySelector('#playfairEnArea').value;
    let key = document.querySelector("#playfairEnKey").value;
    let testKey = strToSet(key);
    let newText = "";

    if (testKey != key.toLocaleLowerCase()) {
        newText = "Ключ не должен иметь одинаковые символы";
    } else {
        playfairTableKey(key);

        if (spaceTypes.playfairSpace) {
            newText = spaceWithStart(text);
            newText = playfairEncrypt(newText);
        } else {
            newText = spaceWithout(text);
            newText = playfairEncrypt(newText);
        }
    }
    
    document.getElementById('playfairAfterEn').value = newText;
};

function fillPlayfairDe() {
    let text = document.querySelector('#playfairDeArea').value;
    let key = document.querySelector("#playfairDeKey").value;
    let testKey = strToSet(key);
    let newText = ""
    if (testKey != key.toLocaleLowerCase()) {
        newText = "Ключ не должен иметь одинаковые символы";
    } else {
        if (spaceTypes.playfairSpace) {
            newText = playfairDecrypt(text);
            newText = spaceWithEnd(newText);
        } else {
            newText = playfairDecrypt(text);
            newText = spaceWithout(newText);
        }
    }

    document.getElementById('playfairAfterDe').value = newText;
};


//
// Шифр Кардано
//
function cardanoEn(text) {
    text = markToChar(text.toLocaleLowerCase());
    const items = document.querySelectorAll(".itemCardano");
    let matrix1 = [];

    items.forEach(item => {
        if (item.checked) {
            matrix1.push(1);
        } else {
            matrix1.push(0);
        }
    });

    let matrix2 = new Array(matrix1.length);
    let matrix3 = new Array(matrix1.length);
    let matrix4 = new Array(matrix1.length);
    let matrLen = matrix1.length;

    for (let i = 0; i < matrLen / 2; i++) {
        let x = Math.floor(i / 10);
        let y = i % 10;
        matrix3[(5 - x) * 10 + y] = matrix1[i];
        matrix3[i] = matrix1[(5 - x) * 10 + y];
    }

    for (let i = 0 ; i < matrLen / 2; i++) {
        matrix2[i] = matrix1[matrLen - i - 1]
        matrix2[matrLen - i - 1] = matrix1[i];

        matrix4[i] = matrix3[matrLen - i - 1];
        matrix4[matrLen - i - 1] = matrix3[i];
    }

    for (let i = 0; i < matrLen; i++) {
        let tempMatr1 = Number(matrix1[i]);
        let tempMatr2 = Number(matrix2[i]);
        let tempMatr3 = Number(matrix3[i]);
        let tempMatr4 = Number(matrix4[i]);
        if ((tempMatr1 + tempMatr2 + tempMatr3 + tempMatr4) != 1) {
                let resultText = "Неправильная таблица, введите другую";
                return resultText;
            }
    }

    let textEn = "";
    let ans = new Array(6);
    for (let i = 0; i < 6; i++) {
        ans[i] = new Array(10);
    }

    for (let n = 0; n < text.length; n += 60) {
        let x = 0;

        for (let i = 0; i < matrLen; i++) {
            if (matrix1[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "о";
                }
            }
        }

        for (let i = 0; i < matrix2.length; i++) {
            if (matrix2[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "р";
                }
            }
        }

        for (let i = 0; i < matrix3.length; i++) {
            if (matrix3[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "е";
                }
            }
        }

        for (let i = 0; i < matrix4.length; i++) {
            if (matrix4[i] == 1) {
                if (n + x < text.length) {
                    ans[Math.floor(i / 10)][i % 10] = text[n + x];
                    x++;
                } else {
                    ans[Math.floor(i / 10)][i % 10] = "ъ";
                }
            }
        }

        for (let i = 0; i < ans.length; i++) {
            for (let j = 0; j < ans[i].length; j++) {
                textEn += ans[i][j];
            }
        }
    }

    return textEn;
}

function cardanoDe(text) {
    text = markToChar(text.toLocaleLowerCase());
    const items = document.querySelectorAll(".grid-item");
    let matrix1 = [];

    items.forEach(item => {
        if (item.checked) {
            matrix1.push(1);
        } else {
            matrix1.push(0);
        }
    });

    let matrix2 = new Array(matrix1.length);
    let matrix3 = new Array(matrix1.length);
    let matrix4 = new Array(matrix1.length);
    let matrLen = matrix1.length;

    for (let i = 0; i < matrLen / 2; i++) {
        let x = Math.floor(i / 10);
        let y = i % 10;
        matrix3[(5 - x) * 10 + y] = matrix1[i];
        matrix3[i] = matrix1[(5 - x) * 10 + y];
    }

    for (let i = 0 ; i < matrLen / 2; i++) {
        matrix2[i] = matrix1[matrLen - i - 1]
        matrix2[matrLen - i - 1] = matrix1[i];

        matrix4[i] = matrix3[matrLen - i - 1];
        matrix4[matrLen - i - 1] = matrix3[i];
    }

    for (let i = 0; i < matrLen; i++) {
        let tempMatr1 = Number(matrix1[i]);
        let tempMatr2 = Number(matrix2[i]);
        let tempMatr3 = Number(matrix3[i]);
        let tempMatr4 = Number(matrix4[i]);
        if ((tempMatr1 + tempMatr2 + tempMatr3 + tempMatr4) != 1) {
                let resultText = "Неправильная таблица, введите другую";
                return resultText;
            }
    }

    let textDe = "";
    let ans = new Array(6);
    for (let i = 0; i < 6; i++) {
        ans[i] = new Array(10);
    }

    for (let n = 0; n < text.length; n += 60) {
        let x = 0;

        for (let i = 0; i < matrLen; i++) {
            ans[Math.floor(i / 10)][i % 10] = text[n + i];
        }

        for (let i = 0; i < matrLen; i++) {
            if (matrix1[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }

        for (let i = 0; i < matrix2.length; i++) {
            if (matrix2[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }

        for (let i = 0; i < matrix3.length; i++) {
            if (matrix3[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }

        for (let i = 0; i < matrix4.length; i++) {
            if (matrix4[i] == 1) {
                textDe += ans[Math.floor(i / 10)][i % 10];
            }
        }
    }

    textDe = charToMark(textDe);
    while (textDe[textDe.length - 1] != ".") {
        textDe = textDe.substring(0, textDe.length - 1);
    }
    
    return textDe;
}

function fillCardanoEn() {
    let text = document.querySelector('#cardanoEnArea').value;
    let newText = "";

    if (spaceTypes.cardanoSpace) {
        newText = spaceWithStart(text);
        newText = cardanoEn(newText);
    } else {
        newText = spaceWithout(text);
        newText = cardanoEn(newText);
    }
    
    document.getElementById('cardanoAfterEn').value = newText;
}

function fillCardanoDe() {
    let text = document.querySelector('#cardanoDeArea').value;
    let newText = ""

    if (spaceTypes.cardanoSpace) {
        newText = cardanoDe(text);
        newText = spaceWithEnd(newText);
    } else {
        newText = cardanoDe(text);
    }

    document.getElementById('cardanoAfterDe').value = newText;
}

function fillCardanoTable(){
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
            const gridItem = document.createElement('input');
            gridItem.setAttribute('type', 'checkbox');
            gridItem.classList.add('grid-item');
            gridItem.classList.add('itemCardano');
            document.querySelector("#cardanoTable").appendChild(gridItem);
        }
    }
}


//
// Шифр Вертикальной перестановки
//
function vertSort(order, data) {
    let i = 0;

    while (i < order.length) {
        if (order[i] - 1 === i) {
            i++;
            continue;
        }
        let index = order[i] - 1;
        data[i] = data.splice(index, 1, data[i])[0];
        order[i] = order.splice(index, 1, order[i])[0];
    }

    return data;
}

function vertGetOrder(alphabet, key) {
    let result = [];
    for (let i = 0; i < key.length; i++) {
        result.push(0);
    }

    let letterIndexes = [];
    for (let letter of key) {
        let pos = alphabet.indexOf(letter);
        letterIndexes.push(Number(pos));
    }

    let positions = letterIndexes.slice();
    positions.sort((a, b) => a - b);
    let i = 0;

    for (let position of positions) {
        while (letterIndexes.includes(position)) {
            let pos = letterIndexes.findIndex(x => x === position);

            if (result[pos] !== undefined) {
                result[pos] = i + 1;
            }
            if (letterIndexes[pos] !== undefined) {
                letterIndexes[pos] = alphabet.length;
            }
            i += 1;
        }
    }

    return result;
}

function vertRowsAndKeys(alphabet, phrase, key) {
    let phraseLen = phrase.length;
    let keys = vertGetOrder(alphabet, key);
    let rowO = Math.floor(phraseLen / keys.length);
    let row = (phraseLen % keys.length !== 0) ? rowO + 1 : rowO;
    return [keys, row];
}

function vertEmpty(keys, lastRow) {
    let result = [];
    for (let i = keys.length - 1; i >= keys.length - lastRow; i--) {
        result.push(keys[i]);
    }

    if (lastRow > 0) {
        result.sort();
        return result;
    } else {
        return null;
    }
}

function vertResult(alphabet, buffer, row, col) {
    let result = '';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let index = buffer[j][i];
            if (index !== -1) {
                result += alphabet[index];
            }
        }
    }
    return result;
}

function vertEncrypt(phrase, key) {
    let alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    phrase = String(markToChar(phrase)).toLocaleLowerCase();
    let [keys, row] = vertRowsAndKeys(alphabet, phrase, key);
    let buffer = [];
    let letter = phrase.split('');

    for (let i = 0; i < keys.length; i++) {
        buffer.push([]);
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < keys.length; j++) {
            let val = (letter.length > 0) ? alphabet.indexOf(letter.shift()) : -1;
            buffer[j].push(val);
        }
    }

    let keysCopy = [...keys];
    buffer = vertSort(keysCopy, buffer);
    return vertResult(alphabet, buffer, row, keys.length);
}

function vertCheckKeys(keys) {
    let result = [];

    for (let i = 0; i < keys.length; i++) {
        result.push(0);
    }

    for (let i = 0; i < keys.length; i++) {
        let elem = keys[i];
        let index = elem - 1;
        if (result[index] !== undefined) {
            result[index] = i + 1;
        } else {
            throw new Error("Ключ содержит неверные значения");
        }
    }

    return result;
}

function vertDecrypt(phrase, key) {
    const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    const [keys, row] = vertRowsAndKeys(alphabet, phrase, key);
    let buffer = [];
    let letter = phrase.split('');
    for (let i = 0; i < keys.length; i++) {
        buffer.push([]);
    }
    const empty_slots = vertEmpty(keys, row * keys.length - phrase.length);
    let k = 0;
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < keys.length; j++) {
            let elem = empty_slots?.[k];
            let val;
            if (i + 1 === row && elem !== null && elem - 1 === j) {
                k++;
                val = -1;
            } else {
                let nextLetter = letter.shift();
                val = nextLetter !== undefined ? alphabet.indexOf(nextLetter) : -1;
            }
            
            if (!buffer[j]) {
                buffer[j] = [];
            }
            buffer[j].push(val);
        }
    }

    buffer = vertSort(vertCheckKeys(keys), buffer);
    
    let result = vertResult(alphabet, buffer, row, keys.length);
    result = charToMark(result);
    return result;
}

function fillVertEn() {
    let text = document.querySelector('#vertEnArea').value;
    let key = document.querySelector("#vertEnKey").value;
    let testKey = strToSet(key);
    let newText = "";

    if (spaceTypes.vertSpace) {
        newText = spaceWithStart(text);
        newText = vertEncrypt(newText, key);
    } else {
        newText = spaceWithout(text);
        newText = vertEncrypt(newText, key);
    }
    
    document.getElementById('vertAfterEn').value = newText;
}

function fillVertDe() {
    let text = document.querySelector('#vertDeArea').value;
    let key = document.querySelector("#vertDeKey").value;
    let testKey = strToSet(key);
    let newText = ""

    if (spaceTypes.vertSpace) {
        newText = vertDecrypt(text, key);
        newText = spaceWithEnd(newText);
    } else {
        newText = vertDecrypt(text, key);
        newText = spaceWithout(newText);
    }

    document.getElementById('vertAfterDe').value = newText;
}

//
// Сеть Фейстеля
//
// массив из 4 в число для сложения
function festTo32(vec) {
    let out_data_32 = vec[0];
    out_data_32 = (out_data_32 << 8) + vec[1];
    out_data_32 = (out_data_32 << 8) + vec[2];
    out_data_32 = (out_data_32 << 8) + vec[3];
    return out_data_32
}

// наоборот из верхней
function festFrom32(num) {
    let result = [];
    result.push((num >> 24) & 0xff);
    result.push((num >> 16) & 0xff);
    result.push((num >> 8) & 0xff);
    result.push(num & 0xff);
    return result;
}

// Сложение двух двоичных векторов по модулю 32
function festAdd32(left, right) {
    let left_32 = festTo32(left);
    let right_32 = festTo32(right);
    let result_32 = ((left_32 + right_32) % 0x100000000) >>> 0;
    return festFrom32(result_32);
}

// Преобразование g
function gFest(a, key) {
    let internal = festAdd32(a, key);
    internal = sblock(internal);
    let result_32 = festTo32(internal);
    result_32 = ((result_32 << 11) | (result_32 >>> 21)) >>> 0;
    return festFrom32(result_32);
}

function festXor32(left, right) {
    return left.map((l, i) => l ^ right[i]);
}

// Развертывание ключей
function festExpandKey(key) {
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

// одна итерация
function festNetNode(left, right, key) {
    return [right, festXor32(left, gFest(right, key))];
}

// Разбиение G на меньшие подфункции
function festNet32(val, keys) {
    let left = val.slice(0, 4);
    let right = val.slice(4, 8);
    for (let key of keys) {
        let buffer = [...left];
        buffer.push(...right);
        [left, right] = festNetNode(left, right, key);
        // console.log(bytesToHex(left) + " " + bytesToHex(right));
    }
    let temp = right;
    right = left
    left = temp
    let result = [...left]
    result.push(...right);
    return result;
}

function festProto(phrase, keys) {
    phrase = hexToBytes(phrase);
    let result = "";
    for (let i = 0; i < phrase.length; i += 8) {
        let fragment = phrase.slice(i, i + 8);
        fragment = festNet32(fragment, keys);
        result += bytesToHex(fragment);
    }
    return result;
}

// festEncrypt("fedcba9876543210", "ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff")
function festEncrypt(phrase, key) {
    key = hexToBytes(key);
    let expandedKeys = festExpandKey(key);
    return festProto(phrase, expandedKeys);
}

function festDecrypt(phrase, key) {
    key = hexToBytes(key);
    let expandedKeys = festExpandKey(key);
    expandedKeys.reverse();
    return festProto(phrase, expandedKeys);
}

function festPrepairPhrase(phrase, key, cryptType) {
    if (cryptType) {
        phrase = markToChar(phrase).toLocaleLowerCase();

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
            let temp = festEncrypt(crypt_phrase, key);
            newPhrase += temp;
        }
        return newPhrase;
    } else {
        let newPhrase = "";
        let phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 16) {
            let crypt_phrase = phrase.slice(k, k + 16);
            let temp = festDecrypt(crypt_phrase, key);
            newPhrase += temp;
        }

        newPhrase = hexToBytes(newPhrase);
        newPhrase = new TextDecoder().decode(newPhrase);
        while (newPhrase[newPhrase.length - 1] == "ф") {
            newPhrase = newPhrase.substring(0, newPhrase.length - 1);
        }

        newPhrase = charToMark(newPhrase);
        return newPhrase;
    }
}

function fillFestEn() {
    let text = document.querySelector('#festEnArea').value;
    let key = document.querySelector("#festEnKey").value;
    let newText = "";

    if (spaceTypes.festSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = spaceWithStart(text);
            newText = festPrepairPhrase(newText, key, true);
        }
    } else {
        newText = spaceWithout(text);
        newText = bytesToHex(gFest(hexToBytes(newText), hexToBytes(key)));
    }
    
    document.getElementById('festAfterEn').value = newText;
}

function fillFestDe() {
    let text = document.querySelector('#festDeArea').value;
    let key = document.querySelector("#festDeKey").value;
    let newText = ""

    if (spaceTypes.festSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = festPrepairPhrase(text, key, false);
            newText = spaceWithEnd(newText);
        }
    } else {
        newText = "Без расшифровки g";
    }

    document.getElementById('festAfterDe').value = newText;
}


//
// Блокнот Шеннона
//
const shenState = {
    aEn: 5,
    cEn: 5,
    tEn: 3,

    aDe: 5,
    cDe: 5,
    tDe: 3,
    len: 32
}

function shenEncrypt(phrase) {
    const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    let newPhrase = "";
    phrase = markToChar(phrase).toLocaleLowerCase();

    for (let i = 0; i < phrase.length; i++) {
        let step =  (shenState.aEn * shenState.tEn + shenState.cEn) % shenState.len;
        shenState.tEn = step;
        let pos = (step + alphabet.indexOf(phrase[i])) % alphabet.length;
        newPhrase += alphabet[pos];
    }
    return newPhrase;
}

function shenDecrypt(phrase) {
    const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    let newPhrase = "";
    for (let i = 0; i < phrase.length; i++) {
        let step = (shenState.aDe * shenState.tDe + shenState.cDe) % shenState.len;
        shenState.tDe = step;
        let pos = (alphabet.indexOf(phrase[i]) - step + alphabet.length) % alphabet.length;
        newPhrase += alphabet[pos];
    }

    newPhrase = charToMark(newPhrase);
    return newPhrase;
}

function fillShenEn() {
    let text = document.querySelector('#shenEnArea').value;
    let newText = "";

    let keya = Number(document.querySelector('#shenEnKeya').value);
    let keyc = Number(document.querySelector('#shenEnKeyc').value);
    let keyt = Number(document.querySelector('#shenEnKeyt').value);

    shenState.aEn = keya;
    shenState.cEn = keyc;
    shenState.tEn = keyt;

    if ((keya<1) || (keyc<1) || (keyt<1) || (keya>32) || (keyc>32) || (keyt>32) || (keyc%2==0) || (keya%4!=1)) {
        if ((keya == 0) || (keya % 4 != 1) || (keya < 1) || (keya > 32)) {
            newText += "Остаток от деления a на 4 должен быть равен 1\n";
        }
        if ((keyc < 1) || (keyc % 2 == 0) || (keyc < 1) || (keyc > 32)) {
            newText += "c должно быть нечетным\n"
        }
        if ((keyt < 1) || (keyt > 32)) {
            newText += "t0 должно быть 1 < t0 < 32"
        }
    } else {
        if (spaceTypes.shenSpace) {
            newText = spaceWithStart(text);
            newText = shenEncrypt(newText);
        } else {
            newText = spaceWithout(text);
            newText = shenEncrypt(newText);
        }
    }
    
    document.getElementById('shenAfterEn').value = newText;
}

function fillShenDe() {
    let text = document.querySelector('#shenDeArea').value;
    let newText = "";

    let keya = Number(document.querySelector('#shenDeKeya').value);
    let keyc = Number(document.querySelector('#shenDeKeyc').value);
    let keyt = Number(document.querySelector('#shenDeKeyt').value);

    shenState.aDe = keya;
    shenState.cDe = keyc;
    shenState.tDe = keyt;

    if ((keya==0) || (keyc==0) || (keyt==0) || (keyt>32) || (keyc%2==0) || (keya%4!=1)) {
        if ((keya == 0) || (keya % 4 != 1)) {
            newText += "Остаток от деления a на 4 должен быть равен 1\n";
        }
        if ((keyc == 0) || (keyc % 2 == 0)) {
            newText += "c должно быть нечетным\n"
        }
        if ((keyt == 0) || (keyt > 32)) {
            newText += "t0 должно быть 1 < t0 < 32"
        }
    } else {
        if (spaceTypes.shenSpace) {
            newText = shenDecrypt(text);
            newText = spaceWithEnd(newText);
        } else {
            newText = spaceWithout(text);
            newText = shenDecrypt(newText);
        }
    }
    
    document.getElementById('shenAfterDe').value = newText;
}


//
// Гаммирование 
//
function gamAddXor(left, right) {
    return left.map((leftValue, index) => leftValue ^ right[index]);
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

function gamCtrMagma(phrase, initV, key) {
    let initVBytes = hexToBytes(initV, 4);
    let ctr = [...initVBytes, 0x00, 0x00, 0x00, 0x00];
    let keyBytes = hexToBytes(key, 32);
    let keys = festExpandKey(keyBytes);
    let gamma;
    let phraseBytes = hexToBytes(phrase, 8);
    let nullCount = nullLen(phraseBytes);
    let resultV = [];

    for (let i = 0; i < phraseBytes.length; i += 8) {
        let part = phraseBytes.slice(i, i + 8);
        gamma = festNet32(ctr, keys);
        ctr = gamCtr(ctr);
        resultV.push(...gamAddXor(part, gamma));
    }

    return bytesToHex(resultV.slice(0, resultV.length - nullCount));
}

function gamPrepairPhrase(phrase, iv, key, cryptType) {
    if (cryptType) {
        phrase = markToChar(phrase).toLocaleLowerCase();

        let phraseLen = phrase.length;
        if (phrase.length % 16 != 0) {
            for (let i = 0; i < 16 - (phraseLen % 16); i++) {
                phrase += 'ф';
            }
        }
        phrase = new TextEncoder().encode(phrase);
        phrase = bytesToHex(phrase);

        let newPhrase = ""
        phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 64) {
            let crypt_phrase = phrase.slice(k, k + 64);
            let temp = gamCtrMagma(crypt_phrase, iv, key);
            newPhrase += temp;
        }
        return newPhrase;
    } else {
        let newPhrase = "";
        let phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 64) {
            let crypt_phrase = phrase.slice(k, k + 64);
            let temp = gamCtrMagma(crypt_phrase, iv, key);
            newPhrase += temp;
        }

        newPhrase = hexToBytes(newPhrase);
        newPhrase = new TextDecoder().decode(newPhrase);
        while (newPhrase[newPhrase.length - 1] == "ф") {
            newPhrase = newPhrase.substring(0, newPhrase.length - 1);
        }

        newPhrase = charToMark(newPhrase);
        return newPhrase;
    }
}

function fillGamEn() {
    let text = document.querySelector('#gamEnArea').value;
    let key = document.querySelector("#gamEnKey").value;
    let iv = document.querySelector("#gamEnIv").value;
    let newText = "";

    if (spaceTypes.gamSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = spaceWithStart(text);
            newText = gamPrepairPhrase(newText, iv, key, true);
        }
    } else {
        newText = gamCtrMagma(text, iv, key);
    }
    
    document.getElementById('gamAfterEn').value = newText;
}

function fillGamDe() {
    let text = document.querySelector('#gamDeArea').value;
    let key = document.querySelector("#gamDeKey").value;
    let iv = document.querySelector("#gamDeIv").value;
    let newText = ""

    if (spaceTypes.gamSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = gamPrepairPhrase(text, iv, key, false);
            newText = spaceWithEnd(newText);
        }
    } else {
        newText = gamCtrMagma(text, iv, key);
    }

    document.getElementById('gamAfterDe').value = newText;
}


//
// A5/1
//
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

function A51parity(x) {
    x ^= x >> 16;
    x ^= x >> 8;
    x ^= x >> 4;
    x ^= x >> 2;
    x ^= x >> 1;
    return x & 1;
}

function A51clockone(reg, mask, taps) {
    let t = reg & taps;
    reg = (reg << 1) & mask;
    reg |= A51parity(t);
    return reg;
}

function A51majority() {
    let sum = A51parity(A51.R1 & A51.R1MID) + A51parity(A51.R2 & A51.R2MID) + A51parity(A51.R3 & A51.R3MID);
    return sum >= 2 ? 1 : 0;
}

function A51clock() {
    let maj = A51majority();
    if (((A51.R1 & A51.R1MID) != 0) == maj)
        A51.R1 = A51clockone(A51.R1, A51.R1MASK, A51.R1TAPS);
    if (((A51.R2 & A51.R2MID) != 0) == maj)
        A51.R2 = A51clockone(A51.R2, A51.R2MASK, A51.R2TAPS);
    if (((A51.R3 & A51.R3MID) != 0) == maj)
        A51.R3 = A51clockone(A51.R3, A51.R3MASK, A51.R3TAPS);
}

function A51clockallthree() {
    A51.R1 = A51clockone(A51.R1, A51.R1MASK, A51.R1TAPS);
    A51.R2 = A51clockone(A51.R2, A51.R2MASK, A51.R2TAPS);
    A51.R3 = A51clockone(A51.R3, A51.R3MASK, A51.R3TAPS);

}

function A51getBit() {
    return A51parity(A51.R1 & A51.R1OUT) ^ A51parity(A51.R2 & A51.R2OUT) ^ A51parity(A51.R3 & A51.R3OUT);
}

function A51keySetup(key, frame) {
    A51.R1 = A51.R2 = A51.R3 = 0;
    for (let i = 0; i < 64; i++) {
        A51clockallthree();
        let keyBit = (key[(i / 8) | 0] >> (i & 7)) & 1;
        A51.R1 ^= keyBit; A51.R2 ^= keyBit; A51.R3 ^= keyBit;
    }

    for (let i = 0; i < 22; i++) {
        A51clockallthree();
        let frameBit = (frame >> i) & 1;
        A51.R1 ^= frameBit; A51.R2 ^= frameBit; A51.R3 ^= frameBit;
    }

    for (let i = 0; i < 100; i++) {
        A51clock();
    }
}

function A51run(AtoBkeystream, BtoAkeystream) {
    for (let i = 0; i <= Math.floor(113 / 8); i++)
        AtoBkeystream[i] = BtoAkeystream[i] = 0;

    for (let i = 0; i < 114; i++) {
        A51clock();
        AtoBkeystream[Math.floor(i / 8)] |= A51getBit() << (7 - (i & 7));
    }

    for (let i = 0; i < 114; i++) {
        A51clock();
        BtoAkeystream[Math.floor(i / 8)] |= A51getBit() << (7 - (i & 7));
    }
}

function A51get_bits(number, ander, size) {
    let arr = []
    while (size > 0) {
        r = number & ander
        arr.push(r != 0 ? 1 : 0);
        ander >>= 1;
        size--;
    }
    return arr;
}

function A51split_gamma(gammas) {
    let spliters = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2];
    let res = []
    let val = 0;
    let len = 0;
    for (let gamma of gammas) {
        for (let [item, size] of gamma.map((it, i) => [it, spliters[i]])) {
            for (let bit of A51get_bits(item, 0xf0, size)) {
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

function A51get_gamma(key, text_length_bits) {
    let frame = 0x21;
    let result = [];
    let count = (text_length_bits / 114) | 0 + text_length_bits % 114 != 0 ? 1 : 0;
    let AtoB = new Array(15), BtoA = new Array(15);
    for (let i = 0; i < count; i++) {
        A51keySetup(key, frame);
        // console.log((A51.R1 >>> 0).toString(2), (A51.R2 >>> 0).toString(2), (A51.R3 >>> 0).toString(2))
        A51run(AtoB, BtoA);
        result.push([...AtoB]);
    }
    return result;
}

/**
 * @param phrase Побайтовое представление строки
 * @param key Байтовый массив из 8 элементов
 */
function A51encryption(phrase, key) {
    let gammas = A51get_gamma(key, phrase.length * 8);
    let gamma = A51split_gamma(gammas)
    let result = [];
    for (let i = 0; i < phrase.length; i++) {
        result.push(phrase[i] ^ gamma[i])
    }
    return result;
}

function fillA51En() {
    let text = document.querySelector('#a51EnArea').value;
    let key = document.querySelector("#a51EnKey").value;
    let newText = markToChar(text);
    newText = spaceWithStart(newText);
    newText = new TextEncoder().encode(newText);

    if (key.length != 16) {
        newText = "Неправильная длина ключа";
    } else {
        newText = bytesToHex(A51encryption(newText, hexToBytes(key)));
    }

    document.getElementById('a51AfterEn').value = newText;
}

function fillA51De() {
    let text = document.querySelector('#a51DeArea').value;
    let key = document.querySelector("#a51DeKey").value;
    let newText = hexToBytes(text);

    if (key.length != 16) {
        newText = "Неправильная длина ключа";
    } else {
        newText = A51encryption(newText, hexToBytes(key));
        newText = hexToBytes(bytesToHex(newText));
        newText = new TextDecoder().decode(newText);
        newText = charToMark(newText);
        newText = spaceWithEnd(newText);
    }

    document.getElementById('a51AfterDe').value = newText;
}


//
// A5/2
//
const A52 = {
    R1MASK: 0x07FFFF,
    R2MASK: 0x3FFFFF,
    R3MASK: 0x7FFFFF,
    R4MASK: 0x01FFFF,

    R4TAP1: 0x000400,
    R4TAP2: 0x000008,
    R4TAP3: 0x000080,

    R1TAPS: 0x072000,
    R2TAPS: 0x300000,
    R3TAPS: 0x700080,
    R4TAPS: 0x010800,
    R1: 0,
    R2: 0,
    R3: 0,
    R4: 0
}

function A52parity(x) {
    x ^= x >> 16;
    x ^= x >> 8;
    x ^= x >> 4;
    x ^= x >> 2;
    x ^= x >> 1;
    return x & 1;
}

function A52clockone(reg, mask, taps, loadedBit) {
    let t = reg & taps;
    reg = (reg << 1) & mask;
    reg |= A52parity(t);
    reg |= loadedBit;
    return reg;
}

function A52majority(w1, w2, w3) {

    let sum = (w1 != 0) + (w2 != 0) + (w3 != 0);
    // console.log((w1 != 0 ? 1: 0), (w2 != 0 ? 1: 0), (w3 != 0 ? 1: 0), (sum >= 2 ? 1 : 0))
    console.log(w1+w2+w3);
    console.log(sum);
    return sum >= 2 ? 1 : 0;
}

function A52clock(allP, loaded) {
    console.log(A52.R1, A52.R2, A52.R3, A52.R4);
    let maj = A52majority(A52.R4 & A52.R4TAP1, A52.R4 & A52.R4TAP2, A52.R4 & A52.R4TAP3);
    console.log(A52.R4TAP1&A52.R4, A52.R4TAP2&A52.R4, A52.R4TAP3&A52.R4);

    if (allP || (((A52.R4 & A52.R4TAP1) != 0) == maj))
        A52.R1 = A52clockone(A52.R1, A52.R1MASK, A52.R1TAPS, loaded << 15);
    if (allP || (((A52.R4 & A52.R4TAP2) != 0) == maj))
        A52.R2 = A52clockone(A52.R2, A52.R2MASK, A52.R2TAPS, loaded << 16);
    if (allP || (((A52.R4 & A52.R4TAP3) != 0) == maj))
        A52.R3 = A52clockone(A52.R3, A52.R3MASK, A52.R3TAPS, loaded << 18);
    A52.R4 = A52clockone(A52.R4, A52.R4MASK, A52.R4TAPS, loaded << 10);
    
    // k += 1;
}

function A52getBit() {
    let topBits = (((A52.R1 >> 18) ^ (A52.R2 >> 21) ^ (A52.R3 >> 22)) & 0x01);
    let nowBit = this.delayBit || 0;
    this.delayBit = (
        topBits
        ^ A52majority(A52.R1 & 0x8000, (~A52.R1) & 0x4000, A52.R1 & 0x1000)
        ^ A52majority((~A52.R2) & 0x10000, A52.R2 & 0x2000, A52.R2 & 0x200)
        ^ A52majority(A52.R3 & 0x40000, A52.R3 & 0x10000, (~A52.R3) & 0x2000)
    );
    console.log(this.delayBit);
    return nowBit;
}

function A52keySetup(key, frame) {
    A52.R1 = A52.R2 = A52.R3 = 0;
    A52.R4 = 0;
    for (let i = 0; i < 64; i++) {
        A52clock(1, 0);
        let keyBit = (key[(i / 8) | 0] >> (i & 7)) & 1;
        A52.R1 ^= keyBit; A52.R2 ^= keyBit; A52.R3 ^= keyBit;
        A52.R4 ^= keyBit;
    }

    for (let i = 0; i < 22; i++) {
        A52clock(1, i === 21);
        let frameBit = (frame >> i) & 1;
        A52.R1 ^= frameBit; A52.R2 ^= frameBit; A52.R3 ^= frameBit; A52.R4 ^= frameBit;
    }

    for (let i = 0; i < 100; i++) {
        A52clock(0, 0);
    }

    A52getBit();
}

function A52run(AtoBkeystream, BtoAkeystream) {
    for (let i = 0; i <= Math.floor(113 / 8); i++)
        AtoBkeystream[i] = BtoAkeystream[i] = 0;

    for (let i = 0; i < 114; i++) {
        A52clock(0, 0);
        console.log(' ');
        AtoBkeystream[Math.floor(i / 8)] |= A52getBit() << (7 - (i & 7));
    }

    for (let i = 0; i < 114; i++) {
        A52clock(0, 0);
        BtoAkeystream[Math.floor(i / 8)] |= A52getBit() << (7 - (i & 7));
    }
}

function A52get_bits(number, ander, size) {
    let arr = []
    while (size > 0) {
        r = number & ander
        arr.push(r != 0 ? 1 : 0);
        ander >>= 1;
        size--;
    }
    return arr;
}

function A52split_gamma(gammas) {
    let spliters = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2];
    let res = []
    let val = 0;
    let len = 0;
    for (let gamma of gammas) {
        for (let [item, size] of gamma.map((it, i) => [it, spliters[i]])) {
            for (let bit of A52get_bits(item, 0xf0, size)) {
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

function A52get_gamma(key, text_length_bits) {
    let frame = 0x21;
    let result = [];
    let count = (text_length_bits / 114) | 0 + text_length_bits % 114 != 0 ? 1 : 0;
    let AtoB = new Array(15), BtoA = new Array(15);
    for (let i = 0; i < count; i++) {
        A52keySetup(key, frame);
        console.log(' ');
        console.log(' ');
        // console.log(A51.R1, A51.R2, A51.R3, A51.R4);
        A52run(AtoB, BtoA);
        result.push([...AtoB]);
    }
    return result;
}

/**
 * @param phrase Побайтовое представление строки
 * @param key Байтовый массив из 8 элементов
 */
function A52encryption(phrase, key) {
    let gammas = A52get_gamma(key, phrase.length * 8);
    let gamma = A52split_gamma(gammas)
    let result = [];
    for (let i = 0; i < phrase.length; i++) {
        result.push(phrase[i] ^ gamma[i])
    }
    return result;
}

function fillA52En() {
    let text = document.querySelector('#a52EnArea').value;
    let key = document.querySelector("#a52EnKey").value;
    let newText = markToChar(text);
    newText = spaceWithStart(newText);
    newText = new TextEncoder().encode(newText);

    if (key.length != 16) {
        newText = "Неправильная длина ключа";
    } else {
        newText = bytesToHex(A52encryption(newText, hexToBytes(key)));
    }

    document.getElementById('a52AfterEn').value = newText;
}

function fillA52De() {
    let text = document.querySelector('#a52DeArea').value;
    let key = document.querySelector("#a52DeKey").value;
    let newText = hexToBytes(text);

    if (key.length != 16) {
        newText = "Неправильная длина ключа";
    } else {
        newText = A52encryption(newText, hexToBytes(key));
        newText = hexToBytes(bytesToHex(newText));
        newText = new TextDecoder().decode(newText);
        newText = charToMark(newText);
        newText = spaceWithEnd(newText);
    }

    document.getElementById('a52AfterDe').value = newText;
}

//
// Магма
//
function magmaEncrypt(phrase, key) {
    key = hexToBytes(key);
    let expandedKeys = festExpandKey(key);
    return festProto(phrase, expandedKeys);
}

function magmaDecrypt(phrase, key) {
    key = hexToBytes(key);
    let expandedKeys = festExpandKey(key);
    expandedKeys.reverse();
    return festProto(phrase, expandedKeys);
}

function magmaPrepairPhrase(phrase, key, cryptType) {
    if (cryptType) {
        phrase = markToChar(phrase).toLocaleLowerCase();

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

        newPhrase = charToMark(newPhrase);
        return newPhrase;
    }
}

function fillMagmaEn() {
    let text = document.querySelector('#magmaEnArea').value;
    let key = document.querySelector("#magmaEnKey").value;
    let newText = "";

    if (spaceTypes.magmaSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = spaceWithStart(text);
            newText = magmaPrepairPhrase(newText, key, true);
        }
    } else {
        newText = spaceWithout(text);
        newText = magmaEncrypt(text, key);
    }
    
    document.getElementById('magmaAfterEn').value = newText;
}

function fillMagmaDe() {
    let text = document.querySelector('#magmaDeArea').value;
    let key = document.querySelector("#magmaDeKey").value;
    let newText = ""

    if (spaceTypes.magmaSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = magmaPrepairPhrase(text, key, false);
            newText = spaceWithEnd(newText);
        }
    } else {
        newText = magmaDecrypt(text, key);
    }

    document.getElementById('magmaAfterDe').value = newText;
}


//
// AES
//
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
        phrase = markToChar(phrase).toLocaleLowerCase();

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

        newPhrase = charToMark(newPhrase);
        return newPhrase;
    }
}

function fillAesEn() {
    let text = document.querySelector('#aesEnArea').value;
    let key = document.querySelector("#aesEnKey").value;
    let newText = "";

    if (spaceTypes.aesSpace) {
        if (key.length != 32) {
            newText = "Неправильная длина ключа";
        } else {
            newText = spaceWithStart(text);
            newText = AESPrepairPhrase(newText, key, true);
        }
    } else {
        // newText = spaceWithout(text);
        // newText = magmaEncrypt(text, key);
        let newKeys = AESKeyExpansion(hexToBytes(key));
        newText = hexToBytes(text);
        newText = bytesToHex(AESEnc(newText, newKeys));
    }
    
    document.getElementById('aesAfterEn').value = newText;
}

function fillAesDe() {
    let text = document.querySelector('#aesDeArea').value;
    let key = document.querySelector("#aesDeKey").value;
    let newText = ""

    if (spaceTypes.aesSpace) {
        if (key.length != 32) {
            newText = "Неправильная длина ключа";
        } else {
            newText = AESPrepairPhrase(text, key, false);
            newText = spaceWithEnd(newText);
        }
    } else {
        // newText = magmaDecrypt(text, key);
        let newKeys = AESKeyExpansion(hexToBytes(key));
        newText = hexToBytes(text);
        newText = bytesToHex(AESDec(newText, newKeys));
    }

    document.getElementById('aesAfterDe').value = newText;
}


//
// Кузнечик
//
const S = [
    0xFC, 0xEE, 0xDD, 0x11, 0xCF, 0x6E, 0x31, 0x16, 0xFB, 0xC4, 0xFA, 0xDA, 0x23, 0xC5, 0x04, 0x4D,
    0xE9, 0x77, 0xF0, 0xDB, 0x93, 0x2E, 0x99, 0xBA, 0x17, 0x36, 0xF1, 0xBB, 0x14, 0xCD, 0x5F, 0xC1,
    0xF9, 0x18, 0x65, 0x5A, 0xE2, 0x5C, 0xEF, 0x21, 0x81, 0x1C, 0x3C, 0x42, 0x8B, 0x01, 0x8E, 0x4F,
    0x05, 0x84, 0x02, 0xAE, 0xE3, 0x6A, 0x8F, 0xA0, 0x06, 0x0B, 0xED, 0x98, 0x7F, 0xD4, 0xD3, 0x1F,
    0xEB, 0x34, 0x2C, 0x51, 0xEA, 0xC8, 0x48, 0xAB, 0xF2, 0x2A, 0x68, 0xA2, 0xFD, 0x3A, 0xCE, 0xCC,
    0xB5, 0x70, 0x0E, 0x56, 0x08, 0x0C, 0x76, 0x12, 0xBF, 0x72, 0x13, 0x47, 0x9C, 0xB7, 0x5D, 0x87,
    0x15, 0xA1, 0x96, 0x29, 0x10, 0x7B, 0x9A, 0xC7, 0xF3, 0x91, 0x78, 0x6F, 0x9D, 0x9E, 0xB2, 0xB1,
    0x32, 0x75, 0x19, 0x3D, 0xFF, 0x35, 0x8A, 0x7E, 0x6D, 0x54, 0xC6, 0x80, 0xC3, 0xBD, 0x0D, 0x57,
    0xDF, 0xF5, 0x24, 0xA9, 0x3E, 0xA8, 0x43, 0xC9, 0xD7, 0x79, 0xD6, 0xF6, 0x7C, 0x22, 0xB9, 0x03,
    0xE0, 0x0F, 0xEC, 0xDE, 0x7A, 0x94, 0xB0, 0xBC, 0xDC, 0xE8, 0x28, 0x50, 0x4E, 0x33, 0x0A, 0x4A,
    0xA7, 0x97, 0x60, 0x73, 0x1E, 0x00, 0x62, 0x44, 0x1A, 0xB8, 0x38, 0x82, 0x64, 0x9F, 0x26, 0x41,
    0xAD, 0x45, 0x46, 0x92, 0x27, 0x5E, 0x55, 0x2F, 0x8C, 0xA3, 0xA5, 0x7D, 0x69, 0xD5, 0x95, 0x3B,
    0x07, 0x58, 0xB3, 0x40, 0x86, 0xAC, 0x1D, 0xF7, 0x30, 0x37, 0x6B, 0xE4, 0x88, 0xD9, 0xE7, 0x89,
    0xE1, 0x1B, 0x83, 0x49, 0x4C, 0x3F, 0xF8, 0xFE, 0x8D, 0x53, 0xAA, 0x90, 0xCA, 0xD8, 0x85, 0x61,
    0x20, 0x71, 0x67, 0xA4, 0x2D, 0x2B, 0x09, 0x5B, 0xCB, 0x9B, 0x25, 0xD0, 0xBE, 0xE5, 0x6C, 0x52,
    0x59, 0xA6, 0x74, 0xD2, 0xE6, 0xF4, 0xB4, 0xC0, 0xD1, 0x66, 0xAF, 0xC2, 0x39, 0x4B, 0x63, 0xB6
];

const S_REVERSE = [
    0xA5, 0x2D, 0x32, 0x8F, 0x0E, 0x30, 0x38, 0xC0, 0x54, 0xE6, 0x9E, 0x39, 0x55, 0x7E, 0x52, 0x91,
    0x64, 0x03, 0x57, 0x5A, 0x1C, 0x60, 0x07, 0x18, 0x21, 0x72, 0xA8, 0xD1, 0x29, 0xC6, 0xA4, 0x3F,
    0xE0, 0x27, 0x8D, 0x0C, 0x82, 0xEA, 0xAE, 0xB4, 0x9A, 0x63, 0x49, 0xE5, 0x42, 0xE4, 0x15, 0xB7,
    0xC8, 0x06, 0x70, 0x9D, 0x41, 0x75, 0x19, 0xC9, 0xAA, 0xFC, 0x4D, 0xBF, 0x2A, 0x73, 0x84, 0xD5,
    0xC3, 0xAF, 0x2B, 0x86, 0xA7, 0xB1, 0xB2, 0x5B, 0x46, 0xD3, 0x9F, 0xFD, 0xD4, 0x0F, 0x9C, 0x2F,
    0x9B, 0x43, 0xEF, 0xD9, 0x79, 0xB6, 0x53, 0x7F, 0xC1, 0xF0, 0x23, 0xE7, 0x25, 0x5E, 0xB5, 0x1E,
    0xA2, 0xDF, 0xA6, 0xFE, 0xAC, 0x22, 0xF9, 0xE2, 0x4A, 0xBC, 0x35, 0xCA, 0xEE, 0x78, 0x05, 0x6B,
    0x51, 0xE1, 0x59, 0xA3, 0xF2, 0x71, 0x56, 0x11, 0x6A, 0x89, 0x94, 0x65, 0x8C, 0xBB, 0x77, 0x3C,
    0x7B, 0x28, 0xAB, 0xD2, 0x31, 0xDE, 0xC4, 0x5F, 0xCC, 0xCF, 0x76, 0x2C, 0xB8, 0xD8, 0x2E, 0x36,
    0xDB, 0x69, 0xB3, 0x14, 0x95, 0xBE, 0x62, 0xA1, 0x3B, 0x16, 0x66, 0xE9, 0x5C, 0x6C, 0x6D, 0xAD,
    0x37, 0x61, 0x4B, 0xB9, 0xE3, 0xBA, 0xF1, 0xA0, 0x85, 0x83, 0xDA, 0x47, 0xC5, 0xB0, 0x33, 0xFA,
    0x96, 0x6F, 0x6E, 0xC2, 0xF6, 0x50, 0xFF, 0x5D, 0xA9, 0x8E, 0x17, 0x1B, 0x97, 0x7D, 0xEC, 0x58,
    0xF7, 0x1F, 0xFB, 0x7C, 0x09, 0x0D, 0x7A, 0x67, 0x45, 0x87, 0xDC, 0xE8, 0x4F, 0x1D, 0x4E, 0x04,
    0xEB, 0xF8, 0xF3, 0x3E, 0x3D, 0xBD, 0x8A, 0x88, 0xDD, 0xCD, 0x0B, 0x13, 0x98, 0x02, 0x93, 0x80,
    0x90, 0xD0, 0x24, 0x34, 0xCB, 0xED, 0xF4, 0xCE, 0x99, 0x10, 0x44, 0x40, 0x92, 0x3A, 0x01, 0x26,
    0x12, 0x1A, 0x48, 0x68, 0xF5, 0x81, 0x8B, 0xC7, 0xD6, 0x20, 0x0A, 0x08, 0x00, 0x4C, 0xD7, 0x74
];

const L_VEC = [
    148, 32, 133, 16, 194, 192, 1, 251, 1, 192, 194, 16, 133, 32, 148, 1
];

const C = [
    [0x6e, 0xa2, 0x76, 0x72, 0x6c, 0x48, 0x7a, 0xb8, 0x5d, 0x27, 0xbd, 0x10, 0xdd, 0x84, 0x94, 0x01],
    [0xdc, 0x87, 0xec, 0xe4, 0xd8, 0x90, 0xf4, 0xb3, 0xba, 0x4e, 0xb9, 0x20, 0x79, 0xcb, 0xeb, 0x02],
    [0xb2, 0x25, 0x9a, 0x96, 0xb4, 0xd8, 0x8e, 0x0b, 0xe7, 0x69, 0x04, 0x30, 0xa4, 0x4f, 0x7f, 0x03],
    [0x7b, 0xcd, 0x1b, 0x0b, 0x73, 0xe3, 0x2b, 0xa5, 0xb7, 0x9c, 0xb1, 0x40, 0xf2, 0x55, 0x15, 0x04],
    [0x15, 0x6f, 0x6d, 0x79, 0x1f, 0xab, 0x51, 0x1d, 0xea, 0xbb, 0x0c, 0x50, 0x2f, 0xd1, 0x81, 0x05],
    [0xa7, 0x4a, 0xf7, 0xef, 0xab, 0x73, 0xdf, 0x16, 0x0d, 0xd2, 0x08, 0x60, 0x8b, 0x9e, 0xfe, 0x06],
    [0xc9, 0xe8, 0x81, 0x9d, 0xc7, 0x3b, 0xa5, 0xae, 0x50, 0xf5, 0xb5, 0x70, 0x56, 0x1a, 0x6a, 0x07],
    [0xf6, 0x59, 0x36, 0x16, 0xe6, 0x05, 0x56, 0x89, 0xad, 0xfb, 0xa1, 0x80, 0x27, 0xaa, 0x2a, 0x08],
    [0x98, 0xfb, 0x40, 0x64, 0x8a, 0x4d, 0x2c, 0x31, 0xf0, 0xdc, 0x1c, 0x90, 0xfa, 0x2e, 0xbe, 0x09],
    [0x2a, 0xde, 0xda, 0xf2, 0x3e, 0x95, 0xa2, 0x3a, 0x17, 0xb5, 0x18, 0xa0, 0x5e, 0x61, 0xc1, 0x0a],
    [0x44, 0x7c, 0xac, 0x80, 0x52, 0xdd, 0xd8, 0x82, 0x4a, 0x92, 0xa5, 0xb0, 0x83, 0xe5, 0x55, 0x0b],
    [0x8d, 0x94, 0x2d, 0x1d, 0x95, 0xe6, 0x7d, 0x2c, 0x1a, 0x67, 0x10, 0xc0, 0xd5, 0xff, 0x3f, 0x0c],
    [0xe3, 0x36, 0x5b, 0x6f, 0xf9, 0xae, 0x07, 0x94, 0x47, 0x40, 0xad, 0xd0, 0x08, 0x7b, 0xab, 0x0d],
    [0x51, 0x13, 0xc1, 0xf9, 0x4d, 0x76, 0x89, 0x9f, 0xa0, 0x29, 0xa9, 0xe0, 0xac, 0x34, 0xd4, 0x0e],
    [0x3f, 0xb1, 0xb7, 0x8b, 0x21, 0x3e, 0xf3, 0x27, 0xfd, 0x0e, 0x14, 0xf0, 0x71, 0xb0, 0x40, 0x0f],
    [0x2f, 0xb2, 0x6c, 0x2c, 0x0f, 0x0a, 0xac, 0xd1, 0x99, 0x35, 0x81, 0xc3, 0x4e, 0x97, 0x54, 0x10],
    [0x41, 0x10, 0x1a, 0x5e, 0x63, 0x42, 0xd6, 0x69, 0xc4, 0x12, 0x3c, 0xd3, 0x93, 0x13, 0xc0, 0x11],
    [0xf3, 0x35, 0x80, 0xc8, 0xd7, 0x9a, 0x58, 0x62, 0x23, 0x7b, 0x38, 0xe3, 0x37, 0x5c, 0xbf, 0x12],
    [0x9d, 0x97, 0xf6, 0xba, 0xbb, 0xd2, 0x22, 0xda, 0x7e, 0x5c, 0x85, 0xf3, 0xea, 0xd8, 0x2b, 0x13],
    [0x54, 0x7f, 0x77, 0x27, 0x7c, 0xe9, 0x87, 0x74, 0x2e, 0xa9, 0x30, 0x83, 0xbc, 0xc2, 0x41, 0x14],
    [0x3a, 0xdd, 0x01, 0x55, 0x10, 0xa1, 0xfd, 0xcc, 0x73, 0x8e, 0x8d, 0x93, 0x61, 0x46, 0xd5, 0x15],
    [0x88, 0xf8, 0x9b, 0xc3, 0xa4, 0x79, 0x73, 0xc7, 0x94, 0xe7, 0x89, 0xa3, 0xc5, 0x09, 0xaa, 0x16],
    [0xe6, 0x5a, 0xed, 0xb1, 0xc8, 0x31, 0x09, 0x7f, 0xc9, 0xc0, 0x34, 0xb3, 0x18, 0x8d, 0x3e, 0x17],
    [0xd9, 0xeb, 0x5a, 0x3a, 0xe9, 0x0f, 0xfa, 0x58, 0x34, 0xce, 0x20, 0x43, 0x69, 0x3d, 0x7e, 0x18],
    [0xb7, 0x49, 0x2c, 0x48, 0x85, 0x47, 0x80, 0xe0, 0x69, 0xe9, 0x9d, 0x53, 0xb4, 0xb9, 0xea, 0x19],
    [0x05, 0x6c, 0xb6, 0xde, 0x31, 0x9f, 0x0e, 0xeb, 0x8e, 0x80, 0x99, 0x63, 0x10, 0xf6, 0x95, 0x1a],
    [0x6b, 0xce, 0xc0, 0xac, 0x5d, 0xd7, 0x74, 0x53, 0xd3, 0xa7, 0x24, 0x73, 0xcd, 0x72, 0x01, 0x1b],
    [0xa2, 0x26, 0x41, 0x31, 0x9a, 0xec, 0xd1, 0xfd, 0x83, 0x52, 0x91, 0x03, 0x9b, 0x68, 0x6b, 0x1c],
    [0xcc, 0x84, 0x37, 0x43, 0xf6, 0xa4, 0xab, 0x45, 0xde, 0x75, 0x2c, 0x13, 0x46, 0xec, 0xff, 0x1d],
    [0x7e, 0xa1, 0xad, 0xd5, 0x42, 0x7c, 0x25, 0x4e, 0x39, 0x1c, 0x28, 0x23, 0xe2, 0xa3, 0x80, 0x1e],
    [0x10, 0x03, 0xdb, 0xa7, 0x2e, 0x34, 0x5f, 0xf6, 0x64, 0x3b, 0x95, 0x33, 0x3f, 0x27, 0x14, 0x1f],
    [0x5e, 0xa7, 0xd8, 0x58, 0x1e, 0x14, 0x9b, 0x61, 0xf1, 0x6a, 0xc1, 0x45, 0x9c, 0xed, 0xa8, 0x20],
];

function KuzX(left, right) {
    return left.map((elem, index) => elem ^ right[index]);
}

function KuzS(part) {
    return part.map(elem => S[elem]);
}

function KuzSReverse(part) {
    return part.map(elem => S_REVERSE[elem]);
}

function KuzGfMul(left, right) {
    let result = 0;
    let hi_bit;
    for (let i = 0; i < 8; i++) {
        if (right & 1) {
            result ^= left;
        }
        hi_bit = left & 0x80;
        left <<= 1;
        if (hi_bit) {
            left ^= 0xc3;
        }
        right >>= 1;
    }
    return result;
}

function KuzR(data) {
    let result = new Uint8Array(data.length);
    let a_15 = 0;
    for (let i = 0; i < data.length; i++) {
        a_15 ^= KuzGfMul(data[i], L_VEC[i]);
    }
    result.set([a_15], 0);
    result.set(data.slice(0, data.length - 1), 1);
    return result;
}

function KuzRReverse(data) {
    let result = new Uint8Array(data.length);
    let copy = new Uint8Array(data.length);
    result.set(data.slice(1), 0);
    copy.set(data.slice(1), 0);
    copy.set([data[0]], copy.length - 1)

    let a_0 = 0;
    for (let i = 0; i < copy.length; i++) {
        a_0 ^= KuzGfMul(copy[i], L_VEC[i]);
    }
    
    result.set([a_0], result.length - 1);
    return result;
}

function KuzL(data, func) {
    let result = data.slice();
    for (let i = 0; i < 16; i++) {
        result = KuzR(result);
    }
    return result;
}

function KuzLReverse(data) {
    let result = data.slice();
    for (let i = 0; i < 16; i++) {
        result = KuzRReverse(result);
    }
    return result;
}

function KuzF(left, right, iter_c) {
    return [KuzX(KuzL(KuzS(KuzX(left, iter_c))), right), left.slice()];
}

function KuzExpandKey(key) {
    let result = [
        key.slice(0, 16),
        key.slice(16)
    ];
    for (let i = 0; i < 4; i++) {
        let [p1, p2] = [result[i * 2].slice(), result[i * 2 + 1].slice()];
        for (let j = 0; j < 8; j++) {
            [p1, p2] = KuzF(p1, p2, C[i * 8 + j]);
        }
        result.push(p1);
        result.push(p2);
    }
    return result;
}

function KuzEnc(part, keys) {
    let result = part.slice();
    for (let key of keys.slice(0, keys.length - 1)) {
        result = KuzL(KuzS(KuzX(result, key)));
    }
    result = KuzX(result, keys[keys.length - 1]);
    return result;
}

function KuzDec(part, keys) {
    let result = part.slice();
    for (let key of keys.slice(1).reverse()) {
        result = KuzSReverse(KuzLReverse(KuzX(result, key)));
    }
    result = KuzX(result, keys[0]);
    return result;
}

function KuzProto(phrase, key, encryption_func) {
    let phrase_bytes = hexToBytes(phrase, 16);
    let key_bytes = hexToBytes(key, 32);
    let keys = KuzExpandKey(key_bytes);
    let result = [];
    for (let i = 0; i < phrase_bytes.length; i += 16) {
        result.push(...encryption_func(phrase_bytes.slice(i, i + 16), keys));
    }
    return bytesToHex(result);
}

function KuzEncrypt(phrase, key) {
    return KuzProto(phrase, key, KuzEnc);
}

function KuzDecrypt(phrase, key) {
    return KuzProto(phrase, key, KuzDec);
}

function KuzPrepairPhrase(phrase, key, cryptType) {
    if (cryptType) {
        phrase = markToChar(phrase).toLocaleLowerCase();

        let phraseLen = phrase.length;
        if (phrase.length % 8 != 0) {
            for (let i = 0; i < 8 - (phraseLen % 8); i++) {
                phrase += 'ф';
            }
        }
        phrase = new TextEncoder().encode(phrase);
        phrase = bytesToHex(phrase);

        let newPhrase = ""
        phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 32) {
            let crypt_phrase = phrase.slice(k, k + 32);
            let temp = KuzEncrypt(crypt_phrase, key);
            newPhrase += temp;
        }
        return newPhrase;
    } else {
        let newPhrase = "";
        let phraseLen = phrase.length;
        for (let k = 0; k < phraseLen; k += 32) {
            let crypt_phrase = phrase.slice(k, k + 32);
            let temp = KuzDecrypt(crypt_phrase, key);
            newPhrase += temp;
        }

        newPhrase = hexToBytes(newPhrase);
        newPhrase = new TextDecoder().decode(newPhrase);
        while (newPhrase[newPhrase.length - 1] == "ф") {
            newPhrase = newPhrase.substring(0, newPhrase.length - 1);
        }

        newPhrase = charToMark(newPhrase);
        return newPhrase;
    }
}

function fillKuzEn() {
    let text = document.querySelector('#kuzEnArea').value;
    let key = document.querySelector("#kuzEnKey").value;
    let newText = "";

    if (spaceTypes.kuzSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = spaceWithStart(text);
            newText = KuzPrepairPhrase(newText, key, true);
        }
    } else {
        newText = KuzEncrypt(text, key);
    }
    
    document.getElementById('kuzAfterEn').value = newText;
}

function fillKuzDe() {
    let text = document.querySelector('#kuzDeArea').value;
    let key = document.querySelector("#kuzDeKey").value;
    let newText = ""

    if (spaceTypes.kuzSpace) {
        if (key.length != 64) {
            newText = "Неправильная длина ключа";
        } else {
            newText = KuzPrepairPhrase(text, key, false);
            newText = spaceWithEnd(newText);
        }
    } else {
        newText = KuzDecrypt(text, key);
    }

    document.getElementById('kuzAfterDe').value = newText;
}

//
// RSA
//
function RsaGcd(a, b) { 
    if (a == 0) 
        return b; 
    return RsaGcd(b % a, a); 
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

function RsaGenKey(phi, e) {
    let d = RsaPowMod(e, phi - 1, phi);
    return d;
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

function RsaPrepairPhrase(text, p, q, e, typecr) {
    if (typecr) {
        let newText = markToChar(text).toLocaleLowerCase();
        let ptest = RsaPrime(p);
        let qtest = RsaPrime(q);
        if (ptest.length != 0) {
            return 'p - должно быть простым числом';
        }
        if (qtest.length != 0) {
            return 'q - должно быть простым числом';
        }
        
        let eiler = (p - 1) * (q - 1);
        document.getElementById('rsaDeD').value = RsaGenKey(eiler, e);
        document.getElementById('rsaEnN').value = p*q;
        document.getElementById('rsaEnFN').value = eiler;
        if (!RsaCoprimes(eiler, e)) {
            return 'e - дожно быть взаимнопростым с функцией эйлера от n и меньше ее';
        }

        return RsaEncrypt(newText, p*q, e);

    } else {
        let ptest = RsaPrime(p);
        let qtest = RsaPrime(q);
        if (ptest.length != 0) {
            return 'p - должно быть простым числом';
        }
        if (qtest.length != 0) {
            return 'q - должно быть простым числом';
        }

        let eiler = (p - 1) * (q - 1);
        document.getElementById('rsaDeN').value = p*q;
        document.getElementById('rsaDeFN').value = eiler;
        if (RsaCoprimes(eiler, e) == false) {
            return 'd - дожно быть взаимнопростым с функцией эйлера от n и меньше ее';
        }

        let newText = charToMark(RsaDecrypt(text, p*q, e));
        return newText;
    }
}

function fillRsaEn() {
    let text = document.querySelector('#rsaEnArea').value;
    // let enN = Number(document.querySelector('#rsaEnN').value);
    let enP =  Number(document.querySelector('#rsaEnP').value);
    let enQ = Number(document.querySelector('#rsaEnQ').value);
    let enE = Number(document.querySelector('#rsaEnE').value);
    let newText = "";
    if (spaceTypes.rsaSpace) {
        newText = spaceWithStart(text);
        newText = RsaPrepairPhrase(newText, enP, enQ, enE, true);
    }else {
        newText = spaceWithout(text);
        newText = RsaPrepairPhrase(newText, enP, enQ, enE, true);
    }
    document.getElementById('rsaAfterEn').value = newText;
};

function fillRsaDe() {
    let text = document.querySelector('#rsaDeArea').value;
    let deP =  Number(document.querySelector('#rsaDeP').value);
    let deQ = Number(document.querySelector('#rsaDeQ').value); 
    let deD = Number(document.querySelector('#rsaDeD').value);
    let newText = "";
    if (spaceTypes.rsaSpace) {
        newText = RsaPrepairPhrase(text, deP, deQ, deD, false);
        // console.log(newText)
        newText = spaceWithEnd(newText);
    }else {
        newText = spaceWithout(text);
        newText = RsaPrepairPhrase(newText, deP, deQ, deD, false);
    }
    document.getElementById('rsaAfterDe').value = newText;
};

//
// Elgamal
//
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

function ElgGenKey(g, x, p) {
    let y = ElgPowMod(g, x, p);
    return y;
}

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
    // let k = 0;
    // let keys = [3,5,7,3,5,7,7,5,  
    //             3,5,3,5,3,7,7,5,
    //             5,7,5,3,7,5,3,5,
    //             7,3,5,5,7,3,3,5,
    //             3,5,5,7];
    // for (const mi of phrase) {
    //     const ki = keys[k];
    //     const ai = ElgPowMod(g, ki, p);
    //     const bi = (ElgPowMod(y, ki, p) * (alphabet.indexOf(mi) + 1)) % p;
    //     result += ElgToString(ai, len) + ElgToString(bi, len);
    //     k++;
    // }
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
        let newText = markToChar(text).toLocaleLowerCase();
        let lenText = newText.length;
        let ptest = ElgPrime(p);

        if (p <= 32) { //p <= lenText
            return 'p - должно быть больше длины алфавита'
        }
        if (ptest.length != 0) {
            return 'p - должно быть простым числом'
        }
        if (g <= 1 || g >= p) {
            return 'g - должно быть 1 < g < p'
        }
        y = ElgGenKey(g, x, p);
        document.getElementById('elgEnY').value = y;
        // console.log(newText.length)
        let keys = ElgCreateKeys(p, newText.length);
        // return ElgEncrypt(newText, p, g, y, [3,5,7]) // Для теста на своей фразе
        return ElgEncrypt(newText, p, g, y, keys)

    } else {
        let lenText = text.length;
        let ptest = ElgPrime(p);

        if (ptest.length != 0) {
            return 'p - должно быть простым числом'
        }
        // if (x <= 1 || x >= p) {
        //     return 'x - должно быть 1 < x < p'
        // }

        let newText = charToMark(ElgDecrypt(text, p, x));
        return newText;
    }
}

function fillElgEn() {
    let text = document.querySelector('#elgEnArea').value;
    let enP = Number(document.querySelector('#elgEnP').value); 
    let enG = Number(document.querySelector('#elgEnG').value);
    let enY = Number(document.querySelector('#elgEnY').value);
    let enX = Number(document.querySelector('#elgDeX').value);
    let newText = "";
    if (spaceTypes.elgSpace) {
        newText = spaceWithStart(text);
        newText = ElgPrepairPhrase(newText, enP, enG, 0, enX, true);
    }else {
        newText = spaceWithout(text);
        newText = ElgPrepairPhrase(newText, enP, enG, 0, enX, true);
    }
    document.getElementById('elgAfterEn').value = newText;
};

function fillElgDe() {
    let text = document.querySelector('#elgDeArea').value;
    let deP = Number(document.querySelector('#elgDeP').value); 
    let deX = Number(document.querySelector('#elgDeX').value);
    let newText = "";
    if (spaceTypes.elgSpace) {
        newText = ElgPrepairPhrase(text, deP, 0, 0, deX, false);
        newText = spaceWithEnd(newText);
    }else {
        newText = spaceWithout(text);
        newText = ElgPrepairPhrase(newText, deP, 0, 0, deX, false);
    }
    document.getElementById('elgAfterDe').value = newText;
};


//
// ECC
//
function EccModd(value, mod) {
    return ((value % mod) + mod) % mod;
}

function EccPowMod(number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modula;
    }
    return result;
}

function EccGcd(a, b) { 
    if (a == 0) 
        return b; 
    return EccGcd(b % a, a); 
}

function EccIsPrime(n) { 
    let result = [1, n]; 
    for (let i = 2; i < Math.pow(n, 0.5); i++) { 
        if (n % i == 0) {
            return false;
        } 
    }
    return true;
}

class EccPoint {
    constructor(a, b, x, y, modula) {
        this.a = a;
        this.b = b;
        this.point = (x != undefined && y != undefined) ? [x, y] : null;
        this.modula = modula;
    }

    static EccGcd(a, b) { 
        if (a == 0) 
            return b; 
        return EccPoint.EccGcd(b % a, a); 
    }

    static phi(number) {
        let count = 0;
        for (let x = 1; x <= number; x++) {
            if (EccPoint.EccGcd(number, x) == 1) count++;
        }
        return count;
    }

    static EccPowMod(number, power, modula) {
        let result = number;
        for (let i = 1; i < power; i++) {
            result *= number;
            result %= modula;
        }
        return result;
    }

    static div_by_mod(a, b, modula) {
        let phi = EccPoint.phi(modula);
        b = EccPoint.EccPowMod(b, phi - 1, modula);
        return (a * b) % modula;
    }

    get_x_y() {
        if (this.point != null) {
            return this.point;
        } else {
            return [0, 0];
        }
    }

    get_x_y_isize() {
        if (this.point != null) {
            return [this.point[0], this.point[1]];
        } else {
            return [0, 0];
        }
    }

    lambda_xx(rhs) {
        let [rhs_x, rhs_y] = rhs.get_x_y_isize();
        let [self_x, self_y] = this.get_x_y_isize();
        let left = EccModd(rhs_y - self_y, this.modula);
        let right = EccModd(rhs_x - self_x, this.modula);
        if (right == 0) {
            return null;
        }
        return EccPoint.div_by_mod(left, right, this.modula);
    }

    lambda_x2() {
        let [self_x, self_y] = this.get_x_y_isize();
        let left = EccModd(3 * self_x * self_x + this.a, this.modula);
        let right = EccModd(2 * self_y, this.modula);
        if (right == 0) {
            return null;
        }
        return EccPoint.div_by_mod(left, right, this.modula);
    }

    mul(n) {
        let point = this;
        let temp = new EccPoint(this.a, this.b, this.point[0], this.point[1], this.modula); // было просто = point
        for (let i = 1; i < n; i++) {
            temp = temp.add(point);    
        }
        return temp;
    }

    add(rhs) {
        let temp = new EccPoint(this.a, this.b, 0, 0, this.modula);
        if (this.point != null && rhs.point != null) {
            let [rhs_x, rhs_y] = rhs.get_x_y_isize();
            let [self_x, self_y] = this.get_x_y_isize();
            let lambda, x;
            if (self_x != rhs_x || self_y != rhs_y) {
                lambda = this.lambda_xx(rhs);
                if (lambda != null) {
                    lambda = lambda;
                } else {
                    temp.point = null;
                    return temp;
                }
                x = EccModd(lambda * lambda - self_x - rhs_x, this.modula);
            } else {
                lambda = this.lambda_x2();
                if (lambda !== null) {
                    lambda = lambda;
                } else {
                    temp.point = null;
                    return temp;
                }
                x = EccModd(lambda * lambda - 2 * self_x, this.modula);
            }
            let y = EccModd((lambda * EccModd(self_x - x, this.modula)) - self_y, this.modula);
            temp.point = [x, y];
            return temp;
        } else if (this.point == null && rhs.point == null) {
            temp.point = null;
            return temp;
        } else if (this.point == null) {
            return rhs;
        } else {
            return this;
        }
    }
}

class CipherValue {
    constructor(s, a, b, modula) {
        let buff = s.replaceAll("(", "").replaceAll(")", "").split(',').map(x => parseInt(x));
        if (buff.length >= 3) {
          this.point = new EccPoint(a, b, buff[0], buff[1], modula);
          this.value = buff[2];
        } else {
          throw new Error("Unexpected behavior");
        }
    }

    toString() {
        return `(${this.point},${this.value})`;
    }
}

function EccGetPoints(a, b, modula) {
    let ys = Array.from({ length: modula }, (_, i) => i);
    let y2s = [];
    ys.forEach(y => y2s[((y * y) % modula)] = y);
    let xs = [...ys];
    let y4x = xs.map(x => EccModd((x ** 3) + a * x + b, modula));
    y4x = y4x.map(y => typeof y2s[y] != 'undefined' ? y : null);
    let xys = [];
    for (let [y4xi, xsi] of y4x.map((y, i) => [y, xs[i]]).filter(a => a[0] != null)) {
        xys.push(new EccPoint(a, b, xsi, y2s[y4xi], modula));
        if (y2s[y4xi] != 0) {
            xys.push(new EccPoint(a, b, xsi, EccModd(-(y2s[y4xi]), modula), modula));
        }
    }
    return xys;
}

function EccGetQ(n) {
    let q = 1;
    for (let i = 3; i < n; i++) {
        if (EccGcd(n, i) == i && EccIsPrime(i)) {
            q = i;
        }
    }
    return (q == 1) ? n : q;
}

// function get_keys() {
//     const rng = random.createRandom();
//     let modula = rng.int(34, 60); // случайное число от 34 до 60
//     while (!EccIsPrime(modula)) {
//         modula = rng.int(34, 60);
//     }
//     let a = rng.int(1, 10);
//     let b = rng.int(1, 10);
//     while (!validateEll(a, b, modula)) {
//         a = rng.int(1, 10);
//         b = rng.int(1, 10);
//     }
//     const points_group = get_points(a, b, modula);
//     const n = points_group.length + 1;
//     const q = EccGetQ(n);
//     const h = Math.floor(n / q);
//     let index = rng.int(0, points_group.length);
//     while (points_group[index].mul(h).point === null) {
//         index = rng.int(0, points_group.length);
//     }
//     let g = points_group[index].mul(h);
//     let secret = rng.int(1, q);
//     let open = g.mul(secret);
//     return [g, q, secret, open];
// }

function validateEll(a, b, modula) {
    return EccModd(4 * (a ** 3) + 27 * (b ** 2), modula) != 0;
}

function EccEnc(mi, db, g, k, q) {
    let r = g.mul(k);
    let p = db.mul(k);
    let [x, _] = p.get_x_y_isize();
    while (x == 0) {
        k = Math.floor(Math.random() * q + 1);
        r = g.mul(k);
        p = db.mul(k);
        [x, _] = p.get_x_y_isize();
    }
    let m = EccModd(mi * x, p.modula);
    let result = `((${r.point[0]},${r.point[1]}),${m})`;
    return result;
}

function EccEncrypt(phrase, db, g, q) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    const result = Array.from(phrase, x => {
        let mi = alphabet.indexOf(x) + 1;
        let k = Math.floor(Math.random() * q + 1);
        return EccEnc(mi, db, g, k, q);
    }).join("");
    // let mi = 10;
    // let k = 4;
    // result = EccEnc(mi, db, g, k, q);
    return result;
}

function EccDec(cb, value, modula) {
    let q = value.point.mul(cb);
    let [x, _] = q.get_x_y();
    return EccModd(value.value * EccPowMod(x, modula - 2, modula), modula);
}

function EccDecrypt(phrase, cb, a, b, modula) {
    let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let re = /\(\(\d+,\d+\),\d+\)/g; // ищет походие этой подстроке ((1,1),2)
    let result = Array.from(phrase.match(re), x => {
        let val = new CipherValue(x, a, b, modula);
        let m = EccDec(cb, val, modula);
        return alphabet[m - 1];
        // return m;
    }).join("");
    return result;
}

function EccPrepairPhrase(phrase, a, b, p, Gx, Gy, q, Cb, crtype) {
    if (crtype) {
        let newText = markToChar(phrase).toLocaleLowerCase();

        let ptest = EccIsPrime(p);
        if (!ptest) {
            return 'P - должно быть простым числом'
        }
        if (!validateEll(a, b, p)) {
            return 'Кривая не соответствует условию'
        }

        let n = EccGetPoints(a, b, p).length + 1;
        // q = 7;
        q = EccGetQ(n);
        document.querySelector('#eccEnQ').value = q;

        let g = new EccPoint(a, b, Gx, Gy, p);
        let db = g.mul(Cb);
        let Yx = db.point[0];
        let Yy = db.point[1];
        document.querySelector('#eccEnYx').value = Yx;
        document.querySelector('#eccEnYy').value = Yy;

        return EccEncrypt(newText, db, g, q);

    } else {
        let ptest = EccIsPrime(p);
        if (!ptest) {
            return 'p - должно быть простым числом'
        }
        if (!validateEll(a, b, p)) {
            return 'Кривая не соответствует условию'
        }

        let newText = charToMark(EccDecrypt(phrase, Cb, a, b, p));
        return newText;
    }
}

function fillEccEn() {
    let text = document.querySelector('#eccEnArea').value;
    let enA = Number(document.querySelector("#eccEnA").value);
    let enB = Number(document.querySelector("#eccEnB").value);
    let enP = Number(document.querySelector("#eccEnP").value);
    let enGx = Number(document.querySelector("#eccEnGx").value);
    let enGy = Number(document.querySelector("#eccEnGy").value);
    let enCb = Number(document.querySelector("#eccEnCb").value);
    let newText = "";

    newText = spaceWithStart(text);
    newText = EccPrepairPhrase(newText, enA, enB, enP, enGx, enGy, 0, enCb, true);
    
    document.getElementById('eccAfterEn').value = newText;
}

function fillEccDe() {
    let text = document.querySelector('#eccDeArea').value;
    let enA = Number(document.querySelector("#eccEnA").value);
    let enB = Number(document.querySelector("#eccEnB").value);
    let enP = Number(document.querySelector("#eccEnP").value);
    let enCb = Number(document.querySelector("#eccEnCb").value);
    let newText = ""

    newText = EccPrepairPhrase(text, enA, enB, enP, 0, 0, 0, enCb, false);
    newText = spaceWithEnd(newText);

    document.getElementById('eccAfterDe').value = newText;
}

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
// ЦП El Gamal
//
function RsaPowMod(number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modula;
    }
    return result;
}

function ElgGcd(a, b) { 
    if (a == 0) 
        return b; 
    return ElgGcd(b % a, a); 
}

function SRsaModd(x, p) {
    return ((x % p) + p) % p;
}

function SRsaSquareHash(phrase, modula) {
    let hi = 0;
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    Array.from(phrase).forEach(letter => {
        let index = alphabet.indexOf(letter) + 1;
        hi = Math.pow((hi + index), 2) % modula;
    });
    return hi;
}

function SRsaPhi(number) {
    let count = 0;
    for (let x = 1; x <= number; x++) {
        if (ElgGcd(number, x) == 1) {
            count++;
        }
    }
    return count;
}

function SRsaGetB(m, x, a, k, p) {
    let xa = SRsaModd((x * a), p);
    let m_xa = SRsaModd(m - xa, p);
    let k_rv = RsaPowMod(k, SRsaPhi(p) - 1, p);
    return (m_xa * k_rv) % p;
}

function ElgamalSign(phrase, p, g, x, modula) {
    let m = SRsaSquareHash(phrase, modula);
    let k = Math.floor(Math.random() * (p - 2) + 2);
    while (ElgGcd(p - 1, k) !== 1) {
        k = Math.floor(Math.random() * (p - 2) + 2);
    }
    let a = RsaPowMod(g, k, p);
    let b = SRsaGetB(m, x, a, k, p - 1);
    return [a, b];
}

// Для своей фразы
function ElgamalSignTest(phrase, p, g, x, modula) {
    let m = SRsaSquareHash(phrase, modula);
    let k = 5;
    let a = RsaPowMod(g, k, p);
    let b = SRsaGetB(m, x, a, k, p - 1);
    return [a, b];
}

function ElgamalSignCheck(phrase, p, g, y, a, b, modula) {
    let m = SRsaSquareHash(phrase, modula);
    let a1 = (RsaPowMod(y, a, p) * RsaPowMod(a, b, p)) % p;
    let a2 = RsaPowMod(g, m, p);
    return a1 == a2;
}

function SElgPreparePhrase(phrase, p, g, x, y, a, b, crtype) {
    if (crtype) {
        phrase = markToChar(phrase).toLocaleLowerCase();
        let ptest = ElgPrime(p);
        if (p <= 32) {
            return 'p - должно быть больше длины алфавита'
        }
        if (ptest.length != 0) {
            return 'p - должно быть простым числом'
        }
        if (g <= 1 || g >= p) {
            return 'g - должно быть 1 < g < p'
        }
        if (x <= 1 || x > (p - 1)) {
            return 'x - должно быть 1 < x <= p - 1'
        }

        y = ElgGenKey(g, x, p);
        document.getElementById('selgDeY').value = y;
        [a, b] = ElgamalSign(phrase, p, g, x, p);
        // [a, b] = ElgamalSignTest(phrase, p, g, x, 11); // Для теста на своей фразе
        document.getElementById('selgDeA').value = a;
        document.getElementById('selgDeB').value = b;
        
        return `[${a}, ${b}]`

    } else {
        phrase = markToChar(phrase).toLocaleLowerCase();
        let ptest = ElgPrime(p);
        if (p <= 32) {
            return 'p - должно быть больше длины алфавита'
        }
        if (ptest.length != 0) {
            return 'p - должно быть простым числом'
        }
        if (g <= 1 || g >= p) {
            return 'g - должно быть 1 < g < p'
        }
        

        let check = ElgamalSignCheck(phrase, p, g, y, a, b, p);
        // let check = ElgamalSignCheck(phrase, p, g, y, a, b, 11);

        if (check) {
            return 'Цифровая подпись верна';
        } else {
            return 'Цифровая подпись НЕ верна'
        }
    }
}

function fillSElgEn() {
    let text = document.querySelector('#selgEnArea').value;
    let enP = Number(document.querySelector('#selgEnP').value);
    let enG = Number(document.querySelector('#selgEnG').value);
    let enX = Number(document.querySelector('#selgEnX').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = SElgPreparePhrase(newText, enP, enG, enX, 0, 0, 0, true);

    document.getElementById('selgAfterEn').value = newText;
};

function fillSElgDe() {
    let text = document.querySelector('#selgDeArea').value;
    let deP = Number(document.querySelector('#selgDeP').value);
    let deG = Number(document.querySelector('#selgDeG').value); 
    let deY = Number(document.querySelector('#selgDeY').value);
    let deA = Number(document.querySelector('#selgDeA').value);
    let deB = Number(document.querySelector('#selgDeB').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = SElgPreparePhrase(newText, deP, deG, 0, deY, deA, deB, false);

    document.getElementById('selgAfterDe').value = newText;
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
        // [r, s] = G94Sign(phrase, p, q, a, x, 11);
        [r, s] = G94Sign(phrase, p, q, a, x, p);

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
// ГОСТ Р 34.10-2012
//
function G2012Modd(num, p) {
    if (num > 0) {
        return (num % p);
    } else {
        while (num < 0) {
            num += p;
        }
        return num;
    }
}

function G2012Sign(mes, x, g, q, m) {
    let h = SRsaSquareHash(mes, m);
    if (h == 0) {
        h = 1;
    }
    let k = 0;
    let p = new EccPoint(1,1,0,0,m);
    while (p.point == null || p.point[0] == 0) {
        k = Math.floor(Math.random() * (q - 1) + 1);
        // k = 5; // для теста
        p = g.mul(k);
    }
    // document.querySelector('#g2012EnYx').value = p.point[0];
    // document.querySelector('#g2012EnYy').value = p.point[1];

    // let r = EccModd(p.point[0], q);
    let r = G2012Modd(p.point[0], q);
    // console.log(k, h, r, x);
    // let s = EccModd((k*h + r*x), q);
    let s = G2012Modd((k*h + r*x), q);
    return `${r},${s}`;
}

function G2012CheckSign(mes, y, g, q, sign, m) {
    let h = SRsaSquareHash(mes, m);
    if (h == 0) {
        h = 1;
    }   
    let [r, s] = sign.split(',').map(x => Number(x));
    let h1 = EccPowMod(h, q - 2, q); 
    console.log(h, s, h1);
    let u1 = EccModd(s*h1, q);
    // let u1 = G2012Modd(s*h1, q);
    console.log(r,h1);
    let u2 = EccModd(-r * h1, q);
    // let u2 = G2012Modd(-r * h1, q);
    console.log(u1,u2);
    let p = (g.mul(u1)).add(y.mul(u2));
    console.log(p)
    if (p.point == null || (p.point[0] == 0 && p.point[1] == 0)) {
        return false;
    }
    if (EccModd(p.point[0], q) != r) {
        return false;
    } else {
        return true;
    }
}

function G2012PreparePhrase(phrase, a, b, p, Gx, Gy, Yx, Yy, x, q, sign, crtype) {
    if (crtype) {
        phrase = markToChar(phrase).toLocaleLowerCase();

        let ptest = EccIsPrime(p);
        if (!ptest) {
            return 'P - должно быть простым числом'
        }
        if (!validateEll(a, b, p)) {
            return 'Кривая не соответствует условию'
        }
        let n = EccGetPoints(a, b, p).length + 1;
        // q = 7;
        q = EccGetQ(n);
        document.querySelector('#g2012EnQ').value = q;
        if (x < 1 || x >= q) {
            return 'x - должно быть 0 < x < q';
        }

        let g = new EccPoint(a, b, Gx, Gy, p);
        let y = g.mul(x);
        document.querySelector('#g2012EnYx').value = y.point[0];
        document.querySelector('#g2012EnYy').value = y.point[1];

        let [r, s] = G2012Sign(phrase, x, g, q, p).split(',').map(x => Number(x));
        
        document.getElementById('g2012DeRS').value = `${r},${s}`;
        return `${r},${s}`

    } else {
        phrase = markToChar(phrase).toLocaleLowerCase();

        let ptest = EccIsPrime(p);
        if (!ptest) {
            return 'P - должно быть простым числом'
        }
        if (!validateEll(a, b, p)) {
            return 'Кривая не соответствует условию'
        }
        let [r, s] = sign.split(',').map(x => Number(x));
        if (r <= 0) {
            return 'r - должно быть r > 0'
        }
        if (s >= q) {
            return 's - должно быть s < q'
        }
        
        let g = new EccPoint(a, b, Gx, Gy, p);
        let y = new EccPoint(a, b, Yx, Yy, p);
        let check = G2012CheckSign(phrase, y, g, q, sign, p);

        if (check) {
            return 'Цифровая подпись верна';
        } else {
            return 'Цифровая подпись НЕ верна'
        }
    }
}

function fillG2012En() {
    let text = document.querySelector('#g2012EnArea').value;
    let enA = Number(document.querySelector('#g2012EnA').value);
    let enB = Number(document.querySelector('#g2012EnB').value);
    let enP = Number(document.querySelector('#g2012EnP').value);
    let enGx = Number(document.querySelector('#g2012EnGx').value);
    let enGy = Number(document.querySelector('#g2012EnGy').value);
    let enX = Number(document.querySelector('#g2012EnX').value);
    let newText = "";

    newText = spaceWithout(text);
    newText = G2012PreparePhrase(newText, enA, enB, enP, enGx, enGy, 0, 0, enX, 0, 0, true);

    document.getElementById('g2012AfterEn').value = String(newText);
};

function fillG2012De() {
    let text = document.querySelector('#g2012DeArea').value;
    let enA = Number(document.querySelector('#g2012EnA').value);
    let enB = Number(document.querySelector('#g2012EnB').value);
    let enP = Number(document.querySelector('#g2012EnP').value);
    let enGx = Number(document.querySelector('#g2012EnGx').value);
    let enGy = Number(document.querySelector('#g2012EnGy').value);
    let enYx = Number(document.querySelector('#g2012EnYx').value);
    let enYy = Number(document.querySelector('#g2012EnYy').value);
    let enQ = Number(document.querySelector('#g2012EnQ').value);
    let enSign = document.querySelector('#g2012DeRS').value;

    let newText = "";

    newText = spaceWithout(text);
    newText = G2012PreparePhrase(newText, enA, enB, enP, enGx, enGy, enYx, enYy, 0, enQ, enSign, false);

    document.getElementById('g2012AfterDe').value = newText;
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
    document.querySelector('#atbashEnBtn').
        addEventListener('click', event => {
            fillAtbashEn();
        });
    document.querySelector('#atbashDeBtn').
        addEventListener('click', event => {
            fillAtbashDe();
        });
    document.querySelector('#caesarEnBtn').
        addEventListener('click', event => {
            fillCaesarEn();
        });
    document.querySelector('#caesarDeBtn').
        addEventListener('click', event => {
            fillCaesarDe();
        });
    document.querySelector('#polibiEnBtn').
        addEventListener('click', event => {
            fillPolibiEn();
        });
    document.querySelector('#polibiDeBtn').
        addEventListener('click', event => {
            fillPolibiDe();
        });
    document.querySelector('#tritemEnBtn').
        addEventListener('click', event => {
            fillTritemEn();
        });
    document.querySelector('#tritemDeBtn').
        addEventListener('click', event => {
            fillTritemDe();
        });
    document.querySelector('#belazoEnBtn').
        addEventListener('click', event => {
            fillBelazoEn();
        });
    document.querySelector('#belazoDeBtn').
        addEventListener('click', event => {
            fillBelazoDe();
        });
    document.querySelector('#vishenerEnBtn').
        addEventListener('click', event => {
            fillVishenerEn();
        });
    document.querySelector('#vishenerDeBtn').
        addEventListener('click', event => {
            fillVishenerDe();
        });
    document.querySelector('#sblokEnBtn').
        addEventListener('click', event => {
            fillSblokEn();
        });
    document.querySelector('#sblokDeBtn').
        addEventListener('click', event => {
            fillSblokDe();
        });
    document.querySelector('#matrEnBtn').
        addEventListener('click', event => {
            fillMatrEn();
        });
    document.querySelector('#matrDeBtn').
        addEventListener('click', event => {
            fillMatrDe();
        });
    document.querySelector('#playfairEnBtn').
        addEventListener('click', event => {
            fillPlayfairEn();
        });
    document.querySelector('#playfairDeBtn').
        addEventListener('click', event => {
            fillPlayfairDe();
        });
    document.querySelector('#vertEnBtn').
        addEventListener('click', event => {
            fillVertEn();
        });
    document.querySelector('#vertDeBtn').
        addEventListener('click', event => {
            fillVertDe();
        });
    document.querySelector('#cardanoEnBtn').
        addEventListener('click', event => {
            fillCardanoEn();
        });
    document.querySelector('#cardanoDeBtn').
        addEventListener('click', event => {
            fillCardanoDe();
        });
    document.querySelector('#festEnBtn').
        addEventListener('click', event => {
            fillFestEn();
        });
    document.querySelector('#festDeBtn').
        addEventListener('click', event => {
            fillFestDe();
        });
    document.querySelector('#shenEnBtn').
        addEventListener('click', event => {
            fillShenEn();
        });
    document.querySelector('#shenDeBtn').
        addEventListener('click', event => {
            fillShenDe();
        });
    document.querySelector('#gamEnBtn').
        addEventListener('click', event => {
            fillGamEn();
        });
    document.querySelector('#gamDeBtn').
        addEventListener('click', event => {
            fillGamDe();
        });
    document.querySelector('#a51EnBtn').
        addEventListener('click', event => {
            fillA51En();
        });
    document.querySelector('#a51DeBtn').
        addEventListener('click', event => {
            fillA51De();
        });
    document.querySelector('#a52EnBtn').
        addEventListener('click', event => {
            fillA52En();
        });
    document.querySelector('#a52DeBtn').
        addEventListener('click', event => {
            fillA52De();
        });
    document.querySelector('#magmaEnBtn').
        addEventListener('click', event => {
            fillMagmaEn();
        });
    document.querySelector('#magmaDeBtn').
        addEventListener('click', event => {
            fillMagmaDe();
        });
    document.querySelector('#aesEnBtn').
        addEventListener('click', event => {
            fillAesEn();
        });
    document.querySelector('#aesDeBtn').
        addEventListener('click', event => {
            fillAesDe();
        });
    document.querySelector('#kuzEnBtn').
        addEventListener('click', event => {
            fillKuzEn();
        });
    document.querySelector('#kuzDeBtn').
        addEventListener('click', event => {
            fillKuzDe();
        });
    document.querySelector('#rsaEnBtn').
        addEventListener('click', event => {
            fillRsaEn();
        });
    document.querySelector('#rsaDeBtn').
        addEventListener('click', event => {
            fillRsaDe();
        });
    document.querySelector('#elgEnBtn').
        addEventListener('click', event => {
            fillElgEn();
        });
    document.querySelector('#elgDeBtn').
        addEventListener('click', event => {
            fillElgDe();
        });
    document.querySelector('#srsaEnBtn').
        addEventListener('click', event => {
            fillSRsaEn();
        });
    document.querySelector('#srsaDeBtn').
        addEventListener('click', event => {
            fillSRsaDe();
        });
    document.querySelector('#selgEnBtn').
        addEventListener('click', event => {
            fillSElgEn();
        });
    document.querySelector('#selgDeBtn').
        addEventListener('click', event => {
            fillSElgDe();
        });
    document.querySelector('#eccEnBtn').
        addEventListener('click', event => {
            fillEccEn();
        });
    document.querySelector('#eccDeBtn').
        addEventListener('click', event => {
            fillEccDe();
        });
    document.querySelector('#g94EnBtn').
        addEventListener('click', event => {
            fillG94En();
        });
    document.querySelector('#g94DeBtn').
        addEventListener('click', event => {
            fillG94De();
        });
    document.querySelector('#g2012EnBtn').
        addEventListener('click', event => {
            fillG2012En();
        });
    document.querySelector('#g2012DeBtn').
        addEventListener('click', event => {
            fillG2012De();
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
    document.querySelector('#atbashPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempNv = event.target;
        tempNv.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#atbash').classList.remove('hidden');
        state.activeSection = document.querySelector('#atbash');
    });
    document.querySelector('#caesarPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#caesar').classList.remove('hidden');
        state.activeSection = document.querySelector('#caesar');
    });
    document.querySelector('#polibiPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#polibi').classList.remove('hidden');
        state.activeSection = document.querySelector('#polibi');
    });
    document.querySelector('#tritemPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#tritem').classList.remove('hidden');
        state.activeSection = document.querySelector('#tritem');
    });
    document.querySelector('#belazoPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#belazo').classList.remove('hidden');
        state.activeSection = document.querySelector('#belazo');
    });
    document.querySelector('#vishenerPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#vishener').classList.remove('hidden');
        state.activeSection = document.querySelector('#vishener');
    });
    document.querySelector('#sblokPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#sblok').classList.remove('hidden');
        state.activeSection = document.querySelector('#sblok');
    });
    document.querySelector('#matrPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#matr').classList.remove('hidden');
        state.activeSection = document.querySelector('#matr');
    });
    document.querySelector('#playfairPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#playfair').classList.remove('hidden');
        state.activeSection = document.querySelector('#playfair');
    });
    document.querySelector('#vertPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#vert').classList.remove('hidden');
        state.activeSection = document.querySelector('#vert');
    });
    document.querySelector('#cardanoPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#cardano').classList.remove('hidden');
        state.activeSection = document.querySelector('#cardano');
    });
    document.querySelector('#festPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#fest').classList.remove('hidden');
        state.activeSection = document.querySelector('#fest');
    });
    document.querySelector('#shenPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#shen').classList.remove('hidden');
        state.activeSection = document.querySelector('#shen');
    });
    document.querySelector('#gamPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#gam').classList.remove('hidden');
        state.activeSection = document.querySelector('#gam');
    });
    document.querySelector('#kuzPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#kuz').classList.remove('hidden');
        state.activeSection = document.querySelector('#kuz');
    });
    document.querySelector('#a51Page').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#a51').classList.remove('hidden');
        state.activeSection = document.querySelector('#a51');
    });
    document.querySelector('#a52Page').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#a52').classList.remove('hidden');
        state.activeSection = document.querySelector('#a52');
    });
    document.querySelector('#magmaPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#magma').classList.remove('hidden');
        state.activeSection = document.querySelector('#magma');
    });
    document.querySelector('#aesPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#aes').classList.remove('hidden');
        state.activeSection = document.querySelector('#aes');
    });
    document.querySelector('#rsaPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#rsa').classList.remove('hidden');
        state.activeSection = document.querySelector('#rsa');
    });
    document.querySelector('#elgPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#elg').classList.remove('hidden');
        state.activeSection = document.querySelector('#elg');
    });
    document.querySelector('#eccPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#ecc').classList.remove('hidden');
        state.activeSection = document.querySelector('#ecc');
    });
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
    document.querySelector('#selgPage').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#selg').classList.remove('hidden');
        state.activeSection = document.querySelector('#selg');
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
    document.querySelector('#g2012Page').addEventListener('click', event => {
        if (state.activeNvBar) {
            state.activeNvBar.classList.remove('activeNv');
        }
        let tempSec = event.target;
        tempSec.classList.add("activeNv");
        state.activeNvBar = event.target;

        if (state.activeSection) {
            state.activeSection.classList.add('hidden');
        }
        document.querySelector('#g2012').classList.remove('hidden');
        state.activeSection = document.querySelector('#g2012');
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
    document.querySelector("#atbashSpaceType").addEventListener('click', event => {
        spaceTypes.atbashSpace = document.querySelector("#atbashSpaceType").checked;
    });
    document.querySelector("#caesarSpaceType").addEventListener('click', event => {
        spaceTypes.caesarSpace = document.querySelector("#caesarSpaceType").checked;
    });
    document.querySelector("#polibiSpaceType").addEventListener('click', event => {
        spaceTypes.polibiSpace = document.querySelector("#polibiSpaceType").checked;
    });
    document.querySelector("#tritemSpaceType").addEventListener('click', event => {
        spaceTypes.tritemSpace = document.querySelector("#tritemSpaceType").checked;
    });
    document.querySelector("#belazoSpaceType").addEventListener('click', event => {
        spaceTypes.belazoSpace = document.querySelector("#belazoSpaceType").checked;
    });
    document.querySelector("#vishenerSpaceType").addEventListener('click', event => {
        spaceTypes.vishenerSpace = document.querySelector("#vishenerSpaceType").checked;
    });
    document.querySelector("#sblokSpaceType").addEventListener('click', event => {
        spaceTypes.sblokSpace = document.querySelector("#sblokSpaceType").checked;
    });
    document.querySelector("#matrSpaceType").addEventListener('click', event => {
        spaceTypes.matrSpace = document.querySelector("#matrSpaceType").checked;
    });
    document.querySelector("#playfairSpaceType").addEventListener('click', event => {
        spaceTypes.playfairSpace = document.querySelector("#playfairSpaceType").checked;
    });
    document.querySelector("#vertSpaceType").addEventListener('click', event => {
        spaceTypes.vertSpace = document.querySelector("#vertSpaceType").checked;
    });
    document.querySelector("#cardanoSpaceType").addEventListener('click', event => {
        spaceTypes.cardanoSpace = document.querySelector("#cardanoSpaceType").checked;
    });
    document.querySelector("#festSpaceType").addEventListener('click', event => {
        spaceTypes.festSpace = document.querySelector("#festSpaceType").checked;
    });
    document.querySelector("#shenSpaceType").addEventListener('click', event => {
        spaceTypes.shenSpace = document.querySelector("#shenSpaceType").checked;
    });
    document.querySelector("#gamSpaceType").addEventListener('click', event => {
        spaceTypes.gamSpace = document.querySelector("#gamSpaceType").checked;
    });
    document.querySelector("#magmaSpaceType").addEventListener('click', event => {
        spaceTypes.magmaSpace = document.querySelector("#magmaSpaceType").checked;
    });
    document.querySelector("#kuzSpaceType").addEventListener('click', event => {
        spaceTypes.kuzSpace = document.querySelector("#kuzSpaceType").checked;
    });
    document.querySelector("#aesSpaceType").addEventListener('click', event => {
        spaceTypes.aesSpace = document.querySelector("#aesSpaceType").checked;
    });
    document.querySelector("#rsaSpaceType").addEventListener('click', event => {
        spaceTypes.rsaSpace = document.querySelector("#rsaSpaceType").checked;
    });
    document.querySelector("#elgSpaceType").addEventListener('click', event => {
        spaceTypes.elgSpace = document.querySelector("#elgSpaceType").checked;
    });
    // document.querySelector("#eccSpaceType").addEventListener('click', event => {
    //     spaceTypes.eccSpace = document.querySelector("#eccSpaceType").checked;
    // });

    // document.querySelector("#srsaSpaceType").addEventListener('click', event => {
    //     spaceTypes.srsaSpace = document.querySelector("#srsaSpaceType").checked;
    // });
    

    // Дополнительные кнопки
    // Изменение размера матрицы
    document.querySelector('#matrAcept').addEventListener('click', event => {
        document.querySelector(`#${matr.matrActiveEn}`).classList.add("hidden");
        document.querySelector(`#${matr.matrActiveDe}`).classList.add("hidden");
        matr.matrSize = document.querySelector("#matrSize").value;
        matr.matrActiveEn = `tableEn${matr.matrSize}`;
        matr.matrActiveDe = `tableDe${matr.matrSize}`;
        document.querySelector(`#${matr.matrActiveEn}`).classList.remove("hidden");
        document.querySelector(`#${matr.matrActiveDe}`).classList.remove("hidden");
    });

    fillCardanoTable();
};