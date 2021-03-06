import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { EventRuleV1 } from '../data/version1/EventRuleV1';
import { IEventRulesController } from './IEventRulesController';
export declare class EventRulesController implements IConfigurable, IReferenceable, ICommandable, IEventRulesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _resolutionsClient;
    private _resolutionsConnector;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getEventRules(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<EventRuleV1>) => void): void;
    getEventRuleById(correlationId: string, id: string, callback: (err: any, rule: EventRuleV1) => void): void;
    createEventRule(correlationId: string, rule: EventRuleV1, callback: (err: any, rule: EventRuleV1) => void): void;
    updateEventRule(correlationId: string, rule: EventRuleV1, callback: (err: any, rule: EventRuleV1) => void): void;
    deleteEventRuleById(correlationId: string, id: string, callback: (err: any, rule: EventRuleV1) => void): void;
    unsetObject(correlationId: string, orgId: string, objectId: string, callback: (err: any) => void): void;
    unsetGroup(correlationId: string, orgId: string, groupId: string, callback: (err: any) => void): void;
    unsetZone(correlationId: string, orgId: string, zoneId: string, callback: (err: any) => void): void;
}
