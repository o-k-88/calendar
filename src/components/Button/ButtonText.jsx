import cx from "classnames";
import PropTypes from "prop-types";
import "./ButtonText.scss";

const ButtonText = (props) => {
  const { type = "button", className, children, onClick, href, ...restProps } = props;

  let Component = href ? "a" : "button";

  return (
    <Component
      onClick={onClick}
      className={cx("button-text", className)}
      type={href ? undefined : type}
      href={href}
      {...restProps}
    >
      {children}
    </Component>
  );
};

ButtonText.propTypes = {
  type: PropTypes.string,

  href: PropTypes.string,
  className: PropTypes.string,
  boxView: PropTypes.bool,

  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default ButtonText;
