import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';
import { Heading } from '../../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build ActivityFeed section
const CustomerRegistrationMaybe = props => {
  const { className, rootClassName, isProvider, protectedData, showCustomerRegistration } = props;
  const classes = classNames(rootClassName || css.bookingCustomerRegistrationContainer, className);

  if (showCustomerRegistration && isProvider) {
    const customerRegistration = protectedData?.customerRegistration || {};
    return (
      <div className={classes}>
        <Heading as="h3" rootClassName={css.sectionHeading}>
          <FormattedMessage id="TransactionPanel.bookingCustomerRegistrationHeading" />
        </Heading>
        <div className={css.bookingLocationContent}>
          {customerRegistration}
        </div>
      </div>
    );
  }
  return null;
};

export default CustomerRegistrationMaybe;
