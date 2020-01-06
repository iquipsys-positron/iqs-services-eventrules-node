"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const EventRulesMongoDbPersistence_1 = require("../persistence/EventRulesMongoDbPersistence");
const EventRulesFilePersistence_1 = require("../persistence/EventRulesFilePersistence");
const EventRulesMemoryPersistence_1 = require("../persistence/EventRulesMemoryPersistence");
const EventRulesController_1 = require("../logic/EventRulesController");
const EventRulesHttpServiceV1_1 = require("../services/version1/EventRulesHttpServiceV1");
class EventRulesServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EventRulesServiceFactory.MemoryPersistenceDescriptor, EventRulesMemoryPersistence_1.EventRulesMemoryPersistence);
        this.registerAsType(EventRulesServiceFactory.FilePersistenceDescriptor, EventRulesFilePersistence_1.EventRulesFilePersistence);
        this.registerAsType(EventRulesServiceFactory.MongoDbPersistenceDescriptor, EventRulesMongoDbPersistence_1.EventRulesMongoDbPersistence);
        this.registerAsType(EventRulesServiceFactory.ControllerDescriptor, EventRulesController_1.EventRulesController);
        this.registerAsType(EventRulesServiceFactory.HttpServiceDescriptor, EventRulesHttpServiceV1_1.EventRulesHttpServiceV1);
    }
}
exports.EventRulesServiceFactory = EventRulesServiceFactory;
EventRulesServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-eventrules", "factory", "default", "default", "1.0");
EventRulesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-eventrules", "persistence", "memory", "*", "1.0");
EventRulesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-eventrules", "persistence", "file", "*", "1.0");
EventRulesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-eventrules", "persistence", "mongodb", "*", "1.0");
EventRulesServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-eventrules", "controller", "default", "*", "1.0");
EventRulesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-eventrules", "service", "http", "*", "1.0");
//# sourceMappingURL=EventRulesServiceFactory.js.map