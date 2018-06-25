const express = require('express');
const router = express.Router();
// const companyModel = require('../dataAccess/companys').company;
const folder =  require('../dataAccess/folders');


router.get('/:id', (req, res) => {
    user_id = req.params.id
    console.log('im got to the server')
    folder.getUserFolders(user_id).then(data => {
        res.send(JSON.stringify(data));
    })
})

router.delete('/delete/:folder_id', (req, res) => {
    console.log('ive got to the server from delete function')
    folder_id = req.params.folder_id;
    folder.deleteFolder(folder_id).then(data => {
        console.log(data);
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
