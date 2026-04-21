import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import styles from './info-table.module.scss';

const InfoTable: React.FC<DescriptionsProps> = ({ items, className, ...props }) => (
  <Descriptions
    size="small"
    className={`${styles.table} ${className}`}
    column={{ xs: 8, sm: 16, md: 24 }}
    bordered
    items={items}
    {...props}
  />
);

export default InfoTable;
