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

function EccModd(value, mod) {
    return ((value % mod) + mod) % mod;
}

function validateEll(a, b, modul) {
    return EccModd(4 * (a ** 3) + 27 * (b ** 2), modul) != 0;
}

function EccPowMod(number, power, modula) {
    let result = number;
    for (let i = 1; i < power; i++) {
        result *= number;
        result %= modula;
    }
    return result;
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

function EccGcd(a, b) { 
    if (a == 0) 
        return b; 
    return EccGcd(b % a, a); 
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

function SRsaSquareHash(phrase, modula) {
    let hi = 0;
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    Array.from(phrase).forEach(letter => {
        let index = alphabet.indexOf(letter) + 1;
        hi = Math.pow((hi + index), 2) % modula;
    });
    return hi;
}


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
    let r = G2012Modd(p.point[0], q);
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
    console.log(r,h1);
    let u2 = EccModd(-r * h1, q);
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
        phrase = pointToText(phrase).toLocaleLowerCase();

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
        document.getElementById('EnQ').value = q;
        if (x < 1 || x >= q) {
            return 'x - должно быть 0 < x < q';
        }

        let g = new EccPoint(a, b, Gx, Gy, p);
        let y = g.mul(x);
        document.getElementById('EnYx').value = y.point[0];
        document.getElementById('EnYy').value = y.point[1];

        let [r, s] = G2012Sign(phrase, x, g, q, p).split(',').map(x => Number(x));
        
        document.getElementById('DeRS').value = `${r},${s}`;
        return `${r},${s}`

    } else {
        phrase = pointToText(phrase).toLocaleLowerCase();

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

// функции взаимодействия с интерфейсом
function encryptText() {
    let text = document.getElementById('text').value;
    let enA = Number(document.getElementById('EnA').value);
    let enB = Number(document.getElementById('EnB').value);
    let enP = Number(document.getElementById('EnP').value);
    let enGx = Number(document.getElementById('EnGx').value);
    let enGy = Number(document.getElementById('EnGy').value);
    let enX = Number(document.getElementById('EnX').value);
    let encryptedText = "";

    encryptedText = G2012PreparePhrase(text, enA, enB, enP, enGx, enGy, 0, 0, enX, 0, 0, true);

    document.getElementById('result').value = encryptedText;
    document.getElementById('message-box').removeAttribute('hidden');
}

function decryptText() {
    let text = document.getElementById('text').value;
    let enA = Number(document.getElementById('EnA').value);
    let enB = Number(document.getElementById('EnB').value);
    let enP = Number(document.getElementById('EnP').value);
    let enGx = Number(document.getElementById('EnGx').value);
    let enGy = Number(document.getElementById('EnGy').value);
    let enYx = Number(document.getElementById('EnYx').value);
    let enYy = Number(document.getElementById('EnYy').value);
    let enQ = Number(document.getElementById('EnQ').value);
    let enSign = document.getElementById('DeRS').value;

    let decryptedText = "";

    decryptedText = G2012PreparePhrase(text, enA, enB, enP, enGx, enGy, enYx, enYy, 0, enQ, enSign, false);
    
    document.getElementById('result').value = decryptedText;
    document.getElementById('message-box').removeAttribute('hidden');
}