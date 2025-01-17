// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let date;
  const inputDate = req.params.date;
  
  if (inputDate) {
    date = isNaN(inputDate) ? new Date(inputDate) : new Date(parseInt(inputDate));
  } else {
    date = new Date();
  }

  if (isNaN(date.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});