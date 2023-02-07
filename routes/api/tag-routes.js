const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const allTags = await Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  res.status(200).json(allTags);

}
catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findTag = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    if (!findTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(findTag);
  }catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try{
  const checkTag = await Tag.findByPk(req.params.id);

  if (!checkTag) {
    res.status(404).json({ message: 'No tag found with this id!' });
    return;
  }

  await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: `Tag ${checkTag.tag_name} with id of ${req.params.id} updated successfully!` });
}
catch (err) {
  res.status(400).json(err);
};
})

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try{
  const checkTag = await Tag.findByPk(req.params.id);

  if (!checkTag) {
    res.status(404).json({ message: 'No tag found with this id!' });
    return;
  }

  await Tag.destroy({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: `Tag ${checkTag.tag_name} with id of ${req.params.id} deleted successfully!` });
}
catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
