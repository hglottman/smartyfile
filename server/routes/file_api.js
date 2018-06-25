const express = require('express');
const router = express.Router();
const fileModel = require('../dataAccess/file');

router.get('/:folder_id', (req, res) => {
  var folderId = req.params.folder_id
  fileModel.getAllFiles(folderId).then(data => {
    res.send(JSON.stringify(data))
  })
})

router.get('/:folder_id/:file_id', (req, res) => {
  var fileId = req.params.file_id
  fileModel.getFile( fileId).then(data => {
    res.send(JSON.stringify(data))
  })
})

router.post('/:folder_id', (req, res) => {
  newFile = req.body
  fileModel.createFile(newFile).then((data) => {
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})

router.put('/:folder_id/:file_id', (req, res) => {
  fileToUpdate = req.body
  file_id = req.params.file_id
  fileModel.updateFile(file_id, fileToUpdate).then((data) => {
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})

router.delete('/:folder_id/:file_id', (req, res) => {
  var folder_id = req.params.folder_id
  file_id = req.params.file_id
  fileModel.deleteFile(file_id, folder_id).then(data => {
    console.log(data);
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})




module.exports = router;