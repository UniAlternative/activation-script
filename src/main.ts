import { activator } from "./modules";

const _process = typeof process !== "undefined" ? process : ({} as any);
const DEV = true;
const GENERATE = _process && _process.argv && _process.argv[2] === "generate"; // node activator.js generate
if (GENERATE) {
  var $request = {} as any;
}
// @ts-ignore
const url = $request.url;

/**
 * Automatic execution of the corresponding function according to the URL
 */
function main() {
  for (let module in activator) {
    if (url.includes(activator[module].base)) {
      for (let j in activator[module]) {
        if (j === "base") continue;
        if (typeof (activator[module] as any)[j] === "object") {
          if (
            url ===
            `${activator[module].base}/(activator[module] as any)[j].base}`
          ) {
            return (activator[module] as any)[j].func($request, $done);
          }
        } else if (!url.includes(`${activator[module].base}/${j}`)) continue;
        if (typeof (activator[module] as any)[j] === "function") {
          return (activator[module] as any)[j]($request, $done);
        }
      }
    }
  }
  console.log(`[activator] ${url}`);
  $done();
}

if (GENERATE) generateScriptConfig();
else main();

// ==================== Extra Functions ====================

function generateScriptConfig() {
  const MITM = (hostnames: any[]) => {
    return `
[MITM]
hostname = ${hostnames.join(", ")}
`;
  };
  const Script = (scripts: any[]) => {
    return `
[Script]
${scripts
  .map((script: { name: any; pattern: any }) => {
    return `${script.name} = type=http-request,pattern=^${script.pattern},requires-body=1,max-size=0,debug=1,script-path=activator.js \n`;
  })
  .join("")}
`;
  };
  const hostnames = Array<string>();
  const scripts = Array<{ name: string; pattern: string }>();
  for (let module in activator) {
    const url = new URL(activator[module].base);
    const hostname = url.hostname;
    const parts = hostname.split(".");
    const mainDomain = parts.slice(-2).join(".");
    hostnames.push(`*.${mainDomain}`);
    for (let key in activator[module]) {
      if (key === "base") continue;
      if (typeof (activator[module] as any)[key] === "object") {
        scripts.push({
          name: `${module}-${key}`,
          pattern: `${activator[module].base}/${
            (activator[module] as any)[key].base
          }`,
        });
      } else {
        scripts.push({
          name: `${module}-${key}`,
          pattern: `${activator[module].base}/${key}`,
        });
      }
    }
  }
  console.log("================ MITM ================");
  console.log(MITM(hostnames));
  console.log("================ Script ================");
  console.log(Script(scripts));
  return;
}
