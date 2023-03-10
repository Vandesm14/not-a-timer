import { css } from '@emotion/css';
import { StyledComponent } from './types';

export type DivProps = StyledComponent<HTMLDivElement>;
export default function Div({ css: styles, ...rest }: DivProps) {
  return <div className={css(styles)} {...rest} />;
}
