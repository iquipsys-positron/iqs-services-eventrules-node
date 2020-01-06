"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const EventRuleV1Schema_1 = require("../data/version1/EventRuleV1Schema");
class EventRulesCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetEventRulesCommand());
        this.addCommand(this.makeGetEventRuleByIdCommand());
        this.addCommand(this.makeCreateEventRuleCommand());
        this.addCommand(this.makeUpdateEventRuleCommand());
        this.addCommand(this.makeDeleteEventRuleByIdCommand());
        this.addCommand(this.makeUnsetObjectCommand());
        this.addCommand(this.makeUnsetGroupCommand());
        this.addCommand(this.makeUnsetZoneCommand());
    }
    makeGetEventRulesCommand() {
        return new pip_services3_commons_node_2.Command("get_event_rules", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getEventRules(correlationId, filter, paging, callback);
        });
    }
    makeGetEventRuleByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_event_rule_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let rule_id = args.getAsString("rule_id");
            this._logic.getEventRuleById(correlationId, rule_id, callback);
        });
    }
    makeCreateEventRuleCommand() {
        return new pip_services3_commons_node_2.Command("create_event_rule", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule', new EventRuleV1Schema_1.EventRuleV1Schema()), (correlationId, args, callback) => {
            let rule = args.get("rule");
            this._logic.createEventRule(correlationId, rule, callback);
        });
    }
    makeUpdateEventRuleCommand() {
        return new pip_services3_commons_node_2.Command("update_event_rule", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule', new EventRuleV1Schema_1.EventRuleV1Schema()), (correlationId, args, callback) => {
            let rule = args.get("rule");
            this._logic.updateEventRule(correlationId, rule, callback);
        });
    }
    makeDeleteEventRuleByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_event_rule_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('rule_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let ruleId = args.getAsNullableString("rule_id");
            this._logic.deleteEventRuleById(correlationId, ruleId, callback);
        });
    }
    makeUnsetObjectCommand() {
        return new pip_services3_commons_node_2.Command("unset_object", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('object_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let orgId = args.getAsNullableString("org_id");
            let objectId = args.getAsNullableString("object_id");
            this._logic.unsetObject(correlationId, orgId, objectId, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
    makeUnsetGroupCommand() {
        return new pip_services3_commons_node_2.Command("unset_group", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('group_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let orgId = args.getAsNullableString("org_id");
            let groupId = args.getAsNullableString("group_id");
            this._logic.unsetGroup(correlationId, orgId, groupId, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
    makeUnsetZoneCommand() {
        return new pip_services3_commons_node_2.Command("unset_zone", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('zone_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let orgId = args.getAsNullableString("org_id");
            let zoneId = args.getAsNullableString("zone_id");
            this._logic.unsetZone(correlationId, orgId, zoneId, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
}
exports.EventRulesCommandSet = EventRulesCommandSet;
//# sourceMappingURL=EventRulesCommandSet.js.map