const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const items = require('./fakeDb');

const router = express.Router();

// home page
router.get('/', function(req, res) {
    const home = {
        title: 'Shopping List',
        instructions: 'Use the /items route to view the shopping list'
    }
    res.json(home);
});

// GET /items - Get the shopping list items
router.get('/items', function(req, res) {
    return res.json(items);
});

// POST /items - Add an item to the shopping list
router.post('/items', function(req, res) {
    const newItem = req.body;
    items.push(newItem);
    res.json({ added: newItem });
});

// GET /items/:name - Get a single item's name and price
router.get('/items/:name', function(req, res) {
    const itemName = req.params.name;
    const foundItem = items.find((item) => item.name === itemName);

    if (!foundItem) {
        return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(foundItem);
});

// PATCH /items/:name - Update a single item's name and/or price
router.patch('/items/:name', function(req, res) {
    const itemName = req.params.name;
    const updateItem = req.body;
    const foundItem = items.find((item) => item.name === itemName);

    if (!foundItem) {
        return res.status(404).json({ message: 'Item not found' });
    }

    foundItem.name = updateItem.name;
    foundItem.price = updateItem.price;

    return res.json({ updated: foundItem });
});

// DELETE /items/:name - Delete a single item from the shopping list
router.delete('/items/:name', function(req, res) {
    const itemName = req.params.name;
    const index = items.findIndex((item) => item.name === itemName);

    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items.splice(index, 1);
    res.json({ message: 'Deleted' });
});

app.use('/', router);

module.exports = app;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
