import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controller/SessionsController';

const sessionsController = new SessionsController();
const sessionRouter = Router();

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
