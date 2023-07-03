import ErrorImg from './error_img.jpg';

const ErrorMessage = () => {
    return (
        <img src={ErrorImg} alt="error_image" style={{width: 200, height: 200, margin: 'auto'}}/>
    )
}

export default ErrorMessage;