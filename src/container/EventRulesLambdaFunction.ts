import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { EventRulesServiceFactory } from '../build/EventRulesServiceFactory';

export class EventRulesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("event_rules", "Event rules function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-eventrules', 'controller', 'default', '*', '*'));
        this._factories.add(new EventRulesServiceFactory());
    }
}

export const handler = new EventRulesLambdaFunction().getHandler();