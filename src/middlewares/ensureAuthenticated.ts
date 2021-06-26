import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
) {
  
  const authToken = request.headers.authorization;
  
  if(!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, "d6339e19f43d9e71c81aa4c1154b01cf") as IPayload;
 
    request.user_id = sub 

    return next();
  } catch (err) {
    return response.status(401).end();
  }

}
