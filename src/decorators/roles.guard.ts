import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_ADMIN_KEY } from '../decorators/is-admin.decorator';

/** Checks if the user accessing the route is an admin
 *
 * For more on NestJs Guards: https://docs.nestjs.com/guards
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /** Checks if the user accessing the route is an admin
   *
   * For more on NestJs Guards: https://docs.nestjs.com/guards
   *
   * Instantiates the class and the Reflector dependency
   */
  constructor(private reflector: Reflector) {}

  /** If the user is an Admin, access is allowed */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization === 'admin';

    if (isAdmin && authorization) {
      return true;
    } else {
      throw new NotFoundException('Unauthorized');
    }

    return false;
  }
}
