let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { EventRuleV1 } from '../data/version1/EventRuleV1';
import { IEventRulesPersistence } from './IEventRulesPersistence';

export class EventRulesMongoDbPersistence extends IdentifiableMongoDbPersistence<EventRuleV1, string> implements IEventRulesPersistence {

    constructor() {
        super('event_rules');
        super.ensureIndex({ org_id: 1 });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ name: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        if (!deleted)
            criteria.push({ $or: [ { deleted: false }, { deleted: { $exists: false } } ] });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<EventRuleV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public unsetObject(correlationId: string, orgId: string, objectId: string,
        callback: (err: any) => void): void {

        let filter = {
            org_id: orgId
        };

        let change = {
            $pull: { 
                include_object_ids: objectId,
                exclude_object_ids: objectId
            }
        };

        this._collection.update(filter, change, (err, count) => {
            if (!err)
                this._logger.trace(correlationId, "Unset object %s from %s", objectId, this._collection);

            if (callback) callback(err);
        });
    }

    public unsetGroup(correlationId: string, orgId: string, groupId: string,
        callback: (err: any) => void): void {

        let filter = {
            org_id: orgId
        };

        let change = {
            $pull: { 
                include_group_ids: groupId,
                exclude_group_ids: groupId
            }
        };

        this._collection.update(filter, change, (err, count) => {
            if (!err)
                this._logger.trace(correlationId, "Unset group %s from %s", groupId, this._collection);

            if (callback) callback(err);
        });
    }

    public unsetZone(correlationId: string, orgId: string, zoneId: string,
        callback: (err: any) => void): void {

        let filter = {
            org_id: orgId
        };

        let change = {
            $pull: { 
                include_zone_ids: zoneId,
                exclude_zone_ids: zoneId
            }
        };

        this._collection.update(filter, change, (err, count) => {
            if (!err)
                this._logger.trace(correlationId, "Unset zone %s from %s", zoneId, this._collection);

            if (callback) callback(err);
        });
    }

}
