const express = require('express');
const userInc = require('../dataAccess/users');
const router = express.Router();



router.post('/addUser', (req, res) => {
  var newUser = req.body.user
  console.log(newUser)
  userInc.createUser(newUser).then(newUser => {
    res.send(JSON.stringify(newUser))
  })
})

router.get('/', (req, res) => {
  userInc.getAllUsers().then(data => {
    res.send(JSON.stringify(data))
  });
});
router.put('/userUpdate/:id',(req,res)=>{
  var userToUpdate = req.body
  var myId = req.params.id
  userInc.updateUser(myId,userToUpdate).then(()=>{
    res.send(JSON.stringify('User hes been updated'))
  })
})

// router.get('/:userName/:password', (req, res) => {
//   var userName = req.params.userName;
//   var password = req.params.password;
//   userInc.getOneUser(userName, password).then(data => {
//     res.send(JSON.stringify(data))
//   })
// })



module.exports = router;