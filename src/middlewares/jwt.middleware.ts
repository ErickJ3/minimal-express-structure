import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Itoken {
  id: string;
  ait: number;
  exp: number;
}

export default function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);

    const { id } = data as Itoken;

    req.user_id = id;

    return next();
  } catch {
    return res.status(401).json({ message: "not authorized" });
  }
}
