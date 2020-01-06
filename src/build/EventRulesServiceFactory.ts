import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EventRulesMongoDbPersistence } from '../persistence/EventRulesMongoDbPersistence';
import { EventRulesFilePersistence } from '../persistence/EventRulesFilePersistence';
import { EventRulesMemoryPersistence } from '../persistence/EventRulesMemoryPersistence';
import { EventRulesController } from '../logic/EventRulesController';
import { EventRulesHttpServiceV1 } from '../services/version1/EventRulesHttpServiceV1';

export class EventRulesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-eventrules", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-eventrules", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-eventrules", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-eventrules", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-eventrules", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-eventrules", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EventRulesServiceFactory.MemoryPersistenceDescriptor, EventRulesMemoryPersistence);
		this.registerAsType(EventRulesServiceFactory.FilePersistenceDescriptor, EventRulesFilePersistence);
		this.registerAsType(EventRulesServiceFactory.MongoDbPersistenceDescriptor, EventRulesMongoDbPersistence);
		this.registerAsType(EventRulesServiceFactory.ControllerDescriptor, EventRulesController);
		this.registerAsType(EventRulesServiceFactory.HttpServiceDescriptor, EventRulesHttpServiceV1);
	}
	
}
