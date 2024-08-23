'use strict'

import app from'./app'

import greenlock from 'greenlock-express'

greenlock.init({
    packageRoot: __dirname + '/..',
    configDir: "./greenlock.d",
    // contact for security and critical bug notices
    maintainerEmail: "christoffer.billman@gmail.com",
    // whether or not to run at cloudscale
    cluster: false
})
// Serves on 80 and 443
// Get's SSL certificates magically!
.serve(app)