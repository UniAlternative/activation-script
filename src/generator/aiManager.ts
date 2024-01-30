import path, { parse } from "node:path";
import fs from "node:fs";
import prompts from "prompts";

/**
 * AI Manager
 *
 * 1. 获取到配置文件
 * 2. 检查配置文件中是否有 AI 配置项
 * 3. 如果有，显示出来询问是否需要更新
 * 4. 如果没有，进入添加程序
 *   4.1 询问添加的类型（OpenAI,Custom,Gemini)
 *    4.2 根据类型，询问相关信息
 *   4.3 生成配置文件
 */
export async function aiManager() {
  let configPath = process.cwd();
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

  await prompts([
    {
      type: "select",
      name: "config",
      message: "Which config file do you want to use?",
      choices: configFiles.map((file) => {
        return { title: file, value: file };
      }),
    },
  ]).then((res: { config: string }) => {
    const _configPath = path.join(configPath, res.config);
    // const aiConfig = parseAIConfig(_configPath);
    // console.log(aiConfig);
  });
}