export default (fileName) => ({
  content: `
// Generated with index.js, Assume this is a react project

import React from "react";

export interface I${fileName}Props {}

const ${fileName}: React.FC<I${fileName}Props> = () => {

  return (
    <div>{/** Todo... */}</div>
  );
}

export default ${fileName};

`,
  suffix: `tsx`,
});
