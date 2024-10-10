const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    // Function to calculate prime numbers up to a given limit
    const calculatePrimes = (limit) => {
        const primes = [];
        for (let num = 2; num <= limit; num++) {
            let isPrime = true;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                console.log(num);
                primes.push(num);
            }
        }
        return primes;
    };

    // Start the calculation and measure the time taken
    const start = Date.now();
    console.log('calc started');    
    const primes = calculatePrimes(9000000); // Adjust the limit to make it take around 3 seconds
    const duration = Date.now() - start;
    console.log('calc finished');
    // Send the response after calculation
    res.send(`calc ok! Calculated ${primes.length} primes in ${duration} ms.`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});