const express = require('express');
const router = express.Router();
// const companyModel = require('../dataAccess/companys').company;
const folder =  require('../dataAccess/folders');


router.get('/:id', (req, res) => {
    user_id = req.params.id
    folder.getUserFolders(user_id).then(data => {
        res.send(JSON.stringify(data));
    })
})

router.delete('/delete/:folder_id/:user_id', (req, res) => {
    folder_id = req.params.folder_id;
    user_id = req.params.user_id;
    folder.deleteFolder(folder_id, user_id).then(data => {
        res.send(JSON.stringify(data));
    })
}
)

router.post('/add_folder/:id', (req, res) => {
    newFolder = req.body.folder;
    user_id = req.params.id;
    folder.addNewFolder(newFolder).then(() => {
        folder.getUserFolders(user_id).then(data => {
            res.send(JSON.stringify(data));
        })
      
     })
} )



module.exports = router;
