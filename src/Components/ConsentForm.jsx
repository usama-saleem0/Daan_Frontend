import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const ConsentForm = ({onConsent }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    // useEffect(() => {
    //     const hasConsented = localStorage.getItem("hasConsented");
    //     if (hasConsented) {
    //         setIsModalVisible(false); // If user already consented, don't show the modal
    //     }
    // }, []);

    const handleConsentChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = () => {
        if (isChecked) {
            // localStorage.setItem("hasConsented", "true");
            onConsent();
            setIsModalVisible(true); // Close the modal once consent is given
        }
    };

    const importantPoints = [
        "Print As Is: Your book will be printed exactly as it appears in your preview. This includes all text, images, formatting, and overall layout.",
        "Emoji and Icon Restriction: Please note that emojis and other icons are not supported in our printing process. If included, these will be represented as 'XX' characters in the final print. Carefully review your preview to ensure no emojis or unsuitable icons are present.",
        "Correct Image Orientation: Ensure that all images uploaded are correctly oriented. It's your responsibility to verify that no pictures are reversed. If you find any images incorrectly displayed, adjust their orientation and re-upload them.",
        "No Post-Submission Edits: After your book is submitted for printing, we cannot make any changes or edits. Ensure that you have thoroughly reviewed and are completely satisfied with your content.",
        "Review for Errors: We strongly recommend a final review of your book for typographical errors, grammatical mistakes, image quality issues, or any other potential problems. We will not be responsible for such errors in the printed book.",
        "Final Approval: By providing your shipping address, you are affirming that you have reviewed your book in its entirety and approve it for printing as is.",
        "No Cancellation After Print Review Submission: Once you submit your print, the printing process will begin, and the submission cannot be canceled."
    ];
    console.log(isModalVisible,"isModalVisible");
    
    return (
        <>
            <Modal
                show={isModalVisible}
                onHide={() => setIsModalVisible(false)}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* <Modal.Header closeButton className="w-100"> */}
                <Modal.Header className="w-100">
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100" style={{
                        fontFamily: "'Solway', serif",
                    }}>
                        Consent Form!
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="customize-container">
                        <h4 className="modal-title">Final Check Before Printing, Please Read Carefully:</h4>
                        <h6 className="modal-subtitle">
                            Before you proceed to share your shipping address, we need to make sure you are fully aware of the following important points:
                        </h6>

                        <ul className="modal-description">
                            {importantPoints.map((point, index) => {
                                const [heading, ...rest] = point.split(':');
                                return (
                                    <li key={index} style={{ marginBottom: "10px" }}>
                                        <strong>{heading}:</strong>{rest.join(':')}
                                    </li>
                                );
                            })}
                        </ul>


                        <p>Please check the box below to acknowledge that you have read, understood, and agree to these terms.</p>

                        <div className="form-group">
                            <Form.Check
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleConsentChange}
                                label="I agree to the terms and conditions"
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className="w-100 justify-content-between">
                    <Button
                        style={{
                            background: '#ebbb5b',
                            border: 'none',
                            width: '20%'
                        }}
                        onClick={handleSubmit}
                        disabled={!isChecked} // Disable button if not checked
                    >
                        Save
                    </Button>
                    {/* <Button variant="outline-secondary" onClick={() => setIsModalVisible(false)}>
                        Close
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConsentForm;
