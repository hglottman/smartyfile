const express = require('express');
const router = express.Router();
const fileModel = require('../dataAccess/file');

router.get('/:folder_id', (req, res) => {
    fileModel.getAllFiles().then(data => {
      res.send(JSON.stringify(data))
    })
  })

  router.get('/:folder_id/:file_id', (req, res) => {
    fileModel.getFile().then(data => {
      res.send(JSON.stringify(data))
    })
  })

  router.post('/:folder_id', (req, res) => {
    newFile = req.body.file
    fileModle.createFile(newFile).then((data) => {
      res.send(JSON.stringify(data))
    })
    err => {
      console.error(err)
    }
  })

  router.put('/:folder_id/:file_id', (req, res) => {
    fileToUpdate = req.body.file
    file_id = req.params.file_id
    fileModle.updateFile(file_id, fileToUpdate).then((data) => {
      res.send(JSON.stringify(data))
    })
    err => {
      console.error(err)
    }
  })

  router.delete('/:folder_id/:file_id', (req, res) => {
    file_id = req.params.file_id
    fileModle.deleteFile(file_id).then(data => {
      res.send(JSON.stringify(data))
    })
    err => {
      console.error(err)
    }
  })
  



module.exports = router;