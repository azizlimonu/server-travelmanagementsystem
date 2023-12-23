import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { JwtHelpers } from "../../handler/JwtHandler";

const auth =
  (...requiredRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
        console.log("TOKEN IS THIS => ", token);

        if (!token) {
          console.log("nothing token", token);
          throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        let verifiedUser;

        const verifiedToken = token.split(' ')[1];

        verifiedUser = JwtHelpers.verifyToken(verifiedToken, config.jwt.secret as Secret);
        console.log("VERIFIED USER ", verifiedUser);
        req.user = verifiedUser;

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          console.log("ROLES INVALID");
          throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
        }
        next();
      } catch (error) {
        console.log("ERROR WHILE MIDDLEWARE AUTH");
        next(error);
      }
    };

export default auth;
