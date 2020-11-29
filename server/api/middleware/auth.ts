import {User} from '../../models/User';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {ErrorResponse} from "../utils/errorResponse";


const protect = async(req: Request, res: Response, next: NextFunction)=> {
    let token;
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token);

    // else if(req.cookies.token) {
    //     token = req.cookies.token
    // }
    if (!token) {
        return next(new ErrorResponse('Not authorized to access', 401))
    }
    try {
        // @ts-ignore
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        // @ts-ignore
        req.user = await User.findById(decoded.user._id);
        // @ts-ignore
        console.log(req.user);
        next()
    } catch (err) {
        console.error(err);
    }
}

const authorize = (...roles: any[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        if (!roles.includes(req.user.role)) {
            // @ts-ignore
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized`, 401))
        }
        next()
    }
}

export { protect, authorize };
