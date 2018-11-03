const tsconfig = require("../tsconfig");

process.env.NODE_ENV = "test";
process.env.TS_NODE_TRANSPILE_ONLY = true;

// don't require ts-node if it has been required in node argument
if (!process.argv.includes("ts-node/register")) {
  require("ts-node").register({
    project: "test/tsconfig.json"
  });
}
