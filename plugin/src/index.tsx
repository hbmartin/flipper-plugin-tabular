import React, {createRef} from 'react';
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
  useValue, DataTableManager,
} from 'flipper-plugin';
import {AllColumns, ChannelColumns, Events} from './types';

export function plugin(client: PluginClient<Events>) {
  const records = createState<Record<string, DataSource>>({}, {});
  const selectedID = createState<string>("", {});
  const columns = createState<AllColumns>({}, {});
  const channels = createState<string[]>([], {});
  const currentChannelRecords = createState<DataSource>(createDataSource<any>([], {}), {});
  const currentChannelColumns = createState<ChannelColumns>([], {});
  const columnLocked = createState<boolean>(false, {});

  client.onMessage('configureChannels', (newRecords) => {
    columns.update(draft => {
      for (const [channel, config] of Object.entries(newRecords)) {
        draft[channel] = draft[channel] || [];
        let existingColumns = draft[channel].map(c => c['key']);
        for (const column of config) {
          if (!existingColumns.includes(column.key)) {
            existingColumns.push(column.key);
            draft[channel].push(generateColumn(column.title, column.key, column.visible))
          }
        }
      }
    });
  });

  client.onMessage('addRecords', (newRecords) => {
    columns.update(draft => {
      for (const [channel, newRecordList] of Object.entries(newRecords)) {
        draft[channel] = draft[channel] || [];
        let existingColumns = draft[channel].map(c => c['key']);
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
          draft[channel] = createDataSource<any>([], {});
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

  const generateColumn = (title: string, dataIndex: string, visible: boolean = true): DataTableColumn => {
    return ({'title': title, 'key': dataIndex, 'visible': visible});
  };

  const setSelection = (info: {key: React.Key}) => {
    selectedID.set(info.key.toString());
    currentChannelColumns.set(columns.get()[info.key]);
    currentChannelRecords.set(records.get()[info.key]);
  };

  const clearChannelRecords = () => {
    let id = selectedID.get();
    records.get()[id].clear();
    currentChannelRecords.get().clear();
  };

  const toggleColumnLock = () => {
    columnLocked.update(draft => !draft)
  };

  columns.subscribe((value: AllColumns, prevValue: AllColumns) => {
    let id = selectedID.get();
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
        topLevelMenu: 'Edit',
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

  let lockIcon = columnLocked ? <LockOutlined/> : <UnlockOutlined />;

  return (
    <DataTable
      columns={columns}
      dataSource={records}
      enableAutoScroll={true}
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