const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 8081;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Xmeme API",
            description: "Xmeme API Information",
            contact: {
                name: "Devansh Chaubey"
            },
            servers: ["http://localhost:8081"]
        }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
* @swagger
* /memes:
 *   get:
 *     summary: Retrieve a list of all memes.
 *     description: to get list of all memes posted by the users .
 *     responses:
 *       200:
 *         description: A list of memes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The meme ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: the user name.
 *                         example: Vishal
 *                       url:
 *                         type: string
 *                         description: image url of the memes
 *                       caption:
 *                          type: string
 *                          description: caption of the given memes 
 */
app.get('/memes', db.getMemes)

/**
 * @swagger
 * /memes:
 *   post:
 *     summary: Post a meme.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: name of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: url
 *         required: true
 *         description: meme image url .
 *         schema:
 *           type: string
 *       - in: path
 *         name: caption
 *         required: true
 *         description: meme caption.
 *         schema:
 *           type: string           

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *               url:
 *                 type: string
 *                 description: The meme image url.
 *                 example: https://img.com/123
 *               caption:
 *                 type: string
 *                 description: caption of the meme.
 *                 example: vishal jha amazon
 *      responses:
 *        200:
 *         description: A list of memes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The meme ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: the user name.
 *                         example: Vishal
 *                       url:
 *                         type: string
 *                         description: image url of the memes
 *                       caption:
 *                          type: string
 *                          description: caption of the given memes 
 */
app.post('/memes', db.createMeme)

app.get('/memes/:id', db.getMemeById)

app.put('/memes/:id', db.updateMeme)

app.listen(port, () => {
    console.log(process.env.DATABASE_URL)
    console.log('runnning');
})