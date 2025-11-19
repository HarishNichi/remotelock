import React from 'react';
import { Table, Select, DatePicker, Button, Input, Space, Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AuditLog = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('entity'),
      dataIndex: 'entity',
      key: 'entity',
    },
    {
      title: t('event'),
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: t('admin_user'),
      dataIndex: 'adminUser',
      key: 'adminUser',
    },
    {
      title: t('timestamp'),
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: t('device'),
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
      <h1>{t('audit_log_screen')}</h1>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select placeholder={t('entity_type')} style={{ width: '100%' }}>
              <Option value="qr">{t('qr')}</Option>
              <Option value="pin">{t('pin')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select placeholder={t('event_type')} style={{ width: '100%' }}>
              <Option value="created">{t('created')}</Option>
              <Option value="used">{t('used')}</Option>
              <Option value="revoked">{t('revoked')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExportCSV} style={{ width: '100%' }}>
              {t('export_csv')}
            </Button>
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} />
    </div>
  );
};

export default AuditLog;