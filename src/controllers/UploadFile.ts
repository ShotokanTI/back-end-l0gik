import { validationResult } from 'express-validator';
import { Options, diskStorage } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'
import {uniqueSeries} from '../controllers/Series.controller'

export let fileCustom:any = null

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'uploads'),
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'uploads'))
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename)
        }
        const filename = `${hash.toString('HEX')}.png`
        callback(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req,file, cb) {
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    if(formats.includes(file.mimetype) || file.size === 0){
      fileCustom = ''
      return cb(null, true );
    }else{
      fileCustom = { value: "", msg: "permite apenas arquivos .jpg .jpeg .png", param: "File", location: "body" }
      return cb(null,false)
    }

  }
} as Options