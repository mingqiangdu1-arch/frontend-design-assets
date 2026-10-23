import * as React from 'react';
export type ButtonVariant='primary'|'secondary'|'ghost';
export type ButtonSize='sm'|'md'|'lg';
export type ButtonProps=React.ButtonHTMLAttributes<HTMLButtonElement>&{
  variant?:ButtonVariant; size?:ButtonSize; iconOnly?:boolean;
};
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(
  ({variant='secondary',size='md',iconOnly=false,className='',type='button',...rest},ref)=>
    <button ref={ref} type={type} className={['aw-button','aw-button--'+variant,'aw-button--'+size,iconOnly?'aw-button--icon':'',className].filter(Boolean).join(' ')} {...rest}/>
);
Button.displayName='Button';
