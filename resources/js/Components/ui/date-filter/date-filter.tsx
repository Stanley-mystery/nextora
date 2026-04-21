import { DatePicker, Dropdown, DropdownProps, Form, Space } from 'antd';
import { FC, useMemo, useState } from 'react';
import { Calendar } from 'react-feather';
import Button from '../button';
import dayjs from 'dayjs';
import FormItem from 'antd/es/form/FormItem';

enum DateRange {
  submittedFrom = 0,
  submittedTo,
}

interface DateFilterProps {
  onChange: (value: Record<string, string>) => void;
  disabled?: boolean;
  placeholder?: string;
}

const defaultDateRange = {
  submittedFrom: '',
  submittedTo: '',
};

const DateFilter: FC<DateFilterProps> = ({ onChange, disabled = false, placeholder = 'Date Filter' }) => {
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Record<string, string>>(defaultDateRange);

  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const isFilterApplied = useMemo(() => {
    return dateRange?.submittedFrom?.length;
  }, [dateRange]);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setIsDateFilterOpen(nextOpen);
    }
  };

  const handleDateChange = (_dates: dayjs.Dayjs[]) => {
    let range: Record<string, string> = {};
    const dates: dayjs.Dayjs[] = _dates;

    if (!dates) {
      handleClearFilter();
      return;
    }

    if (dates) {
      dates.forEach((item, key) => {
        range = { ...range, [DateRange[key]]: item.format('YYYY-MM-DD') };
      });

      setDateRange(range);
    }
  };

  const handleClearFilter = () => {
    setDateRange(defaultDateRange);
    onChange(defaultDateRange);
    form.setFieldsValue({ date: null });
  };

  const handleApplyFilter = () => {
    onChange(dateRange);
    setIsDateFilterOpen(false);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  const FilterActiveDot = () => (
    <span className="inline-block absolute -mt-2.5 -ml-1.5 h-1.5 w-1.5 rounded-full bg-amber-600"></span>
  );

  return (
    <Dropdown
      disabled={disabled}
      className="text-sm"
      menu={{
        items: [
          {
            key: '1',
            label: (
              <div className="py-2">
                <Form form={form}>
                  <FormItem name="date">
                    <RangePicker
                      className="py-3"
                      onChange={(dates) => handleDateChange(dates as dayjs.Dayjs[])}
                      disabledDate={disabledDate}
                    />
                  </FormItem>
                </Form>
                <div className="flex gap-4 mt-3">
                  <Button
                    className="w-full py-2.5 disabled:bg-white disabled:text-zinc-600"
                    onClick={handleClearFilter}
                    disabled={!isFilterApplied}
                  >
                    Clear Filter
                  </Button>
                  <Button
                    className="w-full py-2.5"
                    type="primary"
                    onClick={handleApplyFilter}
                    disabled={!isFilterApplied}
                  >
                    Apply Filter
                  </Button>
                </div>
              </div>
            ),
          },
        ],
      }}
      placement="bottomRight"
      trigger={['click']}
      onOpenChange={handleOpenChange}
      open={isDateFilterOpen}
    >
      <a
        href="#"
        className="border h-min py-[10.5px] pl-3 pr-3.5 rounded-lg inline-block whitespace-nowrap font-medium text-center"
        onClick={(e) => e.preventDefault()}
      >
        <Space>
          <Calendar size={14} className="text-custom-textBlack" /> {placeholder}{' '}
          {isFilterApplied ? <FilterActiveDot /> : ''}
        </Space>
      </a>
    </Dropdown>
  );
};

export default DateFilter;
