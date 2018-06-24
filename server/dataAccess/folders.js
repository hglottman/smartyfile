var Sequelize = require('sequelize');
var smartyfile = require('./dataAccess').connection;
const { user } = require('./users');

class Folder_Model {

    constructor() {

        this.folder = smartyfile.define('Folder', {
            folder_id: { type: Sequelize.INTEGER, primaryKey: true },
            folder_name: {type: Sequelize.STRING},
            date: {type: Sequelize.DATE},
            is_active: {type: Sequelize.BOOLEAN},
            user_id: { type: Sequelize.INTEGER }, 
        },
            {
                freezeTableName: { type: true }
            });

        
    }


}

var folder = new Folder_Model();

module.exports = folder;


// getCustomerComments(id) {
    //         return this.comments.findAll({ where: { customer_id: id } }).then(data => {
    //             return data;
    //         }, err => {
    //             console.error(err)
    //         });
    //     }
    //     addNewComment(text, id) {
    //       return  this.comments.create({
    //             comment_id: null,
    //             customer_id: id,
    //             date: new Date(),
    //             text: text
    //         }).then(() => {
    //         return  this.getCustomerComments(id);
    //         })
    //     }
    // }


