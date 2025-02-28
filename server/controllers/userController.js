const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const cloudinary = require('../middleware/cloudinary');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register(req, res, next) {
    try {
      const { UserName, email, password, imgUrl } = req.body;

      const user = await User.create({ UserName, email, password, imgUrl });

      const userWithoutPassword = {
        id: user.id,
        email: user.email,
        UserName: user.UserName,
        imgUrl: user.imgUrl,
      };

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: 'LoginFailed' };
      }

      const comPass = comparePassword(password, user.password);
      if (!comPass) {
        throw { name: 'LoginFailed' };
      }
      const payload = {
        id: user.id,
        email: user.email,
        UserName: user.UserName,
        imgUrl: user.imgUrl,
      };
      const token = createToken(payload);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          '557252435138-sjdhm6ol78q3g6eduddqq02t5aauh99d.apps.googleusercontent.com',
      });

      const payload = ticket.getPayload();

      console.log(payload.email,'<<<');
      

      const [user, created] = await User.findOrCreate({
        where: {
          UserName: payload.email,
        },
        defaults: {
          UserName: payload.email,
          email: payload.email,
          password: 'password_google',
        },
        hooks: false,
      });

      const access_token = createToken({
        id: user.id,
        UserName: user.UserName,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    console.log('masukkk');
    try {
      console.log(req.loginInfo, '<<<<<<<<<<<<< ini login info');
      const { userId } = req.loginInfo;

      if (!userId) {
        throw { name: 'Unauthorized' };
      }
      const user = await User.findByPk(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const user = await User.findByPk(userId);

      if (!user) throw { name: 'NotFound' };

      console.log('req.file:', req.file);

      const imageInBase64 = req.file.buffer.toString('base64');
      const base64Data = `data:${req.file.mimetype};base64,${imageInBase64}`;

      const upload = await cloudinary.uploader.upload(base64Data, {
        public_id: `user_${userId}_profile`,
        tags: ['profile'],
      });

      console.log(upload, '<<<<<<<<<<<<< ini upload');

      await User.update(
        {
          imgUrl: upload.secure_url,
        },
        { where: { id: userId } }
      );

      res.status(201).json({
        message: `Success upload Profile Picture id ${userId}`,
        imgUrl: upload.secure_url,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = UserController;
