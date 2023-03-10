import * as flex from './styles';
import { Div, DivProps } from './Div';

type FlexProps = DivProps & {
  direction?: keyof typeof flex.flex;
};

export const Flex = ({ direction, css, ...rest }: FlexProps) => (
  <Div
    css={{
      ...flex.flex[direction ?? 'row'],
      ...(css ?? {}),
    }}
    {...rest}
  />
);
