const express = require('express');
const { DataTypes } = require('sequelize');
const app = express()
const sequelize = require('./db').sequelize
const User = require('./models/user')(sequelize, DataTypes)
const port = process.env.PORT || 8080;

app.get('/', async (_, res) => {
  const users = await User.findAll();
  res.send(users)
})

app.listen(port, () => {
  console.log(`Example app listening at port: ${port}`)
})
