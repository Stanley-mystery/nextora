import { CheckCircleOutlined, RocketOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Head, Link } from '@inertiajs/react';
import { Button, Card, Col, Layout, Row, Space, Statistic, Tag, Typography } from 'antd';

const features = [
    {
        title: 'Laravel 13 Backend',
        description: 'A modern PHP backend with routing, auth scaffolding, migrations, and developer tooling ready to go.',
        icon: <RocketOutlined style={{ fontSize: 22, color: '#1677ff' }} />,
    },
    {
        title: 'React + Inertia',
        description: 'Single-page style navigation without building a separate API-first frontend for basic app workflows.',
        icon: <CheckCircleOutlined style={{ fontSize: 22, color: '#52c41a' }} />,
    },
    {
        title: 'Ant Design UI',
        description: 'Production-ready components for dashboards, forms, tables, navigation, and admin experiences.',
        icon: <SafetyCertificateOutlined style={{ fontSize: 22, color: '#722ed1' }} />,
    },
];

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <Layout
                style={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(180deg, #f5f7ff 0%, #ffffff 45%, #f6ffed 100%)',
                }}
            >
                <Layout.Header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        paddingInline: 24,
                    }}
                >
                    <Typography.Title level={4} style={{ margin: 0, color: '#1677ff' }}>
                        Nexora
                    </Typography.Title>
                    <Space>
                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button type="primary">Open Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}>
                                    <Button>Log in</Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button type="primary">Register</Button>
                                </Link>
                            </>
                        )}
                    </Space>
                </Layout.Header>

                <Layout.Content style={{ padding: '24px' }}>
                    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
                        <Card
                            bordered={false}
                            style={{ marginBottom: 24 }}
                            styles={{ body: { padding: 40 } }}
                        >
                            <Row gutter={[32, 32]} align="middle">
                                <Col xs={24} md={14}>
                                    <Space direction="vertical" size={20}>
                                        <Tag color="blue">Laravel + React + Inertia + Antd</Tag>
                                        <Typography.Title style={{ margin: 0 }}>
                                            Kick off full-stack apps with a polished Ant Design starter.
                                        </Typography.Title>
                                        <Typography.Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 0 }}>
                                            This project is scaffolded for rapid product development with Laravel on the
                                            server, React pages via Inertia, and Ant Design for the interface layer.
                                        </Typography.Paragraph>
                                        <Space wrap>
                                            <Link href={auth.user ? route('dashboard') : route('register')}>
                                                <Button type="primary" size="large">
                                                    {auth.user ? 'Go to Dashboard' : 'Create Account'}
                                                </Button>
                                            </Link>
                                            <a href="https://inertiajs.com" target="_blank" rel="noreferrer">
                                                <Button size="large">View Inertia Docs</Button>
                                            </a>
                                        </Space>
                                    </Space>
                                </Col>
                                <Col xs={24} md={10}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Card bordered={false}>
                                                <Statistic title="Laravel" value={laravelVersion} />
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card bordered={false}>
                                                <Statistic title="PHP" value={phpVersion} />
                                            </Card>
                                        </Col>
                                        <Col span={24}>
                                            <Card bordered={false}>
                                                <Typography.Text type="secondary">
                                                    Breeze authentication is installed and the initial layout is already
                                                    switched to Ant Design.
                                                </Typography.Text>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>

                        <Row gutter={[24, 24]}>
                            {features.map((feature) => (
                                <Col xs={24} md={8} key={feature.title}>
                                    <Card bordered={false} style={{ height: '100%' }}>
                                        <Space direction="vertical" size={12}>
                                            {feature.icon}
                                            <Typography.Title level={4} style={{ margin: 0 }}>
                                                {feature.title}
                                            </Typography.Title>
                                            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                                {feature.description}
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
