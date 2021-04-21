const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
//const multer = require('multer')
//const upload = multer({
  //dest: '../front-end/public/images/',
  //limits: {
    //fileSize: 50000000
  //}
//});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const questionaireSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //path: String,
  title: String,
  description: String,
  questions: [{
    type: String
  }],
  created: {
    type: Date,
    default: Date.now
  }
});
const Questionaire = new mongoose.model("Questionaire", questionaireSchema);

//upload questionaire
router.post("/", validUser, async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const questionaire = new Questionaire({
    user: req.user,
    //path: "/questionaires/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
    questions: req.body.questions,
  });
  try {
    await questionaire.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", validUser, async (req, res) => {
  //return questionaires
  try {
    let qs = await Questionaire.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(qs);
  } catch (error) {
    return res.sendStatus(500);
  }
})

// TODO add answers to the questionaires, somehow - in another database, or in
// the same Schema?

module.exports = {
  routes: router,
  model: Questionaire,
}
