import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconExclamationMark.module.css';

const IconExclamationMark = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);
    return (
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="#43B5A5" 
      viewBox="0 0 40 40" 
      height="40"
      width="40"
      stroke="#FFFFFF" 
      className={classes}
      >
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
      </svg>
    );
};

IconExclamationMark.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconExclamationMark.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconExclamationMark;
