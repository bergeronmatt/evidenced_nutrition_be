const express = require("express");
const Router = express.Router();
const Blog = require('./blog-models');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(fileUpload());


// check file type
function checkFileType(file, cb) {
    // allowed
    const filetypes = /jpeg|jpg|png|gif/;
    // check extension
    const extname = filetypes.test(path.extname(file.originalname.toLowerCase()));
    // check mime
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images only!')
    }
}

Router.post('/image_upload', async (req, res) => {


    console.log('req check', req.files)
    console.log('name check: ', req.files.data.name)
    console.log('data check: ', req.files.data.data)

    let name = req.files.data.name;
    let data = req.files.data.data;

    Blog.addImage(name, data).then(img => {
            if (!img) {
                res.status(400).json({ errorMessage: 'Could not save image' })
            } else {
                res.status(200).json({ message: 'Image added' })
            }
        })
        .catch(err => res.status(500).json({ errorMessage: err }))
})

Router.get('/get_images', (req, res) => {

    const user_id = 1;

    Blog.getImages(user_id)
        .then(blog => {
            res.status(200).json({ message: `rendering image list:`, object: blog })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `Error, could not retrieve images: ${err}` })
        })
})

module.exports = Router;