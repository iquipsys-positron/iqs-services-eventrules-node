import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { EventRuleV1 } from '../data/version1/EventRuleV1';
export interface IEventRulesPersistence extends IGetter<EventRuleV1, string>, IWriter<EventRuleV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<EventRuleV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: EventRuleV1) => void): void;
    create(correlationId: string, item: EventRuleV1, callback: (err: any, item: EventRuleV1) => void): void;
    update(correlationId: string, item: EventRuleV1, callback: (err: any, item: EventRuleV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: EventRuleV1) => void): void;
    unsetObject(correlationId: string, orgId: string, objectId: string, callback: (err: any) => void): void;
    unsetGroup(correlationId: string, orgId: string, groupId: string, callback: (err: any) => void): void;
    unsetZone(correlationId: string, orgId: string, zoneId: string, callback: (err: any) => void): void;
}
