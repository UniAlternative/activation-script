import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import { activator } from "./modules";
import { Command } from "commander";
import toml from "toml";

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
  // 检查一下 hostnames 里面有没有这个根域名，没有的话就加进去
  if (!hostnames.includes(`*.${mainDomain}`)) {
    hostnames.push(`*.${mainDomain}`);
  }
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

function action(str: any, options: any) {
  generateScriptConfig();
  let configFiles = Array<string>();
  fs.readdirSync(process.cwd()).forEach((file) => {
    if (file.endsWith(".conf")) {
      configFiles.push(file);
    }
  });
  if (configFiles.length === 0) {
    console.log("No config file found.");
    return;
  }
  
  if (str.fix) {
    prompts([
      {
        type: "select",
        name: "config",
        message: "Which config file do you want to use?",
        choices: configFiles.map((file) => {
          return { title: file, value: file };
        }),
      },
    ]).then((res) => {
      let newConfig = "";
      const config = fs.readFileSync(path.join(process.cwd(), res.config), "utf-8");
      const regexMITM = /\[MITM\]/g;
      const regexScript = /\[Script\]/g;

      if (!regexMITM.test(config)) {
        console.error("❌ MITM not found. You should config MITM in Surge first.");
        return;
      }
      const regexMITMHostnames = /hostname = (.*)/g;
      const oldHostnames = regexMITMHostnames.exec(config) as RegExpExecArray;
      const newHostnames = Array.from(new Set([...oldHostnames, ...hostnames]));
      console.log(newHostnames);
      
      newConfig = config.replace(regexMITMHostnames, `${newHostnames.join(", ")}`);

      fs.writeFileSync(path.join(process.cwd(), res.config), newConfig);
      if (!regexScript.test(config)) {
        // 在最后加一行 [Script]
        newConfig = config + "\n[Script]";
      }
      
      // 读取 [Script] 到下一个 [ 开始的距离（如果有的话）接着就缓存原本有的 Script，再把整一段给替换掉，再把缓存的 Script 写进去
      const regexScriptContent = /\[Script\]([\s\S]*?)\[/g;
      const oldScriptContent = regexScriptContent.exec(newConfig) as RegExpExecArray | null;
      const newScriptContent = Script(scripts);
      console.log(newScriptContent);
      
      if (oldScriptContent) {
        newConfig = newConfig.replace(regexScriptContent, newScriptContent);
      } else {
        newConfig = newConfig + newScriptContent;
      }

      
      
      fs.writeFileSync(path.join(process.cwd(), res.config), newConfig);
      console.log("Config file fixed.");
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

const program = new Command();

program
  .name("Activator")
  .version("0.0.1")

program.command("gen")
  .description("generate config")
  .option("-o, --out <path>", "output path")
  .option("-f, --fix", "fix config file")
  .action(action);

program.parse();