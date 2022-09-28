import joi from "joi";
import { Request, Response, NextFunction } from "express";

export default async function validateSignUp(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;
    const usernameRegex = /^[a-zA-Z]{2,25}$/;
    const passwordRegex = /^.{8,}$/;

    const newUserSchema = joi.object({
        username: joi.string().pattern(usernameRegex).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(passwordRegex).required(),
        confirmPassword: joi.string().valid(joi.ref("password")).required()
    });

    const validation = newUserSchema.validate(newUser, { abortEarly: false });
    if (validation.error) {
        throw {
            type: "unprocessable_entity",
            message: `${validation.error.details[0].message}`
        };
    }
    
    next();
}