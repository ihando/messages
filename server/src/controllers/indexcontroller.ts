import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
//import { SECRET } from "../constants";

export function test(req: Request, res: Response): void {
  res.send("hi");
}
