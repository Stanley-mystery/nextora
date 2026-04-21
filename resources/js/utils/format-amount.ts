type FormatStyle = 'abbreviated' | 'full' | 'normal';

const formatAmount = (
  value: number | string = 0,
  decimalPlaces: number = 0,
  currency: string = 'ngn',
  formatStyle: FormatStyle = 'normal'
): string => {
  if (typeof parseFloat(String(value)) === 'number') {
    value = parseFloat(String(value));
  }

  if (typeof value !== 'number' || isNaN(value)) {
    value = 0;
  }

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  };

  let formattedValue: string;
  let currencySymbol: string = '';

  if (currency) {
    const tempFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'narrowSymbol',
    });
    currencySymbol = tempFormatter.formatToParts(0).find((part) => part.type === 'currency')?.value || '';
  }

  switch (formatStyle) {
    case 'abbreviated':
      options.notation = 'compact';
      options.compactDisplay = 'short';
      if (currency) {
        options.style = 'currency';
        options.currency = currency;
        options.currencyDisplay = 'narrowSymbol';
      } else {
        options.style = 'decimal';
      }
      formattedValue = new Intl.NumberFormat('en-US', options).format(value);
      break;

    case 'full':
      options.notation = 'compact';
      options.compactDisplay = 'long';
      options.style = 'decimal';
      formattedValue = new Intl.NumberFormat('en-US', options).format(value);
      formattedValue = `${currencySymbol}${formattedValue}`;
      break;

    case 'normal':
      options.notation = 'standard';
      if (currency) {
        options.style = 'currency';
        options.currency = currency;
        options.currencyDisplay = 'narrowSymbol';
      } else {
        options.style = 'decimal';
      }
      formattedValue = new Intl.NumberFormat('en-US', options).format(value);
      break;
  }

  return formattedValue;
};

export default formatAmount;
