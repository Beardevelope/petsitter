import AuthRepository from '../repository/auth.repository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthService {
  authRepository = new AuthRepository();
  signupUser = async(
    email,
    password,
    passwordConfirm,
    userName,
    petName,
    petType
  );
}
