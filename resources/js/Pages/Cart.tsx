import { Head, Link, router } from '@inertiajs/react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Space, Typography } from 'antd';

type CartProps = {
    profile: any;
    items: Array<{
        product: any;
        quantity: number;
        line_total: string;
    }>;
    subtotal: string;
    cartCount: number;
};

const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Cart({ profile, items, subtotal, cartCount }: CartProps) {
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            return;
        }

        router.patch(route('cart.update', [profile.site_slug, productId]), { quantity }, { preserveScroll: true });
    };

    const removeItem = (productId: number) => {
        router.delete(route('cart.remove', [profile.site_slug, productId]), { preserveScroll: true });
    };

    const clearCart = () => {
        router.delete(route('cart.clear', profile.site_slug), { preserveScroll: true });
    };

    return (
        <>
            <Head title={`Cart - ${profile.site_name}`} />

            <div style={{ minHeight: '100vh', padding: '24px', background: '#f6f8fb' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <Card bordered={false} style={{ marginBottom: 20 }}>
                        <Space direction="vertical" size={10} style={{ width: '100%' }}>
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                Cart for {profile.site_name}
                            </Typography.Title>
                            <Typography.Text type="secondary">
                                {cartCount} item{cartCount === 1 ? '' : 's'} in cart
                            </Typography.Text>
                            <Space wrap>
                                <Link href={route('creator.show', profile.site_slug)}>
                                    <Button>Continue shopping</Button>
                                </Link>
                                {items.length > 0 && (
                                    <Button danger onClick={clearCart}>
                                        Clear cart
                                    </Button>
                                )}
                            </Space>
                        </Space>
                    </Card>

                    {items.length === 0 ? (
                        <Card bordered={false}>
                            <Empty description="Your cart is empty." />
                        </Card>
                    ) : (
                        <Space direction="vertical" size={14} style={{ width: '100%' }}>
                            {items.map((item) => (
                                <Card
                                    key={item.product.id}
                                    bordered={false}
                                    title={item.product.name}
                                    extra={
                                        <Typography.Text strong>
                                            {usd.format(Number(item.line_total))}
                                        </Typography.Text>
                                    }
                                >
                                    <Space direction="vertical" size={10} style={{ width: '100%' }}>
                                        <Typography.Text type="secondary">
                                            {item.product.description || 'No description provided.'}
                                        </Typography.Text>
                                        <Space wrap>
                                            <Button
                                                icon={<MinusOutlined />}
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            />
                                            <Typography.Text strong>{item.quantity}</Typography.Text>
                                            <Button
                                                icon={<PlusOutlined />}
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            />
                                            <Button
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeItem(item.product.id)}
                                            >
                                                Remove
                                            </Button>
                                        </Space>
                                    </Space>
                                </Card>
                            ))}

                            <Card bordered={false}>
                                <Space direction="vertical" size={6} style={{ width: '100%' }}>
                                    <Typography.Text type="secondary">Subtotal</Typography.Text>
                                    <Typography.Title level={2} style={{ margin: 0 }}>
                                        {usd.format(Number(subtotal))}
                                    </Typography.Title>
                                    <Typography.Text type="secondary">
                                        This demo includes cart management only. You can plug in checkout next.
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Space>
                    )}
                </div>
            </div>
        </>
    );
}
