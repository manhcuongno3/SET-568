const http = require('http');
const { userRouter } = require('./routers/userRouter');

const server = http.createServer((request, response) => {
    userRouter(request, response);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
