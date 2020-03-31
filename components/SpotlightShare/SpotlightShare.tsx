import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import { SocialLink } from '../SocialLink';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}
import { BitlyClient } from 'bitly';
const SpotlightShare: FunctionComponent<SpotlightShareProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const location = window.location.pathname.split('-')[1];
  const capitalizedLocation = location.charAt(0).toUpperCase() + location.substr(1).toLowerCase();
  const getUrl = async () => {
    const bitly = new BitlyClient(`${process.env.BITLY_API_KEY}`);
    const href = window.location.href;
    let shortUrl;
    if (href.indexOf('localhost') > -1) {
      const Url = href.replace('localhost', '127.0.0.1');
      shortUrl = await bitly.shorten(Url);
      return shortUrl;
    } else {
      shortUrl = await bitly.shorten(href);
      return shortUrl;
    }
  };
  getUrl()
    .then(url => setUrl(url.link))
    .catch(error => console.log(error));
  return (
    <div>
      <Button onClick={toggleModal}>Share visualisation</Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className="modal__content modal__content--minor"
        overlayClassName="modal modal--share modal--share-open"
      >
        <form className="form">
          <h2 className="modal__heading">Share this visualisation</h2>
          <br />
          <label htmlFor="one" className="form-label">
            <input type="radio" id="one" name="first_item" value="1" className="form-field__radio-buttons form-radio" />
            In default view
          </label>
          <label htmlFor="two" className="form-label">
            <input
              type="radio"
              id="two"
              name="second_item"
              value="2"
              className="form-field__radio-buttons form-radio"
            />
            As I configured it
          </label>
          <br />
          <input className="form-item" type="text" id="urllink" name="urllink" value={url} />
          <br />
          <br />
          <SocialLink socialSource="twitter" url={'https://twitter.com/intent/tweet?text=' + url} />
          <SocialLink socialSource="facebook" url={'https://facebook.com/share.php?u=' + url} />
          <SocialLink
            socialSource="email"
            url={
              'mailto:?subject=Development Initiatives: ' +
              capitalizedLocation +
              '&body=Development Initiatives:' +
              capitalizedLocation +
              '%0A%0A' +
              url
            }
          />
        </form>
        <button className="modal-button-close js-modal-trigger" onClick={toggleModal}>
          x
        </button>
      </Modal>
      <style jsx>{`
        input[type='radio'] {
          margin-right: 1em !important;
        }
      `}</style>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
