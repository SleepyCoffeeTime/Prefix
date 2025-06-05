router.post('/', async (req, res) => {
    const { name, description, quantity } = req.body;
  
    try {
      const [item] = await knex('items').insert({ name, description, quantity }).returning('*');
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create item' });
    }
  });
  