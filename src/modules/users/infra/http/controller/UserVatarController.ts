import { Request, Response } from 'express';
import UploadAvatarUserService from '@modules/users/services/UploadAvatarUserService';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response) {
    const uploadAvatar = container.resolve(UploadAvatarUserService);

    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
