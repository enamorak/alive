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

function FindRSA(text, P, Q, E, p) {
    for (let i = 2; i <= P/i; i++) {
        if (P % i == 0) {
            document.getElementById('message-text').innerText =  'P - должно быть простым!!!';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
    }
    for (let i = 2; i <= Q/i; i++) {
        if (Q % i == 0) {
            document.getElementById('message-text').innerText =  'Q - должно быть простым!!!';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
    }

    let N = P * Q;

    if (N < 11) {
        document.getElementById('message-text').innerText =  'N - должно быть больше 11!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    if (E == D) {
        document.getElementById('message-text').innerText =  'E не должно быть равно N!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    let F = (P - 1) * (Q - 1);

    for (let i = 2; i <= E; i++) {
        if (E % i == 0 && F % i == 0) {
            document.getElementById('message-text').innerText =  'E и F(N) - должны быть взаимнопростыми!!!';
            document.getElementById('message-box').removeAttribute('hidden');
            throw new Error();
        }
    }

    let D = 1;
    for (let i = 0; i < F-1; i ++) {
        D = (D * E) % F;
    }

    let m = 0;
    let j = 0;
    for (let i = 0; i < text.length; i++) {
        for (let n = 0; n < ru.length; n ++) {
            if (text[i] == ru[n]) {
                j = n + 1;
            }
        }
        m = ((m + j) * (m + j)) % p;
    }
    if (m == 0) {
        m = 1;
    }

    let S = 1;
    for (let i = 0; i < D; i ++) {
        S = (S * m) % N;
    }
    
    document.getElementById('D').value = D;
    document.getElementById('N').value = N;
    document.getElementById('S').value = S;

    return S;
}


function isRightRSA(text, E, N, p, S) {
    let m = 0;
    let j = 0;
    for (let i = 0; i < text.length; i++) {
        for (let n = 0; n < ru.length; n ++) {
            if (text[i] == ru[n]) {
                j = n + 1;
            }
        }
        m = ((m + j) * (m + j)) % p;
    }

    let mm = 1;
    for (let i = 0; i < E; i ++) {
        mm = (mm * S) % N;
    }

    console.log('m`= ' + mm + '\nm= ' + m);

    if (mm == m) {
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
    let Q = Number(document.getElementById('Q').value);
    let E = Number(document.getElementById('E').value);

    document.getElementById('result').value = FindRSA(text, P, Q, E, 11);
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    text = pointToText(text).toLocaleLowerCase();
    let N = Number(document.getElementById('N').value); 
    let S = Number(document.getElementById('S').value);
    let E = Number(document.getElementById('E').value);
    
    if (isRightRSA(text, E, N, 11, S)) {
        document.getElementById('result').value = "Подпись верна";
    } else {
        document.getElementById('result').value = "Подпись не верна";
    }
    document.getElementById('message-box').removeAttribute('hidden');
}