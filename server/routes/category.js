var express = require('express');
var {getCategoryById, getCategoryByName, getCategories, addCategory, editCategory, removeCategory} = require('./../controllers/categorycontroller')
var router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.get('/category/:name', getCategoryByName);
router.post('/addcategory',addCategory);
router.delete("/removecategory/:id", removeCategory);
router.put("/editcategory", editCategory);

module.exports = router;
