/**
 * Copyright (c) 2021 Harold Martin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {DataTableColumn} from "flipper-plugin";

export type Rows = Record<string, Array<Record<string, any>>>;

export type ColumnDefinition = {
    key: string;
    title: string;
    visible: boolean;
}

export type ChannelDefinition = {
    columns: Array<ColumnDefinition>;
}

export type Events = {
    addRecords: Rows;
    configureChannels: Record<string, ChannelDefinition>;
};

export type ChannelColumns = Array<DataTableColumn>;
export type AllColumns = Record<string, ChannelColumns>;
