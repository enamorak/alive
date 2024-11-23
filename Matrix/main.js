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

function MultiplyMatrix(A,B)
{
    let n = B.length;
    let ans = new Array(n);

    for (let j = 0; j < n; j++) { 
        let t = 0;
        for (let m = 0; m < n; m++) {
            t += A[m][j]*B[m];
        } 
        ans[j] = t;
    }
    return ans;
}

function Determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function AdjugateMatrix(A)   // A - двумерный квадратный массив
{                                        
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[ i ] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[ i ][j] = sign*Determinant(B);   // Функцию Determinant см. выше
        }
     }
    return adjA;
}

function InverseMatrix(A)   // A - двумерный квадратный массив
{   
    var det = Determinant(A);                // Функцию Determinant см. выше
    if (det == 0) {
        document.getElementById('message-text').innerText = 
        'Детерминант равен нулю!!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }
    var N = A.length, A = AdjugateMatrix(A); // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[ i ][j] /= det; }
    return A;
}

function decryptFunction(key, text) {

    arr = key.split(" ");
    text = text.split(",");
    console.log(text);
    let decryptedText = "";

    if (arr[0]*arr[0] != arr.length - 1) {
        document.getElementById('message-text').innerText = 
        'Ключ неверен!!! Введите сторону матрицы, а далее всех ее членов';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    let matr1 = new Array(arr[0]);
    let matr2 = new Array(arr[0]);

    for (let i = 0; i < arr[0]; i ++) {
        matr1[i] = new Array(arr[0]);
    }
    
    for (let i = 1; i < arr.length; i ++) {
        matr1[Math.floor((i-1) / arr[0])][(i-1) % arr[0]] = arr[i];
    }

    if (Determinant(matr1) == 0) {
        document.getElementById('message-text').innerText = 
        'Детерминант равен нулю!!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    matr1 = InverseMatrix(matr1);

    for (let i = 0 ; i < text.length; i += Number(arr[0])) {
        for (let m = 0 ; m < arr[0] ; m ++) {
            matr2[m] = text[i + m];
        }
        let matr3 = MultiplyMatrix(matr1, matr2);
        for (let m = 0 ; m < arr[0] ; m ++) {
            let item = Number(Math.round(matr3[m]));
            if (item != 37) {
                while (item < 0) {
                    item += ru.length;
                }
                decryptedText += ru[item % ru.length];
            }
        }
    }

    for (let j = decryptedText.length - 1; j >= 0; j --) {
        let isNo = true;
        for (let i = 0; i < ru.length; i ++) {
            if (decryptedText[j] == ru[i]) {
                isNo = false;   
                i = ru.length;
            }
        }
        if (isNo) {
            decryptedText = decryptedText.substring(0, decryptedText.length - 1);
        }
    }
    decryptedText = textToPoint(decryptedText);

    
    return decryptedText;
}

function encryptFunction(key, text) {

    arr = key.split(" ");
    text = text.toUpperCase();
    text = pointToText(text);
    let encryptedText = "";

    if (arr[0]*arr[0] != arr.length - 1) {
        document.getElementById('message-text').innerText = 
        'Ключ неверен!!! Введите сторону матрицы, а далее всех ее членов';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    let matr1 = new Array(arr[0]);
    let matr2 = new Array(arr[0]);

    for (let i = 0; i < arr[0]; i ++) {
        matr1[i] = new Array(arr[0]);
    }
    
    for (let i = 1; i < arr.length; i ++) {
        matr1[Math.floor((i-1) / arr[0])][(i-1) % arr[0]] = arr[i];
    }

    if (Determinant(matr1) == 0) {
        document.getElementById('message-text').innerText = 
        'Детерминант равен нулю!!!!';
        document.getElementById('message-box').removeAttribute('hidden');
        throw new Error();
    }

    for (let i = 0 ; i < text.length; i += Number(arr[0])) {
        for (let m = 0 ; m < arr[0] ; m ++) {
            for (let j = 0 ; j < ru.length ; j ++) {
                if ((i + m) < text.length) {
                    if (text[i + m] == ru[j]) {
                        matr2[m] = j;
                    }
                } else {
                    matr2[m] = 37;
                } 
            }
        }
        
        let matr3 = MultiplyMatrix(matr1, matr2);
        //console.log(matr1 + "\n" + matr2 + "\n" + matr3);
        for (let m = 0 ; m < arr[0]; m ++) {
            encryptedText += (matr3[m]  + ",");
        }
    }

    encryptedText = encryptedText.substring(0, encryptedText.length - 1);
    
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