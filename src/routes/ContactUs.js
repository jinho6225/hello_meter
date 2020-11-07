import React from "react";

function ContactUs() {
  return (
    <div className="container d-flex flex-column">
      <div className="content ">
      <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="col sqs-col-6 span-6">
              <div
                className="sqs-block html-block sqs-block-html"
                data-block-type="2"
                id="block-1dee6f5f0c3e49de8a70"
              >
                <div className="sqs-block-content">
                  <h2 >Contact us.</h2>
                </div>
              </div>
            </div>
            <div className="col sqs-col-0 span-0"></div>
            <div className="col sqs-col-6 span-6">
              <div
                className="sqs-block form-block sqs-block-form"
                data-block-type="9"
                id="block-8abee1bb227e41ad8b91"
              >
                <div className="sqs-block-content">
                  <div className="form-wrapper">
                    <div className="form-inner-wrapper">
                      <form
                        data-form-id="5f330ddd251e7f12c886c0a2"
                        data-success-redirect=""
                        autocomplete="on"
                        method="POST"
                      >
                        <div className="d-flex flex-column">
                          <div
                            id="email-yui_3_17_2_1_1553888888520_3745"
                            className="form-item field email required"
                          >
                            <label
                              className="title"
                              for="email-yui_3_17_2_1_1553888888520_3745-field"
                            >
                              Email
                              <span className="required" aria-hidden="true">
                                *
                              </span>
                            </label>
                            <input
                              className="field-element"
                              id="email-yui_3_17_2_1_1553888888520_3745-field"
                              name="email"
                              type="email"
                              autocomplete="email"
                              spellcheck="false"
                              aria-required="true"
                            />
                          </div>
                          <div
                            id="textarea-yui_3_17_2_1_1553888888520_3747"
                            className="form-item field textarea required"
                          >
                            <label
                              className="title"
                              for="textarea-yui_3_17_2_1_1553888888520_3747-field"
                            >
                              Message
                              <span className="required" aria-hidden="true">
                                *
                              </span>
                            </label>
                            <textarea
                              className="field-element "
                              id="textarea-yui_3_17_2_1_1553888888520_3747-field"
                              aria-required="true"
                            ></textarea>
                          </div>
                        </div>
                        <div
                          data-animation-role="button"
                          className="
          form-button-wrapper
          
            form-button-wrapper--align-left
          
        "
                        >
                          <input
                            className="button sqs-system-button sqs-editable-button"
                            type="submit"
                            value="Send"
                          />
                        </div>
                        <div className="hidden form-submission-text">
                          Thank you!
                        </div>
                        <div
                          className="hidden form-submission-html"
                          data-submission-html=""
                        ></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ContactUs;
