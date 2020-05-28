import { Router } from 'express';
import Authenticated from '@modules/users/infra/http/middlewares/ensureAtuhenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();
const appointmentsRouter = Router();
appointmentsRouter.use(Authenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
