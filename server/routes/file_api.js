const express = require('express');
const router = express.Router();
const fileModel = require('../dataAccess/file');
const multer = require('multer');
const ejs = require('ejs');


// var storage = multer.diskStorage({
//     destination: function(req, file, callback){
//       console.log("in destination, file is")
//       console.log(file)
//         callback(null, './public/uploads'); // set the destination
//     },
//     filename: function(req, file, callback){
//       console.log("in storage filename, file is")
//       console.log(file)
//         callback(null, Date.now() + '.jpg'); // set the file name and extension
//     }
// });
// var upload = multer({storage: storage});

// router.post('/upload', upload.single('filename'), function(req, res, next) {
//   console.log('filename');
//   res.send("Bah")
    // var file = req.file.filename;
   /** rest */ 
// });


// // Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });



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


// router.post('/', /*upload.single('newFile'),*/ function(req, res, next) {
//   var file = req.body.file;
//   console.log("in the post route, file is")
//   console.log(file)
//   console.log(Object.keys(req.body))
//   let formData = req.body;

//  /** rest */ 
// //  let newFile = req.body.file;
//   fileModel.createFile(newFile).then((data) => {
//     res.send(JSON.stringify(data))
//   })
//   err => {
//     console.error(err)
//   }
// });
// router.post('/', (req, res) => {
//   let newFile = req.body.file;
//   fileModel.createFile(newFile).then((data) => {
//     res.send(JSON.stringify(data))
//   })
//   err => {
//     console.error(err)
//   }
// })

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
    res.send(JSON.stringify(data))
  })
  err => {
    console.error(err)
  }
})


module.exports = router;
