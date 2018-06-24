const express = require('express');
const router = express.Router();
const customer = require('../dataAccess/customers');
// const customerModel = require('../dataAccess/customers').customer;


router.get('/', (req, res) => {
  customer.getAllCustomer().then(data => {
    res.send(JSON.stringify(data))
  }) 
  })

  router.delete('/:id', (req, res) => {
    customerId = req.params.id
    customer.deleteCustomer(customerId).then(customerDeleted => {
      console.log(customerDeleted)
      res.send(JSON.stringify('cutomer has been delted'))
    }, err => {
      console.error(err);
    });
  })
  
  router.post('/', (req, res) => {
    console.log('this message is ffrom the customers_api')
    var newCustomer = req.body.newData;
    customer.addNewCustomer(newCustomer).then(newCustomer => {
    //  console.log(newCustomer);
    res.send(JSON.stringify('new customer as been added?'));       
   })

});

  router.put('/', (req, res) => {
    var updateDetails = req.body.details;
    customer.updateCustomer(updateDetails).then((allcustomers) => {
      res.send(JSON.stringify(allcustomers));
    })
  });
 




module.exports = router;

