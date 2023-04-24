import React from 'react'

function ToastMessage({toastMessage}) {
    
    return (
        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center w-100 " >
            <div id="toastMessage" className="toast text-bg-secondary"  role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
                <div className="toast-header">
                    <strong className="me-auto text-center"><i className="bi bi-info-square"></i> {toastMessage[0]}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {toastMessage[1]}
                </div>
            </div>
        </div>
    )
}

export default ToastMessage