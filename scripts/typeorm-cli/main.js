const TypeormCli = require("./typeorm-cli");

async function run() {
  const typeormCli = new TypeormCli();

  if (process.argv[2] === "drop") {
    return await typeormCli.drop();
  }

  if (process.argv[2] === "generate") {
    return await typeormCli.generate();
  }

  if (process.argv[2] === "migrate") {
    return await typeormCli.migrate();
  }

  if (process.argv[2] === "all") {
    await typeormCli.drop();
    await typeormCli.generate();
    await typeormCli.migrate();
    return;
  }

  throw new Error("Command not found");
}

try {
  run();
} catch (e) {
  console.log(e);
}
