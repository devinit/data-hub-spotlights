import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CountryContext, LocationContext, toCamelCase } from '../../utils';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { FormFieldRadio, FormFieldRadioGroup } from '../FormFieldRadio';
import { Loading } from '../Loading';
import { SocialLink } from '../SocialLink';
import { getShortUrl } from './utils';

interface SpotlightShareProps {
  buttonCaption?: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = ({ buttonCaption }) => {
  const location = useContext(LocationContext);
  const { countryName } = useContext(CountryContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [radioValue, setRadioValue] = useState('default');
  useEffect(() => {
    if (modalOpen) {
      setUrl('');
      getShortUrl(radioValue === 'default')
        .then((url) => setUrl(url.link))
        .catch((error) => {
          console.log('Error while generating short URL: ', error.message);
          setUrl('Error');
        });
    }
  }, [radioValue]);

  const toggleModalOpen = (): void => {
    setUrl('');
    if (!modalOpen) {
      getShortUrl(radioValue === 'default')
        .then((url) => setUrl(url.link))
        .catch((error) => {
          console.log('Error while generating short URL: ', error.message);
          setUrl('Error');
        });
    }
    setModalOpen(!modalOpen);
  };
  const onSelectOption = (value: string): void => {
    setRadioValue(value);
  };

  return (
    <>
      <Button onClick={toggleModalOpen}>{buttonCaption}</Button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={toggleModalOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className="modal__content modal__content--minor"
        overlayClassName="modal modal--share modal--share-open"
        style={{ content: { outline: 'none' } }}
      >
        <Loading active={!url}>
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
                    toCamelCase(location ? location.name : countryName) +
                    '&body=Development Initiatives:' +
                    toCamelCase(location ? location.name : countryName) +
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
        </Loading>
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
  buttonCaption: 'Share this visualisation',
};

export { SpotlightShare };
