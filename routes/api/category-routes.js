const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const findCategory = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    if (!findCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(findCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    console.log(createCategory);
    res.status(200).json(createCategory);
  }
  catch (err) {
    res.status(400).json(err);


  }
})




router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const checkCategory = await Category.findByPk(req.params.id)
    if (!checkCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ message: `Category ${checkCategory.category_name} with id of ${req.params.id} updated successfully!` });


  } catch (err) {
    res.status(400).json(err);
  }
})







router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const checkCategory = await Category.findByPk(req.params.id)

    if (!checkCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
   await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ message: `Category ${checkCategory.category_name} with id of ${req.params.id} deleted successfully!` });
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;




