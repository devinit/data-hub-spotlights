import React, { useEffect, useRef, useState } from 'react';

// Hook that alerts clicks outside of the passed ref
function useOutsideAlerter(ref: any, callback: VoidFunction) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: Event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

const Menu = () => {
  const [ triggerClass, setTriggerClass ] = useState();
  const [ menuContainerClass, setMenuContainerClass ] = useState();

  function handleTrigger() {
    setTriggerClass('inactive');
    setMenuContainerClass('inactive');
  }

  function handleDocumentClick() {
    if (triggerClass) {
      setTriggerClass('inactive');
      setMenuContainerClass('inactive');
    }
  }

  function handleItemClick(e: any) {

  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleDocumentClick);

  return (
    <div
      ref={ wrapperRef }
      id={
        menuContainerClass ? 'js-countries-menu-container ' + menuContainerClass :
          'js-countries-menu-container'
      }
    >
      <nav
        className={
          triggerClass ? 'countries-menu-list js-countries-menu-trigger ' + triggerClass :
            'countries-menu-list js-countries-menu-trigger'
        }
        onClick={ handleTrigger }
      >
        <a className="countries-menu-list__item countries-menu-list__parent" href="#"><span>Uganda</span></a>
      </nav>
      <nav className="countries-menu-list animated inactive" id="js-countries-menu">
        <a
          className="countries-menu-list__item countries-menu-list__parent countries-menu-list__item--open js-countries-menu-trigger"
          href="#"
        > Uganda
        </a>
        <a
          href="#profile"
          className="countries-menu__profile countries-menu__link js-profile-item"
          aria-hidden="true"
          title="View Uganda"
        >
          View
        </a>
        <ul className="countries-menu-list__content" id="js-profile-nav">
          <li className="countries-menu-list--has-children js-profile-region-item">
            <a
              href="#"
              className="countries-menu-list__item countries-menu-list__item--parent-first js-menu-item js-search-item active "
              data-has-children="1"
              aria-label="View Central Uganda"
              onClick={ handleItemClick }
            >
              Central Uganda
            </a>
            <a
              href="#profile"
              className="countries-menu__profile countries-menu__link js-profile-item"
              aria-hidden="true"
              title="View Central Uganda"
            >
              View
            </a>
            <ul className="js-profile-subregion-list">

              <li className="countries-menu-list--has-children js-profile-subregion-item">
                <a
                  href="#"
                  className="countries-menu-list__item countries-menu-list__item--parent-second js-menu-item js-search-item"
                  data-has-children="1"
                  aria-label="View Buikwe"
                  onClick={ handleItemClick }
                >
                  Buikwe
                </a>
                <a
                  href="#profile"
                  className="countries-menu__profile countries-menu__link js-profile-item"
                  aria-hidden="true"
                  title="View Buikwe"
                >
                  View
                </a>
                <ul className="js-profile-country-list">

                  <li className="countries-menu-list__countries js-profile-country-item">
                    <a
                      href="#"
                      className="countries-menu-list__item countries-menu-list__item--parent-third js-menu-item js-search-item"
                      data-has-children="1"
                      title="View County A"
                      onClick={ handleItemClick }
                    >
                      County A
                    </a>
                    <a
                      href="#profile"
                      aria-hidden="true"
                      className="countries-menu__profile countries-menu__link js-profile-item"
                      title="View County A"
                    >
                      View
                    </a>
                    <ul className="js-profile-country-list">

                      <li className="countries-menu-list__countries js-profile-country-item">
                        <a
                          href="#"
                          className="countries-menu-list__item countries-menu-list__item--parent-fourth js-menu-item js-search-item"
                          data-has-children="1"
                          title="View Sub County A"
                          onClick={ handleItemClick }
                        >
                          Sub County A
                        </a>
                        <a
                          href="#profile"
                          aria-hidden="true"
                          className="countries-menu__profile countries-menu__link js-profile-item"
                          title="View Sub County A"
                        >
                          View
                        </a>
                        <ul className="js-profile-country-list">

                          <li className="countries-menu-list__countries js-profile-country-item">
                            <a
                              href="#"
                              className="countries-menu-list__item countries-menu-list__item--parent-fifth js-menu-item js-search-item"
                              data-has-children="1"
                              title="View Parish A"
                              onClick={ handleItemClick }
                            >
                              Parish A
                            </a>
                            <a
                              href="#profile"
                              aria-hidden="true"
                              className="countries-menu__profile countries-menu__link js-profile-item"
                              title="View Parish A"
                            >
                              View
                            </a>
                            <ul className="js-profile-country-list">

                              <li className="countries-menu-list__countries js-profile-country-item">
                                <a
                                  href="#"
                                  className="countries-menu-list__item countries-menu-list__item--parent-sixth js-search-item"
                                  title="View Village A"
                                >
                                  Village A
                                </a>
                                <a
                                  href="#profile"
                                  aria-hidden="true"
                                  className="countries-menu__profile countries-menu__link js-profile-item"
                                  title="View Village A"
                                >
                                  View
                                </a>
                              </li>

                              <li className="countries-menu-list__countries js-profile-country-item">
                                <a
                                  href="#"
                                  className="countries-menu-list__item countries-menu-list__item--parent-sixth js-search-item"
                                  title="View Village B"
                                >
                                  Village B
                                </a>
                                <a
                                  href="#profile"
                                  aria-hidden="true"
                                  className="countries-menu__profile countries-menu__link js-profile-item"
                                  title="View Village B"
                                >
                                  View
                                </a>
                              </li>

                              <li className="countries-menu-list__countries js-profile-country-item">
                                <a
                                  href="#"
                                  className="countries-menu-list__item countries-menu-list__item--parent-sixth js-search-item"
                                  title="View Village C"
                                >
                                  Village C
                                </a>
                                <a
                                  href="#profile"
                                  aria-hidden="true"
                                  className="countries-menu__profile countries-menu__link js-profile-item"
                                  title="View Village C"
                                >
                                  View
                                </a>
                              </li>

                              <li className="countries-menu-list__countries js-profile-country-item">
                                <a
                                  href="#"
                                  className="countries-menu-list__item countries-menu-list__item--parent-sixth js-search-item"
                                  title="View Village D"
                                >
                                  Village D
                                </a>
                                <a
                                  href="#profile"
                                  aria-hidden="true"
                                  className="countries-menu__profile countries-menu__link js-profile-item"
                                  title="View Village D"
                                >
                                  View
                                </a>
                              </li>

                            </ul>
                          </li>
                        </ul>

                      </li>

                    </ul>

                  </li>
                </ul>

              </li>

            </ul>

          </li>

        </ul>

      </nav>

    </div>

  );
};

Menu.defaultProps = {
  width: '100%',
  height: '600px',
  zoom: 7
};

export { Menu };
