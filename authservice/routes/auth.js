// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const createUser = async ( username, email, password ) => {

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

 user = new User({ username, email, password });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();
};

router.post('/register', async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const user = await createUser(username, email, password);

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwtSign(payload, username);

  } catch (err) {
     
    res.status(500).send(err.message);
  }
});

router.post('/register-creator', async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const user = await createUser(username, email, password, true);

    // create this inside admin service
    const creator = {
      username : "Stephen Grider",
      tenantId: "stepheng",
      userId: user.id,
      role: "super-admin"
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwtSign(payload, username);

  } catch (err) {
     
    res.status(500).send(err.message);
  }
});

// @route   POST /login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwtSign(payload, user.username);
 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


const jwtSign = (payload, username) => {
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err;
      res.json({ token, username });
    }
  );
}

module.exports = router;
