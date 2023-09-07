import { Request, Response, Application } from 'express'
import { PassHash } from '../PassHash'
import User, { IUser } from '../models/User'
import Token from '../Token'

export default function UserAPI(app: Application, BASEURL: string) {
    
    // GET
    // Gets the logged in user.
    app.get(BASEURL + '/', async (req, res) => {
        try{
            let user: IUser = await User.findById(req.userId)

            user.password = undefined

            res.status(200).json(user)
        }
        catch(err) {
            res.status(500).send('An error occured')
        }
    })

    // GET
    // Gets a user by its id
    app.get(BASEURL + '/:id', async (req, res) => {
        try {
            let id = req.params.id
            let user: IUser = await User.findById(id)

            user.password = undefined

            res.status(200).json(user)
        }
        catch(err) {
            res.status(500).send('An error occured')
        }
    })

    // POST 
    // Is located in NoAuthAPI. Everyone can create a user.
    
    // DELETE
    app.delete(BASEURL + '/', async (req, res) => {
        await User.findByIdAndDelete(req.userId).exec()
    })

    // PUT
    app.put(BASEURL + '/', async (req, res) => {
        try {
            const id = req.userId
            const { name } = req.body

            const updatedUser: IUser | null = await User.findByIdAndUpdate(
                id,
                { name },
                { new: true }
            )

            if (!updatedUser) {
                return res.status(404).send('User not found')
            }
            updatedUser.password = undefined
            res.json(updatedUser)

        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })

    // PUT
    app.put(BASEURL + '/changePassword', async (req, res) => {
        try {
            const id = req.userId
            const { password } = req.body
            
            const hash = await PassHash.toHash(password)

            const updatedUser: IUser | null = await User.findByIdAndUpdate(
                id,
                { password: hash },
                { new: true }
            )

            if (!updatedUser) {
                return res.status(404).send('User not found')
            }
        
            updatedUser.password = undefined
            res.cookie('token', id + '_' + hash, { sameSite: 'none', secure: true })
            res.json(updatedUser)
        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })
}