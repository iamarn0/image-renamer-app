const fs = require('fs/promises');
const path = require('path');

const IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.bmp'
];

async function scanFolderRecursive(folder) {
  const results = [];

  async function scan(current) {
    const entries = await fs.readdir(current, {
      withFileTypes: true
    });

    for (const entry of entries) {
      const fullPath = path.join(
        current,
        entry.name
      );

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else {
        const ext = path
          .extname(entry.name)
          .toLowerCase();

        if (
          IMAGE_EXTENSIONS.includes(ext)
        ) {
          results.push({
            name: entry.name,
            path: fullPath,
            folder: current,
            ext
          });
        }
      }
    }
  }

  await scan(folder);

  return results;
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function generateUniqueName(
  targetPath
) {
  const dir = path.dirname(targetPath);

  const ext = path.extname(targetPath);

  const base = path.basename(
    targetPath,
    ext
  );

  let counter = 2;

  let candidate = targetPath;

  while (
    await fileExists(candidate)
  ) {
    candidate = path.join(
      dir,
      `${base} (${counter})${ext}`
    );

    counter++;
  }

  return candidate;
}

async function renameFile(
  oldPath,
  newName,
  outputFolder
) {
  const ext = path.extname(oldPath);

  const targetDir =
    outputFolder ||
    path.dirname(oldPath);

  let targetPath = path.join(
    targetDir,
    `${newName}${ext}`
  );

  if (targetPath !== oldPath) {
    targetPath =
      await generateUniqueName(
        targetPath
      );
  }

  await fs.copyFile(
    oldPath,
    targetPath
  );

  return {
    success: true,
    newPath: targetPath,
    newName: path.basename(targetPath)
  };
}

module.exports = {
  scanFolderRecursive,
  renameFile
};