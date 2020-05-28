import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import userAuthenticated from '../middlewares/ensureAtuhenticated';
import UsersController from '@modules/users/infra/http/controller/UsersController';
import UserAvatarControler from '@modules/users/infra/http/controller/UserVatarController';

const usersController = new UsersController();
const usersAvatarController = new UserAvatarControler();
const usersRouter = Router(); //variavel que recebe o Router do express para usar os metodos nativos
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  userAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
