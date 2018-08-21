import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

class Modal extends Component {

  handlerClose = (event) => {
    const isModal = event.target.classList.contains('modal')
    if (isModal) {
      this.props.onClose()
    }
  }

  render() {
    const {
      children,
      isAberto
    } = this.props
    return (
      <div className={`modal ${isAberto && 'modal--isAtivo'}`} onClick={this.handlerClose}>
        <div className="modal_wrap">
          {isAberto && children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  isAberto: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

Modal.defaultProps ={
  onClose: () => {}
}

export default Modal