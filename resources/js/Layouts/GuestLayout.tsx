import { Link } from '@inertiajs/react';
import { Card, Layout, Space, Typography } from 'antd';

export default function GuestLayout({ children }: { children: any }) {
    return (
        <Layout
            style={{
                minHeight: '100vh',
                padding: '24px',
                background:
                    'linear-gradient(135deg, #f0f5ff 0%, #ffffff 50%, #f6ffed 100%)',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 480,
                    margin: 'auto',
                }}
            >
                <Space
                    direction="vertical"
                    size={24}
                    style={{ width: '100%', textAlign: 'center' }}
                >
                    <div>
                        <Link href="/">
                            <Typography.Title
                                level={2}
                                style={{ marginBottom: 8 }}
                            >
                                Nexora
                            </Typography.Title>
                        </Link>
                        <Typography.Paragraph
                            type="secondary"
                            style={{ marginBottom: 0 }}
                        >
                            Laravel, React, Inertia, and Ant Design starter.
                        </Typography.Paragraph>
                    </div>

                    <Card
                        bordered={false}
                        style={{ textAlign: 'left' }}
                        styles={{ body: { padding: 32 } }}
                    >
                        {children}
                    </Card>
                </Space>
            </div>
        </Layout>
    );
}

