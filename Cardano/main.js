const ru = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И'
    , 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'
    , 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    , 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'
    , 'x', 'y', 'z'];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 10; j++) {
            const gridItem = document.createElement('input');
            gridItem.setAttribute('type', 'checkbox');
            gridItem.classList.add('grid-item');
            gridContainer.appendChild(gridItem);
        }
    }

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
    text = text.toUpperCase();
    text = pointToText(text);
    let decryptedText = "";

    for (let i = 0; i < text.length; i++) {

        let indexKey = 0;
        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == key[i % key.length]) {
                indexKey = j;
            }
        }

        let indexText = 0;
        for (let j = 0 ; j < ru.length; j++) {
            if (ru[j] == text[i]) {
                indexText = j;
            }
        }

        let index = indexText - indexKey;
        
        if (index < 0) {
            index += ru.length; 
        }

        decryptedText += ru[index];
    }

    decryptedText = textToPoint(decryptedText);
    return decryptedText;
}


function encryptFunction(text, desc) {

    text = text.toUpperCase();
    text = pointToText(text);

    const gridItems = document.querySelectorAll('.grid-item');
    let matrixArray = [];

    gridItems.forEach(item => {
        if (item.checked) {
            matrixArray.push(1); // Заполненная ячейка
        } else {
            matrixArray.push(0); // Незаполненная ячейка
        }
    });

    
    let matrix2Array = new Array(matrixArray.length);
    let matrix4Array = new Array(matrixArray.length);
    let matrix3Array = new Array(matrixArray.length);

    for (let i = 0 ; i < matrixArray.length / 2; i ++) {
        let x = Math.floor(i / 10);
        let y = i % 10;
        matrix3Array[(7-x) * 10 + y] = matrixArray[i];
        matrix3Array[i] = matrixArray[(7-x) * 10 + y];
    }

    for (let i = 0 ; i < matrixArray.length / 2; i ++) {
        matrix2Array[i] = matrixArray[matrixArray.length - i - 1];
        matrix2Array[matrixArray.length - i - 1] = matrixArray[i];

        matrix4Array[i] = matrix3Array[matrixArray.length - i - 1];
        matrix4Array[matrixArray.length - i - 1] = matrix3Array[i];
    }


    for (let i = 0 ; i < matrixArray.length; i ++) {
        if ((matrixArray[i] == 1 && 1 == matrix2Array[i]) || (matrixArray[i] == 1 && 1 == matrix3Array[i]) ||
            (matrixArray[i] == 1 && 1 == matrix4Array[i]) || (matrix2Array[i] == 1 && 1 == matrix3Array[i]) ||
            (matrix2Array[i] == 1 && 1 == matrix4Array[i]) || (matrix3Array[i] == 1 && 1 == matrix4Array[i])) {
                document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Введите решетку которая не накладывается сама на себя при поворотах';
                document.getElementById('message-box').removeAttribute('hidden');
                throw new Error();
        } else {
            if (matrixArray[i] == 0 && matrix2Array[i] == 0 && matrix3Array[i] == 0 && matrix4Array[i] == 0) {
                document.getElementById('message-text').innerText = 
                'Ключ неверен!!! Решетка имеет пустое место на: ' + (i + 1) + ' месте';
                document.getElementById('message-box').removeAttribute('hidden');
                throw new Error();
            }
        }
    }

    let encryptedText = "";
    let decryptedText = "";

    let ans = new Array(8);
    for (let i = 0; i < 8; i++) {
        ans[i] = new Array(10);
    }

    for (let n = 0 ; n < text.length; n += 80) {
        let x = 0;

        if (desc) {
            for (let i = 0 ; i < matrixArray.length; i ++) {
                ans[Math.floor(i / 10)][i % 10] = text[n + i];
            }
        }

        for (let i = 0 ; i < matrixArray.length; i++) {
            if (matrixArray[i] == 1) {
                if (desc) {
                    decryptedText += ans[Math.floor(i / 10)][i % 10];
                } else {
                    if (n + x < text.length) {
                        ans[Math.floor(i / 10)][i % 10] = text[n + x];
                        x++;
                    } else {
                        ans[Math.floor(i / 10)][i % 10] = "Ъ";
                    }
                }
            }
        }

        for (let i = 0 ; i < matrix2Array.length; i++) {
            if (matrix2Array[i] == 1) {
                if (desc) {
                    decryptedText += ans[Math.floor(i / 10)][i % 10];
                } else {
                    if (n + x < text.length) {
                        ans[Math.floor(i / 10)][i % 10] = text[n + x];
                        x++;
                    } else {
                        ans[Math.floor(i / 10)][i % 10] = "Ъ";
                    }
                }
            }
        }

        for (let i = 0 ; i < matrix3Array.length; i++) {
            if (matrix3Array[i] == 1) {
                if (desc) {
                    decryptedText += ans[Math.floor(i / 10)][i % 10];
                } else {
                    if (n + x < text.length) {
                        ans[Math.floor(i / 10)][i % 10] = text[n + x];
                        x++;
                    } else {
                        ans[Math.floor(i / 10)][i % 10] = "Ъ";
                    }
                }
            }
        }

        for (let i = 0 ; i < matrix4Array.length; i++) {
            if (matrix4Array[i] == 1) {
                if (desc) {
                    decryptedText += ans[Math.floor(i / 10)][i % 10];
                } else {
                    if (n + x < text.length) {
                        ans[Math.floor(i / 10)][i % 10] = text[n + x];
                        x++;
                    } else {
                        ans[Math.floor(i / 10)][i % 10] = "Ъ";
                    }
                }
            }
        }

        if (!desc) {
            for (let i = 0 ; i < ans.length; i ++) {
                for (let j = 0 ; j < ans[i].length; j ++) {
                    encryptedText += ans[i][j];
                }
            }
        }
    }
    
    if (desc) {
        while (decryptedText[decryptedText.length - 1] == "Ъ") {
            decryptedText = decryptedText.substring(0, decryptedText.length - 1);
        }
        decryptedText = textToPoint(decryptedText);
        return decryptedText;
    }
    
    return encryptedText;
}

function encryptText() {
    // получение данных с формы
    let text = document.getElementById('text').value;

    
    const encryptedText = encryptFunction(text, false);
    document.getElementById('result').value = encryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст зашифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    // Здесь нужно использовать алгоритм расшифрования
    const decryptedText = encryptFunction(text, true);
    document.getElementById('result').value = decryptedText;

    // Показываем сообщение
    document.getElementById('message-text').innerText = 
        'Текст расшифрован';
    document.getElementById('message-box').removeAttribute('hidden');
}