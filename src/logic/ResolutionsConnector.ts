let _ = require('lodash');
let async = require('async');

import { IResolutionsClientV1 } from 'iqs-clients-resolutions-node';

import { EventRuleV1 } from '../data/version1/EventRuleV1';

export class ResolutionsConnector {

    public constructor(
        private _resolutionsClient: IResolutionsClientV1
    ) {}

    public unsetRule(correlationId: string, rule: EventRuleV1,
        callback: (err: any) => void) : void {
        
        if (this._resolutionsClient == null || rule == null) {
            callback(null);
            return;
        }

        this._resolutionsClient.unsetRule(correlationId, rule.org_id, rule.id, callback);
    }

}