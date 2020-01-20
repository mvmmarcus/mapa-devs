const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://mvmmarcus:Mvm131296@cluster0-shard-00-00-jcjdh.mongodb.net:27017,cluster0-shard-00-01-jcjdh.mongodb.net:27017,cluster0-shard-00-02-jcjdh.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); //precisa vir antes
app.use(routes);


app.listen(3333);