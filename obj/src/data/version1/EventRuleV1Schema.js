"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
class EventRuleV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('deleted', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withRequiredProperty('type', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('condition', pip_services3_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('severity', pip_services3_commons_node_3.TypeCode.Integer);
        this.withOptionalProperty('interval', pip_services3_commons_node_3.TypeCode.Integer);
        this.withOptionalProperty('incident', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('show_journal', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('send_message', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('recipient_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('send_signal', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('signals', pip_services3_commons_node_3.TypeCode.Integer);
        this.withOptionalProperty('all_objects', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('include_object_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('include_group_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('exclude_object_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('exclude_group_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('all_zones', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withOptionalProperty('include_zone_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('exclude_zone_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
    }
}
exports.EventRuleV1Schema = EventRuleV1Schema;
//# sourceMappingURL=EventRuleV1Schema.js.map