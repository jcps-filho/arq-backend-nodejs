var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('render_user', {
    name: users.items[0]
  })
});

var users = { items: [] }
router.post('/add', (req, res) => {
  users.items.push(req.body.name)
  console.log(req.body.name);
  res.send('Ok!')
})

module.exports = router;