import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { EventRuleV1 } from '../data/version1/EventRuleV1';
import { EventRuleV1Schema } from '../data/version1/EventRuleV1Schema';
import { IEventRulesController } from './IEventRulesController';

export class EventRulesCommandSet extends CommandSet {
    private _logic: IEventRulesController;

    constructor(logic: IEventRulesController) {
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

	private makeGetEventRulesCommand(): ICommand {
		return new Command(
			"get_event_rules",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getEventRules(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetEventRuleByIdCommand(): ICommand {
		return new Command(
			"get_event_rule_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('rule_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let rule_id = args.getAsString("rule_id");
                this._logic.getEventRuleById(correlationId, rule_id, callback);
            }
		);
	}

	private makeCreateEventRuleCommand(): ICommand {
		return new Command(
			"create_event_rule",
			new ObjectSchema(true)
				.withRequiredProperty('rule', new EventRuleV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let rule = args.get("rule");
                this._logic.createEventRule(correlationId, rule, callback);
            }
		);
	}

	private makeUpdateEventRuleCommand(): ICommand {
		return new Command(
			"update_event_rule",
			new ObjectSchema(true)
				.withRequiredProperty('rule', new EventRuleV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let rule = args.get("rule");
                this._logic.updateEventRule(correlationId, rule, callback);
            }
		);
	}
	
	private makeDeleteEventRuleByIdCommand(): ICommand {
		return new Command(
			"delete_event_rule_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('rule_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let ruleId = args.getAsNullableString("rule_id");
                this._logic.deleteEventRuleById(correlationId, ruleId, callback);
			}
		);
	}

	private makeUnsetObjectCommand(): ICommand {
		return new Command(
			"unset_object",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String)
				.withRequiredProperty('object_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let orgId = args.getAsNullableString("org_id");
                let objectId = args.getAsNullableString("object_id");
                this._logic.unsetObject(correlationId, orgId, objectId, (err) => {
					if (callback) callback(err, null)
				});
			}
		);
	}

	private makeUnsetGroupCommand(): ICommand {
		return new Command(
			"unset_group",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String)
				.withRequiredProperty('group_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let orgId = args.getAsNullableString("org_id");
                let groupId = args.getAsNullableString("group_id");
                this._logic.unsetGroup(correlationId, orgId, groupId, (err) => {
					if (callback) callback(err, null)
				});
			}
		);
	}

	private makeUnsetZoneCommand(): ICommand {
		return new Command(
			"unset_zone",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String)
				.withRequiredProperty('zone_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let orgId = args.getAsNullableString("org_id");
                let zoneId = args.getAsNullableString("zone_id");
                this._logic.unsetZone(correlationId, orgId, zoneId, (err) => {
					if (callback) callback(err, null)
				});
			}
		);
	}

}