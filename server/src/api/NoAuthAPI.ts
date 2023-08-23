import { Request, Response, Application } from 'express'
import Token from "../Token"
import { PassHash } from '../PassHash'
import User from '../models/User'

export default function NoAuthAPI(app: Application, BASEURL: string) {
    
    // POST (Login)
    app.post(BASEURL + '/login', async (req: Request, res: Response) => {
        const name: string = req.body.name
        const password: string = req.body.password
    
        if (name == undefined || password == undefined) {
            res.status(400)
            res.send('Missing credentials.')
            return
        }
    
        // Token.Generate authenticates the user.
        const {user, token} = await Token.Generate(name, password)
    
        if (token == null) {
            res.status(401)
            res.send('Incorrect credentials.')
            return
        }

        user.password = undefined
        
        res.cookie('token', token)
        res.status(200).json(user)
    })

    // POST (Signup)
    app.post(BASEURL + '/user', async (req: Request, res: Response) => {
        const name: string = req.body.name
        const password: string = req.body.password
    
        if(name == undefined || password == undefined) {
            res.status(400)
            res.send()
            return
        }
    
        const user = await User.findOne({ name })
    
        if(user !== null) {
            res.status(409)
            res.send('Username is taken.')
            return
        }
        const hash = await PassHash.toHash(password)
    
        await new User({name, password: hash}).save()
    
        res.status(200)
        res.send(JSON.stringify({message: 'Created User.'}))
    })
}