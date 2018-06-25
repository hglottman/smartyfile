var Sequelize = require('sequelize');
var smartyfile = require('./dataAccess').connection;
const { user } = require('./users');

class Folder_Model {

    constructor() {

        this.folder = smartyfile.define('Folder', {
            folder_id: { type: Sequelize.INTEGER, primaryKey: true },
            folder_name: { type: Sequelize.STRING },
            date: { type: Sequelize.DATE },
            is_active: { type: Sequelize.BOOLEAN },
            user_id: { type: Sequelize.INTEGER },
        },
            {
                freezeTableName: { type: true }
            });


    }

    getUserFolders(id) {
        return this.folder.findAll({ where: { user_id: id, is_active: true } }).then(data => {
            return data;
        }, err => {
            console.error(err)
        });
    }

    deleteFolder(id) {
        console.log(folder_id);
        return this.folder.update(
            { is_active: false },
            {
                where: { folder_id: id }
            }).then(() => {
                return this.folder.findAll({ where: { user_id: 1, is_active: true } }).then(data => {
                    return data;
                }, err => {
                    console.error(err)
                });
            })
    }

    addNewFolder(newFolder, id) {
        console.log(id);
        return this.folder.create(newFolder)
    }
}


var folder = new Folder_Model();

module.exports = folder;





