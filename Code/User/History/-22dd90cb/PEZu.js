"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const p_queue_1 = __importDefault(require("p-queue"));
const qs_1 = require("qs");
const batch_1 = __importDefault(require("./methods/batch"));
const call_1 = __importDefault(require("./methods/call"));
const list_1 = __importDefault(require("./methods/list"));
const oauth_1 = __importDefault(require("./methods/oauth"));
const methods_1 = require("./../methods");
const BITRIX_API_RATE_LIMIT = 2;
const BITRIX_API_RATE_INTERVAL = 1000;
exports.default = (config) => {
    let baseURL = `${config.https ? 'https' : 'http'}://${config.domain}/rest/`;
    if (config.mode === methods_1.ModeConfig.Webhook)
        baseURL += `${config.user_id}/${config.access_token}/`;
    const client = axios_1.default.create({
        baseURL,
        responseType: 'json',
        transformRequest: [
            data => {
                return qs_1.stringify(data);
            }
        ]
    });
    let oauth = undefined;
    if (config.mode === methods_1.ModeConfig.OAuth)
        oauth = oauth_1.default(config, client);
    const queue = new p_queue_1.default({
        intervalCap: BITRIX_API_RATE_LIMIT,
        interval: BITRIX_API_RATE_INTERVAL
    });
    const queuedPost = (...args) => queue.add(() => client.post(...args));
    const call = call_1.default({ post: queuedPost });
    const batch = batch_1.default({ post: queuedPost });
    const list = list_1.default({ call, batch });
    return {
        oauth,
        call,
        batch,
        list
    };
};
//# sourceMappingURL=index.js.map