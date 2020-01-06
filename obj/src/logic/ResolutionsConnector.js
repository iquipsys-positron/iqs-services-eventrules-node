"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
class ResolutionsConnector {
    constructor(_resolutionsClient) {
        this._resolutionsClient = _resolutionsClient;
    }
    unsetRule(correlationId, rule, callback) {
        if (this._resolutionsClient == null || rule == null) {
            callback(null);
            return;
        }
        this._resolutionsClient.unsetRule(correlationId, rule.org_id, rule.id, callback);
    }
}
exports.ResolutionsConnector = ResolutionsConnector;
//# sourceMappingURL=ResolutionsConnector.js.map