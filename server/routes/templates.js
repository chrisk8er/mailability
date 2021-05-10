const express = require('express');
const { catchErrors } = require('../handlers/error-handlers');

const router = express.Router();
const template = require('../controllers/templates');

router.get('/', catchErrors(template.findAll));
router.get('/detail', catchErrors(template.findOne));
router.post('/add', catchErrors(template.add));
router.post('/update', catchErrors(template.update));
router.get('/remove', catchErrors(template.remove));

module.exports = router;
