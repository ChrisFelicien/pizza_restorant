import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, handleClick }) => {
  const base =
    "bg-yellow-400 text-sm font-semibold text-stone-800  inline-block uppercase tracking-wide rounded-full hover:bg-yellow-300 transition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:bg-yellow-300 disabled:cursor-not-allowed";

  const style = {
    primary: base + " px-4 py-3 sm:px-6 sm:py-4 ",
    small: base + " py-2 px-4 md:px-5 md:py-2.5 text-xs",
    secondary:
      "border-2 text-sm border-stone-300 font-semibold text-stone-400  inline-block uppercase tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 focus:bg-stone-300 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-3.5",

    round: base + " py-1 px-2.5 md:px-3.5 md:py-2 text-sm"
  };

  if (to) {
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (handleClick) {
    return (
      <button
        disabled={disabled}
        to={to}
        className={style[type]}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} to={to} className={style[type]}>
      {children}
    </button>
  );
};

export default Button;
