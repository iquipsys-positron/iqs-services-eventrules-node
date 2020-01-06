let EventRulesProcess = require('../obj/src/container/EventRulesProcess').EventRulesProcess;

try {
    new EventRulesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
