import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { Option } = Select;

const CreatePinModal = ({ open, onCreate, onCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Dummy device data
  const dummyDevices = [
    { id: 'device1', name: 'Device A' },
    { id: 'device2', name: 'Device B' },
    { id: 'device3', name: 'Device C' },
  ];

  const filterOption = (input, option) =>
    (option?.name ?? '').toLowerCase().includes(input.toLowerCase());

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        message.error(t('form_validation_failed'));
      });
  };

  return (
     <Modal
       open={open}
      title={t('create_pin')}
      okText={t('create')}
      cancelText={t('cancel')}
      onCancel={onCancel}
      onOk={handleOk}
      styles={{ maxWidth: 520 }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="pin"
          label={t('pin')}
          rules={[
            {
              required: true,
              message: t('please_input_pin'),
            },
            {
              pattern: /^\d{4,8}$/,
              message: t('pin_format_error'),
            },
          ]}
        >
          <Input placeholder={t('enter_pin')} />
        </Form.Item>
        <Form.Item
          name="device"
          label={t('device')}
          rules={[{ required: true, message: t('please_select_device') }]}
        >
          <Select
            placeholder={t('select_device')}
            showSearch
            filterOption={filterOption}
            dropdownStyle={{
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {dummyDevices.map(device => (
              <Option key={device.id} value={device.id}>
                {device.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="expires"
          label={t('expires')}
          rules={[
            {
              required: true,
              message: t('please_select_expiration_date'),
            },
          ]}
        >
          <DatePicker
            style={{ width: '100%' }}
            disabledDate={(current) => {
              return current && current < dayjs().endOf('day');
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePinModal;