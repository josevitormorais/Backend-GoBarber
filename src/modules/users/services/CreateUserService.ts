import { hash } from 'bcryptjs'; //bcrypt para lidar com cryptografia
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppErros';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

//criando a interface para informar quais dados vamos utilizar para criar nosso objeto
interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}
injectable();
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('E-mail address already used');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword, //renomeamos entao o password para hashPassword
    });

    return user;
  }
}

export default CreateUserService;
