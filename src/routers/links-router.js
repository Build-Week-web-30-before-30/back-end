const router = require('express').Router();

const Links = require('../helpers/links-model');

router.post('/', async (req, res) => {
  try {
    const { link, todo_id } = req.body;
    const newLink = await Links.insert({ link, todo_id });

    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Unable to add link ' + error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const links = await Links.find();

    res.status(201).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Unable to find links ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Links.findById(id);

    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Unable to find link ' + error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { link } = req.body;
    const updatedLink = await Links.update({ link }, id);

    res.status(201).json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update link ' + error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLink = await Links.remove(id);

    res.status(201).json(deletedLink);
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete link ' + error.message });
  }
});

module.exports = router;
