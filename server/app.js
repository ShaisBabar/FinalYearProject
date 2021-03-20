const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');


const user = require('./routes/user');
const worker = require('./routes/worker');
const job = require('./routes/job');
const review = require('./routes/review');
const category = require('./routes/category');
const message = require('./routes/message');

//const ip_address = require('./ipaddress'); 
app.use(bodyparser.json()); //middleware for bodyparser
app.use(cors()); //middleware for bodyparser
app.use(methodOverride('_method'));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Server ip:  172.17.42.74
mongoose.connect("mongodb+srv://Mominadar:oth009@database-sxhxy.mongodb.net/doorstep?retryWrites=true&w=majority" || "mongodb://localhost:27017/Database") //connect to database
//connect to database
.then(() => console.log("Connected to database."))
.catch((err) => console.log(err));

app.use('/users', user);
app.use('/workers', worker);
app.use('/jobs', job);
app.use('/messages', message);
app.use('/category', category);
app.use('/review', review);

// if(process.env.NODE_ENV==='production')
// {

//   app.use(express.static(path.join(__dirname,'/AdminWeb/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'AdminWeb', 'build', 'index.html'));
//   });
// }
console.log(__dirname)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

  
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log('Server started on port: '+ port)); //start server
