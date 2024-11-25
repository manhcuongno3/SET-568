const { userController } = require('../controllers/userController');

const userRouter = (req, res) => {
    const { method, url } = req;

    if (url === '/users' && method === 'GET') {
        userController.getUsers(req, res);
    } else if (url === '/users' && method === 'POST') {
        userController.createUser(req, res);
    } else if (url.startsWith('/users/') && method === 'GET') {
        const id = url.split('/')[2];
        userController.getUserById(req, res, id);
    } else if (url.startsWith('/users/') && method === 'DELETE') {
        const id = url.split('/')[2];
        userController.deleteUser(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = { userRouter };
