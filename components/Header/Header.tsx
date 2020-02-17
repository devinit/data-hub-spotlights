import React, { FunctionComponent } from 'react';
import { Navigation } from '../DefaultLayout';
import { PrimaryNavigation } from '../PrimaryNavigation';

interface HeaderProps {
  navigation?: Navigation;
}

const Header: FunctionComponent<HeaderProps> = ({ navigation }) => {
  return (
    <header role="banner" className="header">
      <div className="row">
        <a href="/" className="branding">
          Development Initiatives
        </a>
        {navigation ? <PrimaryNavigation items={navigation.primary} /> : null}
      </div>
    </header>
  );
};

export default Header;
