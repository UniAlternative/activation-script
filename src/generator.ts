import { activator } from "./modules";

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
      if (key === "customs") {
        for (let custom of (activator[module] as any)[key]) {
          scripts.push({
            name: `${module}-${custom.base}`,
            pattern: `${activator[module].base}/${custom.base}`,
          });
        }
        continue;
      }
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

generateScriptConfig();