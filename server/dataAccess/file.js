var Sequelize = require('sequelize');
var smartyfile = require('./dataAccess').connection;
const { folder } = require('../dataAccess/folders');

class File_Model {

    constructor() {

        this.file = smartyfile.define('File', {
            the_file: { type: Sequelize.STRING },
            file_id: { type: Sequelize.INTEGER, primaryKey: true },
            file_name: { type: Sequelize.STRING },
            folder_id: { type: Sequelize.INTEGER, references: { model: folder, key: 'folder_id' } },
            upload_date: { type: Sequelize.DATE },
            start_date: { type: Sequelize.DATE },
            end_date: { type: Sequelize.DATE },
            notes: { type: Sequelize.STRING }
        },
            {
                freezeTableName: { type: true }
            });
    }

    getAllFiles(folder_id) {
        return this.file.findAll({
                where: {
                    folder_id: folder_id
                }
        }).then((data) => {
            return data
        }, err => {
            console.error(err)
        })
    };

    getFile(file_id) {
        return this.file.findOne({
            where: {
                file_id: file_id
            }
        })
    }

    createFile(newFile) {
        return this.file.create({
            the_file: newFile.the_file,
            file_id: null,
            file_name: newFile.file_name,
            folder_id: newFile.folder_id,
            upload_date: newFile.upload_date,
            start_date: newFile.start_date,
            end_date: newFile.end_date,
            notes: newFile.notes
        });
    }

    updateFile(file_id, fileToUpdate) {
        return this.file.update(fileToUpdate, {
            where: {
                file_id: file_id
            }
        }).then((req, res) => {
            return this.getFile(file_id);
        })
        err => {
            console.error(err)
        }
    }

    deleteFile(file_id, folder_id) {
      return this.file.destroy({
            where: {
                file_id: file_id
            }
        }).then((req, res) => {
            return this.getAllFiles(folder_id);            
        })
        err => {
            console.error(err)
        }
    }

    // uploadFile(theFile) {

    // }

    

}

var file = new File_Model();
module.exports = file;



