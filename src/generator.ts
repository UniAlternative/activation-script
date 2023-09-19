import path from "node:path";
import fs from "node:fs";
import { activator } from "./modules";

const hostnames = Array<string>();
const scripts = Array<{ name: string; pattern: string }>();

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

function addConfig(module: string, base: string) {
  const url = new URL(base);
  const hostname = url.hostname;
  const parts = hostname.split(".");
  const mainDomain = parts.slice(-2).join("."); // 拿到根域名
  hostnames.push(`*.${mainDomain}`);
  // 设一个 afterfix，用于处理 base 为数组的情况，防止 name 重复
  const afterfix = Array.isArray(activator[module].base) ? `-${hostname}` : "";
  for (let key in activator[module]) {
    // 开始遍历 module 内的 key
    if (key === "base") continue; // 接口 base route 绕过，不需要处理
    if (key === "customs") {
      // 面对 Custom 的重写逻辑
      for (let custom of (activator[module] as any)[key]) {
        if (custom.base === "*") {
          custom.base = "all"; // 为了防止 * 出错，改成 all
        }
        // 遍历 customs
        scripts.push({
          name: `${module}-${custom.base}${afterfix}`,
          pattern: `${base}/${custom.base}`, // 这个地方应该用传入的 base，而不是 activator[module].base
          // 因为 activator[module].base 可能是数组，而这里只需要一个 base
        });
      }
      continue;
    }
    if (typeof (activator[module] as any)[key] === "object") {
      scripts.push({
        name: `${module}-${key}${afterfix}`,
        pattern: `${base}/${(activator[module] as any)[key].base}`,
      });
    } else {
      scripts.push({
        name: `${module}-${key}${afterfix}`,
        pattern: `${base}/${key}`,
      });
    }
  }
}

function generateScriptConfig() {
  for (let module in activator) {
    if (!Array.isArray(activator[module].base)) {
      activator[module].base = [activator[module].base as string];
    }
    for (let base of activator[module].base) {
      addConfig(module, base);
    }
  }
  console.log("================ MITM ================");
  console.log(MITM(hostnames));
  console.log("================ Script ================");
  console.log(Script(scripts));
  return;
}

generateScriptConfig();

if (process.argv.includes("--file")) {
  let config = MITM(hostnames) + Script(scripts);
  config = config.replace(/^\s*\n/gm, "");
  config = config.replace(/\n\s*$/gm, "");
  const configPath = path.join(process.cwd(), "activator.conf");
  fs.writeFileSync(configPath, config);
  console.log("Generate config file successfully!");
}
