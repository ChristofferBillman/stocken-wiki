import { PassHash } from "./PassHash";
import { Request, Response, Next } from 'express'
import User, { IUser } from "./models/User";

export default class Token {
    static DELIMITER = '_'
    /**
     * Checks if a given token on the form [guid].[password hash] is valid.
     */
    static async Verify(token: string): Promise<boolean> {
        const [id, password] = token.split(Token.DELIMITER)

        const player: IUser = await User.findOne({ _id: id })

        if (player == null) {
            return false
        }

        return player.password == password
    }
    /**
     * Middleware for express that checks for the presence of a valid token in cookies.
     * If no valid token is found, a 401 (Unauthorized) status is sent.
     * If valid token is found, the Id-part of it is added to the request object as req.userId.
     * @param req Express request
     * @param res Expess response
     * @param next Express next function
     * @returns void
     */
    static async VerifyAndAddIdToReq(req: Request, res: Response, next: Next) {
        const token = req.cookies.token

        if (token == undefined) {
            res.status(401)
            res.send('Token is missing.')
            return
        }

        const authenticated: boolean = await Token.Verify(token)

        if (!authenticated) {
            res.status(401)
            res.send('Invalid token.')
            return
        }
        // Set guid on request so that other controllers can use it.
        const [id, _] = token.split(Token.DELIMITER)
        req.userId = id
        next()
    }
    /**
     * Generates a token on the form [guid][DELIMITER][password hash] for a given GUID and password (cleartext).
     * Does checks whether this player exists and if the password provided is correct.
     * @param guid The GUID of the player to generate a token for.
     * @returns A token or Nothing.
     */
    static async Generate(name: string, cleartextPassword: string): Promise<{user: IUser, token: string} | null> {

        // Find a player by name, CASE INSENSITIVE.
        const user: IUser = await User.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } })

        if (user == null || user.password == null) {
            console.log('Tried to generate a token for a non-existent player')
            return null
        }

        const authenticated: boolean = await PassHash.compare(user.password, cleartextPassword)

        if (!authenticated) {
            console.log('Tried to generate a token provided a wrong password.')
            return null
        }

        const hash: string = user.password
        return {user, token: user._id + Token.DELIMITER + hash}
    }
}