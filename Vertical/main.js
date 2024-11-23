const ru = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И'
    , 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'
    , 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    , 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'
    , 'x', 'y', 'z'];

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

function decryptFunction(key, text) {

    key = key.toUpperCase();

    let key1 = key.split("").sort().join("");

    text = text.toUpperCase();

    let hight = Math.ceil(text.length / key.length)
    let weight = text.length % key.length;
    if (weight == 0) {
        weight += key.length;
    }

    console.log("t: " + text);
    console.log("k: " + key + " " + key1);
    console.log("high: " + hight + " " + weight);
    let arr = new Array(hight);
    let decryptedText = "";

    for (let i = 0 ; i < hight; i ++) {
        arr[i] = new Array(key.length);
    }

    let index = 0;

    for (let i = 0 ; i < key.length; i ++) {
        for (let j = 0 ; j < key.length; j ++) {
            if (key1[i] == key[j]) {
                for (let m = 0 ; m < hight; m ++) {
                    if (m % 2 == 0) {
                        if (j >= weight) {
                            if (m + 1 == hight) {
                                arr[m][j] = "";
                                console.log("YES");
                            } else {
                                arr[m][j] = text[index];
                                index++;
                            }
                        } else {
                            arr[m][j] = text[index];
                            index++;
                        }
                    } else {
                        if (j <= key.length - weight - 1) {
                            if (m + 1 == hight) {
                                arr[m][j] = "";
                                console.log("YES");
                            } else {
                                arr[m][j] = text[index];
                                index++;
                            }
                        } else {
                            arr[m][j] = text[index];
                            index++;
                        }
                    }
                }
                if (key1[i] == key1[i+1]) {
                    i ++;
                }
            }
        }
    }

    for (let i = 0 ; i < hight; i ++) {
        for (let j = 0 ; j < key.length; j ++) {
            if (i % 2 == 0) {
                decryptedText += arr[i][j];
            } else {
                decryptedText += arr[i][key.length - j - 1];
            }
        }
    }

    console.log(arr);
    console.log(decryptedText);

    decryptedText = textToPoint(decryptedText);
    return decryptedText;
}


function encryptFunction(key, text) {

    key = key.toUpperCase();

    let key1 = key.split("").sort().join("");

    text = text.toUpperCase();
    text = pointToText(text);

    let hight = Math.ceil(text.length / key.length)
    let arr = new Array(hight);
    let encryptedText = "";

    console.log("t: " + text);
    console.log("k: " + key + " " + key1);
    console.log("high: " + hight);

    for (let i = 0 ; i < hight; i ++) {
        arr[i] = new Array(key.length);
        for (let j = 0 ; j < key.length; j ++) {
            if (i % 2 == 0) {
                if (i * key.length + j < text.length) {
                    arr[i][j] = text[i * key.length + j];
                } else {
                    arr[i][j] = "";
                }
            } else {
                if (i * key.length + j < text.length) {
                    arr[i][key.length - j - 1] = text[i * key.length + j];
                } else {
                    arr[i][key.length - j - 1] = "";
                }
            }
        }
    }

    for (let i = 0 ; i < key.length; i ++) {
        if (key1[i+1] != key1[i]){
            for (let j = 0 ; j < key.length; j ++) {
                if (key1[i] == key[j]) {
                    for (let m = 0 ; m < hight; m ++) {
                        encryptedText += arr[m][j];
                    }
                }
            }
        }        
    }

    console.log(arr);
    console.log(encryptedText);
    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;

    
    const encryptedText = encryptFunction(key, text);
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let key = document.getElementById('key').value;
    let text = document.getElementById('text').value;
    // Здесь нужно использовать алгоритм расшифрования
    const decryptedText = decryptFunction(key, text);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}