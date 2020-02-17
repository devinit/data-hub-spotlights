import React, { FunctionComponent } from 'react';
import { Footer as FooterData, NavigationItem } from '../DefaultLayout';
import { Newsletter } from './Newsletter';
import { FooterSection } from './FooterSection';

type FooterProps = Partial<FooterData> & { primaryNavigation: NavigationItem[] };

const Footer: FunctionComponent<FooterProps> = props => {
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <footer role="contentinfo" className="footer">
      <div className="row">
        <div className="l-footer">
          <div className="l-footer__col">
            {props.newsletters
              ? props.newsletters.map(letter => <Newsletter key={letter.caption} {...letter} />)
              : null}
          </div>
          {props.sections &&
            props.sections.map((section, index) => (
              <FooterSection key={index} {...section} primaryNavigation={props.primaryNavigation} />
            ))}
        </div>
        <div className="footer__meta">
          <div
            className="footer__meta-copy footer__meta-copy--major"
            dangerouslySetInnerHTML={createMarkup(props.footer_text_major || '')}
          />
          <div className="footer__meta-copy" dangerouslySetInnerHTML={createMarkup(props.footer_text || '')} />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
