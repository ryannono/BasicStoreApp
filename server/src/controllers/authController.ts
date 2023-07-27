import {Request, Response} from 'express';
import {prisma} from '../app';
import {MutableUserPayload} from '../utils/types';
import {verifyPassword} from '../utils/encryptionUtil';
import {DAY} from '../utils/constants';
import {handle500Error} from '../utils/500errorsUtil';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/tokenUtil';

export async function loginUser(req: Request, res: Response) {
  const {username, password} = req.body as MutableUserPayload;

  try {
    // identify the user
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(401).json({error: 'Invalid username'});
    }

    // verify the password
    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({error: 'Invalid password'});
    }

    // get tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // send tokens
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: DAY});
    res.status(200).json({accessToken});
    return res.json({user});
  } catch (err) {
    return handle500Error(res, err);
  }
}
