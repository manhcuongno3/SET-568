const { userController } = require('../controllers/userController');
const { httpStatusCodes, userRoutes, httpMethods, messages } = require('../constants');
const userRouter = (request, response) => {
    const { method, url } = request;

    if (url === userRoutes.GET_USERS && method === httpMethods.GET) {
        userController.getUsers(request, response);
    } else if (url === userRoutes.CREATE_USER && method === httpMethods.POST) {
        userController.createUser(request, response);
    } else if (url.startsWith(userRoutes.GET_USER_BY_ID) && method === httpMethods.GET) {
        const id = url.split('/')[2];
        userController.getUserById(request, response, id);
    } else if (url.startsWith(userRoutes.DELETE_USER) && method === httpMethods.DELETE) {
        const id = url.split('/')[2];
        userController.deleteUser(request, response, id);
    } else {
        response.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: messages.ROUTE_NOT_FOUND }));
    }
};

module.exports = { userRouter };
