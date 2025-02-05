let currentExpression = '';
let history = [];

function updateDisplay() {
    document.getElementById('result').textContent = currentExpression || '0';
    document.getElementById('history').textContent = history.join(' ');
}

function addNumber(num) {
    if (currentExpression === '0' && num !== '.') currentExpression = '';
    if (num === '.' && currentExpression.includes('.')) return;
    currentExpression += num;
    updateDisplay();
}

function addOperation(op) {
    if (currentExpression === '' && op !== '-') return;
    history.push(currentExpression);
    history.push(op);
    currentExpression = '';
    updateDisplay();
}

function calculate() {
    if (currentExpression === '' || history.length === 0) return;
    
    try {
        history.push(currentExpression);
        let expr = history.join(' ');
        
        // Replace mathematical constants
        expr = expr.replace(/π/g, Math.PI);
        
        // Handle scientific functions
        expr = expr.replace(/(sin|cos|tan|log|ln|sqrt)\(([^)]+)\)/g, (match, func, num) => {
            num = parseFloat(num);
            switch(func) {
                case 'sin': return Math.sin(num * Math.PI/180); // Degrees
                case 'cos': return Math.cos(num * Math.PI/180);
                case 'tan': return Math.tan(num * Math.PI/180);
                case 'log': return Math.log10(num);
                case 'ln': return Math.log(num);
                case 'sqrt': return Math.sqrt(num);
            }
        });
        
        // Handle exponents
        expr = expr.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, (match, base, exp) => 
            Math.pow(parseFloat(base), parseFloat(exp))
        );
        
        // Evaluate remaining expression
        const result = eval(expr);
        
        history = [];
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        currentExpression = 'Error';
        history = [];
        updateDisplay();
    }
}

function clearDisplay() {
    currentExpression = '';
    history = [];
    updateDisplay();
}

// Initialize calculator
clearDisplay();