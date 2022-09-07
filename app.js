const yargs = require("yargs");
const { saveData, listContact, detailContact } = require("./function");

yargs.command({
    command: "add",
    describe: "add new contact",
    builder: {
        name: {
            describe: "Contact Name",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Contact Email",
            demandOption: false,
            type: "string",
        },
        mobile: {
            describe: "Contact Mobile Phone",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        saveData(argv.name, argv.email, argv.mobile);
    },
});

yargs.command({
    command: "list",
    describe: "See contact list",
    handler() {
        listContact();
    },
});

yargs.command({
    command: "detail",
    describe: "Get detail contact",
    builder: {
        name: {
            describe: "Contact Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        detailContact(argv.name);
    },
});

yargs.parse();
