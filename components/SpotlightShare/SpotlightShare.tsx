import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { SpotlightLocation, toCamelCase } from '../../utils';
import { AnchorButton } from '../AnchorButton';
import { SocialLink } from '../SocialLink';
import { getShortUrl } from './utils';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { FormFieldRadio, FormFieldRadioGroup } from '../FormFieldRadio';

interface SpotlightShareProps {
  buttonCaption?: string;
  location?: SpotlightLocation;
  countryName: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = ({ buttonCaption, ...props }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [radioValue, setRadioValue] = useState('default');
  const toggleModalOpen = (): void => {
    if (!modalOpen) {
      getShortUrl()
        .then(url => setUrl(url.link))
        .catch(error => console.log('Error while generating short URL: ', error.message));
    }
    setModalOpen(!modalOpen);
  };
  const onSelectOption = (value: string): void => {
    setRadioValue(value);
  };

  return (
    <>
      <AnchorButton onClick={toggleModalOpen}>{buttonCaption}</AnchorButton>
      <Modal
        isOpen={modalOpen}
        onRequestClose={toggleModalOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className="modal__content modal__content--minor"
        overlayClassName="modal modal--share modal--share-open"
        style={{ content: { outline: 'none' } }}
      >
        <h2 className="modal__heading">Share this visualisation</h2>
        <form className="form">
          <FormField className="">
            <div className="form-label form-label--hidden">Share</div>
            <FormFieldRadio>
              <FormFieldRadioGroup
                label="In default view"
                value="default"
                name="default"
                checked={radioValue === 'default'}
                onClick={onSelectOption}
              />
              <FormFieldRadioGroup
                label="As I configured it"
                value="asConfigured"
                name="asConfigured"
                checked={radioValue === 'asConfigured'}
                onClick={onSelectOption}
              />
            </FormFieldRadio>
          </FormField>

          <FormField className="">
            <div className="form-label form-label--hidden">url</div>
            <input className="form-item" type="text" id="urllink" name="urllink" value={url} />
          </FormField>

          <ul className="footer__social">
            <li>
              <SocialLink socialSource="twitter" url={'https://twitter.com/intent/tweet?text=' + url} />
            </li>
            <li>
              <SocialLink socialSource="facebook" url={'https://facebook.com/share.php?u=' + url} />
            </li>
            <li>
              <SocialLink
                socialSource="email"
                url={
                  'mailto:?subject=Development Initiatives: ' +
                  toCamelCase(props.location ? props.location.name : props.countryName) +
                  '&body=Development Initiatives:' +
                  toCamelCase(props.location ? props.location.name : props.countryName) +
                  '%0A%0A' +
                  url
                }
              />
            </li>
          </ul>
        </form>
        <Button className="modal-button-close" onClick={toggleModalOpen}>
          ×
        </Button>
      </Modal>
      <style jsx>{`
        input[type='radio'] {
          margin-right: 1em !important;
        }
      `}</style>
    </>
  );
};

SpotlightShare.defaultProps = {
  buttonCaption: 'Share this visualisation'
};

export { SpotlightShare };
