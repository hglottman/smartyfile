var Sequelize = require('sequelize');
var angusales = require('./dataAccess').connection;
const {company} = require('../dataAccess/companys');


class Customer_Model {

    constructor() {

        this.customer = angusales.define('Customers', {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            FirstName: { type: Sequelize.STRING },
            LastName: { type: Sequelize.STRING },
            company_id: { type: Sequelize.INTEGER },
            Email: {type: Sequelize.STRING },
            Phone: {type: Sequelize.STRING}
        },
            {
                freezeTableName: { type: true }
            });

        this.customer.belongsTo(company, { foreignKey: 'company_id' })

    }

    getAllCustomer() {
        return this.customer.findAll({ include: { model: company }}).then(data => {
            return data;
        }, err => {
            console.error(err)
        });
    }

    addNewCustomer(customerProperties) {
          return this.customer.create(customerProperties)
    }

    deleteCustomer(id) {
         return this.customer.destroy({where : {id : id}}).then( data => {
            return data;
        });
    }

    updateCustomer(detailsToUpdate) {
          return  this.customer.update(
              {FirstName: detailsToUpdate.firstName, LastName: detailsToUpdate.lastName},
              {where: {id: detailsToUpdate.id}
            }).then(() => {
               return this.getAllCustomer()
            })
        }
                
} // end of class


var customer = new Customer_Model();
module.exports = customer;




