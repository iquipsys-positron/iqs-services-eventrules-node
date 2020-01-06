import { ConfigParams } from 'pip-services3-commons-node';

import { EventRulesMemoryPersistence } from '../../src/persistence/EventRulesMemoryPersistence';
import { EventRulesPersistenceFixture } from './EventRulesPersistenceFixture';

suite('EventRulesMemoryPersistence', ()=> {
    let persistence: EventRulesMemoryPersistence;
    let fixture: EventRulesPersistenceFixture;
    
    setup((done) => {
        persistence = new EventRulesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new EventRulesPersistenceFixture(persistence);
        
        persistence.open(null, done);
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