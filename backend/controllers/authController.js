const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};