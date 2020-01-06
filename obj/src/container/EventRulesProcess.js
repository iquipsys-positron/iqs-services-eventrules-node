"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const iqs_clients_resolutions_node_1 = require("iqs-clients-resolutions-node");
const EventRulesServiceFactory_1 = require("../build/EventRulesServiceFactory");
class EventRulesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super('event_rules', "Event rules microservice");
        this._factories.add(new EventRulesServiceFactory_1.EventRulesServiceFactory);
        this._factories.add(new iqs_clients_resolutions_node_1.ResolutionsClientFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.EventRulesProcess = EventRulesProcess;
//# sourceMappingURL=EventRulesProcess.js.map