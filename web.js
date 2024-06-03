import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: 'hello' });
});

var server = app.listen(process.env.PORT, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});

// module.exports = (bot) => {
//   app.post('/' + bot.token, (req, res) => {
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });
// };

export default function initWeb(bot) {
  app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
}