import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    AppstoreOutlined,
    EditOutlined,
    EyeOutlined,
    PlusCircleOutlined,
    SaveOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Divider,
    Empty,
    Input,
    InputNumber,
    Row,
    Space,
    Switch,
    Tag,
    Typography,
} from 'antd';
import { FormEvent, useMemo, useState } from 'react';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

type DashboardProps = {
    profile: any;
    products: any[];
    publicUrl: string;
};

export default function Dashboard({ profile, products, publicUrl }: DashboardProps) {
    const [editingProductId, setEditingProductId] = useState<number | null>(null);

    const profileForm = useForm({
        site_name: profile.site_name ?? '',
        site_slug: profile.site_slug ?? '',
        headline: profile.headline ?? '',
        hero_title: profile.hero_title ?? '',
        hero_subtitle: profile.hero_subtitle ?? '',
        about: profile.about ?? '',
        portfolio_summary: profile.portfolio_summary ?? '',
        brand_color: profile.brand_color ?? '#1677ff',
        contact_email: profile.contact_email ?? '',
        contact_phone: profile.contact_phone ?? '',
    });

    const productForm = useForm({
        name: '',
        description: '',
        price: '',
        sort_order: 0,
        is_active: true,
        image: null as File | null,
        remove_image: false,
    });

    const productBeingEdited = useMemo(
        () => products.find((item) => item.id === editingProductId) ?? null,
        [products, editingProductId],
    );

    const resetProductForm = () => {
        setEditingProductId(null);
        productForm.reset();
        productForm.setData({
            name: '',
            description: '',
            price: '',
            sort_order: 0,
            is_active: true,
            image: null,
            remove_image: false,
        });
        productForm.clearErrors();
    };

    const submitProfile = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        profileForm.put(route('creator-profile.update'));
    };

    const submitProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingProductId) {
            productForm
                .transform((data) => ({
                    ...data,
                    _method: 'put',
                }))
                .post(route('products.update', editingProductId), {
                    forceFormData: true,
                    onSuccess: () => resetProductForm(),
                    onFinish: () => productForm.transform((data) => data),
                });
            return;
        }

        productForm
            .transform((data) => data)
            .post(route('products.store'), {
                forceFormData: true,
                onSuccess: () => resetProductForm(),
            });
    };

    const startEditProduct = (product: any) => {
        setEditingProductId(product.id);
        productForm.clearErrors();
        productForm.setData({
            name: product.name ?? '',
            description: product.description ?? '',
            price: String(product.price ?? ''),
            sort_order: product.sort_order ?? 0,
            is_active: Boolean(product.is_active),
            image: null,
            remove_image: false,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Card bordered={false}>
                    <Space direction="vertical" size={10}>
                        <Tag color="processing">Creator Builder</Tag>
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            Build your product website and portfolio with forms
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Update your public page details, upload products with photos, and share one link with your audience.
                        </Typography.Text>
                        <Space wrap>
                            <a href={publicUrl} target="_blank" rel="noreferrer">
                                <Button type="primary" icon={<EyeOutlined />}>
                                    Preview Public Site
                                </Button>
                            </a>
                            <Link href={publicUrl}>
                                <Button icon={<ShoppingCartOutlined />}>Open as Visitor</Button>
                            </Link>
                        </Space>
                    </Space>
                </Card>
            }
        >
            <Head title="Creator Dashboard" />

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={13}>
                    <Card
                        title={
                            <Space>
                                <AppstoreOutlined />
                                <span>Site Customization</span>
                            </Space>
                        }
                        bordered={false}
                    >
                        <form onSubmit={submitProfile}>
                            <Space direction="vertical" size={14} style={{ width: '100%' }}>
                                <div>
                                    <Typography.Text strong>Site name</Typography.Text>
                                    <Input
                                        value={profileForm.data.site_name}
                                        onChange={(event) => profileForm.setData('site_name', event.target.value)}
                                        placeholder="My Creator Shop"
                                    />
                                    {profileForm.errors.site_name && (
                                        <Typography.Text type="danger">{profileForm.errors.site_name}</Typography.Text>
                                    )}
                                </div>

                                <div>
                                    <Typography.Text strong>Site slug (your URL)</Typography.Text>
                                    <Input
                                        value={profileForm.data.site_slug}
                                        onChange={(event) => profileForm.setData('site_slug', event.target.value)}
                                        addonBefore="/creator/"
                                        placeholder="my-creator-shop"
                                    />
                                    {profileForm.errors.site_slug && (
                                        <Typography.Text type="danger">{profileForm.errors.site_slug}</Typography.Text>
                                    )}
                                </div>

                                <div>
                                    <Typography.Text strong>Headline</Typography.Text>
                                    <Input
                                        value={profileForm.data.headline}
                                        onChange={(event) => profileForm.setData('headline', event.target.value)}
                                        placeholder="Short one-line pitch"
                                    />
                                </div>

                                <div>
                                    <Typography.Text strong>Hero title</Typography.Text>
                                    <Input
                                        value={profileForm.data.hero_title}
                                        onChange={(event) => profileForm.setData('hero_title', event.target.value)}
                                        placeholder="Make your page instantly clear"
                                    />
                                </div>

                                <div>
                                    <Typography.Text strong>Hero subtitle</Typography.Text>
                                    <Input.TextArea
                                        value={profileForm.data.hero_subtitle}
                                        onChange={(event) => profileForm.setData('hero_subtitle', event.target.value)}
                                        rows={3}
                                        placeholder="Tell visitors what you sell and why they should care."
                                    />
                                </div>

                                <div>
                                    <Typography.Text strong>About section</Typography.Text>
                                    <Input.TextArea
                                        value={profileForm.data.about}
                                        onChange={(event) => profileForm.setData('about', event.target.value)}
                                        rows={4}
                                        placeholder="Your brand story"
                                    />
                                </div>

                                <div>
                                    <Typography.Text strong>Portfolio summary</Typography.Text>
                                    <Input.TextArea
                                        value={profileForm.data.portfolio_summary}
                                        onChange={(event) => profileForm.setData('portfolio_summary', event.target.value)}
                                        rows={4}
                                        placeholder="Highlight projects, achievements, and client impact."
                                    />
                                </div>

                                <Row gutter={12}>
                                    <Col xs={24} md={12}>
                                        <Typography.Text strong>Brand color</Typography.Text>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <input
                                                type="color"
                                                value={profileForm.data.brand_color}
                                                onChange={(event) => profileForm.setData('brand_color', event.target.value)}
                                                style={{
                                                    width: 54,
                                                    height: 38,
                                                    border: '1px solid #d9d9d9',
                                                    borderRadius: 8,
                                                    background: 'white',
                                                }}
                                            />
                                            <Input
                                                value={profileForm.data.brand_color}
                                                onChange={(event) => profileForm.setData('brand_color', event.target.value)}
                                            />
                                        </div>
                                        {profileForm.errors.brand_color && (
                                            <Typography.Text type="danger">{profileForm.errors.brand_color}</Typography.Text>
                                        )}
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Typography.Text strong>Contact email</Typography.Text>
                                        <Input
                                            type="email"
                                            value={profileForm.data.contact_email}
                                            onChange={(event) => profileForm.setData('contact_email', event.target.value)}
                                            placeholder="you@example.com"
                                        />
                                    </Col>
                                </Row>

                                <div>
                                    <Typography.Text strong>Contact phone</Typography.Text>
                                    <Input
                                        value={profileForm.data.contact_phone}
                                        onChange={(event) => profileForm.setData('contact_phone', event.target.value)}
                                        placeholder="+234..."
                                    />
                                </div>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={profileForm.processing}
                                >
                                    Save Site
                                </Button>
                            </Space>
                        </form>
                    </Card>
                </Col>

                <Col xs={24} lg={11}>
                    <Card
                        title={
                            <Space>
                                <PlusCircleOutlined />
                                <span>{editingProductId ? 'Edit Product' : 'Add Product'}</span>
                            </Space>
                        }
                        bordered={false}
                    >
                        <form onSubmit={submitProduct}>
                            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                <div>
                                    <Typography.Text strong>Product name</Typography.Text>
                                    <Input
                                        value={productForm.data.name}
                                        onChange={(event) => productForm.setData('name', event.target.value)}
                                        placeholder="Premium hoodie"
                                    />
                                    {productForm.errors.name && (
                                        <Typography.Text type="danger">{productForm.errors.name}</Typography.Text>
                                    )}
                                </div>

                                <div>
                                    <Typography.Text strong>Description</Typography.Text>
                                    <Input.TextArea
                                        rows={3}
                                        value={productForm.data.description}
                                        onChange={(event) => productForm.setData('description', event.target.value)}
                                        placeholder="Tell buyers what makes this product valuable."
                                    />
                                </div>

                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Typography.Text strong>Price (USD)</Typography.Text>
                                        <Input
                                            type="number"
                                            min={0}
                                            step="0.01"
                                            value={productForm.data.price}
                                            onChange={(event) => productForm.setData('price', event.target.value)}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text strong>Sort order</Typography.Text>
                                        <InputNumber
                                            min={0}
                                            style={{ width: '100%' }}
                                            value={productForm.data.sort_order}
                                            onChange={(value) => productForm.setData('sort_order', Number(value ?? 0))}
                                        />
                                    </Col>
                                </Row>

                                <div>
                                    <Typography.Text strong>Product photo</Typography.Text>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0] ?? null;
                                            productForm.setData('image', file);
                                        }}
                                    />
                                    {productForm.errors.image && (
                                        <Typography.Text type="danger">{productForm.errors.image}</Typography.Text>
                                    )}
                                </div>

                                <Space>
                                    <Switch
                                        checked={productForm.data.is_active}
                                        onChange={(checked) => productForm.setData('is_active', checked)}
                                    />
                                    <Typography.Text>Visible on public site</Typography.Text>
                                </Space>

                                {productBeingEdited?.image_url && (
                                    <Space>
                                        <Switch
                                            checked={productForm.data.remove_image}
                                            onChange={(checked) => productForm.setData('remove_image', checked)}
                                        />
                                        <Typography.Text>Remove current image</Typography.Text>
                                    </Space>
                                )}

                                <Space wrap>
                                    <Button type="primary" htmlType="submit" loading={productForm.processing}>
                                        {editingProductId ? 'Update Product' : 'Create Product'}
                                    </Button>
                                    {editingProductId && <Button onClick={resetProductForm}>Cancel Edit</Button>}
                                </Space>
                            </Space>
                        </form>
                    </Card>

                    <Divider />

                    <Card bordered={false} title={`Products (${products.length})`}>
                        {products.length === 0 ? (
                            <Empty description="No products yet. Add your first product above." />
                        ) : (
                            <Space direction="vertical" size={14} style={{ width: '100%' }}>
                                {products.map((product) => (
                                    <Card
                                        key={product.id}
                                        size="small"
                                        title={
                                            <Space>
                                                <span>{product.name}</span>
                                                {product.is_active ? (
                                                    <Tag color="green">Active</Tag>
                                                ) : (
                                                    <Tag color="default">Hidden</Tag>
                                                )}
                                            </Space>
                                        }
                                        extra={
                                            <Space>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    onClick={() => startEditProduct(product)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    danger
                                                    onClick={() =>
                                                        router.delete(route('products.destroy', product.id))
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Space>
                                        }
                                    >
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Typography.Text strong>
                                                {currencyFormatter.format(Number(product.price ?? 0))}
                                            </Typography.Text>
                                            <Typography.Text type="secondary">
                                                {product.description || 'No description yet.'}
                                            </Typography.Text>
                                            {product.image_url && (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        maxHeight: 180,
                                                        objectFit: 'cover',
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            )}
                                        </Space>
                                    </Card>
                                ))}
                            </Space>
                        )}
                    </Card>
                </Col>
            </Row>
        </AuthenticatedLayout>
    );
}
