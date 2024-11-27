const httpStatusCodes = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
};

const userRoutes = {
    GET_USERS: '/users',
    GET_USER_BY_ID: '/users/:id',
    CREATE_USER: '/users',
    DELETE_USER: '/users/:id',
};

const httpMethods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

const messages = {
    USER_CREATED: 'User created',
    USER_DELETED: 'User deleted',
    USER_NOT_FOUND: 'User not found',
    INVALID_USERNAME_OR_PASSWORD: 'Invalid username or password',
    ROUTE_NOT_FOUND: 'Route not found',
};

module.exports = { httpStatusCodes, userRoutes, httpMethods, messages };
