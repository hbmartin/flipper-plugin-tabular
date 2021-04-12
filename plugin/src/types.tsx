import {ColumnType} from "antd/es/table";

export type Records = Record<string, Array<Record<string, any>>>;

export type Events = {
    addRecords: Records;
};

export type Columns = Record<string, Array<ColumnType<any>>>;
