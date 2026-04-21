import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    CheckCircleOutlined,
    DeploymentUnitOutlined,
    RocketOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Space, Statistic, Tag, Typography } from 'antd';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <Card bordered={false}>
                    <Space direction="vertical" size={8}>
                        <Tag color="processing">Project Dashboard</Tag>
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            Welcome to Nexora
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Your Laravel + React + Inertia starter is ready for
                            feature development.
                        </Typography.Text>
                    </Space>
                </Card>
            }
        >
            <Head title="Dashboard" />

            <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Authentication"
                            value="Enabled"
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Frontend Stack"
                            value="React + Inertia"
                            prefix={<DeploymentUnitOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="UI Library"
                            value="Ant Design"
                            prefix={<RocketOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        bordered={false}
                        title="Next build steps"
                        extra={<Tag color="blue">Starter Ready</Tag>}
                    >
                        <Space direction="vertical" size={12}>
                            <Typography.Text>
                                Create domain pages in `resources/js/Pages`.
                            </Typography.Text>
                            <Typography.Text>
                                Add backend routes and controllers in Laravel as
                                usual.
                            </Typography.Text>
                            <Typography.Text>
                                Use Ant Design components for forms, tables,
                                filters, and app navigation.
                            </Typography.Text>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </AuthenticatedLayout>
    );
}
