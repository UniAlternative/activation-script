import { execSync } from "child_process";
import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import { SurgeConfigParser } from "../parser";

/**
 * Injects the activator.js file into the specified config directory.
 * The user is prompted to select the config directory or provide a custom path.
 * If the activator.js file already exists in the config directory, the user is prompted to overwrite it.
 */
export async function inject() {
  let rootPath = process.cwd();
  let configPath = "";
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

  // let configFiles = Array<string>();
  // fs.readdirSync(configPath).forEach((file) => {
  //   if (file.endsWith(".conf")) {
  //     configFiles.push(file);
  //   }
  // });
  // if (configFiles.length === 0) {
  //   console.log("No config file found.");
  //   return;
  // }
  // const EMPTY = "I Don't Want to use AI Feature";
  // configFiles.push(EMPTY);
  // let aiConfigSourceFile = "";
  // await prompts([
  //   {
  //     type: "select",
  //     name: "config",
  //     message: "Which config file do you want to use (AI Feature)?",
  //     choices: configFiles.map((file) => {
  //       return { title: file, value: file };
  //     }),
  //   },
  // ]).then((res: { config: string }) => {
  //   aiConfigSourceFile = res.config;
  // });

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
//   if (aiConfigSourceFile !== EMPTY) {
//     console.log("[I] Injecting AI Config...");
//     const config = new SurgeConfigParser(
//       fs.readFileSync(path.join(configPath, aiConfigSourceFile), "utf-8")
//     );
//     const aiConfig = config.getSection("AI");
//     const injectCode = `
// globalThis.config = {
//   ai: {
//     type: ${JSON.stringify(aiConfig?.type)},
//     openAIKey: ${JSON.stringify(aiConfig?.openai_api_key)},
//     geminiKey: ${JSON.stringify(aiConfig?.gemini_api_key)},
//     endpoint: ${JSON.stringify(aiConfig?.openai_api_endpoint)},
//   }
// }
// `
//     const configContent = fs.readFileSync(path.join(configPath, "activator.js"), "utf-8");
//     const lines = configContent.split("\n");
//     lines.splice(1, 0, injectCode);
//     fs.writeFileSync(path.join(configPath, "activator.js"), lines.join("\n"));

//     console.log("[I] Injected AI Config.");
//   }
  console.log("[I] Injected activator.js.");
}
