import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";

export const needSignin = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");
  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  // try , catch 를 사용한 이유 --> 에러컨트롤을 해주지 않으면 에러가 발생했을 때 서버가 꺼지는 현상이 생긴다.
  try {
    // 복호화 및 검증
    const { userId } = jwt.verify(
      authToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );

    const user = await prisma.users.findFirst({ where: { userId } });

    if (user.role === "normal") {
      req.user = user;
      next();
    } else if (user.role === "sitter") {
      const sitterUser = await prisma.users.findFirst({
        where: {
          userId,
        },
        select: {
          userId: true,
          email: true,
          role: true,
          sitters: {
            select: {
              career: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      const newuser = {
        userId: sitterUser.userId,
        email: sitterUser.email,
        role: sitterUser.role,
        career: sitterUser.sitters.career,
        name: sitterUser.sitters.name,
        createdAt: sitterUser.createdAt,
        updatedAt: sitterUser.updatedAt,
      }
  
      req.user = newuser;
      next();
    }
  } catch (error) {
    res.status(400).json({
      errorMessage: "검증에 실패하였습니다.",
    });
  }
  return;
};
