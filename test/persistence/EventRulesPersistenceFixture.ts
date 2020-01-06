let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { EventRuleV1 } from '../../src/data/version1/EventRuleV1';
import { EventRuleTypeV1 } from '../../src/data/version1/EventRuleTypeV1';

import { IEventRulesPersistence } from '../../src/persistence/IEventRulesPersistence';

let EVENT_RULE1: EventRuleV1 = {
    id: '1',
    org_id: '1',
    type: EventRuleTypeV1.Entry,
    name: 'Test rule 1',
    interval: 3600,
    severity: 0
};
let EVENT_RULE2: EventRuleV1 = {
    id: '2',
    org_id: '1',
    type: EventRuleTypeV1.Disappear,
    name: 'Test rule 2',
    interval: 3600,
    severity: 0
};
let EVENT_RULE3: EventRuleV1 = {
    id: '3',
    org_id: '2',
    type: EventRuleTypeV1.Presence,
    name: 'Test rule 3',
    interval: 3600,
    severity: 0
};

export class EventRulesPersistenceFixture {
    private _persistence: IEventRulesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateEventRules(done) {
        async.series([
        // Create one rule
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT_RULE1,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE1.org_id);
                        assert.equal(rule.type, EVENT_RULE1.type);
                        assert.equal(rule.name, EVENT_RULE1.name);

                        callback();
                    }
                );
            },
        // Create another rule
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT_RULE2,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE2.org_id);
                        assert.equal(rule.type, EVENT_RULE2.type);
                        assert.equal(rule.name, EVENT_RULE2.name);

                        callback();
                    }
                );
            },
        // Create yet another rule
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT_RULE3,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE3.org_id);
                        assert.equal(rule.type, EVENT_RULE3.type);
                        assert.equal(rule.name, EVENT_RULE3.name);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let rule1: EventRuleV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateEventRules(callback);
            },
        // Get all rules
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        rule1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the rule
            (callback) => {
                rule1.name = 'Updated rule 1';

                this._persistence.update(
                    null,
                    rule1,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.name, 'Updated rule 1');
                        assert.equal(rule.id, rule1.id);

                        callback();
                    }
                );
            },
        // Delete rule
            (callback) => {
                this._persistence.deleteById(
                    null,
                    rule1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete rule
            (callback) => {
                this._persistence.getOneById(
                    null,
                    rule1.id,
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isNull(rule || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create rules
            (callback) => {
                this.testCreateEventRules(callback);
            },
        // Get rules filtered by org_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 2);

                        callback();
                    }
                );
            },
        // Get rules filtered by type
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        type: EventRuleTypeV1.Disappear
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 1);

                        callback();
                    }
                );
            },
        // Get rules filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: 'test'
                    }),
                    new PagingParams(),
                    (err, rules) => {
                        assert.isNull(err);

                        assert.isObject(rules);
                        assert.lengthOf(rules.data, 3);

                        callback();
                    }
                );
            },
        ], done);
    }

    public testUnsetReferences(done) {
        async.series([
        // Create rule
            (callback) => {
                this._persistence.create(
                    null,
                    {
                        id: '1',
                        org_id: '1',
                        type: EventRuleTypeV1.Entry,
                        name: 'Test rule 1',
                        interval: 3600,
                        severity: 0,
                        include_object_ids: ['1', '2'],
                        exclude_object_ids: ['1', '2'],
                        include_group_ids: ['1', '2'],
                        exclude_group_ids: ['1', '2'],
                        include_zone_ids: ['1', '2'],
                        exclude_zone_ids: ['1', '2']
                    },
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE1.org_id);
                        assert.lengthOf(rule.include_object_ids, 2);
                        assert.lengthOf(rule.exclude_object_ids, 2);
                        assert.lengthOf(rule.include_group_ids, 2);
                        assert.lengthOf(rule.exclude_group_ids, 2);
                        assert.lengthOf(rule.include_zone_ids, 2);
                        assert.lengthOf(rule.exclude_zone_ids, 2);

                        callback();
                    }
                );
            },
        // Unset object
            (callback) => {
                this._persistence.unsetObject(
                    null, '1', '1',
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Unset group
            (callback) => {
                this._persistence.unsetGroup(
                    null, '1', '1',
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Unset zone
            (callback) => {
                this._persistence.unsetZone(
                    null, '1', '1',
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Get and check the rule
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '1',
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE1.org_id);
                        assert.lengthOf(rule.include_object_ids, 1);
                        assert.lengthOf(rule.exclude_object_ids, 1);
                        assert.lengthOf(rule.include_group_ids, 1);
                        assert.lengthOf(rule.exclude_group_ids, 1);
                        assert.lengthOf(rule.include_zone_ids, 1);
                        assert.lengthOf(rule.exclude_zone_ids, 1);

                        callback();
                    }
                );
            }
        ], done);
    }

}
