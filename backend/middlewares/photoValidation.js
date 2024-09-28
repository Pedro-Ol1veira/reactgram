const { body } = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .not().equals("undefined").withMessage("Título é obrigatorio")
            .isString().withMessage("Título é obrigatorio")
            .isLength({ min: 3 }).withMessage("O título precisa ter no mínimo tres caracteres"),
        body("image")
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error("A imagem é obrigatoria");
                }
                return true;
            })
    ]
}

const photoUpdateValidation = () => {
    return [
        body("title")
            .isString().withMessage("O titulo é obrigatorio")
            .isLength({ min: 3 }).withMessage("O título precisa ter no mínimo tres caracteres"),
    ]
}

const commentValidation = () => {
    return [
        body("comment")
            .isString().withMessage("O comentario é obrigatorio")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
};