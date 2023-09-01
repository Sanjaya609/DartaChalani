import React, { ComponentProps, Ref } from 'react';

import './loading-theme.scss';

export type LoadingButtonProps = {
  forwardedRef?: Ref<any>;
  loading?: boolean;
  text?: string;
  icon?: string;
} & ComponentProps<'button'>;

export default function LoadingButton(props: LoadingButtonProps) {
  const { forwardedRef, disabled, loading, text, icon, onClick, children, ...args } = props;

  return (
    <button
      {...args}
      disabled={disabled}
      ref={forwardedRef}
      onClick={(e) => {
        if (!disabled) {
          onClick && onClick(e);
        }
      }}>
      {children ? (
        loading ? (
          <div className={loading ? 'loading' : ''}>
            <span>{children}</span>
            {loading && <span className="spinner"></span>}
          </div>
        ) : (
          children
        )
      ) : (
        <div className={loading ? 'loading' : ''}>
          <span>
            {icon && <i className={'mr-2 ' + icon}></i>}
            {text}
          </span>
          {loading && <span className="spinner"></span>}
        </div>
      )}
    </button>
  );
}
