import css from './modal.module.css'
import PropTypes from 'prop-types';
import { Component } from 'react';

class Modal extends Component {

    onKeyDown = (e) => {
        if (e.keyCode === 'Escape' || e.currentTarget === e.target) {
          return this.props.onModalClose();
        }
      };

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
    };
    
      componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    };
    
    
    render() {
        const {largeImageURL} = this.props;
        return (
            <div className={css.overlay} onClick={this.onKeyDown}>            
                <div className={css.modal}>
                    <img src={largeImageURL} alt='' />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.any.isRequired,
    onModalClose: PropTypes.func.isRequired
}

export default Modal;