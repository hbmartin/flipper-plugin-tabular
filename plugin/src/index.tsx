/**
 * Copyright (c) 2021 Harold Martin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Button, Divider, Dropdown, Menu, Space} from 'antd';
import {DeleteOutlined, DownOutlined, LockOutlined, UnlockOutlined} from '@ant-design/icons';
import {
  DataSource,
  DataTable,
  DataTableColumn,
  PluginClient,
  createDataSource,
  createState,
  usePlugin,
  useValue,
} from 'flipper-plugin';
import {AllColumns, ChannelColumns, Events, Rows} from './types';

export function plugin(client: PluginClient<Events>) {
  const records = createState<Record<string, DataSource<Rows>>>({}, {});
  const selectedID = createState<string>("", {});
  const columns = createState<AllColumns>({}, {});
  const channels = createState<string[]>([], {});
  const currentChannelRecords = createState<DataSource<Rows>>(createDataSource<any>([], {}), {});
  const currentChannelColumns = createState<ChannelColumns>([], {});
  const columnLocked = createState<boolean>(false, {});

  client.onMessage('configureChannels', (newRecords) => {
    columns.update(draft => {
      for (const [channel, configuration] of Object.entries(newRecords)) {
        draft[channel] = draft[channel] || [];
        const existingColumns = draft[channel].map(c => c['key']);
        for (const prop of configuration.columns) {
          if (!existingColumns.includes(prop.key)) {
            existingColumns.push(prop.key);
            draft[channel].push(generateColumn(prop.key, prop.title, prop.visible))
          }
        }
      }
    });
    channels.update(draft => {
      for (const channel of Object.keys(newRecords)) {
        if (!draft.includes(channel)) {
          draft.push(channel);
        }
      }
    });
  });

  client.onMessage('addRecords', (newRecords) => {
    columns.update(draft => {
      for (const [channel, newRecordList] of Object.entries(newRecords)) {
        draft[channel] = draft[channel] || [];
        const existingColumns = draft[channel].map(c => c['key']);
        for (const item of newRecordList) {
          for (const prop in item) {
            if (!existingColumns.includes(prop)) {
              existingColumns.push(prop);
              draft[channel].push(generateColumn(prop, prop))
            }
          }
        }
      }
    });
    records.update(draft => {
      for (const [channel, newRecordList] of Object.entries(newRecords)) {
        if (!draft.hasOwnProperty(channel)) {
          draft[channel] = createDataSource<Rows>([], {});
        }
        for (const item of newRecordList) {
          draft[channel].append(item);
        }
      }
    });
    channels.update(draft => {
      for (const channel of Object.keys(newRecords)) {
        if (!draft.includes(channel)) {
          draft.push(channel);
        }
      }
    });
    if (selectedID.get() == "") {
      setSelection({key: Object.keys(newRecords)[0]});
    }
  });

  const generateColumn = (key: string, title: string, visible: boolean = true): DataTableColumn => {
    return ({'title': title, 'key': key, 'visible': visible});
  };

  const setSelection = (info: {key: React.Key}) => {
    selectedID.set(info.key.toString());
    currentChannelColumns.set(columns.get()[info.key]);
    currentChannelRecords.set(records.get()[info.key]);
  };

  const clearChannelRecords = () => {
    const id = selectedID.get();
    records.get()[id].clear();
    currentChannelRecords.get().clear();
  };

  const toggleColumnLock = () => {
    columnLocked.update(draft => !draft)
  };

  columns.subscribe((value: AllColumns, prevValue: AllColumns) => {
    const id = selectedID.get();
    if (value[id] != prevValue[id] && !columnLocked.get()) {
      currentChannelColumns.set(value[id]);
    }
  });

  columnLocked.subscribe((value: boolean, prevValue: boolean) => {
    if (!value && prevValue) {
      currentChannelColumns.set(columns.get()[selectedID.get()]);
    }
  });

  client.addMenuEntry(
      {
        label: 'Clear',
        handler: clearChannelRecords,
      }
  );

  return {
    channels,
    clearChannelRecords,
    columnLocked,
    currentChannelColumns,
    currentChannelRecords,
    selectedID,
    setSelection,
    toggleColumnLock
  };
}

export function Component() {
  const instance = usePlugin(plugin);

  const channels = useValue(instance.channels);
  const columnLocked = useValue(instance.columnLocked);
  const columns = useValue(instance.currentChannelColumns);
  const records = useValue(instance.currentChannelRecords);
  const selectedID = useValue(instance.selectedID);
  const lockIcon = columnLocked ? <LockOutlined/> : <UnlockOutlined />;

  return (
    <DataTable
      columns={columns}
      dataSource={records}
      enableAutoScroll
      key={columns.length + selectedID}
      extraActions={
        <Space size="small">
          <Divider type="vertical" />
          <Dropdown overlay={
            <Menu onClick={instance.setSelection}>
              {channels.map((e) =>
                  <Menu.Item key={e}>{e}</ Menu.Item>
              )}
            </Menu>
          }>
            <Button>{selectedID} <DownOutlined/></Button>
          </Dropdown>
          <Divider type="vertical" />
          <Button title="Lock Columns" onClick={instance.toggleColumnLock}>{lockIcon}</Button>
          <Button title="Clear" onClick={instance.clearChannelRecords}><DeleteOutlined/></Button>
        </Space>
      }
    />
  );
}