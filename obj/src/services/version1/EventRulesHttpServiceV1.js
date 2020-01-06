"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class EventRulesHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/event_rules');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-eventrules', 'controller', 'default', '*', '1.0'));
    }
}
exports.EventRulesHttpServiceV1 = EventRulesHttpServiceV1;
//# sourceMappingURL=EventRulesHttpServiceV1.js.map