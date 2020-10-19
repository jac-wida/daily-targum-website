import css from 'styled-jsx/css';
import { styleHelpers, buildStyleSheet } from '../utils';


const logoWrap = css.resolve`
  * {
    background-color: ${styleHelpers.color("primary_main")};
    padding: ${styleHelpers.spacing(2)};
    margin-bottom: 1px;
    display: flex;
    justify-content: center;
  }
`;


const logo = css.resolve`
  * {
    text-transform: uppercase;
    font-weight: 900;
    font-size: calc(32px + 2vw);
    color: ${styleHelpers.color("primary_contrastText")};
  }
`;


const logoAccent = css.resolve`
  * {
    color: ${styleHelpers.color("accent_main")};
    display: inline;
  }
`;


export default buildStyleSheet({
  logoWrap,
  logo,
  logoAccent
});