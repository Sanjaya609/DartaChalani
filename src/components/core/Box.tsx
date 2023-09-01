import React from "react";

interface Props {
  component?:
  | "div"
  | "span"
  | "aside"
  | "main"
  | "header"
  | "section"
  | "footer"
  | "ul"
  | "li";
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const Box = ({
  children,
  className,
  component: Component = "div",
}: Props): React.ReactElement => {
  return <Component className={className}>{children}</Component>;

  // switch (component) {
  //   case 'main':
  // return <main className={className}>{children}</main>;
  //   case 'aside':
  //     return <aside className={className}>{children}</aside>;
  //   case 'header':
  //     return <header className={className}>{children}</header>;
  //   case 'footer':
  //     return <footer className={className}>{children}</footer>;
  //   case 'section':
  //     return <section className={className}>{children}</section>;
  //   case 'span':
  //     return <span className={className}>{children}</span>;
  //   case 'ul':
  //     return <ul className={className}>{children}</ul>;
  //   case 'li':
  //     return <li className={className}>{children}</li>;
  //   default:
  //     return <div className={className}>{children}</div>;
  // }
};

export default Box;
