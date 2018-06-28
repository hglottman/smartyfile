const express = require('express');
const router = express.Router();
const fileModel = require('../dataAccess/file');
const multer = require('multer');
var path = require ('path');

var store = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploads');
  },
  filename:function(req,file,cb){
    cb(null, Date.now()+'.'+file.originalname);
  }
});

var upload = multer({storage:store}).single('file');

router.post('/upload', function (req, res, next) {
  upload (req,res,function(err){
    if(err){
      return res,status(501).json({error:err});
    } 
    //do all database record saving activity
    return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
  });
});

router.post('/download', function (req,res,next){
  filepath = path.join(_dirname, '../upolads') + '/' + req.body.filename;
res.sendFile(filepath);
});

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

router.post('/', (req, res) => {
  let newFile = req.body.file;
  fileModel.createFile(newFile).then((data) => {
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})

router.put('/', (req, res) => {
  fileToUpdate = req.body.newFile;
  console.log(fileToUpdate);
  fileModel.updateFile(fileToUpdate).then((data) => {
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})

router.delete('/:file_id', (req, res) => {
 var file_id = req.params.file_id
 console.log(file_id);
  fileModel.deleteFile(file_id).then(data => {
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})




module.exports = router;