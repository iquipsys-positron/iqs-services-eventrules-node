import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class EventRuleV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    name: string;
    create_time?: Date;
    deleted?: boolean;
    type: string;
    condition?: any;
    severity?: number;
    interval?: number;
    incident?: boolean;
    show_journal?: boolean;
    send_message?: boolean;
    recipient_ids?: string[];
    send_signal?: boolean;
    signal?: number;
    all_objects?: boolean;
    include_object_ids?: string[];
    exclude_object_ids?: string[];
    include_group_ids?: string[];
    exclude_group_ids?: string[];
    all_zones?: boolean;
    include_zone_ids?: string[];
    exclude_zone_ids?: string[];
}
