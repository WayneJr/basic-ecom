import bcrypt from 'bcryptjs';
import {Request, Response, NextFunction} from "express";
import {User} from "../../models/User";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';


const root = (req: any, res: any, next: any) => {
  res.send("<h1>Index route ni e</h1>");
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({email});
    if (user) {
      // @ts-ignore
      return res.status(400).json({msg: `${user.modelName} exists`});
    }

    user = await User.create({name, email, password});
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // @ts-ignore
    jwt.sign({user}, process.env.JWT_SECRET, (err: any, token: any) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        data: {token}
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In saving User'
    });
  }

}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({email}).select('+password');
    console.log(user);
    if (!user) return res.status(400).json({message: `${User.modelName} doesn't exist`});
    // @ts-ignore
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({message: 'Incorrect Password'});

    // @ts-ignore
    jwt.sign({user}, process.env.JWT_SECRET, (err: any, token: any) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        data: {token}
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server Error',
      details: err
    });
  }

}

// module.exports = { root, login, register};
export { root, login, register};

// module.exports = {
//   root: root,
//   login: async function(req:any, res:any, next:any) {
//     login(req, res, next)
//         .then(() => console.log('User successfully logged in'));
//   },
//   register: async function(req:any, res:any, next:any) {
//     register(req, res, next)
//         .then(() => console.log('User successfully added'));
//   },
//
// };
