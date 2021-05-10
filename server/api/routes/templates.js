const express = require('express');

const router = express.Router();
const template = require('../controllers/templates');

router.get('/', template.findAll);
router.get('/:id', template.findOne);
router.post('/', template.create);
router.put('/:id', template.update);
router.delete('/:id', template.remove);

module.exports = router;
