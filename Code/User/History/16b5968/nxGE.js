import axios from 'axios';
import Queue from 'p-queue';
import { stringify as toQuery } from 'qs';
import Batch from './methods/batch';
import Call from './methods/call';
import List from './methods/list';
import OAuth from './methods/oauth';
import { ModeConfig } from "./../methods";
const BITRIX_API_RATE_LIMIT = 2;
const BITRIX_API_RATE_INTERVAL = 1000;
export default (config) => {
    let baseURL = `${config.https ? 'https' : 'http'}://${config.domain}/rest/`;
    if (config.mode === ModeConfig.Webhook)
        baseURL += `${config.user_id}/${config.access_token}/`;
    const client = axios.create({
        //withCredentials: true,
        baseURL,
        responseType: 'json',
        transformRequest: [
            data => {
                return toQuery(data);
            }
        ]
    });
    console.log(baseURL)
    let oauth = undefined;
    if (config.mode === ModeConfig.OAuth)
        oauth = OAuth(config, client);
    const queue = new Queue({
        intervalCap: BITRIX_API_RATE_LIMIT,
        interval: BITRIX_API_RATE_INTERVAL
    });
    const queuedPost = (...args) => queue.add(() => client.post(...args));
    const call = Call({ post: queuedPost });
    const batch = Batch({ post: queuedPost });
    const list = List({ call, batch });
    return {
        oauth,
        call,
        batch,
        list
    };
};
//# sourceMappingURL=index.js.map