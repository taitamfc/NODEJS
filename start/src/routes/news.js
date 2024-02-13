const express = require('express')
const router = express.Router()

const newController = require('../app/controllers/NewController')

router.delete('/:slug',newController.destroy);
router.get('/edit/:slug',newController.edit);
router.put('/:slug',newController.update);
router.post('/store',newController.store);
router.get('/create',newController.create);
router.get('/:slug',newController.show);
router.get('/',newController.index);

module.exports = router;