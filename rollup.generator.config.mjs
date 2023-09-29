import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-ts";
import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: [
    "src/generator.ts",
  ],
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    terser()
  ],
  
})