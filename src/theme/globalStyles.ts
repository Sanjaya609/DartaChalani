import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html,
body {
  font-weight: 400;
  font-size: .875rem;
  height: 100%;
  background-color:${(props) => props.theme.color.surface};
  color:${(props) => props.theme.color.onSurface};
  
}

a {
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: 0;

  color: inherit;
  &:visited {
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    outline: 0;

    // color: inherit;
  }
  &:hover {
    text-decoration: none;
    color: inherit;
  }
  &:focus {
    text-decoration: none;
    outline: 0;
    color: inherit;
  }
}





.container-fluid {
  padding: 0 4rem;

  @include media-breakpoint-up(xxl) {
   
    // max-width: 92.5rem;
    margin: auto;
  }
}

ul,ol{
  margin:0;
  padding:0;
}

`;

export default GlobalStyle;
