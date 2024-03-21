'use strict';

function transformToString(obj) {
    if (typeof obj === 'object')
        return JSON.stringify(obj);
    return obj;
}

function destr(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return str;
    }
}

function parseURLParams(url) {
    const params = url.split('?')[1];
    const result = {};
    if (params) {
        const pairs = params.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            result[key] = value;
        }
    }
    return result;
}
function parseURL(url) {
    if (!url.includes('?'))
        return { path: url, params: {} };
    const [_url] = url.split('?');
    return { url: _url, params: parseURLParams(url), raw: url };
}

function v4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const methods = ['get', 'put', 'delete', 'head', 'options', 'patch', 'post'];
/**
 * 发送请求
 * @param props 请求参数
 * @param callback 回调函数
 */
const callBackHttpClient = {};
for (const method of methods) {
    // @ts-expect-error 这个地方无法通过类型检查
    callBackHttpClient[method] = (props, callback) => {
        $httpClient[method](props, callback);
    };
}
const httpClient = {};
for (const method of methods) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    httpClient[method] = (props) => {
        return new Promise((resolve, reject) => {
            // @ts-expect-error 不想做类型检查...
            callBackHttpClient[method](props, (error, response, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve({
                        status: response.status,
                        headers: response.headers,
                        data,
                    });
                }
            });
        });
    };
}

const words = 'abcdefghijklmnopqrstuvwxyz';
function fakeEmail() {
    let email = '';
    let company = '';
    for (let i = 0; i < 10; i++)
        email += words[Math.floor(Math.random() * words.length)];
    email += '@';
    for (let i = 0; i < 5; i++)
        company += words[Math.floor(Math.random() * words.length)];
    email += `${company}.com`;
    return email;
}
function fakeUrl() {
    let url = '';
    for (let i = 0; i < 10; i++)
        url += words[Math.floor(Math.random() * words.length)];
    url += '.com';
    return url;
}

/**
 * 构建 Surge 响应体
 *
 * @param props 响应体属性
 * @param props.headers 响应头
 * @param props.body 响应体
 * @param props.status 响应状态码w
 * @description Surge 会直接返回 HTTP 响应，而不进行真实的网络操作
 */
function ResponseDone(props) {
    if (props.body)
        props.body = transformToString(props.body);
    return {
        response: {
            ...props,
        },
    };
}
function Done(props) {
    var _a;
    if (props.body)
        props.body = transformToString(props.body);
    if ((_a = props.response) === null || _a === void 0 ? void 0 : _a.body)
        props.response.body = transformToString(props.response.body);
    return {
        ...props,
    };
}

/**
 * Timer class
 *
 * @class Timer
 */
class Timer {
    constructor() {
        this.start = Date.now();
    }
    /**
     * Start the timer
     *
     * @memberof Timer
     */
    startTimer() {
        this.start = Date.now();
    }
    /**
     * End the timer
     *
     * @memberof Timer
     */
    endTimer() {
        this.end = Date.now();
    }
    /**
     * Get the duration of the timer
     *
     * @memberof Timer
     */
    getDuration() {
        if (this.end)
            return this.end - this.start;
        return Date.now() - this.start;
    }
    /**
     * Get the duration of the timer in seconds
     *
     * @memberof Timer
     */
    getDurationInSeconds() {
        return this.getDuration() / 1000;
    }
}

/**
 * @url https://api.gumroad.com/v2/licenses/verify
 */
function GumroadValidate() {
    console.log($request);
    const url = $request.url;
    const _body = $request.body;
    let params = parseURLParams(url);
    // 如果 params 里面没有东西，那就是 body 里面有东西
    if (Object.keys(params).length === 0)
        params = parseURLParams(`${$request.url}?${_body}`);
    const body = {
        success: true,
        uses: 0,
        purchase: {
            order_number: 524459935,
            id: v4(),
            seller_id: v4(),
            purchaser_id: v4(),
            subscription_id: v4(),
            product_id: unescape(params.product_id) || v4(),
            product_name: 'Gumroad\'s Product',
            permalink: params.product_permalink || 'gumroad-product',
            product_permalink: params.product_permalink || fakeUrl(),
            email: fakeEmail(),
            price: 0,
            gumroad_fee: 0,
            currency: 'usd',
            quantity: 1,
            discover_fee_charged: false,
            can_contact: false,
            referrer: 'none',
            sale_id: v4(),
            sale_timestamp: new Date().toISOString(),
            license_key: params.license_key,
            refunded: false,
            disputed: false,
            dispute_won: false,
            created_at: '2021-01-01T00:00:00Z',
        },
    };
    return ResponseDone({
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body,
    });
}

