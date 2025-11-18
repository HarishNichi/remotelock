"use client";
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Dropdown, Select, Badge, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  KeyOutlined,
  QrcodeOutlined,
  AuditOutlined,
  SettingOutlined,
  GlobalOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Dashboard from './Dashboard';
import PinManagement from './PinManagement';
import QrManagement from './QrManagement';
import AuditLog from './AuditLog';

import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const AdminLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // State to manage selected menu item

  // Dummy device data for the dropdown
  const devices = [
    { value: 'device1', label: 'Device 1 (Online)', status: 'online' },
    { value: 'device2', label: 'Device 2 (Offline)', status: 'offline' },
    { value: 'device3', label: 'Device 3 (Online)', status: 'online' },
    { value: 'device4', label: 'Device 4 (Maintenance)', status: 'maintenance' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuItemClick = (e) => {
    setSelectedKey(e.key);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    console.log('Logout button clicked.');
    // Implement your logout logic here
    console.log('Logging out...');
    router.push('/login');
  };

  const adminMenu = {
    items: [
      {
        key: 'logout',
        label: (
          <a onClick={handleLogout}>
            Logout
          </a>
        ),
      },
    ],
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Dashboard />;
      case '2':
        return <PinManagement />;
      case '3':
        return <QrManagement />;
      case '4':
        return <AuditLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          bodyStyle={{ padding: 0 }}
          width={200}
          
        >
          <div className="logo flex items-center justify-center" style={{ textAlign: 'center', margin: '16px', color: 'white', fontWeight: 'bold' }}>
           {collapsed ? <img src="/logo.png" alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} /> : t('admin_panel')}
          </div>
          <Menu
            theme='light'
            mode="inline"
            className='text-white'
            selectedKeys={[selectedKey]}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: t('dashboard'),
                onClick: handleMenuItemClick,
              },
              {
                key: '2',
                icon: <KeyOutlined />,
                label: t('pin_management'),
                onClick: handleMenuItemClick,
              },
              {
                key: '3',
                icon: <QrcodeOutlined />,
                label: t('qr_management'),
                onClick: handleMenuItemClick,
              },
              {
                key: '4',
                icon: <AuditOutlined />,
                label: t('audit_log'),
                onClick: handleMenuItemClick,
              },
              {
                key: '5',
                icon: <SettingOutlined />,
                label: t('settings'),
                onClick: handleMenuItemClick,
              },
            ]}
          />
        </Drawer>
      ) : (
        <Sider trigger={null} collapsible collapsed={collapsed} className="lg:min-w-[200px] w-full lg:w-auto" style={{ background: 'var(--sider-background-color)' }}>
          <div className="logo flex items-center justify-center" style={{ textAlign: 'center', margin: '16px', color: 'white', fontWeight: 'bold' }}>
          {collapsed ? <img src="/logo.png" alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} /> : t('admin_panel')}
          </div>
          <Menu
            theme='light'
            mode="inline"
            className='text-white'
            selectedKeys={[selectedKey]}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: t('dashboard'),
                onClick: handleMenuItemClick,
              },
              {
                key: '2',
                icon: <KeyOutlined />,
                label: t('pin_management'),
                onClick: handleMenuItemClick,
              },
              {
                key: '3',
                icon: <QrcodeOutlined />,
                label: t('qr_management'),
                onClick: handleMenuItemClick,
              },
              {
                key: '4',
                icon: <AuditOutlined />,
                label: t('audit_log'),
                onClick: handleMenuItemClick,
              },
              {
                key: '5',
                icon: <SettingOutlined />,
                label: t('settings'),
                onClick: handleMenuItemClick,
              },
            ]}
          />
        </Sider>
      )}
      <Layout>
        <Header style={{ padding: 0, background: 'var(--header-background-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'var(--text-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <div className="flex items-center mr-4" style={{ display: 'flex', alignItems: 'center' }}>

            <Button type="text" icon={<GlobalOutlined />} style={{ color: 'var(--text-color)' }} onClick={toggleLanguage} />
            <Dropdown menu={adminMenu} placement="bottomRight">
              <a className="flex items-center cursor-pointer" onClick={(e) => e.preventDefault()}>
                <span className="mr-[20px]" style={{ color: 'var(--text-color)',  }}>{t('admin')}</span>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white" alt="Admin User">A</div>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: 'var(--card-background-color)',
            borderRadius: '8px',
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;