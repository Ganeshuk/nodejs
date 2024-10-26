const express = require('express');
const cors=require('cors')

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// POST endpoint to calculate total value of products
app.post('/api/calculate-total', (req, res) => {
    const products = req.body.products;

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array of products.' });
    }

    try {
        const totalValue = products.reduce((acc, product) => {
            // Validate each product has name, price, and quantity
            if (!product.name || typeof product.price !== 'number' || typeof product.quantity !== 'number') {
                throw new Error('Invalid product data');
            }

            return acc + (product.price * product.quantity);
        }, 0);

        res.json({ totalValue });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

