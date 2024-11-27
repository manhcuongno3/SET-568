const users = [];
const { httpStatusCodes, messages } = require('../constants');

const userController = {
    getUsers: (request, response) => {
        response.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(users));
    },

    createUser: (request, response) => {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const newUser = JSON.parse(body);
            if(!newUser.username || !newUser.password){
                response.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: messages.INVALID_USERNAME_OR_PASSWORD }));
            }
            newUser.id =  Math.random().toString(16).slice(2);
            users.push(newUser);
            response.writeHead(httpStatusCodes.CREATED, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: messages.USER_CREATED, user: newUser }));
        });
    },

    getUserById: (request, response, id) => {
        const user = users.find(u => u.id === id);
        if (user) {
            response.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(user));
        } else {
            response.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: messages.USER_NOT_FOUND }));
        }
    },

    deleteUser: (request, response, id) => {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            response.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: messages.USER_DELETED, user: deletedUser }));
        } else {
            response.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: messages.USER_NOT_FOUND }));
        }
    }
};

module.exports = { userController };
