const users = [];

const userController = {
    getUsers: (request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
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
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'invalid username or password'}));
            }
            newUser.id =  Math.random().toString(16).slice(2);
            users.push(newUser);
            response.writeHead(201, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User created', user: newUser }));
        });
    },

    getUserById: (request, response, id) => {
        const user = users.find(u => u.id === id);
        if (user) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(user));
        } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User not found' }));
        }
    },

    deleteUser: (request, response, id) => {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User deleted', user: deletedUser }));
        } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User not found' }));
        }
    }
};

module.exports = { userController };
