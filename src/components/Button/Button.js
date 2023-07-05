import css from './button.module.css';
import PropTypes from "prop-types";

const Button = ({onPageUpload}) => {
    return (
        <div>
            <button type="button" className={css.load_btn} onClick={onPageUpload}>Load more</button>
        </div>
    )
}

Button.propTypes = {
    onPageUpload: PropTypes.func.isRequired
}

export default Button;