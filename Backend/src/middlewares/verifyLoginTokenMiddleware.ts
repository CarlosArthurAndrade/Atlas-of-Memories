import 'dotenv/config'
import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken";
import UserAuthRequest from '../interfaces/expressUser';

const verifyLoginToken = (req: UserAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Não autenticado" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = Jwt.verify(token, process.env.CHAVE_SECRETA_JWT!) as { id: number }
        req.user = decoded.id
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

export default verifyLoginToken