import { CSSObject } from '@emotion/css';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

export type StyledComponent<T> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  css?: CSSObject;
  children?: React.ReactNode;
};
