import {
    FormOutlined,
    PictureOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Head, Link } from '@inertiajs/react';
import { Button, Card, Col, Layout, Row, Space, Tag, Typography } from 'antd';

export default function Welcome({ auth }: { auth: any }) {
    const features = [
        {
            title: 'Account + Login',
            text: 'Create an account, log in, and manage your creator website from a private dashboard.',
            icon: <UserOutlined style={{ fontSize: 20, color: '#1677ff' }} />,
        },
        {
            title: 'Form-Based Site Builder',
            text: 'Customize hero section, colors, portfolio content, and contact details by filling simple forms.',
            icon: <FormOutlined style={{ fontSize: 20, color: '#52c41a' }} />,
        },
        {
            title: 'Product Uploads',
            text: 'Add products, upload photos, set prices and descriptions, then publish them instantly.',
            icon: <PictureOutlined style={{ fontSize: 20, color: '#fa8c16' }} />,
        },
        {
            title: 'Public Store + Cart',
            text: 'Share your public page where visitors browse your portfolio, view products, and add items to cart.',
            icon: <ShoppingCartOutlined style={{ fontSize: 20, color: '#722ed1' }} />,
        },
    ];

    return (
        <>
            <Head title="Creator Commerce Builder" />

            <Layout
                style={{
                    minHeight: '100vh',
                    background:
                        'radial-gradient(circle at top left, #e6f4ff 0%, #ffffff 40%, #f6ffed 100%)',
                }}
            >
                <Layout.Header
                    style={{
                        background: 'transparent',
                        paddingInline: 24,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography.Title level={4} style={{ margin: 0, color: '#1677ff' }}>
                        Nexora Creator
                    </Typography.Title>

                    <Space>
                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button type="primary">Open Builder</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}>
                                    <Button>Login</Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button type="primary">Create Account</Button>
                                </Link>
                            </>
                        )}
                    </Space>
                </Layout.Header>

                <Layout.Content style={{ padding: '24px' }}>
                    <div style={{ maxWidth: 1120, margin: '0 auto' }}>
                        <Card bordered={false} style={{ marginBottom: 24 }} styles={{ body: { padding: 36 } }}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Tag color="processing">Portfolio + Product Website Builder</Tag>
                                <Typography.Title level={1} style={{ margin: 0, maxWidth: 760 }}>
                                    Build your own storefront and portfolio by filling forms
                                </Typography.Title>
                                <Typography.Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 0 }}>
                                    This project lets creators sign up, customize their website, upload product photos
                                    and descriptions, and give visitors a cart flow for shopping.
                                </Typography.Paragraph>
                                <Space wrap>
                                    <Link href={auth.user ? route('dashboard') : route('register')}>
                                        <Button size="large" type="primary">
                                            {auth.user ? 'Go to Builder' : 'Start Building'}
                                        </Button>
                                    </Link>
                                    {!auth.user && (
                                        <Link href={route('login')}>
                                            <Button size="large">I already have an account</Button>
                                        </Link>
                                    )}
                                </Space>
                            </Space>
                        </Card>

                        <Row gutter={[24, 24]}>
                            {features.map((feature) => (
                                <Col xs={24} md={12} key={feature.title}>
                                    <Card bordered={false} style={{ height: '100%' }}>
                                        <Space direction="vertical" size={10}>
                                            {feature.icon}
                                            <Typography.Title level={4} style={{ margin: 0 }}>
                                                {feature.title}
                                            </Typography.Title>
                                            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                                {feature.text}
                                            </Typography.Paragraph>
                                        </Space>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </>
    );
}
