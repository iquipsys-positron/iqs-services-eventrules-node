import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class EventRulesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/event_rules');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-eventrules', 'controller', 'default', '*', '1.0'));
    }
}