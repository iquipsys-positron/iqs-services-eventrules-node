"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const EventRulesCommandSet_1 = require("./EventRulesCommandSet");
const ResolutionsConnector_1 = require("./ResolutionsConnector");
class EventRulesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(EventRulesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._resolutionsClient = this._dependencyResolver.getOneOptional('resolutions');
        this._resolutionsConnector = new ResolutionsConnector_1.ResolutionsConnector(this._resolutionsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EventRulesCommandSet_1.EventRulesCommandSet(this);
        return this._commandSet;
    }
    getEventRules(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getEventRuleById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createEventRule(correlationId, rule, callback) {
        rule.create_time = new Date();
        this._persistence.create(correlationId, rule, callback);
    }
    updateEventRule(correlationId, rule, callback) {
        this._persistence.update(correlationId, rule, callback);
    }
    deleteEventRuleById(correlationId, id, callback) {
        let oldEventRule;
        let newEventRule;
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
    unsetObject(correlationId, orgId, objectId, callback) {
        this._persistence.unsetObject(correlationId, orgId, objectId, callback);
    }
    unsetGroup(correlationId, orgId, groupId, callback) {
        this._persistence.unsetGroup(correlationId, orgId, groupId, callback);
    }
    unsetZone(correlationId, orgId, zoneId, callback) {
        this._persistence.unsetZone(correlationId, orgId, zoneId, callback);
    }
}
exports.EventRulesController = EventRulesController;
EventRulesController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-eventrules:persistence:*:*:1.0', 'dependencies.resolutions', 'iqs-services-resolutions:client:*:*:1.0');
//# sourceMappingURL=EventRulesController.js.map