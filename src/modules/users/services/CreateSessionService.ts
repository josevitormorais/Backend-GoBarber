import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken'; //sign: assinar um toker
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppErros';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Does not exist email/password', 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Does not exist email/password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
