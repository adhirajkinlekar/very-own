// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const router = express.Router();
const ServiceSSODetail = require('../models/ServiceSSO');


dotenv.config();

const createUser = async (username, email, password) => {

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  user = new User({ username, email, password });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();
  
  return user;

};

router.post('/register', async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const user = await createUser(username, email, password);

    const payload = {
      id: user.id,
    };

    jwtSign(res, payload, username);

    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // // Set the JWT in a cookie
    // res.cookie('JWT_TOKEN', token, {
    //   domain: '.veryown.com',  // This will apply to veryown.com and all subdomains
    //   secure: false,            // Ensure cookies are sent over HTTPS
    //   httpOnly: false,          // Prevent access from JavaScript
    //   sameSite: 'Lax'          // Lax is usually sufficient, adjust if needed
    // });

    // return res.status(200).send({ token, username });

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
      username: "Stephen Grider",
      publicId: "stepheng",
      userId: user.id,
      role: "super-admin"
    }

    const payload = {
      id: user.id
    };

    jwtSign(res, payload, username);

    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // // Set the JWT in a cookie
    // res.cookie('JWT_TOKEN', token, {
    //   domain: '.veryown.com',  // This will apply to veryown.com and all subdomains
    //   secure: false,            // Ensure cookies are sent over HTTPS
    //   httpOnly: false,          // Prevent access from JavaScript
    //   sameSite: 'Lax'          // Lax is usually sufficient, adjust if needed
    // });

    // return res.status(200).send({ token, username });

  } catch (err) {

    res.status(500).send(err.message);
  }
});

// @route   POST /login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  console.log(req.body)
  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create the payload
    const payload = {
      id: user.id,
    };

    jwtSign(res, payload, user.username);
 
  //   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  //   res.cookie('JWT_TOKEN', token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production', // Set to true for HTTPS
  //     sameSite: 'None', // Allow cross-site requests (necessary for cookies in cross-origin requests)
  //     domain: 'localhost', // Set to the domain of your application
  //     path: '/' // Set the path if necessary
  // });

  //   return res.status(200).send({ token, username: user.username });

  } catch (err) {
    console.error(err); // Log the error for debugging
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

router.get("/logout", (req, res) => {
  return res
    .clearCookie("JWT_TOKEN")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});


router.get('/service/:servicePublicId', async (req, res) => {

  try {

    const { servicePublicId } = req.params;

    const ServiceDetails = await ServiceSSODetail.findOne({ servicePublicId });

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