// LicenseKey -> ProductID mapping
const licenseKeyToProductID = {
    '401934ec-0a54-433c-a299-2a363501d4be': 154474,
    'ca3120ca-f2f7-4d8b-89ec-76effe34431b': 172179,
};
/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
function lemonSqueezyActive() {
    let product_id = 0;
    const body = destr($request.body);
    const license_key = (body === null || body === void 0 ? void 0 : body.license_key) || parseURL($request.url).params.license_key;
    // LicenseKey -> ProductID mapping
    product_id = licenseKeyToProductID[license_key] || 0;
    return ResponseDone({
        body: {
            activated: true,
            license_key: {
                id: 1,
                status: 'active',
                key: license_key,
                activation_limit: 1,
                activation_usage: 0,
                created_at: new Date().toISOString(),
                expires_at: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toISOString(),
            },
            instance: {
                id: 'f90ec370-fd83-46a5-8bbd-44a241e78665',
                name: 'Wibus Wee',
                created_at: new Date().toISOString(),
            },
            meta: {
                product_id,
                product_name: 'Lemon Squeezy',
                customer_id: 1,
                customer_name: 'Wibus Wee',
                customer_email: 'luke@skywalker.com',
            },
            error: null,
        },
    });
}

function lemonsqueezyValidate() {
    return ResponseDone({
        body: {
            valid: true,
            error: null,
        },
    });
}

/**
 * Paddle activation
 * @url https://v3.paddleapi.com/3.2/license/activate
 */
function paddleActivate() {
    const body = $request.body;
    // console.log(body)
    if (!body) {
        return ResponseDone({
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: {
                success: false,
                response: {
                    error: '[Surge] Activator: No body found',
                },
            },
        });
    }
    const _body = body.split('&');
    let product_id = '';
    for (const k of _body) {
        if (k.includes('product_id'))
            product_id = k.split('=')[1];
    }
    return ResponseDone({
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            success: true,
            response: {
                product_id,
                activation_id: '@wibus-wee',
                type: 'activate',
                expires: 1,
                expiry_date: 1999999999999,
            },
            signature: '',
        },
    });
}

/**
 * Paddle verification
 * @url https://v3.paddleapi.com/3.2/license/verify
 */
function paddleVerify() {
    const body = {
        success: true,
        response: {
            type: 'personal',
            expires: 1,
            expiry_date: 1999999999999,
        },
        signature: '',
    };
    return ResponseDone({
        body,
    });
}

const DashboardModuleRouter = [
    {
        base: 'test',
        func: async () => {
            console.log('Test');
            const request = await httpClient.get({ url: 'https://baidu.com' });
            return ResponseDone({ body: {
                    status: request.status,
                    headers: request.headers,
                    data: 'Test Success!',
                } });
        },
    },
    {
        base: '',
        func: () => {
            return ResponseDone({ status: 200, body: 'Dashboard' });
        },
    },
];

/**
 * @url https://buy.itunes.apple.com/verifyReceipt
 */
function iTunesVerifyReceipt() {
    return ResponseDone({
        body: {
            status: 0,
            receipt: {
                in_app: [
                    {
                        expires_date_ms: 4096018800000,
                        expires_date: '2100-01-01T00:00:00Z',
                    },
                ],
            },
        },
    });
}

/**
 * @url https://shottr.cc/licensing/verify.php
 * @url https://shottr-verify-license.blimps.workers.dev
 */
