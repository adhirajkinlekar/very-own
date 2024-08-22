// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const router = express.Router();
const ServiceSSODetail = require('../models/ServiceSSO');


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

    jwtSign(res, payload, username);

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
      publicId: "stepheng",
      userId: user.id,
      role: "super-admin"
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwtSign(res, payload, username);

  } catch (err) {
     
    res.status(500).send(err.message);
  }
});

// @route   POST /login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log({body: req.body})
  try {
    
    let user = await User.findOne({ email });

    console.log({user})

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
 
    jwtSign(res, payload, user.username);
 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


const jwtSign = (res, payload, username) => {
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) {

        throw err;
      }

      return res.status(200).send({ token, username });
    }
  );
}


router.get('/service/:servicePublicId', async (req, res) => {
 
  try {
 
    const { servicePublicId } = req.params;

    const ServiceDetails = await ServiceSSODetail.findOne({servicePublicId});

    console.log({ServiceDetails: ServiceDetails})

    if (!ServiceDetails) {
      return res.status(400).json({ msg: 'Invalid Service' });
    }
  
    res.status(200).send(ServiceDetails);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
