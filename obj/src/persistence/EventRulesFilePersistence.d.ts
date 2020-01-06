import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { EventRulesMemoryPersistence } from './EventRulesMemoryPersistence';
import { EventRuleV1 } from '../data/version1/EventRuleV1';
export declare class EventRulesFilePersistence extends EventRulesMemoryPersistence {
    protected _persister: JsonFilePersister<EventRuleV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
