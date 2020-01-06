let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EventRuleV1 } from '../../../src/data/version1/EventRuleV1';
import { EventRuleTypeV1 } from '../../../src/data/version1/EventRuleTypeV1';
import { EventRulesMemoryPersistence } from '../../../src/persistence/EventRulesMemoryPersistence';
import { EventRulesController } from '../../../src/logic/EventRulesController';
import { EventRulesHttpServiceV1 } from '../../../src/services/version1/EventRulesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('EventRulesHttpServiceV1', ()=> {    
    let service: EventRulesHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new EventRulesMemoryPersistence();
        let controller = new EventRulesController();

        service = new EventRulesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-eventrules', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-eventrules', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-eventrules', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let rule1, rule2;

        async.series([
        // Create one rule
            (callback) => {
                rest.post('/v1/event_rules/create_event_rule',
                    {
                        rule: EVENT_RULE1
                    },
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE1.org_id);
                        assert.equal(rule.type, EVENT_RULE1.type);
                        assert.equal(rule.name, EVENT_RULE1.name);

                        rule1 = rule;

                        callback();
                    }
                );
            },
        // Create another rule
            (callback) => {
                rest.post('/v1/event_rules/create_event_rule', 
                    {
                        rule: EVENT_RULE2
                    },
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.org_id, EVENT_RULE2.org_id);
                        assert.equal(rule.type, EVENT_RULE2.type);
                        assert.equal(rule.name, EVENT_RULE2.name);

                        rule2 = rule;

                        callback();
                    }
                );
            },
        // Get all rules
            (callback) => {
                rest.post('/v1/event_rules/get_event_rules',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the rule
            (callback) => {
                rule1.name = 'Updated rule 1';

                rest.post('/v1/event_rules/update_event_rule',
                    { 
                        rule: rule1
                    },
                    (err, req, res, rule) => {
                        assert.isNull(err);

                        assert.isObject(rule);
                        assert.equal(rule.name, 'Updated rule 1');
                        assert.equal(rule.id, EVENT_RULE1.id);

                        rule1 = rule;

                        callback();
                    }
                );
            },
        // Delete rule
            (callback) => {
                rest.post('/v1/event_rules/delete_event_rule_by_id',
                    {
                        rule_id: rule1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete rule
            (callback) => {
                rest.post('/v1/event_rules/get_event_rule_by_id',
                    {
                        rule_id: rule1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.isNotNull(result);
                        assert.isTrue(result.deleted);

                        callback();
                    }
                );
            }
        ], done);
    });
});