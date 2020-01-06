let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { EventRuleV1 } from '../../src/data/version1/EventRuleV1';
import { EventRuleTypeV1 } from '../../src/data/version1/EventRuleTypeV1';
import { EventRulesMemoryPersistence } from '../../src/persistence/EventRulesMemoryPersistence';
import { EventRulesController } from '../../src/logic/EventRulesController';
import { EventRulesLambdaFunction } from '../../src/container/EventRulesLambdaFunction';

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

suite('EventRulesLambdaFunction', ()=> {
    let lambda: EventRulesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-eventrules:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-eventrules:controller:default:default:1.0'
        );

        lambda = new EventRulesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var rule1, rule2;

        async.series([
        // Create one rule
            (callback) => {
                lambda.act(
                    {
                        role: 'event_rules',
                        cmd: 'create_event_rule',
                        rule: EVENT_RULE1
                    },
                    (err, rule) => {
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
                lambda.act(
                    {
                        role: 'event_rules',
                        cmd: 'create_event_rule',
                        rule: EVENT_RULE2
                    },
                    (err, rule) => {
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
                lambda.act(
                    {
                        role: 'event_rules',
                        cmd: 'get_event_rules' 
                    },
                    (err, page) => {
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

                lambda.act(
                    {
                        role: 'event_rules',
                        cmd: 'update_event_rule',
                        rule: rule1
                    },
                    (err, rule) => {
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
                lambda.act(
                    {
                        role: 'event_rules',
                        cmd: 'delete_event_rule_by_id',
                        rule_id: rule1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete rule
            (callback) => {
                lambda.act(
                    {
                        role: 'event_rules',
                        cmd: 'get_event_rule_by_id',
                        rule_id: rule1.id
                    },
                    (err, rule) => {
                        assert.isNull(err);

                        assert.isNotNull(rule);
                        assert.isTrue(rule.deleted);

                        callback();
                    }
                );
            }
        ], done);
    });
});