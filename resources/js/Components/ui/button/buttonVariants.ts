import { cva } from 'class-variance-authority';

const buttonVariants = cva('px-3 py-1 leading-1 h-auto shadow-none font-medium', {
  variants: {
    size: {
      default: 'text-[0.9rem] py-2.5',
      sm: 'text-sm',
      lg: 'text-lg py-1',
    },
    type: {
      primary: 'bg-blue-600 text-white hover:bg-red-800',
      text: 'text-blue-600 bg-transparent hover:underline',
      link: 'text-blue-500 hover:text-blue-600',
      outlined: 'border border-blue-600 text-blue-600',
      dashed: 'border border-dashed text-blue-600',
      solid: 'bg-blue-700 text-white',
      filled: 'bg-blue-100 text-blue-700',
    },
  },
  defaultVariants: {
    size: 'default',
    type: 'primary',
  },
});

export { buttonVariants };
