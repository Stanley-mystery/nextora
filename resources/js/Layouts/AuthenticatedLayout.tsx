import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    DashboardOutlined,
    LogoutOutlined,
    MenuOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Dropdown, Layout, Menu, Space, Typography } from 'antd';

export default function AuthenticatedLayout({
    header,
    children,
}: {
    header?: any;
    children: any;
}) {
    const user = usePage().props.auth.user;

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const navigationItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link href={route('dashboard')}>Site Builder</Link>,
        },
    ];

    const userMenuItems = [
        {
            key: 'profile',
            icon: <SettingOutlined />,
            label: <Link href={route('profile.edit')}>Profile</Link>,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: (
                <Link href={route('logout')} method="post" as="button">
                    Log Out
                </Link>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#ffffff',
                    borderBottom: '1px solid #f0f0f0',
                    paddingInline: 24,
                }}
            >
                <Space size="large">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setMobileNavOpen(true)}
                        className="sm:hidden"
                    />
                    <Link href="/">
                        <Typography.Title
                            level={4}
                            style={{ margin: 0, color: '#1677ff' }}
                        >
                            Nexora
                        </Typography.Title>
                    </Link>
                    <div className="hidden sm:block">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[
                                route().current('dashboard')
                                    ? 'dashboard'
                                    : '',
                            ]}
                            items={navigationItems as any}
                            style={{ borderBottom: 'none', minWidth: 220 }}
                        />
                    </div>
                </Space>

                <Dropdown menu={{ items: userMenuItems as any }} trigger={['click']}>
                    <Button type="text" icon={<UserOutlined />}>
                        {user.name}
                    </Button>
                </Dropdown>
            </Layout.Header>

            <Drawer
                title="Navigation"
                placement="left"
                open={mobileNavOpen}
                onClose={() => setMobileNavOpen(false)}
            >
                <Space
                    direction="vertical"
                    size={16}
                    style={{ width: '100%' }}
                >
                    <Typography.Text strong>{user.name}</Typography.Text>
                    <Typography.Text type="secondary">{user.email}</Typography.Text>
                    <Menu
                        mode="inline"
                        selectedKeys={[
                            route().current('dashboard') ? 'dashboard' : '',
                        ]}
                        items={navigationItems as any}
                    />
                    <Menu mode="inline" items={userMenuItems as any} />
                </Space>
            </Drawer>

            {header && (
                <Layout.Content style={{ padding: '24px 24px 0' }}>
                    {header}
                </Layout.Content>
            )}

            <Layout.Content style={{ padding: 24 }}>
                {children}
            </Layout.Content>
        </Layout>
    );
}
