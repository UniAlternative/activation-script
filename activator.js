'use strict';

function transformToString(obj) {
    if (typeof obj === "object") {
        return JSON.stringify(obj);
    }
    return obj;
}
/**
 * 构建 Surge 响应体
 *
 * @param props 响应体属性
 * @description Surge 会直接返回 HTTP 响应，而不进行真实的网络操作
 */
function buildResponse(props) {
    if (props.body) {
        props.body = transformToString(props.body);
    }
    $done({
        response: {
            ...props,
        }
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
const methods = ["get", "put", "delete", "head", "options", "patch", "post"];
/**
 * 发送请求
 * @param props 请求参数
 * @param callback 回调函数
 */
const httpClient = {};
for (let method of methods) {
    // @ts-ignore
    httpClient[method] = (props, callback) => {
        $httpClient[method](props, callback);
    };
}
function parseURLParams(url) {
    // 获取 URL 中 ? 后面的查询参数部分
    const queryString = url.split('?')[1];
    if (!queryString) {
        return {};
    }
    // 将查询参数字符串拆分成键值对数组
    const keyValuePairs = queryString.split('&');
    // 创建一个对象来存储解析后的参数
    const params = {};
    // 遍历键值对数组，将每个参数解析成对象的属性
    keyValuePairs.forEach(function (keyValuePair) {
        // 将键值对拆分成键和值
        const pair = keyValuePair.split('=');
        // 解码键和值，并存储到 params 对象中
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    });
    return params;
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
            sellerId: "123",
            productId: params.product_permalink,
            productName: params.product_permalink,
            permalink: params.product_permalink,
            productPermalink: params.product_permalink,
            email: "qiuchenly@outlook.com",
            price: 100,
            gumroadFee: 0,
            currency: "usd",
            quantity: 1,
            discoverFeeCharged: false,
            canContact: false,
            referrer: "none",
            orderNumber: 1234,
            saleId: "1",
            saleTimestamp: "2099-07-16T19:00:00Z",
            licenseKey: params.license_key,
            refunded: false,
            disputed: false,
            disputeWon: false,
            id: "1234",
            createdAt: "2023-07-16T19:00:00Z",
        },
    };
    return buildResponse({
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body
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
                id: "wibus-wee",
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
    if (!body) {
        buildResponse({
            body: {
                success: false,
                response: {
                    error: "[Surge] Activator: No body found",
                },
            },
        });
        return;
    }
    let _body = body.split("&");
    let product_id = "";
    for (let k of _body) {
        if (k.indexOf("product_id") != -1) {
            product_id = k.split("=")[1];
        }
    }
    buildResponse({
        body: {
            success: true,
            response: {
                product_id: product_id,
                activation_id: "QiuChenly",
                type: "personal",
                expires: 1,
                expiry_date: 1999999999999,
            },
        },
    });
}

/**
 * Paddle verification
 * @url https://v3.paddleapi.com/3.2/license/verify
 */
function paddleVerify() {
    let body = {
        success: true,
        response: {
            type: "personal",
            expires: 1,
            expiry_date: 1999999999999,
        },
    };
    buildResponse({
        body,
    });
}

// *://audio-ak-spotify-com.akamaized.net/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
// *://audio-akp-quic-spotify-com.akamaized.net/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
// *://audio-fa.scdn.co/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
// *://creativeservice-production.scdn.co/*$header=content-range:/\/\d\d\d\d\d\d$/,redirect=noop-0.5s.mp3
/**
 * @url audio-ak-spotify-com.akamaized.net
 * @url audio-akp-quic-spotify-com.akamaized.net
 * @url audio-fa.scdn.co
 * @url creativeservice-production.scdn.co
 *
 * @redirect https://raw.githubusercontent.com/texnikru/blank-mp3s/master/1sec.mp3
 */
function spotifyRemoveAds() {
    sendNotification("Spotify Remove Ads", "请求 MP3", "");
    const mp3 = "https://raw.githubusercontent.com/texnikru/blank-mp3s/master/1sec.mp3";
    httpClient.get({ url: mp3 }, (error, response, data) => {
        if (error) {
            sendNotification("Spotify Remove Ads", "MP3 请求失败", error);
            return buildResponse({
                status: 500,
                body: error
            });
        }
        buildResponse({
            status: response.status,
            headers: response.headers,
            body: data,
        });
    });
}

const activator = {
    lemonSqueezy: {
        base: "https://api.lemonsqueezy.com/v1/licenses",
        activate: lemonSqueezyActive,
        validate: lemonsqueezyValidate,
    },
    paddle: {
        base: "https://v3.paddleapi.com/3.2/license",
        activate: paddleActivate,
        validate: {
            base: "verify",
            func: paddleVerify,
        },
    },
    spotify: {
        base: [
            // "https://audio-ak-spotify-com.akamaized.net", // 这个好像是真正的音乐获取地址...
            "https://audio-akp-quic-spotify-com.akamaized.net",
            "https://audio-fa.scdn.co",
            "https://creativeservice-production.scdn.co",
            "https://audio4-fa.scdn.co",
        ],
        customs: [
            {
                base: "*",
                func: spotifyRemoveAds,
            },
        ],
    },
    gumroad: {
        base: "https://api.gumroad.com/v2/licenses",
        validate: {
            base: "verify",
            func: GumroadValidate,
        }
    },
    raycast: {
        base: "https://backend.raycast.com/api/v1",
        // activate: {
        //   base: "me",
        //   func: raycastActivate,
        //   type: "http-response",
        // },
        activate: {
            base: "*",
            func: () => {
                if ($request.headers["x-raycast-unblock"]) {
                    console.log('Raycast Unblock request');
                    $done({
                        headers: {
                            ...$request.headers,
                            "x-raycast-unblock": undefined,
                        },
                    });
                    return;
                }
                $done({
                    url: $request.url.replace("https://backend.raycast.com", "http://127.0.0.1:3000"),
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

const url = $request.url.split("?")[0];
/**
 * Determine whether the URL matches the base
 */
function isMatchBase(url, base) {
    if (Array.isArray(base)) {
        for (let item of base) {
            if (url.includes(item)) {
                return true;
            }
        }
        return false;
    }
    return url.includes(base);
}
/**
 * Automatic execution of the corresponding function according to the URL
 */
function launch() {
    for (let module in activator) {
        if (isMatchBase(url, activator[module].base)) {
            for (let key in activator[module]) {
                if (key === "base")
                    continue;
                if (Array.isArray(activator[module][key])) {
                    for (let custom of activator[module][key]) {
                        if (custom.base === "*" &&
                            url.startsWith(activator[module].base)) {
                            return custom.func();
                        }
                        else if (url === `${activator[module].base}/${custom.base}`) {
                            return custom.func();
                        }
                    }
                    continue;
                }
                if (typeof activator[module][key] === "object") {
                    // *
                    if (activator[module][key].base === "*") {
                        return activator[module][key].func();
                    }
                    if (url ===
                        `${activator[module].base}/${activator[module][key].base}`) {
                        return activator[module][key].func();
                    }
                }
                else if (!url.includes(`${activator[module].base}/${key}`)) {
                    continue;
                }
                if (typeof activator[module][key] === "function") {
                    return activator[module][key]();
                }
            }
        }
    }
    console.log(`[activator] ${url} is not matched`);
    returnDefaultResponse();
    // $done();
    return;
}
function returnDefaultResponse() {
    console.log(`[activator] returnDefaultResponse: ${url} - ${$request.method.toLowerCase()}`);
    // @ts-expect-error
    httpClient[$request.method.toLowerCase()]({
        url: $request.url,
        headers: $request.headers,
    }, (err, response, _data) => {
        if (!_data) {
            console.log("returnDefaultResponse: _data is null", err);
            buildResponse({
                status: 500,
                body: {},
            });
        }
        const res = {
            status: response.status,
            headers: response.headers,
            body: _data,
        };
        buildResponse(res);
    });
}

launch();
