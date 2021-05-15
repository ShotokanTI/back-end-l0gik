import { check, checkSchema, validationResult } from 'express-validator';
import { fileCustom } from '../controllers/UploadFile'
export const validation =

    checkSchema({
        Nome: {
            notEmpty: {
                errorMessage: 'está vázio !',
            }
        },
        Lancamento: {
            notEmpty: {
                errorMessage: 'está vázio !',
            }
        },
        Temporadas: {
            notEmpty: {
                errorMessage: 'está vázio !',
            }
        },
        Sinopse: {
            notEmpty: {
                errorMessage: 'está vázio !',
            }
        },
        Categoria: {
            notEmpty: {
                errorMessage: 'está vázio !',
            }
        },
    })


export const messagesErrors = (req: any, res: any, next: any) => {
    var result = validationResult(req)
    const hasError = !result.isEmpty();
    let validationMessages = result.array()
    if (fileCustom != null) {
        validationMessages.push(fileCustom)
    }
    if (hasError) {
        return res.status(400).json({ errors: validationMessages })
    }
    next()
}

export const validateFile = check('File').custom((value, { req }) => {
    const formats = [
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    if (req.file != null) {
        if (!formats.includes(req.file.mimetype)) {
            throw new Error('não contem um arquivo de imagem válido !');
        } else {
            return true
        }
    } else {
        throw new Error('está vázio !')
    }
})