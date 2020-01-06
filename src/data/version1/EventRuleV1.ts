import { IStringIdentifiable } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';

export class EventRuleV1 implements IStringIdentifiable {
    // Identification
    public id: string;
    public org_id: string;
    public name: string;
    public create_time?: Date;
    public deleted?: boolean;

    // Condition
    public type: string;
    public condition?: any;
    public severity?: number;
    public interval?: number; // In seconds

    // Actions
    public incident?: boolean;
    public show_journal?: boolean;
    public send_message?: boolean;
    public recipient_ids?: string[];
    public send_signal?: boolean;
    public signal?: number;

    // Constraints
    public all_objects?: boolean;
    public include_object_ids?: string[];
    public exclude_object_ids?: string[];
    public include_group_ids?: string[];
    public exclude_group_ids?: string[];

    public all_zones?: boolean;
    public include_zone_ids?: string[];
    public exclude_zone_ids?: string[];
}