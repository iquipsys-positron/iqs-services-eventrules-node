"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const EventRulesServiceFactory_1 = require("../build/EventRulesServiceFactory");
class EventRulesLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("event_rules", "Event rules function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-eventrules', 'controller', 'default', '*', '*'));
        this._factories.add(new EventRulesServiceFactory_1.EventRulesServiceFactory());
    }
}
exports.EventRulesLambdaFunction = EventRulesLambdaFunction;
exports.handler = new EventRulesLambdaFunction().getHandler();
//# sourceMappingURL=EventRulesLambdaFunction.js.map