import {prismaClient} from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Token');
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        }).end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
                status_code: 1
            }
        });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}
