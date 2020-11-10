const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 4000;
const svgCaptcha = require('svg-captcha');

const fetch = require('node-fetch');
let SECRET_KEY = "SECRET_KEY";

const cors = require('cors');
app.use(cors());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// request handlers
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Clue Mediator' });
});

app.listen(port, () => {
    console.log('Server started on: ' + port);
});

// verify reCAPTCHA response
app.post('/verify', (req, res) => {
    console.log('-------------in server');
    const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body['g-recaptcha-response']}`;
    return fetch(VERIFY_URL, { method: 'POST' })
        .then(res => res.json())
        .then(json => res.send(json));
});

app.get('/captcha', function (req, res) {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
});
