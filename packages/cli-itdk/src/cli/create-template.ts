import { promises as fs } from 'fs'
import copy from 'copy'

export const copyTemplate = async (dir: string, model: string): Promise<void> => {
  await fs.mkdir(dir, { recursive: true });

  const templateDir = `${__dirname}/../../starter-templates/${model}`;

  return new Promise((accept, reject) => {
    copy(`${templateDir}/*`, dir, (err) => {
      if (err) {
        reject(err);
      }
      accept();
    });
  });
};

export const createTemplate = async (dir: string, model: string): Promise<void> => {
  await copyTemplate(dir, model);
};

export const directoryNotEmpty = async (dir: string): Promise<boolean> => {
  try {
    const stats = await fs.stat(dir);
    if (stats.isDirectory()) {
      const files = await fs.readdir(dir);
      return files.length > 0;
    } else {
      // BEST This is not exactly a directory... maybe this function could be more specific
      return true;
    }
  }
  catch (err) {
    return false;
  }
};
