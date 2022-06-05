const express = require('express');
const Router = express.Router();
const Blog = require('./blog-models');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(fileUpload());

// check file type
function checkFileType(file, cb) {
  // allowed
  const filetypes = /jpeg|jpg|png|gif/;
  // check extension
  const extname = filetypes.test(
    path.extname(file.originalname.toLowerCase())
  );
  // check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

Router.post('/image_upload', async (req, res) => {
  // console.log('name check: ', req.files.myFile.name)
  // console.log('data check: ', req.files.myFile.data)

  const { name, data } = req.files.data;

  // res.status(200).json({ message: 'got the image' })

  Blog.addImage(name, data)
    .then((img) => {
      if (!img) {
        res
          .status(400)
          .json({ errorMessage: 'Could not save image' });
        console.log('error 1');
      } else {
        res.status(200).json({ message: 'Image added' });
        console.log('success');
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

Router.get('/get_images', (req, res) => {
  const user_id = 1;

  Blog.getImages(user_id)
    .then((blog) => {
      res
        .status(200)
        .json({ message: `rendering image list:`, object: blog });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: `Error, could not retrieve images: ${err}`,
      });
    });
});

Router.get('/get_images/:id', async (req, res) => {
  let id = req.params.id;
  Blog.findImage(id)
    .then((img) => {
      if (!img) {
        res
          .status(400)
          .json({ errorMessage: 'Could not find image.' });
      } else {
        res.end(img.image);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: 'Could not access images.' });
    });
});

// Blog Posts

Router.get('/posts', (req, res) => {
  Blog.getPosts()
    .then((blog) => {
      res.header('Access-Control-Allow-Origin', '*');
      res
        .status(200)
        .json({ message: `rendering blog list:`, object: blog });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: `Error, could not retrieve blog: ${err}`,
      });
    });
});

Router.post('/new_post', (req, res) => {
  let { data } = req.body;

  // console.log('request: ', data)

  try {
    Blog.addPost(data).then(() => {
      res.sendStatus(200);
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error, could not post to the db: ${err}` });
  }

  // const data = req.body;

  // res.status(200).json({message: 'success', data: data})
});

Router.get('/post/:name', (req, res) => {
  const { name } = req.params;

  try {
    Blog.getPost(name)
      .then((post) => {
        res.header('Access-Control-Allow-Origin', '*');
        res
          .status(200)
          .json({ message: 'Rendering post.', post: post });
      })
      .catch((err) =>
        res.status(500).json({
          message: 'Server Could not access blog post.',
          error: err,
        })
      );
  } catch (err) {}
});

module.exports = Router;
