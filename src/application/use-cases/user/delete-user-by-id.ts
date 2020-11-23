import { NotFoundError } from '~/application/errors/not-found-error';
import { DeleteUserByIdRepository } from '~/application/ports/repositories/delete-user-by-id-repository';
import { FindUserByIdRepository } from '~/application/ports/repositories/find-user-by-id-repository';
import { DeleteUserByIdUseCase } from '~/application/ports/user/delete-user-by-id-use-case';
import { User } from '~/domain/user/user';

export class DeleteUserById implements DeleteUserByIdUseCase {
  constructor(
    private readonly deleteUserByIdRepository: DeleteUserByIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async deleteById(id: string): Promise<User | never> {
    const user = await this.findUserByIdRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    await this.deleteUserByIdRepository.deleteById(id);
    return user;
  }
}