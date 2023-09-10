const _process = typeof process !== 'undefined' ? process : {};
const DEV = true;
const GENERATE = _process && _process.argv && _process.argv[2] === 'generate'; // node activator.js generate
if (GENERATE) {
  var $request = {};
}
const url = $request.url;
const body = $request.body;

const activator = {
  lemonSqueezy: {
    base: "https://api.lemonsqueezy.com/v1/licenses",
    activate: lemonSqueezyActive,
    validate: lemonsqueezyValidate
  },
  paddle: {
    base: "https://v3.paddleapi.com/3.2/license",
    activate: paddleActivate,
    validate: {
      base: "verify",
      func: paddleVerify
    }
  },
  craft: {
    base: "https://api.craft.do/auth/v3",
    activate: {
      base: "profile",
      func: craftActivate
    }
  },
};

function craftActivate() {
  const originalBody = JSON.parse(body || "{}");

  const _body = {}
  _body["tier"] = "pro";
  _body["subscriptionActive"] = true;
  _body["expirationDate"] = 1043198395504;
  _body["rawSubscriptionType"] = "yearly";
  _body["productId"] = "com.lukilabs.lukiapp.pro.sub.yearly";
  _body["subscription"] = true;

  originalBody["subscription"] = _body;
  buildResponse({
    body: originalBody
  })
}

function lemonSqueezyActive() {
  buildResponse({
    body: {
      "activated": true,
      "instance": {
        "id": "wibus-wee"
      },
      "error": null
    }
  })
}

function lemonsqueezyValidate() {
  if (url !== 'https://api.lemonsqueezy.com/v1/licenses/validate') return;
}

/**
 * Paddle activation
 * @url https://v3.paddleapi.com/3.2/license/activate
 */
function paddleActivate() {
  if (!body) {
    $done({
      response: {
        body: JSON.stringify({
          success: false,
          response: {
            error: "[Surge] Activator: No body found",
          },
        }),
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

  $done({
    response: {
      body: JSON.stringify({
        success: true,
        response: {
          product_id: product_id,
          activation_id: "QiuChenly",
          type: "personal",
          expires: 1,
          expiry_date: 1999999999999,
        },
      }),
    },
  });
}

/**
 * Paddle verification
 * @url https://v3.paddleapi.com/3.2/license/verify
 */
function paddleVerify() {
  let body = JSON.stringify({
    success: true,
    response: {
      type: "personal",
      expires: 1,
      expiry_date: 1999999999999,
    },
  });
  $done({
    response: {
      body,
    },
  });
}


function generateScriptConfig() {
  const MITM = (hostnames) => {
    return `
[MITM]
hostname = ${hostnames.join(', ')}
`
  }
  const Script = (scripts) => {
    return `
[Script]
${scripts.map(script => {
      return `${script.name} = type=http-request,pattern=^${script.pattern},requires-body=1,max-size=0,debug=1,script-path=activator.js \n`
    })
        .join('')}
`
  }
  const hostnames = [];
  const scripts = [];
  for (let i in activator) {
    const url = new URL(activator[i].base);
    const hostname = url.hostname;
    const parts = hostname.split('.');
    const mainDomain = parts.slice(-2).join('.');
    hostnames.push(`*.${mainDomain}`);
    for (let j in activator[i]) {
      if (j === 'base') continue;
      if (typeof activator[i][j] === 'object') {
        scripts.push({
          name: `${i}-${j}`,
          pattern: `${activator[i].base}/${activator[i][j].base}`
        })
      } else {
        scripts.push({
          name: `${i}-${j}`,
          pattern: `${activator[i].base}/${j}`
        })
      }
    }
  }
  console.log('================ MITM ================');
  console.log(MITM(hostnames));
  console.log('================ Script ================');
  console.log(Script(scripts));
  return
}

/**
 * @private
 */
function buildResponse(props) {
  for (let i in props) {
    if (typeof props[i] === 'object') {
      props[i] = JSON.stringify(props[i]);
    }
  }
  $done({
    response: {
      ...props
    }
  })
}


/**
 * Automatic execution of the corresponding function according to the URL
 */
function main() {
  for (let i in activator) {
    if (url.includes(activator[i].base)) {
      for (let j in activator[i]) {
        if (j === 'base') continue;
        if (typeof activator[i][j] === 'object') {
          if (url === `${activator[i].base}/${activator[i][j].base}`) {
            return activator[i][j].func();
          }
        } else if (!url.includes(`${activator[i].base}/${j}`)) continue;
        if (typeof activator[i][j] === 'function') {
          return activator[i][j]();
        }
      }
    }
  }
  console.log(`[activator] ${url}`);
  $done();
}

if (GENERATE) generateScriptConfig();
else main();