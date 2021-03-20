var express = require('express');
var {addreview,getreviews,deletereview,editreview,} = require('./../controllers/reviewcontroller')
var router = express.Router();

router.get('/getreviews', getreviews);
router.post('/addreview', addreview);
router.delete('/deletereview/:id', deletereview);
router.put('/editreview', editreview);

module.exports = router;
