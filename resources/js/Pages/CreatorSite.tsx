import { Head, Link, router } from '@inertiajs/react';
import {
    CheckCircleOutlined,
    ShoppingCartOutlined,
    StarOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, InputNumber, Row, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';

type CreatorSiteProps = {
    profile: any;
    products: any[];
    cartCount: number;
};

const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function CreatorSite({ profile, products, cartCount }: CreatorSiteProps) {
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const productCountLabel = useMemo(() => {
        if (products.length === 1) {
            return '1 product';
        }

        return `${products.length} products`;
    }, [products.length]);

    const addToCart = (productId: number) => {
        const quantity = quantities[productId] ?? 1;

        router.post(
            route('cart.add', [profile.site_slug, productId]),
            { quantity },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title={`${profile.site_name} - Portfolio & Store`} />

            <div
                style={{
                    minHeight: '100vh',
                    background: `linear-gradient(180deg, ${profile.brand_color}14 0%, #ffffff 28%)`,
                    padding: '24px',
                }}
            >
                <div style={{ maxWidth: 1120, margin: '0 auto' }}>
                    <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 18 }}>
                        <Col>
                            <Space direction="vertical" size={2}>
                                <Typography.Title level={3} style={{ margin: 0 }}>
                                    {profile.site_name}
                                </Typography.Title>
                                <Typography.Text type="secondary">
                                    {profile.headline || 'Creator website'}
                                </Typography.Text>
                            </Space>
                        </Col>

                        <Col>
                            <Space wrap>
                                <Link href={route('cart.index', profile.site_slug)}>
                                    <Button icon={<ShoppingCartOutlined />}>
                                        Cart ({cartCount})
                                    </Button>
                                </Link>
                                <Link href={route('login')}>
                                    <Button type="primary">Creator Login</Button>
                                </Link>
                            </Space>
                        </Col>
                    </Row>

                    <Card
                        bordered={false}
                        style={{ marginBottom: 24 }}
                        styles={{ body: { padding: 34 } }}
                    >
                        <Space direction="vertical" size={14} style={{ width: '100%' }}>
                            <Tag color="processing">Portfolio + Product Site</Tag>
                            <Typography.Title level={1} style={{ margin: 0, maxWidth: 760 }}>
                                {profile.hero_title || profile.site_name}
                            </Typography.Title>
                            <Typography.Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 0 }}>
                                {profile.hero_subtitle ||
                                    'Welcome to this creator storefront. Browse products and learn more about the creator below.'}
                            </Typography.Paragraph>
                            <Space wrap>
                                <Tag color="blue">{productCountLabel}</Tag>
                                {profile.contact_email && <Tag icon={<CheckCircleOutlined />}>{profile.contact_email}</Tag>}
                                {profile.contact_phone && <Tag>{profile.contact_phone}</Tag>}
                            </Space>
                        </Space>
                    </Card>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={8}>
                            <Card
                                title={
                                    <Space>
                                        <StarOutlined />
                                        <span>Portfolio</span>
                                    </Space>
                                }
                                bordered={false}
                            >
                                <Typography.Paragraph>
                                    {profile.about ||
                                        'Add your story in the dashboard to help visitors connect with your brand.'}
                                </Typography.Paragraph>

                                <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                    {profile.portfolio_summary ||
                                        'Add achievements, sample projects, and testimonials so this becomes a full portfolio page.'}
                                </Typography.Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} lg={16}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                {products.length === 0 ? (
                                    <Card bordered={false}>
                                        <Typography.Text type="secondary">
                                            No products published yet.
                                        </Typography.Text>
                                    </Card>
                                ) : (
                                    products.map((product) => (
                                        <Card
                                            key={product.id}
                                            bordered={false}
                                            title={product.name}
                                            extra={
                                                <Typography.Text strong>
                                                    {usd.format(Number(product.price ?? 0))}
                                                </Typography.Text>
                                            }
                                        >
                                            <Row gutter={[16, 16]}>
                                                <Col xs={24} md={10}>
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            style={{
                                                                width: '100%',
                                                                height: 180,
                                                                objectFit: 'cover',
                                                                borderRadius: 10,
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                height: 180,
                                                                borderRadius: 10,
                                                                background: '#f5f5f5',
                                                                display: 'grid',
                                                                placeItems: 'center',
                                                                color: '#8c8c8c',
                                                            }}
                                                        >
                                                            Product photo
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col xs={24} md={14}>
                                                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                                        <Typography.Text type="secondary">
                                                            {product.description ||
                                                                'Add a description in the dashboard.'}
                                                        </Typography.Text>

                                                        <Space wrap>
                                                            <InputNumber
                                                                min={1}
                                                                max={99}
                                                                value={quantities[product.id] ?? 1}
                                                                onChange={(value) =>
                                                                    setQuantities((prev) => ({
                                                                        ...prev,
                                                                        [product.id]: Number(value ?? 1),
                                                                    }))
                                                                }
                                                            />
                                                            <Button
                                                                type="primary"
                                                                icon={<ShoppingCartOutlined />}
                                                                onClick={() => addToCart(product.id)}
                                                            >
                                                                Add to cart
                                                            </Button>
                                                        </Space>
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))
                                )}
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}
