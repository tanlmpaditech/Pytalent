import UserType from "@enum/user.enum";
import { HttpException } from "@exceptions/http.exception";
import { AuthRequest } from "@interfaces/response.interface";
import { IAccessToken } from "@interfaces/token.interface";
import User from "@models/entities/user.entity";
import { verifyToken } from "@utils/token";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";


@Service()
export class AdminMiddleware implements ExpressMiddlewareInterface {
    async use(request: AuthRequest, response: any, next?: (err?: any) => any): Promise<any> {
        const bearer = request.headers.authorization;
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        const accessToken = bearer.split('Bearer ')[1].trim();

        try {
            const payload = await verifyToken(accessToken) as IAccessToken
            const user = await User.findOne({
                where: {
                    email: payload.email,
                },
                raw: true,
            });

            if (user.role_id !== UserType.ADMIN) {
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