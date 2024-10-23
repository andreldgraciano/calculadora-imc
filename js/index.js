const imcRanges = [
    { min: 0, max: 18.5, description: 'Abaixo do peso' },
    { min: 18.5, max: 24.9, description: 'Peso normal' },
    { min: 25, max: 29.9, description: 'Sobrepeso' },
    { min: 30, max: 34.9, description: 'Obesidade grau 1' },
    { min: 35, max: 39.9, description: 'Obesidade grau 2' },
    { min: 40, max: Infinity, description: 'Obesidade grau 3' },
];

const listImcRanges = document.getElementById('listImcRanges');
const listImcDescriptions = document.getElementById('listImcDescriptions');

imcRanges.forEach(range => {
    const liValue = document.createElement('li');
    liValue.textContent = `${range.min.toFixed(2)} - ${range.max.toFixed(2)}`;
    listImcRanges.appendChild(liValue);

    const liDescription = document.createElement('li');
    liDescription.textContent = range.description;
    listImcDescriptions.appendChild(liDescription);
});

const formImc = document.getElementById('formImc');

formImc.addEventListener('submit', function (e) {
    e.preventDefault();
    const pesoInput = e.target.querySelector('#peso').value;
    const alturaInput = e.target.querySelector('#altura').value;

    pesoValue = Number(pesoInput);
    alturaValue = Number(alturaInput) / 100;

    if (!pesoValue && !alturaValue) {
        setResultado('Peso e altura inválidos', false, erro = 0);
        return;
    }

    if (!pesoValue) {
        setResultado('Peso inválido', false, erro = 1);
        return;
    }

    if (!alturaValue) {
        setResultado('Altura inválida', false, erro = 2);
        return;
    }

    const imcValue = calcularImc(pesoValue, alturaValue);
    const imcDescription = getImcDescription(imcValue);

    setResultado(`IMC é ${imcValue} - ${imcDescription}`, true, null);
});

function setResultado (msg, isValid, erro) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    const p = createP();
    p.innerHTML = msg;

    limparAvisoErros();

    if (isValid && !erro) {
        p.classList.add('text-blue-500');
    } else {
        p.classList.add('text-red-500');
        SetInputErro(erro);
    }

    resultado.appendChild(p);
}

function SetInputErro(erro) {
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    if (erro === 0) {
        pesoInput.classList.add('bg-red-100');
        alturaInput.classList.add('bg-red-100');
    } else if (erro === 1) {
        pesoInput.classList.add('bg-red-100');
    } else if (erro === 2) {
        alturaInput.classList.add('bg-red-100');
    }
}

function limparAvisoErros() {
    const elements = document.querySelectorAll('.bg-red-100');
    
    elements.forEach(element => {
        element.classList.remove('bg-red-100');
    });
}

function createP () {
    const p = document.createElement('p');
    return p;
}

function calcularImc(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(2);
}

function getImcDescription(imc) {
    for (let range of imcRanges) {
        if (imc <= range.max) {
            return range.description;
        }
    }
    return null;
}