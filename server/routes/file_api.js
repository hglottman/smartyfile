const express = require('express');
const router = express.Router();
const mime = require('mime');
const crypto = require('crypto');
const fileModel = require('../dataAccess/file');
var path = require('path');
var multer = require('multer');
var cloudinary = require('cloudinary');


cloudinary.config({ 
  cloud_name: 'smartyfile', 
  api_key: '573259347122198', 
  api_secret: 'VSZtPo5TgcFhNXsYSfb2afY4uEw' 
});






var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist/docsetup/assets')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    });
  }
});
var upload = multer({ storage: storage });

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
  let fileDate = new Date(newFile.end_date)
  fileDate.setDate(fileDate.getDate()+1);
  console.log(fileDate);
newFile.end_date = fileDate;  
   fileModel.createFile(newFile).then((data) => {
    res.send(JSON.stringify(data))
   })
   err => {
     console.error(err)
   }
})

router.post('/postfile',upload.single('file'), (req, res) => {
  console.log(req.file);
  cloudinary.v2.uploader.upload(req.file.path, 
    function(error, result){
      console.log(result)
  res.send(JSON.stringify(result.url))
      
    });
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