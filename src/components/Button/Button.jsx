import cx from "classnames";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  const {
    type = "button",
    classNames,
    underlineView,
    children,
    onClick,
    to,
    href,
    imgSource,
    ...restProps
  } = props;

  let Component = href ? "a" : "button";

  return (
    <Component
      onClick={onClick}
      className={cx("button", classNames, { _outline: underlineView })}
      type={href ? undefined : type}
      to={to}
      href={href}
      {...restProps}
    >
      {imgSource && <img className="button-img" src={imgSource} alt="Button icon" />}
      <p className="button-children">{children}</p>
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
  classNames: PropTypes.string,
  boxView: PropTypes.bool,
  underlineView: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
