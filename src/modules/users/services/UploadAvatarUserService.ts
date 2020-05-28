import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppErros';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UploadAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UploadAvatarUserService;
