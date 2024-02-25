'use strict';

var name = "@as/core";
var type = "module";
var version = "1.3.0";
var description = "";
var author = "";
var license = "ISC";
var keywords = [
];
var main = "index.js";
var scripts = {
	build: "rollup -c && mv ../../dist/main.js ../../dist/activator.js"
};
var dependencies = {
	"@as/dashboard": "workspace:^",
	"@as/modules": "workspace:^",
	"@as/shared": "workspace:^"
};
var devDependencies = {
	"@rollup/plugin-json": "^6.1.0"
};
var packageJson = {
	name: name,
	type: type,
	version: version,
	description: description,
	author: author,
	license: license,
	keywords: keywords,
	main: main,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies
};

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

function transformToString(obj) {
    if (typeof obj === 'object')
        return JSON.stringify(obj);
    return obj;
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
function buildResponse(props) {
    if (props.body)
        props.body = transformToString(props.body);
    $done({
        response: {
            ...props,
        },
    });
}
/**
 * 发送通知
 *
 * @param title 标题
 * @param subtitle 副标题
 * @param body 内容
 * @description 该函数将会自动将对象转换为 JSON 字符串，因此你可以直接传入对象
 */
function sendNotification(title, subtitle, body) {
    title = transformToString(title);
    subtitle = transformToString(subtitle);
    body = transformToString(body);
    $notification.post(title, subtitle, body);
}
const methods = ['get', 'put', 'delete', 'head', 'options', 'patch', 'post'];
/**
 * 发送请求
 * @param props 请求参数
 * @param callback 回调函数
 */
const httpClient = {};
for (const method of methods) {
    // @ts-expect-error 这个地方无法通过类型检查
    httpClient[method] = (props, callback) => {
        $httpClient[method](props, callback);
    };
}

/**
 * @url https://api.gumroad.com/v2/licenses/verify
 */
function GumroadValidate() {
    const url = $request.url;
    const params = parseURLParams(url);
    const body = {
        success: true,
        uses: -999,
        purchase: {
            sellerId: '123',
            productId: params.product_permalink,
            productName: params.product_permalink,
            permalink: params.product_permalink,
            productPermalink: params.product_permalink,
            email: 'qiuchenly@outlook.com',
            price: 100,
            gumroadFee: 0,
            currency: 'usd',
            quantity: 1,
            discoverFeeCharged: false,
            canContact: false,
            referrer: 'none',
            orderNumber: 1234,
            saleId: '1',
            saleTimestamp: '2099-07-16T19:00:00Z',
            licenseKey: params.license_key,
            refunded: false,
            disputed: false,
            disputeWon: false,
            id: '1234',
            createdAt: '2023-07-16T19:00:00Z',
        },
    };
    return buildResponse({
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body,
    });
}

/**
 * @url https://api.lemonsqueezy.com/v1/licenses/activate
 */
function lemonSqueezyActive() {
    buildResponse({
        body: {
            activated: true,
            instance: {
                id: 'wibus-wee',
            },
            error: null,
        },
    });
}

function lemonsqueezyValidate() {
    buildResponse({
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
    console.log(body);
    if (!body) {
        buildResponse({
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
        return;
    }
    const _body = body.split('&');
    let product_id = '';
    for (const k of _body) {
        if (k.includes('product_id'))
            product_id = k.split('=')[1];
    }
    buildResponse({
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            success: true,
            response: {
                product_id,
                activation_id: 'QiuChenly',
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
    buildResponse({
        body,
    });
}

/**
 * @url audio-ak-spotify-com.akamaized.net
 * @url audio-akp-quic-spotify-com.akamaized.net
 * @url audio-fa.scdn.co
 * @url creativeservice-production.scdn.co
 *
 * @redirect https://raw.githubusercontent.com/texnikru/blank-mp3s/master/1sec.mp3
 */
function spotifyRemoveAds() {
    sendNotification('Spotify Remove Ads', '请求 MP3', '');
    const mp3 = 'https://raw.githubusercontent.com/texnikru/blank-mp3s/master/1sec.mp3';
    httpClient.get({ url: mp3 }, (error, response, data) => {
        if (error) {
            sendNotification('Spotify Remove Ads', 'MP3 请求失败', error);
            return buildResponse({
                status: 500,
                body: error,
            });
        }
        buildResponse({
            status: response.status,
            headers: response.headers,
            body: data,
        });
    });
}

const DashboardModuleRouter = [
    {
        base: '/',
        func: () => {
            buildResponse({ status: 200, body: 'Dashboard' });
        },
    },
];

/**
 * @url https://buy.itunes.apple.com/verifyReceipt
 */
function iTunesVerifyReceipt() {
    return buildResponse({
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

const activator = {
    dashboard: {
        base: 'http://as.as/*',
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
    spotify: {
        base: [
            // "https://audio-ak-spotify-com.akamaized.net", // 这个好像是真正的音乐获取地址...
            'https://audio-akp-quic-spotify-com.akamaized.net',
            'https://audio-fa.scdn.co',
            'https://creativeservice-production.scdn.co',
            'https://audio4-fa.scdn.co',
        ],
        customs: [
            {
                base: '*',
                func: spotifyRemoveAds,
            },
        ],
    },
    gumroad: {
        base: 'https://api.gumroad.com/v2/licenses',
        validate: {
            base: 'verify',
            func: GumroadValidate,
        },
    },
    // typora: {
    //   base: 'https://dian.typora.com.cn/api/client',
    //   activate: TyporaActivate,
    // },
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
        // activate: {
        //   base: "me",
        //   func: raycastActivate,
        //   type: "http-response",
        // },
        activate: {
            base: '*',
            func: () => {
                if ($request.headers['x-raycast-unblock']) {
                    console.log('Raycast Unblock request');
                    $done({
                        headers: {
                            ...$request.headers,
                            'x-raycast-unblock': undefined,
                        },
                    });
                    return;
                }
                $done({
                    url: $request.url.replace('https://backend.raycast.com', 'http://127.0.0.1:3000'),
                    headers: $request.headers,
                    body: $request.body,
                });
            },
        },
        customs: [
        // {
        //   base: "me/trial_status",
        //   func: raycastTrialStatus,
        // },
        // {
        //   base: "ai/models",
        //   func: raycastAiModels,
        //   type: "http-response"
        // },
        // {
        //   base: "ai/chat_completions",
        //   func: raycastAICompletionsRequest,
        // },
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
function launch() {
    console.log(`[activator] ${url}`);
    /**
     * 匹配模块函数
     * @description 这会根据模块函数的 base 属性来匹配 url，如果匹配成功则执行模块函数的 func 属性
     *
     * @param moduleFunc 模块函数
     * @returns 匹配结果
     *
     */
    function matchModuleFunc(moduleFunc) {
        console.log(`[activator] matchModuleFunc: ${moduleFunc.base} | ${isMatchBase(url, moduleFunc.base)}`);
        // 处理 * 通配符
        if (isMatchBase(url, moduleFunc.base))
            return moduleFunc.func();
        // 不然就是要完全匹配（去掉末尾的 / 后再匹配）
        else if (url.replace(/\/$/, '') === moduleFunc.base.replace(/\/$/, ''))
            return moduleFunc.func();
    }
    /**
     * 处理模块函数
     * @description 这会根据模块函数的类型来执行对应的处理
     *
     * @param moduleFunc 模块函数
     * @returns 匹配结果
     *
     */
    function handleModuleFunc(moduleFunc) {
        if (typeof moduleFunc === 'object') {
            moduleFunc.base = moduleFunc.base.replace(/\/$/, '');
            const match = matchModuleFunc(moduleFunc);
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
                        const match = handleModuleFunc({
                            ...custom,
                            base: `${moduleItem.base}/${custom.base.replace(/^\//, '')}`,
                        });
                        if (match)
                            return match;
                    }
                    continue;
                }
                // 如果配置是对象（意味着只有一个配置）这只会在 activate 和 validate 中出现
                if (typeof moduleItemOptions === 'object') {
                    const match = handleModuleFunc(moduleItemOptions);
                    if (match)
                        return match;
                    continue;
                }
                // 如果 url 不包含 module.base/key 则跳过，不用管后面的了
                if (!url.includes(`${moduleItem.base}/${key}`))
                    continue;
                // 如果配置是函数，这个时候其实就没有什么特殊情况了，所以直接执行
                if (typeof moduleItemOptions === 'function')
                    return moduleItemOptions();
                // 如果配置是字符串，几乎没有使用过，也算直接返回吧
                if (typeof moduleItemOptions === 'string')
                    return buildResponse({ body: moduleItemOptions });
            }
        }
    }
    console.log(`[activator] ${url} is not matched`);
    returnDefaultResponse();
    // $done();
}
function returnDefaultResponse() {
    console.log(`[activator] returnDefaultResponse: [${$request.method}] -> ${url}`);
    httpClient[$request.method.toLowerCase()]({
        url: $request.url,
        headers: $request.headers,
    }, (err, response, _data) => {
        if (err) {
            console.log(err);
            return buildResponse({ status: 500, body: err });
        }
        if (!_data)
            console.log('No data returned');
        const res = {
            status: response.status,
            headers: response.headers,
            body: _data,
        };
        return buildResponse(res);
    });
}

const COMMIT_HASH = "7c52af21177237c3829836de1da54a7e206e917a";
console.log(`===== Activator Script Handler =====`);
console.log(`===== Author: @wibus-wee | Version: ${packageJson.version} | Commit: ${(COMMIT_HASH.slice(0, 7)) || 'main'} =====`);
launch();
