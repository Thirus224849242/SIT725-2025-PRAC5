function calculate(operator) {
    document.getElementById('operator').innerText = `${operator}`;
    const num1  = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
     console.log( " num1",num1,"num2",num2)

     const number1 = parseFloat(num1);
     const number2 = parseFloat(num2);


   // Send a POST request with JSON data
   fetch('/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num1: number1, num2: number2, operation:operator }) // Send data as JSON
})
.then(response => response.json()) // Convert response to JSON
.then(data => {
    document.getElementById('result').innerText = `Result: ${data.result}`;
})
.catch(error => {
    console.error('Error:', error);
});
}

function getGreeting() {
    const username = document.getElementById('username').value.trim();

    if (username === '') {
        document.getElementById('greetingMessage').innerText = 'Please enter your name!';
        return;
    }

    fetch(`/greet?name=${encodeURIComponent(username)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('greetingMessage').innerText = data.message;
        })
        .catch(error => {
            document.getElementById('greetingMessage').innerText = 'Error fetching greeting!';
            console.error(error);
        });
}

