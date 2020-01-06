import { ConfigParams } from 'pip-services3-commons-node';

import { EventRulesFilePersistence } from '../../src/persistence/EventRulesFilePersistence';
import { EventRulesPersistenceFixture } from './EventRulesPersistenceFixture';

suite('EventRulesFilePersistence', ()=> {
    let persistence: EventRulesFilePersistence;
    let fixture: EventRulesPersistenceFixture;
    
    setup((done) => {
        persistence = new EventRulesFilePersistence('./data/event_rules.test.json');

        fixture = new EventRulesPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });
    
    test('Unset References', (done) => {
        fixture.testUnsetReferences(done);
    });

});