function shottrVerifyLicense() {
    const body = {
        // ...destr($response.body),
        hash: destr($request.body).hash,
        tier: '1',
        // explanation: undefined,
    };
    return ResponseDone({
        body,
    });
}

/**
 * @url https://shottr.cc/api/telemetry.php
 */
function shottrTelemetry() {
    return ResponseDone({
        body: {
            result: 'success',
        },
    });
}

/**
 * @url https://backend.raycast.com/api/v1/me
 */
function raycastActivate() {
    return activeWithResponse();
}
function activeWithResponse() {
    const body = JSON.parse($response.body);
    return Done({
        headers: {
            ...$response.headers,
        },
        body: {
            ...body,
            has_active_subscription: true,
            has_pro_features: true,
            has_better_ai: true,
            eligible_for_pro_features: true,
            eligible_for_ai: true,
            eligible_for_gpt4: true,
            eligible_for_ai_citations: true,
            eligible_for_developer_hub: true,
            eligible_for_application_settings: true,
            publishing_bot: true,
            can_upgrade_to_pro: false,
            admin: true,
        },
    });
    // sendNotification("Raycast", "Activate Success", "Done");
}

function unblockRequest() {
    if ($request.headers['x-raycast-unblock']) {
        console.log('Raycast Unblock request');
        return Done({
            headers: {
                ...$request.headers,
                'x-raycast-unblock': undefined,
            },
        });
    }
    return Done({
        url: $request.url.replace('https://backend.raycast.com', 'http://127.0.0.1:3000'),
        headers: $request.headers,
        body: $request.body,
    });
}

/**
 * @url https://backend.raycast.com/api/v1/me/trial_status
 */
function raycastTrialStatus() {
    const body = $request.body || '{}';
    const data = JSON.parse(body);
    data.organizations = [];
    data.trial_limits = {
        commands_limit: 999,
        quicklinks_limit: 999,
        snippets_limit: 999,
    };
    return ResponseDone({
        body: data,
    });
}

