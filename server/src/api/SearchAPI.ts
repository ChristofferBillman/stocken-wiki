import { Request, Response, Application } from 'express'
import Page from '../models/Page'

export default function SearchAPI(app: Application, BASEURL: string) {
    
    app.get(BASEURL + '/search/:query',  async (req, res) => {
        let query = req.params.query
        let queryWords = query.split(' ')

        Page.find({}).then(pages => {
            let matchingPages = []
            
            for(let page in pages){
                for(let word in queryWords){
                    if(pages[page].content.toLowerCase().indexOf(queryWords[word].toLowerCase()) != -1){
                        matchingPages.push(pages[page])
                    }
                }
            }
            res.json(matchingPages)
        }).catch(err => {
            console.log(err)
        })
    })

   /*  // POST (Login)
    app.post(BASEURL + '/login', async (req: Request, res: Response) => {
        const name: string = req.body.name
        const password: string = req.body.password
    
        if (name == undefined || password == undefined) {
            res.status(400)
            res.send('Missing credentials.')
            return
        }
    
        // Token.Generate authenticates the user.
        const token: string | null = await Token.Generate(name, password)
    
        if (token == null) {
            res.status(401)
            res.send('Incorrect credentials.')
            return
        }
        res.cookie('token', token)
        res.send(JSON.stringify({message: 'Successful login.'}))
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
    }) */
}