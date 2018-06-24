const express = require('express');
const router = express.Router();
// const companyModel = require('../dataAccess/companys').company;
const folder =  require('../dataAccess/folders');


router.get('/:id', (req, res) => {
    user_id = req.params.id
    console.log('im got to the server')
    folder.getUserFolders(id).then(data => {
        res.send(JSON.stringify(data));
    })
})




module.exports = router;
