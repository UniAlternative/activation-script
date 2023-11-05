import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import { activator } from "./modules";
import { Command } from "commander";
import { execSync } from "node:child_process";

const hostnames = Array<string>();
const scripts = Array<{ name: string; pattern: string; type: string }>();

const MITM = (hostnames: any[]) => {
  return `
[MITM]
hostname = ${hostnames.join(", ")}
`;
};
const Script = (_scripts: typeof scripts) => {
  return `
[Script]
${_scripts
  .map((script) => {
    return `${script.name} = type=${script.type},pattern=^${script.pattern},requires-body=1,max-size=0,debug=1,script-path=activator.js \n`;
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
        // if (custom.base === "*") {
        //   custom.base = "all"; // 为了防止 * 出错，改成 all
        // }
        // 遍历 customs
        scripts.push({
          name: `${module}-${custom.base}${afterfix}`,
          pattern: `${base}/${custom.base}`, // 这个地方应该用传入的 base，而不是 activator[module].base
          // 因为 activator[module].base 可能是数组，而这里只需要一个 base
          type: custom.type || "http-request",
        });
      }
      continue;
    }
    if (typeof (activator[module] as any)[key] === "object") {
      scripts.push({
        name: `${module}-${key}${afterfix}`,
        pattern: `${base}/${(activator[module] as any)[key].base}`,
        type: (activator[module] as any)[key].type || "http-request",
      });
    } else {
      scripts.push({
        name: `${module}-${key}${afterfix}`,
        pattern: `${base}/${key}`,
        type: "http-request",
      });
    }
  }
}

function generateScriptConfig(echo = false) {
  for (let module in activator) {
    if (!Array.isArray(activator[module].base)) {
      activator[module].base = [activator[module].base as string];
    }
    for (let base of activator[module].base) {
      addConfig(module, base);
    }
  }
  if (echo) {
    console.log("================ MITM ================");
    console.log(MITM(hostnames));
    console.log("================ Script ================");
    console.log(Script(scripts));
  }
  return;
}

async function action(str: any, options: any) {
  generateScriptConfig(Object.keys(str).length === 0);
  if (str.out) {
    console.log("Generating config file...");
    fs.writeFileSync(
      path.join(str.out, "activator.conf"),
      MITM(hostnames) + Script(scripts)
    );
    console.log("Config file generated.");
  }
  if (str.fix) {
    let configPath = process.cwd();
    // 询问配置文件所在位置。1. 当前目录 2. /Users/<username>/Library/Application Support/Surge/Profiles 3. 自定义
    await prompts([
      {
        type: "select",
        name: "config",
        message: "Where is your config file?",
        choices: [
          { title: "Current directory", value: "current" },
          {
            title: "Surge config directory",
            value: "surge",
          },
          { title: "Custom", value: "custom" },
        ],
      },
    ])
      .then(async (res: { config: string }) => {
        if (res.config === "current") {
          configPath = process.cwd();
        } else if (res.config === "surge") {
          configPath = path.join(
            process.env.HOME as string,
            "Library/Application Support/Surge/Profiles"
          );
        } else {
          await prompts([
            {
              type: "text",
              name: "config",
              message: "Please input your config file path",
            },
          ])
            .then((res: { config: string }) => {
              configPath = res.config;
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    let configFiles = Array<string>();
    fs.readdirSync(configPath).forEach((file) => {
      if (file.endsWith(".conf")) {
        configFiles.push(file);
      }
    });
    if (configFiles.length === 0) {
      console.log("No config file found.");
      return;
    }

    prompts([
      {
        type: "select",
        name: "config",
        message: "Which config file do you want to use?",
        choices: configFiles.map((file) => {
          return { title: file, value: file };
        }),
      },
    ])
      .then((res: { config: string }) => {
        let newConfig = "";
        const config = fs.readFileSync(
          path.join(configPath, res.config),
          "utf-8"
        );
        const regexMITM = /\[MITM\]/g;
        const regexScript = /\[Script\]/g;

        if (!regexMITM.test(config)) {
          console.error(
            "❌ MITM not found. You should config MITM in Surge first."
          );
          return;
        }
        const regexMITMHostnames = /hostname = (.*)/g;
        const oldHostnames = regexMITMHostnames.exec(config) as RegExpExecArray;
        const newHostnames = Array.from(
          new Set([...oldHostnames, ...hostnames])
        );
        console.log(newHostnames);

        newConfig = config.replace(
          regexMITMHostnames,
          `${newHostnames.join(", ")}`
        );

        fs.writeFileSync(path.join(configPath, res.config), newConfig);
        if (!regexScript.test(config)) {
          // 在最后加一行 [Script]
          newConfig = config + "\n[Script]";
        }

        // 读取 [Script] 到下一个 [ 开始的距离（如果有的话）接着就缓存原本有的 Script，再把整一段给替换掉，再把缓存的 Script 写进去
        const regexScriptContent = /\[Script\]([\s\S]*?)\[/g;
        const oldScriptContent = regexScriptContent.exec(
          newConfig
        ) as RegExpExecArray | null;
        const newScriptContent = Script(scripts);
        console.log(newScriptContent);

        if (oldScriptContent) {
          newConfig = newConfig.replace(regexScriptContent, newScriptContent);
        } else {
          newConfig = newConfig + newScriptContent;
        }

        fs.writeFileSync(path.join(configPath, res.config), newConfig);
        console.log("Config file fixed.");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  return;
}

async function inject() {
  let rootPath = process.cwd();
  let configPath = undefined;
  console.log("[*] Inject function. You are in ", rootPath);
  await prompts([
    {
      type: "select",
      name: "config",
      message: "Where is your config file?",
      choices: [
        { title: "Current directory", value: "current" },
        {
          title: "Surge config directory",
          value: "surge",
        },
        { title: "Custom", value: "custom" },
      ],
    },
  ])
    .then(async (res: { config: string }) => {
      if (res.config === "current") {
        configPath = process.cwd();
      } else if (res.config === "surge") {
        configPath = path.join(
          process.env.HOME as string,
          "Library/Application Support/Surge/Profiles"
        );
      } else {
        await prompts([
          {
            type: "text",
            name: "config",
            message: "Please input your config file path",
          },
        ])
          .then((res: { config: string }) => {
            configPath = res.config;
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  if (!configPath) {
    return;
  }

  if (!fs.existsSync(path.join(rootPath, "package.json"))) {
    if (!fs.existsSync(path.join(rootPath, "activator.js"))) {
      console.error("[E] activator.js not found. Please download it first.");
      return;
    }
  } else {
    console.log(
      "[I] package.json found. You are using generator in source code."
    );
    console.log("[I] activator.js building...");
    execSync("pnpm build");
    if (!fs.existsSync(path.join(rootPath, "activator.js"))) {
      console.error("[E] activator.js bundle not found. Build failed.");
      return;
    }
  }

  if (
    fs.existsSync(path.join(configPath as unknown as string, "activator.js"))
  ) {
    const answer = await prompts([
      {
        type: "text",
        name: "answer",
        message: "activator.js already exists. Overwrite? (y/n)",
      },
    ]);
    if (answer.answer === "n") {
      console.log("[I] Cancelled.");
      return;
    } else {
      fs.rmSync(path.join(configPath as unknown as string, "activator.js"));
    }
  }

  console.log("[I] Injecting activator.js... to", configPath);
  fs.copyFileSync(
    path.join(rootPath, "activator.js"),
    path.join(configPath as unknown as string, "activator.js")
  );
  console.log("[I] Injected activator.js.");
}

const program = new Command();

program.name("Activator").version("0.0.1");

program
  .command("gen")
  .description("generate config")
  .option("-o, --out <path>", "output path")
  .option("-f, --fix", "fix config file")
  .action(action);

program.command("inject").description("inject activator").action(inject);

program.parse();
