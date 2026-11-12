import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const result = spawnSync(process.execPath, [
  fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)),
  "build",
  "--webpack",
], {
  stdio: "inherit",
  env: { ...process.env, FSCO_STATIC_EXPORT: "true" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
writeFileSync("out/.nojekyll", "");
