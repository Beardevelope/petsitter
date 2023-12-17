import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";

export const userCheck = async (req, res, next) => {
    const { userId } = req.user;
    const { reservationId } = req.body;
    const reservation = await prisma.reservation.findUnique({
        where: { reservationId: Number(reservationId) },
        include: {
            pets: true,
        },
    })
    reservation.pets.userId === userId ? next() : res.status(403).json({
        errorMessage: "접근 권한이 없습니다.",
    });

}