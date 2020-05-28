import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionAuthenticate from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateSession = container.resolve(CreateSessionAuthenticate);

    const { user, token } = await authenticateSession.execute({
      email,
      password,
    });

    delete user.password; //deletando o password da resposta, para n ser enviado ao frontend

    return response.json({ user, token }); //enviando a resposta do token junto ao user
  }
}
