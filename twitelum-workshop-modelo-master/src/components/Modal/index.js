import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

class Modal extends Component {
  render() {
    const {
      children,
      isAberto,
      onClose
    } = this.props
    return (
      <div className={`modal ${isAberto && 'modal--isAtivo'}`} onClick={onClose}>
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