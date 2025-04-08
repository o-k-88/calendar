import cx from "classnames";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  const {
    type = "button",
    className,
    underlineView,
    children,
    onClick,
    to,
    href,

    ...restProps
  } = props;

  let Component = href ? "a" : "button";

  return (
    <Component
      onClick={onClick}
      className={cx("button", className, { _outline: underlineView })}
      type={href ? undefined : type}
      to={to}
      href={href}
      {...restProps}
    >
      {children}
    </Component>
  );
};
// Button.defaultProps = {
// 	type: "button",
// 	onClick: () => { }
// }

Button.propTypes = {
  type: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  boxView: PropTypes.bool,
  underlineView: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
