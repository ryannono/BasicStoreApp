"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const app_1 = require("../app");
const encryptionUtil_1 = require("../../utils/encryptionUtil");
const constants_1 = require("../../utils/constants");
const _500errorsUtil_1 = require("../../utils/500errorsUtil");
const tokenUtil_1 = require("../../utils/tokenUtil");
async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        // identify the user
        const user = await app_1.prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }
        // verify the password
        const validPassword = await (0, encryptionUtil_1.verifyPassword)(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // get tokens
        const accessToken = (0, tokenUtil_1.generateAccessToken)(user);
        const refreshToken = (0, tokenUtil_1.generateRefreshToken)(user);
        // send tokens
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: constants_1.DAY });
        res.status(200).json({ accessToken });
        return res.json({ user });
    }
    catch (err) {
        return (0, _500errorsUtil_1.handle500Error)(res, err);
    }
}
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map