import express from 'express';
import knexConfig from './knexfile.js';
import knexModule from 'knex';
import cors from 'cors';

const app = express();
const port = 8080;
const knex = knexModule(knexConfig.development);


app.use(cors({
  origin: 'http://localhost:5173', // change this :5174 if there is a network error. 
  credentials: true
}));

app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.status(200).send('Inventory App API');
});

// -------------------- USER ROUTES --------------------
// Signup
app.post('/users', (req, res) => {
  const newUser = req.body;
  knex('users')
    .insert(newUser)
    .returning('*')
    .then(data => res.status(201).json(data[0]))
    .catch(err => {
      console.error(err);
      if (err.code === '23505') {
        return res.status(409).json({ message: 'User already exists.' });
      }
      res.status(500).json({ message: 'Error creating user', error: err.message });
    });
});

// Login
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex('users').where('email', email).first();
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// -------------------- INVENTORY ROUTES --------------------
// Get all items
app.get('/items', (req, res) => {
  knex('items')
    .select('*')
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: 'Error fetching items', error: err.message }));
});

// Get item by ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  knex('items')
    .where('id', id)
    .first()
    .then(item => {
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    })
    .catch(err => res.status(500).json({ message: 'Error fetching item', error: err.message }));
});

// Create item
app.post('/items', (req, res) => {
  const newItem = req.body;
  knex('items')
    .insert(newItem)
    .returning('*')
    .then(data => res.status(201).json(data[0]))
    .catch(err => res.status(500).json({ message: 'Error creating item', error: err.message }));
});

// Update item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  knex('items')
    .where('id', id)
    .update(updatedItem)
    .returning('*')
    .then(data => {
      if (data.length === 0) return res.status(404).json({ message: 'Item not found' });
      res.json(data[0]);
    })
    .catch(err => res.status(500).json({ message: 'Error updating item', error: err.message }));
});

// Delete item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  knex('items')
    .where('id', id)
    .del()
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting item', error: err.message }));
});

// -------------------- SERVER --------------------
app.listen(port, () => console.log(`Inventory app running at http://localhost:${port}`));
