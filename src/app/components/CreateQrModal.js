import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { Option } = Select;

const CreateQrModal = ({ open, onCreate, onCancel }) => {
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
      title={t('create_qr')}
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
          name="qrCode"
          label={t('qr_code')}
          rules={[
            {
              required: true,
              message: t('please_input_qr_code'),
            },
          ]}
        >
          <Input placeholder={t('enter_qr_code')} />
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
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={(current) => current && current < dayjs().endOf('day')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateQrModal;