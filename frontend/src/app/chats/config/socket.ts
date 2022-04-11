import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url: environment.sockets.url, options: {} };
export default config; 