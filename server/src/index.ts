import GetDatabaseConnection from './Database'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import express, { Request, Response, Application } from 'express'
import Token from './Token'
import UserAPI from './api/UserAPI'
import NoAuthAPI from './api/NoAuthAPI'
import PageAPI from './api/PageAPI'
import SearchAPI from './api/SearchAPI'
import PageHistoryAPI from './api/PageHistoryAPI'

GetDatabaseConnection()

const app: Application = express()
const port = process.env.PORT || 3000
const BASEURL = '/api'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [
        'http://wiki.stocken.okdev.se',
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000" 
    ],
    credentials: true
}))

app.listen(port, () => console.log(`Wiki server is running on port ${port}`))

app.get(BASEURL + '/test', (req: Request, res: Response) => res.send('Hello: ' + req.query.name))

NoAuthAPI(app, BASEURL)

// cookieParser is run before Token.VerifyMiddleware
// because it depends on the cookies being parsed.
app.use(cookieParser())
// This middleware will be invoked on all following routes.
// All following routes will require a valid token.
app.use(Token.VerifyAndAddIdToReq)

UserAPI(app, BASEURL + '/user')
PageAPI(app, BASEURL + '/page')
PageHistoryAPI(app, BASEURL + '/page/history')
SearchAPI(app, BASEURL)

