const express = require('express')
const helloController = require('../controllers/Hello/hello');
const categoryController = require('../controllers/Categories/Categories');

const router = express.Router();

let resource = '/pos';

router.get(
    `${resource}/hello`,   // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
    helloController.hello   // call controller.js
);

//Creating new category
// router.post(
//     `${resource}/createCategory`,   // path set ho rha hai for api
//     categoryController.createCategory // call controller.js
// );
router.get(
    `${resource}/categories`,   // path set ho rha hai for api
    categoryController.categories // call controller.js
);

module.exports = router