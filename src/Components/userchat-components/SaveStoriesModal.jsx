import React from 'react'
import Lottie from 'lottie-react'
import { Modal, Button } from 'react-bootstrap';

const SaveStoriesModal = ({modalcustom, setModalcustom, saveAnimation, saveStories, Navigate_to_Stoires, handleSubmit, Loader}) => {
  return (
    <Modal
        show={modalcustom}
        onHide={() => setModalcustom(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="w-100">
          <Modal.Title id="contained-modal-title-vcenter" className="w-100" style={{
            fontFamily: "'Solway', serif",
          }}>
            Craft Your Story in Style!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customize-container">
            <h4 className="modal-title">Turn Moments into Memories!</h4>
            <p className="modal-subtitle">Customize your stories with your own text and images to make them truly yours.</p>




            <div className="form-group">

              <div className="upload-box">
                <div className="upload-content">
                  <Lottie
                    animationData={saveAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: 200, height: 200 }}
                  />
                </div>
              </div>

              {/* Move the button OUTSIDE the "upload-content" div */}
              <div className="upload-button-container">
              {saveStories &&
                <Button className="browse-button btn btn-warning vcenter " onClick={Navigate_to_Stoires}>
                  View Your Saved Stories Here!
                </Button>
                }
              </div>
            </div>

          </div>
        </Modal.Body>


        <Modal.Footer className="w-100 justify-content-between">
          <Button style={{
            background: '#ebbb5b',
            border: 'none',
            width: '20%'
          }}
            onClick={handleSubmit}
            disabled={Loader}
          >  
          {Loader ? 'Loading' : 'Save'}</Button>
          <Button variant="outline-secondary" onClick={() => setModalcustom(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default SaveStoriesModal