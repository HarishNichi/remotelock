import React from 'react';
import { Table, Select, DatePicker, Button, Input, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AuditLog = () => {
  const columns = [
    {
      title: 'Entity',
      dataIndex: 'entity',
      key: 'entity',
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Admin/User',
      dataIndex: 'adminUser',
      key: 'adminUser',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
    },
  ];

  const data = [
    { key: '1', entity: 'QR-123', event: 'created', adminUser: 'Admin A', timestamp: '2023-10-26 10:00:00', device: 'Device X' },
    { key: '2', entity: 'PIN-456', event: 'used', adminUser: 'User B', timestamp: '2023-10-26 10:05:00', device: 'Device Y' },
    { key: '3', entity: 'QR-789', event: 'revoked', adminUser: 'Admin C', timestamp: '2023-10-26 10:10:00', device: 'Device Z' },
  ];

  const handleExportCSV = () => {
    console.log('Export CSV button clicked');
    // Implement CSV export logic here
  };

  return (
    <div>
      <h1>Audit Log Screen</h1>
      <Space style={{ marginBottom: 16 }}>
        <Select placeholder="Entity Type" style={{ width: 120 }}>
          <Option value="qr">QR</Option>
          <Option value="pin">PIN</Option>
        </Select>
        <Select placeholder="Event Type" style={{ width: 120 }}>
          <Option value="created">Created</Option>
          <Option value="used">Used</Option>
          <Option value="revoked">Revoked</Option>
        </Select>
        <RangePicker />
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleExportCSV}>
          Export CSV
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default AuditLog;