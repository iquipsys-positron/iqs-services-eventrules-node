import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class EventRuleV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('deleted', TypeCode.Boolean);
        
        this.withRequiredProperty('type', TypeCode.String);
        this.withOptionalProperty('condition', TypeCode.Map);
        this.withOptionalProperty('severity', TypeCode.Integer);
        this.withOptionalProperty('interval', TypeCode.Integer);

        this.withOptionalProperty('incident', TypeCode.Boolean);
        this.withOptionalProperty('show_journal', TypeCode.Boolean);
        this.withOptionalProperty('send_message', TypeCode.Boolean);
        this.withOptionalProperty('recipient_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('send_signal', TypeCode.Boolean);
        this.withOptionalProperty('signals', TypeCode.Integer);

        this.withOptionalProperty('all_objects', TypeCode.Boolean);
        this.withOptionalProperty('include_object_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('include_group_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('exclude_object_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('exclude_group_ids', new ArraySchema(TypeCode.String));

        this.withOptionalProperty('all_zones', TypeCode.Boolean);
        this.withOptionalProperty('include_zone_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('exclude_zone_ids', new ArraySchema(TypeCode.String));
    }
}
