import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url: environment.backendUrl, options: {} };
export default config; 