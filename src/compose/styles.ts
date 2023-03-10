import { CSSObject } from '@emotion/css';

const flex = {
  row: { display: 'flex', flexDirection: 'row' } as CSSObject,
  col: { display: 'flex', flexDirection: 'column' } as CSSObject,
};

const justify = {
  start: { justifyContent: 'flex-start' } as CSSObject,
  end: { justifyContent: 'flex-end' } as CSSObject,
  center: { justifyContent: 'center' } as CSSObject,
  between: { justifyContent: 'space-between' } as CSSObject,
  around: { justifyContent: 'space-around' } as CSSObject,
};

const align = {
  start: { alignItems: 'flex-start' } as CSSObject,
  end: { alignItems: 'flex-end' } as CSSObject,
  center: { alignItems: 'center' } as CSSObject,
  stretch: { alignItems: 'stretch' } as CSSObject,
};

export { flex, justify, align };
