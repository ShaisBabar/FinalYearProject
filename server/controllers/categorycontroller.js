var Category = require('../model/category');
var _ = require('lodash');


//router.get('/category/:id', getCategoryById);
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id)
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/category/:name', getCategoryByName);
exports.getCategoryByName = (req, res, next, name) => {
    Category.findOne({name:name})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/categories', getCategories);
exports.getCategories = (req, res, next, id) => {
    Category.find({})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.delete("/removecategory/:id", removeCategory);
exports.removeCategory = (req, res) => {
    Category.deleteOne({_id:req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        console.log('Deleted Category');
        res.json(results);
    });
};

//router.post('/addcategory',addCategory);
exports.addCategory = (req, res) => {
    console.log(req.body)
    // const catExists = Category.findOne({ name: req.body.name });

    // if (catExists) {
    //     return res.status(403).json({
    //         error: "Cateogry already exists",
    //     });
    // }
    const cat = new Category(req.body);
    cat.save();
    res.status(200).json({
        message: "Category Added succesfully",
    });
};


//router.put("/editcategory", editCategory);
exports.editCategory = (req, res, next) =>{
    Category.findOneAndUpdate({_id:req.body.cat._id},req.body.cat,function(error, results) {
        if (error) {
        return next(error);
        }
        console.log('Updated Category');
        res.json(results);
        });
   
};



