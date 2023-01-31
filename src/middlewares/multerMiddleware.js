const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const FILE_DIR = path.resolve('./temp')

const storage = multer.diskStorage({
    destination: (reg, file, cb) => {
    
        cb(null, FILE_DIR)
    },
    filename: (reg, file, cb) => {
        const [_, extension] = file.originalname.split('.')
        cb(null, `${uuidv4()}.${extension}`)
    }
})
const uploadMiddleware = multer({storage})
module.exports = {
     uploadMiddleware
}
 
