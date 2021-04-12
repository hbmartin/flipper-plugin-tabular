import React from 'react';
import {Button, Divider, Dropdown, Menu, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Toolbar} from 'flipper';
import {createState, PluginClient, usePlugin, useValue,} from 'flipper-plugin';
import {Columns, Events, Records} from './types';
import {MenuInfo} from "rc-menu/lib/interface";

export function plugin(client: PluginClient<Events>) {
  const records = createState<Records>({}, {});
  const selectedID = createState<string | number>("", {});
  const columns = createState<Columns>({}, {});

  client.addMenuEntry(
      {
        label: 'Reset Selection',
        topLevelMenu: 'Edit',
        handler: () => {
          selectedID.set("");
        },
      }
  );

  client.onMessage('addRecords', (newRecords) => {
    columns.update(draft => {
      for (const channel in newRecords) {
        if (newRecords.hasOwnProperty(channel) && !(draft.hasOwnProperty(channel))) {
          let props: Array<string> = [];
          if (newRecords[channel].length > 0) {
            let item = newRecords[channel][0];
            for (const prop in item) {
              if (item.hasOwnProperty(prop)) {
                props.push(prop);
              }
            }
          }
          draft[channel] = props.map(p => ({'title': p, 'dataIndex': p, 'key': p}));
        }
      }
    });
    records.update(draft => {
      for (const channel in newRecords) {
        if (newRecords.hasOwnProperty(channel)) {
          if (!(draft.hasOwnProperty(channel))) {
            draft[channel] = [];
          }
          draft[channel] = draft[channel].concat(newRecords[channel]);
          if (selectedID.get() == "") {
            selectedID.set(channel);
          }
        }
      }
    });
  });

  const setSelection = (info: MenuInfo) => {
    selectedID.set(info.key);
  };

  return {
    columns,
    records,
    selectedID,
    setSelection,
  };
}

export function Component() {
  const instance = usePlugin(plugin);
  const records = useValue(instance.records);
  const selectedID = useValue(instance.selectedID);
  const columns = useValue(instance.columns);

  return (
    <>
      <Toolbar>
        <Dropdown overlay={
          <Menu onClick={instance.setSelection}>
            {Object.keys(records).map((e, i) =>
                <Menu.Item key={e}>{e}</ Menu.Item>
            )}
          </Menu>
        }>
          <Button>{selectedID} <DownOutlined/></Button>
        </Dropdown>
      </Toolbar>
      <Table dataSource={records[selectedID]} columns={columns[selectedID]}/>
    </>
  );
}