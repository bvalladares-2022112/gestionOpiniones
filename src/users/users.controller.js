import User from './users.model.js';
import { encrypt, checkPassword } from '../utils/validator.js';
import { generateJwt } from '../utils/jwt.js';

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}


export const register = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ $or: [{ email: data.email, user: data.user }] });
        if (user) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }
        data.password = await encrypt(data.password);
        user = new User(data);
        await user.save();
        return res.status(201).send({ message: 'User registration successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'User registration error' });
    }
};


export const login = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] });
        if (user && await checkPassword(data.password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                email: user.email
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.username}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(401).send({ message: 'Invalid credentials provided' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Login attempt failed' });
    }
};

export const editProfile = async (req, res) => {
    try {
        let { id } = req.params;
        let { username, email, currentPassword, newPassword } = req.body;
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (!(await checkPassword(currentPassword, user.password))) {
            return res.status(401).send({ message: 'The current password entered is incorrect.' });
        }
        if (username) user.username = username;
        if (email) user.email = email;
        if (newPassword) {
            newPassword = await encrypt(newPassword);
            user.password = newPassword;
        }

        await user.save();

        return res.send({ message: 'User profile successfully updated', user });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'User profile update error' });
    }
};