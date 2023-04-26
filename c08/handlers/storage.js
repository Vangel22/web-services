const fs = require("fs");
const { makeId } = require("../pkg/strings");
// 1 byte = 8 bit
// 1 kilobyte kb = 1024 byte
// 1 megabyte mb = 1024 kilobyte
// 1 gigabyte gb = 1024 megabyte
// ...

const MAX_FILESIZE = 1048576; // 1024 * 1024 = 1mb
const ALLOWED_FILETYPES = [
  "image/jpeg",
  "image/png",
  "image/pjpeg",
  "image/gif",
];

const upload = async (req, res) => {
  console.log(req.files);
  //<input name="foo" type="file" />
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send("File exceeds max file size!");
  }
  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not allowed!");
  }
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;
  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  const fileName = `${makeId(6)}_${req.files.document.name}`; //unique name
  const filePath = `${userDirPath}/${fileName}`;
  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal server error!");
    }
    return res.status(201).send({ file_name: fileName });
  });
};

const download = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;
  const filePath = `${userDirPath}/${req.params.filename}`;
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found!");
  }
  res.download(filePath);
};

module.exports = {
  upload,
  download,
};
