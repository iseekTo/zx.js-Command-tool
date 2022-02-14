#!/usr/bin/env zx

import { $, chalk } from "zx";
import fs from "fs";

import templates from "./scripts/templates/index.mjs";
import additionalEntryContent from "./scripts/additional-entry.mjs";

$.verbose = false;

const directoryName = process.argv[2];
if (!directoryName) {
  console.error(
    chalk.red("[Error]: Create file error, please supply a valid directoryName")
  );
  process.exit(1);
}

// The Directory address of the generated file
const componentDirectory = `./src/components/${directoryName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(chalk.red(`Directory ${directoryName} already exists`));
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

try {
  const generatedTemplates = templates.map((template) =>
    template(directoryName)
  );

  generatedTemplates.forEach((template) => {
    fs.writeFileSync(
      `${componentDirectory}/index.${template.suffix}`,
      template.content
    );
  });

  console.log(chalk.green("Successfully created directory:", directoryName));

  // Add the context to the imported content in Index.js
  additionalEntryContent(directoryName);
} catch (error) {
  console.error(error);
  process.exit(1);
}
