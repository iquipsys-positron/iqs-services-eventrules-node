let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { IResolutionsClientV1 } from 'iqs-clients-resolutions-node';

import { EventRuleV1 } from '../data/version1/EventRuleV1';
import { EventRuleTypeV1 } from '../data/version1/EventRuleTypeV1';
import { IEventRulesPersistence } from '../persistence/IEventRulesPersistence';
import { IEventRulesController } from './IEventRulesController';
import { EventRulesCommandSet } from './EventRulesCommandSet';
import { ResolutionsConnector } from './ResolutionsConnector';

export class EventRulesController implements  IConfigurable, IReferenceable, ICommandable, IEventRulesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-eventrules:persistence:*:*:1.0',
        'dependencies.resolutions', 'iqs-services-resolutions:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EventRulesController._defaultConfig);
    private _resolutionsClient: IResolutionsClientV1;
    private _resolutionsConnector: ResolutionsConnector;
    private _persistence: IEventRulesPersistence;
    private _commandSet: EventRulesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IEventRulesPersistence>('persistence');

        this._resolutionsClient = this._dependencyResolver.getOneOptional<IResolutionsClientV1>('resolutions');
        this._resolutionsConnector = new ResolutionsConnector(this._resolutionsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EventRulesCommandSet(this);
        return this._commandSet;
    }
    
    public getEventRules(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<EventRuleV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getEventRuleById(correlationId: string, id: string, 
        callback: (err: any, rule: EventRuleV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createEventRule(correlationId: string, rule: EventRuleV1, 
        callback: (err: any, rule: EventRuleV1) => void): void {

        rule.create_time = new Date();

        this._persistence.create(correlationId, rule, callback);
    }

    public updateEventRule(correlationId: string, rule: EventRuleV1, 
        callback: (err: any, rule: EventRuleV1) => void): void {
        this._persistence.update(correlationId, rule, callback);
    }

    public deleteEventRuleById(correlationId: string, id: string,
        callback: (err: any, rule: EventRuleV1) => void): void {  
        let oldEventRule: EventRuleV1;
        let newEventRule: EventRuleV1;

        async.series([
            // Get rule
            (callback) => {
                this._persistence.getOneById(correlationId, id, (err, data) => {
                    oldEventRule = data;
                    callback(err);
                });
            },
            // Set logical deletion flag
            (callback) => {
                if (oldEventRule == null) {
                    callback();
                    return;
                }

                newEventRule = _.clone(oldEventRule);
                newEventRule.deleted = true;

                this._persistence.update(correlationId, newEventRule, (err, data) => {
                    newEventRule = data;
                    callback(err);
                });
            },
            (callback) => {
                this._resolutionsConnector.unsetRule(correlationId, newEventRule, callback);
            }
        ], (err) => {
            callback(err, err == null ? newEventRule : null);
        }); 
    }

    public unsetObject(correlationId: string, orgId: string, objectId: string,
        callback: (err: any) => void): void {
        this._persistence.unsetObject(correlationId, orgId, objectId, callback);
    }

    public unsetGroup(correlationId: string, orgId: string, groupId: string,
        callback: (err: any) => void): void {
        this._persistence.unsetGroup(correlationId, orgId, groupId, callback);
    }

    public unsetZone(correlationId: string, orgId: string, zoneId: string,
        callback: (err: any) => void): void {
        this._persistence.unsetZone(correlationId, orgId, zoneId, callback);
    }

}
