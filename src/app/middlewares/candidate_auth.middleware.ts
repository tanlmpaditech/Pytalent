import { AuthRequest } from '@interfaces/response.interface';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/http.exception';
import { IAccessToken } from '@interfaces/token.interface';
import { verifyToken } from '@utils/token';
import User from '@models/entities/user.entity';
import RoleId from '@enum/user.enum';

@Service()
export class CandidateAuthMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
      const payload = (await verifyToken(accessToken)) as IAccessToken;
      console.log(payload);
      const user = await User.findOne({
        where: {
          email: payload.email,
        },
        raw: true,
      });

      if (user.role_id !== RoleId.CANDIDATE) {
        return next(new HttpException(401, 'Unauthorized'));
      }

      request.user = user;

      return next();
    } catch (error) {
      console.log(error);
      return next(new HttpException(401, 'Unauthorized'));
    }
  }
}
