import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: [
    "./index.ts",
  ],
  output: {
    dir: "../../dist",
    format: "cjs",
    name: "generator",
  },
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    terser()
  ],
  
})