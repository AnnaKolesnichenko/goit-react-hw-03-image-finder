import css from './button.module.css';

const Button = ({onPageUpload}) => {
    return (
        <div>
            <button type="button" className={css.load_btn} onClick={onPageUpload}>Load more</button>
        </div>
    )
}

export default Button;