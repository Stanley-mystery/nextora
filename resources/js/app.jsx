import '../css/app.css';
import 'antd/dist/reset.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { App as AntdApp, ConfigProvider } from 'antd';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1677ff',
                        borderRadius: 10,
                    },
                }}
            >
                <AntdApp>
                    <App {...props} />
                </AntdApp>
            </ConfigProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
