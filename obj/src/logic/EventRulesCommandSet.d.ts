import { CommandSet } from 'pip-services3-commons-node';
import { IEventRulesController } from './IEventRulesController';
export declare class EventRulesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEventRulesController);
    private makeGetEventRulesCommand;
    private makeGetEventRuleByIdCommand;
    private makeCreateEventRuleCommand;
    private makeUpdateEventRuleCommand;
    private makeDeleteEventRuleByIdCommand;
    private makeUnsetObjectCommand;
    private makeUnsetGroupCommand;
    private makeUnsetZoneCommand;
}
