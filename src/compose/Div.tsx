import { css } from '@emotion/css';
import { StyledComponent } from './types';

export type DivProps = StyledComponent<HTMLDivElement>;
export const Div = ({ css: styles, ...rest }: DivProps) => (
  <div className={css(styles)} {...rest} />
);
