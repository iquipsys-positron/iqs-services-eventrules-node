import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { ResolutionsClientFactory } from 'iqs-clients-resolutions-node';

import { EventRulesServiceFactory } from '../build/EventRulesServiceFactory';

export class EventRulesProcess extends ProcessContainer {

    public constructor() {
        super('event_rules', "Event rules microservice");
        this._factories.add(new EventRulesServiceFactory);
        this._factories.add(new ResolutionsClientFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
