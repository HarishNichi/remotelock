"use client";
import React from 'react';
import { Card, Col, Row, Statistic, Button, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  const recentActivityData = [
    { key: '1', action: 'QR created', admin: 'Admin A', timestamp: '2023-10-26 10:00:00' },
    { key: '2', action: 'PIN revoked', admin: 'Admin B', timestamp: '2023-10-26 09:30:00' },
    { key: '3', action: 'Device added', admin: 'Admin A', timestamp: '2023-10-26 08:00:00' },
  ];

  const recentActivityColumns = [
    { title: t('action'), dataIndex: 'action', key: 'action' },
    { title: t('admin'), dataIndex: 'admin', key: 'admin' },
    { title: t('timestamp'), dataIndex: 'timestamp', key: 'timestamp' },
  ];

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={6}>
          <Card>
            <Statistic
              title={t('total_active_pins')}
              value={112893}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix={t('pins')}
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card>
            <Statistic
              title={t('total_active_qrs')}
              value={112893}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix={t('qrs')}
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card>
            <Statistic
              title={t('total_devices')}
              value={93}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix={t('devices')}
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card>
            <Statistic
              title={t('unlock_attempts_24h')}
              value={1128}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix={t('attempts')}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={12}>
          <Card className='' title={t('quick_actions')}>
            <div className='flex items-center justify-between flex-wrap'>
            <Button type="primary" icon={<PlusOutlined />} className="mr-2">{t('create_pin')}</Button>
            <Button type="default" icon={<PlusOutlined />}>{t('create_qr')}</Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t('recent_activity')}>
            <Table dataSource={recentActivityData} columns={recentActivityColumns} pagination={false} scroll={{ x: 'max-content' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;