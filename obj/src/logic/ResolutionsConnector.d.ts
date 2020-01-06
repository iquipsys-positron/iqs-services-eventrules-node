import { IResolutionsClientV1 } from 'iqs-clients-resolutions-node';
import { EventRuleV1 } from '../data/version1/EventRuleV1';
export declare class ResolutionsConnector {
    private _resolutionsClient;
    constructor(_resolutionsClient: IResolutionsClientV1);
    unsetRule(correlationId: string, rule: EventRuleV1, callback: (err: any) => void): void;
}