function countLetterI(translateText) {
    return (translateText || '').split('i').length - 1;
}
function getTimestamp(letterCount) {
    const timestamp = new Date().getTime();
    return letterCount !== 0
        ? timestamp - (timestamp % (letterCount + 1)) + (letterCount + 1)
        : timestamp;
}
async function raycastTranslate() {
    var _a;
    const endpoint = 'https://www2.deepl.com/jsonrpc';
    const body = destr($request.body);
    const query = {
        text: body.q,
        source_lang: body.source || 'auto',
        target_lang: body.target,
    };
    const requestParams = {
        jsonrpc: '2.0',
        method: 'LMT_handle_texts',
        id: Math.floor(Math.random() * 100000 + 100000) * 1000,
        params: {
            texts: [{ text: '', requestAlternatives: 3 }],
            timestamp: 0,
            splitting: 'newlines',
            lang: {
                source_lang_user_selected: query.source_lang.toUpperCase(),
                target_lang: (_a = query.target_lang) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
            },
        },
    };
    requestParams.params.texts = [
        {
            text: query.text,
            requestAlternatives: 3,
        },
    ];
    requestParams.params.timestamp = getTimestamp(countLetterI(query.text));
    let requestBody = JSON.stringify(requestParams);
    if ([0, 3].includes((requestParams.id + 5) % 29)
        || (requestParams.id + 3) % 13 === 0)
        requestBody = requestBody.replace('"method":"', '"method" : "');
    else
        requestBody = requestBody.replace('"method":"', '"method": "');
    const translateResponse = await httpClient.post({
        url: endpoint,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: requestBody,
    }).then((res) => {
        var _a, _b, _c, _d, _e, _f;
        const data = destr(res.data);
        const { result } = data;
        return {
            code: 200,
            message: 'success',
            data: (_b = (_a = result === null || result === void 0 ? void 0 : result.texts) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text,
            source_lang: (query === null || query === void 0 ? void 0 : query.source_lang) || (result === null || result === void 0 ? void 0 : result.lang) || 'auto',
            target_lang: (query === null || query === void 0 ? void 0 : query.target_lang) || 'en',
            alternatives: (_f = (_e = (_d = (_c = result.texts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.alternatives) === null || _e === void 0 ? void 0 : _e.map) === null || _f === void 0 ? void 0 : _f.call(_e, (item) => item.text),
        };
    }).catch((e) => {
        return {
            code: 500,
            data: null,
            message: e,
        };
    });
    return ResponseDone({
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
            data: {
                translations: [
                    {
                        translatedText: translateResponse.data || '',
                    },
                ],
            },
        },
    });
}

/**
 * @url https://api.cleanshot.cloud/v1/user
 */
function cleanshotUser() {
    var _a, _b;
    console.log('[W] It\'s a alpha script, if the script is not working, please contact the author.');
    const body = destr($response.body);
    if ((_b = (_a = body === null || body === void 0 ? void 0 : body.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.storage) {
        const storage = body.data.user.storage;
        storage.limit_bytes = 21073741824; // 20GB
        storage.limit_readable = '20GB';
        const team = body.data.user.team;
        team.billing_plan.abilities.can_upload_original_media = true;
        team.billing_plan.abilities.can_copy_direct_link = true;
        team.billing_plan.abilities.can_set_expire_after = true;
        team.billing_plan.abilities.can_set_media_password = true;
        body.data.user.email_verified = true;
        body.data.user.updated_at = '2099-01-11T11:36:16.000000Z';
    }
    return Done({ body });
}

const activator = {
    dashboard: {
        base: 'http://as.as',
        customs: DashboardModuleRouter,
    },
    lemonSqueezy: {
        base: 'https://api.lemonsqueezy.com/v1/licenses',
        activate: lemonSqueezyActive,
        validate: lemonsqueezyValidate,
    },
    paddle: {
        base: 'https://v3.paddleapi.com/3.2/license',
        activate: paddleActivate,
        validate: {
            base: 'verify',
            func: paddleVerify,
        },
    },
    gumroad: {
        base: 'https://api.gumroad.com/v2/licenses',
        validate: {
            base: 'verify',
            func: GumroadValidate,
        },
    },
    itunes: {
        base: 'https://buy.itunes.apple.com',
        customs: [
            {
                base: 'verifyReceipt',
                func: iTunesVerifyReceipt,
            },
        ],
    },
    raycast: {
        base: 'https://backend.raycast.com/api/v1',
        activate: {
            base: 'me',
            func: raycastActivate,
            type: 'http-response',
        },
        customs: [
            {
                base: 'translations',
                func: raycastTranslate,
            },
            {
                base: 'me/trial_status',
                func: raycastTrialStatus,
            },
            {
                base: 'me/sync',
                func: unblockRequest,
            },
            {
                base: 'ai/models',
                func: unblockRequest,
            },
            {
                base: 'ai/chat_completions',
                func: unblockRequest,
            },
        ],
    },
    // typora: {
    //   base: 'https://dian.typora.com.cn/api/client',
    //   activate: TyporaActivate,
    // },
    shottr: {
        base: [
            'https://shottr.cc',
        ],
        validate: {
            base: 'licensing/verify.php',
            func: shottrVerifyLicense,
        },
        customs: [
            {
                base: 'api/telemetry.php',
                func: shottrTelemetry,
            },
        ],
    },
    cleanshot: {
        base: 'https://api.cleanshot.cloud/v1',
        customs: [
            {
                base: 'user',
                func: cleanshotUser,
            },
        ],
    },
};

const url = $request.url.split('?')[0];
/**
 * 检查 url 是否匹配 base 配置
 */
function isMatchBase(url, base) {
    if (Array.isArray(base)) {
        for (const item of base) {
            if (isMatchBase(url, item))
                return true;
        }
        return false;
    }
    url = url.replace(/\/$/, '');
    base = base.replace('*', '').replace(/\/$/, '');
    if (url.includes(base))
        return true;
    else
        return false;
}
/**
 * Automatic execution of the corresponding function according to the URL
 * 自动执行对应的函数
 * @description This will match the URL according to the base of the module function, and if it matches, it will execute the func of the module function
 */
async function launch() {
    console.log(`[activator] ${url}`);
    /**
     * 匹配模块函数
     * @description 这会根据模块函数的 base 属性来匹配 url，如果匹配成功则执行模块函数的 func 属性
     *
     * @param moduleFunc 模块函数
     * @returns 匹配结果
     *
     */
    async function matchModuleFunc(moduleFunc) {
        // console.log(`[activator] matchModuleFunc: ${moduleFunc.base} | ${isMatchBase(url, moduleFunc.base)}`)
        // 处理 * 通配符
        if (isMatchBase(url, moduleFunc.base))
            return await moduleFunc.func();
        // 不然就是要完全匹配（去掉末尾的 / 后再匹配）
        else if (url.replace(/\/$/, '') === moduleFunc.base.replace(/\/$/, ''))
            return await moduleFunc.func();
        return false;
    }
    /**
     * 处理模块函数
     * @description 这会根据模块函数的类型来执行对应的处理
     *
     * @param moduleFunc 模块函数
     * @returns 匹配结果
     *
     */
    async function handleModuleFunc(moduleFunc) {
        if (typeof moduleFunc === 'object') {
            moduleFunc.base = moduleFunc.base.replace(/\/$/, '');
            const match = await matchModuleFunc(moduleFunc);
            if (match)
                return match;
        }
    }
    for (const module in activator) {
        const moduleItem = activator[module];
        if (isMatchBase(url, moduleItem.base)) { // 检查 url 是否匹配 module 中配置的 base（利用 includes）
            console.log(`[activator] ${url} is matched`);
            for (const key in moduleItem) { // 遍历 module 中的配置（base, activate, validate, customs）
                const moduleItemOptions = moduleItem[key];
                if (key === 'base') // 自然是不需要的
                    continue;
                // 如果配置是数组（意味着有多个配置）这只会在 customs 中出现
                if (typeof moduleItemOptions === 'object' && Array.isArray(moduleItemOptions)) {
                    for (const custom of moduleItemOptions) {
                        const match = await handleModuleFunc({
                            ...custom,
                            base: `${moduleItem.base}/${custom.base.replace(/^\//, '')}`,
                        });
                        if (match)
                            return match;
                    }
                    continue;
                }
                // 如果配置是对象（意味着只有一个配置）这只会在 activate 和 validate 中出现
                if (typeof moduleItemOptions === 'object' && !Array.isArray(moduleItemOptions)) {
                    const match = await handleModuleFunc(moduleItemOptions);
                    if (match)
                        return match;
                    continue;
                }
                // 如果 url 不包含 module.base/key 则跳过，不用管后面的了
                if (!url.includes(`${moduleItem.base}/${key}`))
                    continue;
                // 如果配置是函数，这个时候其实就没有什么特殊情况了，所以直接执行
                if (typeof moduleItemOptions === 'function')
                    return await moduleItemOptions();
                // 如果配置是字符串，几乎没有使用过，也算直接返回吧
                if (typeof moduleItemOptions === 'string')
                    return ResponseDone({ body: moduleItemOptions });
            }
        }
    }
    console.log(`[activator] ${url} is not matched`);
    return Done({});
}

const COMMIT_HASH = "0d2b602ac60ef89777242f7dbd406f2c76688b91";
const CORE_VERSION = "1.3.0";
const timer = new Timer();
timer.startTimer();
console.log(`===== Activator Script Handler =====`);
console.log(`===== Author: @wibus-wee | Version: ${CORE_VERSION} | Commit: ${(COMMIT_HASH.slice(0, 7)) || 'main'} =====`);
(async () => {
    $done(await launch().catch((e) => {
        console.log(`Error -> ${e}`);
        return ResponseDone({
            status: 500,
            body: {
                msg: 'Activation Script Error. Please check the logs for more details.',
                error: {
                    message: e.message,
                    stack: e.stack,
                },
            },
        });
    }).finally(() => {
        timer.endTimer();
        console.log(`===== Finished in ${timer.getDurationInSeconds()}s =====`);
    }));
})();
