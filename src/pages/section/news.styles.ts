import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../../utils';


const page = css.resolve`
  * {
    flex: 1;
    background-color: ${styleHelpers.color('background_dark')};
  }
`;


const banner = css.resolve`
  * {
    /* margin-bottom: ${styleHelpers.spacing(1)}; */
  }
`;


export default buildStyleSheet({
  page,
  banner,
});