import {DataTableColumn} from "flipper-plugin";

export type Rows = Record<string, Array<Record<string, any>>>;

export type ColumnDefinition = {
    key: string;
    title: string;
    visible: boolean;
}

export type Events = {
    addRecords: Rows;
    configureChannels: Record<string, Array<ColumnDefinition>>;
};

export type ChannelColumns = Array<DataTableColumn>;
export type AllColumns = Record<string, ChannelColumns>;

export type recordType<Type> = Type extends Record<infer Y, infer X> ? X : never
