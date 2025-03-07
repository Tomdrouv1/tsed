import path, {join} from "node:path";

import {GeneratorOptions} from "@prisma/generator-helper";
import internals from "@prisma/internals";
import fs from "fs-extra";

import {generateCode} from "../generator/generateCode.js";
import removeDir from "../generator/utils/removeDir.js";

function parseStringBoolean(stringBoolean: string | string[] | undefined) {
  return Boolean(stringBoolean ? stringBoolean === "true" : undefined);
}

function toUnixPath(maybeWindowsPath: string) {
  return maybeWindowsPath.split("\\").join("/");
}

export interface GenerateOptions {
  defaultOutput: string;
  packageDir: string;
}

export function generate({defaultOutput, packageDir}: GenerateOptions) {
  return async (options: GeneratorOptions) => {
    const outputDir = internals.parseEnvValue(options.generator.output!);
    await fs.mkdir(outputDir, {recursive: true});
    await removeDir(outputDir, true);

    const generatorConfig = options.generator.config;
    const prismaClientProvider = options.otherGenerators.find((it) => internals.parseEnvValue(it.provider) === "prisma-client-js")!;
    const prismaClientPath = internals.parseEnvValue(prismaClientProvider.output!);

    await generateCode(options.dmmf, {
      emitTranspiledCode: parseStringBoolean(generatorConfig.emitTranspiledCode),
      outputDirPath: outputDir,
      prismaClientPath: prismaClientPath.includes("node_modules")
        ? "@prisma/client"
        : toUnixPath(path.relative(outputDir, prismaClientPath))
    });

    if (outputDir === defaultOutput) {
      await fs.copy(join(packageDir, "scripts", "backup-index.esm.js"), join(packageDir, "lib", "esm", "index.js"));
      await fs.copy(join(packageDir, "scripts", "backup-index.d.mts"), join(packageDir, "lib", "types", "index.d.ts"));
      await fs.writeJson(`${outputDir}/package.json`, {
        type: "module"
      });
    }

    return "";
  };
}
