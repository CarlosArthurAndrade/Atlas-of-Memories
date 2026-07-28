import 'dotenv/config'
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { Code } from "./enums/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enums/status.enum";
import notesRoutes from "./routes/notes.routes";
import usersRoutes from './routes/users.routes';

export class App {
    private readonly app: Application;

    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
        this.app = express();
        this.middleWare();
        this.routes()
    }

    listen(): void {
        this.app.listen(this.port)
        console.log(`Aplicação está rodando na porta ${this.port} `)
    }

    private middleWare(): void {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.get('/', (_req: Request, res: Response) => res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Get na rota /')))
        this.app.use('/Notes', notesRoutes)
        this.app.use('/Users', usersRoutes)
        this.app.all('*', (_req: Request, res: Response) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Pagina não encontrada')))
    }
}