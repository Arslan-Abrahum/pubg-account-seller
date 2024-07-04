const jwt = require('jsonwebtoken');
const User = require('../modals/User');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'my_pubg_web';
const JWT_EXPIRES_IN = '5h';

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userCount = await User.countDocuments();
        if (userCount > 1) {
            return res.status(400).json({ message: 'A user already exists' });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
          // Handle unique index violation (duplicate username)
          if (err.code === 11000) {
            return res.status(400).json({ message: 'Cannot Create Again' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials for username' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials for password' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAuth = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAuth = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.user.userId; // Assuming req.user is set after token verification
    const { username, password } = req.body;

    try {
        const updateFields = {};
        if (username) {
            updateFields.username = username;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        if (err.code === 11000) { // Handle duplicate username error
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};
