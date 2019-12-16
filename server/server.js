const express = require('express');
const cors = require('cors');
const multer = require('multer');
const server = express();
const rimraf = require('rimraf');

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
let upload = multer({ storage: storage }).single('file');

server.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

server.post('/clean', function(req, res) {
  rimraf('./uploads/*', function () { 
    console.log('all files removed.');
  });
  return res.status(200);
});

let port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("Express server listening on port:", port);
});
