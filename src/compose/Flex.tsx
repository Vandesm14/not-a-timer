import * as flex from './styles';
import Div, { DivProps } from './Div';

type FlexProps = DivProps & {
  direction?: keyof typeof flex.flex;
};

export default function Flex({ direction, css, ...rest }: FlexProps) {
  return (
    <Div
      css={{
        ...flex.flex[direction ?? 'row'],
        ...(css ?? {}),
      }}
      {...rest}
    />
  );
}
