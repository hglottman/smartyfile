const express = require('express');
const router = express.Router();
// const companyModel = require('../dataAccess/companys').company;
const company =  require('../dataAccess/companys');


router.get('/', (req, res) => {
    console.log('im got to the server')
    company.getAllCompanys().then(data => {
        res.send(JSON.stringify(data));
    })
})




module.exports = router;
