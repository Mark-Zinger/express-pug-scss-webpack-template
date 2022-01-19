const express = require('express');
const path = require('path');

require('dotenv').config();

/**
 * App Variables
 */

const env = process.env.NODE_ENV || 'development';
const app = express();
const port =
    env === 'development' ? 5000 : process.env.PROD_PORT;

/**
 *  App Configuration
 */

app.set('views', path.join(__dirname, '..','client','src','pages'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

/**
 * Routes Definitions
 */

// > Home

app.get('/', (req, res) => {
    res.render('index', {
        data: { 
            test: {
                name: "Олег"
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
