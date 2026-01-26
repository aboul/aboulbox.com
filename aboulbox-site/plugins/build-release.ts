import type { Plugin } from "vite";
import path from 'path';
import { existsSync } from 'node:fs';
import { symlink, unlink } from 'fs/promises';

export default function getFilesOnDisk(buildDir: string): Plugin {
  return {
    name: "getFilesOnDisk",
    enforce: "post",
    apply: "build",
    closeBundle() {
      console.log("Build finished!");

      const dest = path.resolve('dest/current');
      const lastBuildDir = path.resolve(buildDir);
      const relativePath = path.relative(path.resolve('dest'), path.resolve(buildDir));

      console.log(`Checking if build directory ${lastBuildDir} exists...`);

      if(!existsSync(lastBuildDir))
      {
          console.error(`Error, build directory ${lastBuildDir} doesn't exist...`)
          return 
      }

      console.log(`Checking if dest directory ${dest} exists...`);

      if (existsSync(dest)) {
        console.log(`Dest directory ${dest} exists, remove symlink`);
        unlink(dest);
      }

      console.log(`Create symlink from build directory ${relativePath} to dest directory ${dest}`);
      symlink(relativePath, dest, 'dir').catch((err) => {
        console.error(`Error while creating symlink ${relativePath} to dest directory ${dest}`, err);
        return
      });

      console.log(`Created symlink from build directory ${relativePath} to dest directory ${dest}`);
    },
  };
}