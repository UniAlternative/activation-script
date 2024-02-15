import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-ts";

export default defineConfig({
  input: [
    "src/main.ts",
  ],
  output: {
    dir: "../../dist",
    format: "cjs",
  },
  plugins: [
    nodeResolve(),
    typescript(),
  ],
  
})