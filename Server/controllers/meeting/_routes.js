const express = require('express');

const router = express.Router();
const {
    add,
    index,
    view,
    deleteData,
    deleteMany,
} = require('./meeting');

const { auth } = require('../../middelwares/auth');

router.get('/', index);
router.get('/view/:id', view);
router.post('/', add);
router.delete('/delete/:id', deleteData);
router.post('/deleteMany', deleteMany);

module.exports = router