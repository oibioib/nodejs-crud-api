import http from 'http';
import { PORT } from '@/config';

const server = http.createServer((_request, response) => {
  response.write('Init task!');
  response.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
