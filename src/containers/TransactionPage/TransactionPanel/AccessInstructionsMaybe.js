import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';
import { Heading } from '../../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build ActivityFeed section
const AccessInstructionsMaybe = props => {
  const { className, rootClassName, isCustomer, protectedData, showAccessInstructions } = props;
  const classes = classNames(rootClassName || css.bookingAccessInstructionsContainer, className);

  if (showAccessInstructions && isCustomer) {
    const accessInstructions = protectedData?.accessInstructions || {};
    return (
      <div className={classes}>
        <Heading as="h3" rootClassName={css.sectionHeading}>
          <FormattedMessage id="TransactionPanel.bookingAccessInstructionsHeading" />
        </Heading>
        <div className={css.bookingLocationContent}>
          {accessInstructions}
        </div>
      </div>
    );
  }
  return null;
};

export default AccessInstructionsMaybe;
