import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Input, Button, Space, Tag, Select, DatePicker, Modal, Form, message, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CreatePinModal from './CreatePinModal';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

const PinManagement = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dummyPins = [
    { id: '1', pin: '1234', status: 'active', created: '2023-01-01', expires: '2024-01-01', device: 'Device A' },
    { id: '2', pin: '5678', status: 'inactive', created: '2023-02-01', expires: '2024-02-01', device: 'Device B' },
    { id: '3', pin: '9101', status: 'active', created: '2023-03-01', expires: '2024-03-01', device: 'Device C' },
    { id: '4', pin: '1121', status: 'expired', created: '2023-04-01', expires: '2023-05-01', device: 'Device A' },
    { id: '5', pin: '3141', status: 'active', created: '2023-05-01', expires: '2024-05-01', device: 'Device B' },
  ];

  const getColumnSearchProps = (dataIndex) => ({
     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
         <Input
           placeholder={`Search ${dataIndex}`}
           value={selectedKeys[0]}
           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
           style={{ marginBottom: 8, display: 'block' }}
         />
         <Space>
           <Button
             type="primary"
             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
             icon={<SearchOutlined />}
             size="small"
             style={{ width: 90 }}
           >
             {t('search')}
           </Button>
           <Button
             onClick={() => clearFilters && handleReset(clearFilters)}
             size="small"
             style={{ width: 90 }}
           >
             {t('reset')}
           </Button>
           <Button
             type="link"
             size="small"
             onClick={() => {
               confirm({ closeDropdown: false });
               setSearchText(selectedKeys[0]);
               setSearchedColumn(dataIndex);
             }}
           >
             {t('filter')}
           </Button>
         </Space>
       </div>
     ),
     filterIcon: (filtered) => (
       <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
     ),
     onFilter: (value, record) =>
       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
     filterDropdownProps: {
       onOpenChange: (visible) => {
         if (visible) {
           setTimeout(() => document.getElementById(`search-input-${dataIndex}`)?.select(), 100);
         }
       },
     },
     render: (text) =>
       searchedColumn === dataIndex ? (
         <Tag color="blue">{text}</Tag>
       ) : (
         text
       ),
     filteredValue: searchedColumn === dataIndex ? [searchText] : null,
   });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreatePin = (values) => {
    console.log('Received values of form: ', values);
    message.success(t('pin_created_successfully'));
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: t('pin'),
      dataIndex: 'pin',
      key: 'pin',
      ...getColumnSearchProps('pin'),
      sorter: (a, b) => a.pin.localeCompare(b.pin),
      sortOrder: sortedInfo.columnKey === 'pin' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: t('active'), value: 'active' },
        { text: t('inactive'), value: 'inactive' },
        { text: t('expired'), value: 'expired' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'inactive' ? 'volcano' : 'red'}>
          {t(status)}
        </Tag>
      ),
    },
    {
      title: t('created'),
      dataIndex: 'created',
      key: 'created',
      sorter: (a, b) => new Date(a.created) - new Date(b.created),
      sortOrder: sortedInfo.columnKey === 'created' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('expires'),
      dataIndex: 'expires',
      key: 'expires',
      sorter: (a, b) => new Date(a.expires) - new Date(b.expires),
      sortOrder: sortedInfo.columnKey === 'expires' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t('device'),
      dataIndex: 'device',
      key: 'device',
      ...getColumnSearchProps('device'),
      sorter: (a, b) => a.device.localeCompare(b.device),
      sortOrder: sortedInfo.columnKey === 'device' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <div>
      <h1>{t('pin_management')}</h1>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder={t('search_pins')}
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder={t('filter_by_status')}
              style={{ width: '100%' }}
              onChange={(value) => setFilteredInfo({ ...filteredInfo, status: value ? [value] : null })}
              allowClear
            >
              <Option value="active">{t('active')}</Option>
              <Option value="inactive">{t('inactive')}</Option>
              <Option value="expired">{t('expired')}</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker
              onChange={(dates, dateStrings) => setFilteredInfo({ ...filteredInfo, created: dateStrings })}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button type="primary" onClick={showModal} style={{ width: '100%' }}>{t('create_pin')}</Button>
          </Col>
        </Row>
      </div>
      <Table
        columns={columns}
        dataSource={dummyPins}
        onChange={handleChange}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
       <CreatePinModal
         open={isModalVisible}
         onCreate={handleCreatePin}
         onCancel={handleCancel}
       />
    </div>
  );
};

export default PinManagement;