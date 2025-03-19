const express = require('express');
const path = require('path');
let user;
const app = express();
app.use(express.static('public')); // Serve static files
app.use(express.json()); // Middleware to parse JSON

// Home Route (Serves HTML page)
app.get('/', (req, res) => {
    res.sendFile(path.join('add-app', 'public', 'index.html'));
});

// API Route to Add Two Numbers (POST)
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body; // Destructure the data from the request body

    console.log(`Received num1: ${num1}, num2: ${num2}, operation: ${operation}`); // Debugging Log

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid numbers' });
    }

    let result;

    // Perform the requested operation
    switch (operation) {
        case '+':
            result = num2 + num1;
            console.log("sum",result)
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = num1 / num2;
            break;
         case '^':
             result = 1;
               for (let i = 0; i < num2; i++) {
                     result *= num1;
                     }
                break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result: `Hi ${user} your result is ${result}` });
}); 

// GET endpoint to return a personalized greeting
app.get('/greet', (req, res) => {
user=req.query.name
    const name = req.query.name || 'Guest'; // Default to "Guest" if no name is provided
    res.json({ message: `Hello, ${name}! Welcome to the Basic Calculator API.` });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
