var Sequelize = require('sequelize');
var smartyfile = require('./dataAccess').connection;
const { folder } = require('../dataAccess/folders');
const Op = Sequelize.Op

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

    getFileByDate(date, folder_id) {
        return this.file.findAll({
            where: {
                folder_id : folder_id,
                end_date: date
            }
        })
    }

    getFile(file_id) {
        return this.file.findOne({
            where: {
                file_id: file_id
            }
        })
    }
    getFileName(file_name, folder_id){
        return this.file.findAll({
            where:{file_name:{[Op.like]:'%'+file_name+'%'}, folder_id : folder_id}
        }).then (data => {
            return data;
        })
    }

    createFile(newFile) {
        return this.file.create({
            the_file: newFile.the_file,
            file_id: null,
            file_name: newFile.file_name,
            folder_id: newFile.folder_id,
            upload_date: new Date(),
            start_date: newFile.start_date,
            end_date: newFile.end_date,
            notes: newFile.notes
        });
    }

    updateFile(fileToUpdate) {
        return this.file.update(
            fileToUpdate,
            {
                where: { file_id: fileToUpdate.file_id }
            }).then(() => {
                return this.file.findAll({
                    where: {
                        folder_id: fileToUpdate.folder_id
                    }
                }).then((data) => {
                    return data
                }, err => {
                    console.error(err)
                })
            })
    }

    deleteFile(file_id) {
        return this.file.destroy({
            where: {
                file_id: file_id
            }
        })
    }

}

var file = new File_Model();
module.exports = file;



