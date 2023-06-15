import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import configs and util modules
import { FormattedMessage } from '../../../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../../../util/types';
import { types as sdkTypes } from '../../../../util/sdkLoader';

// Import shared components
import { H3, ListingLink, ExternalLink } from '../../../../components';

// Import modules from this directory
import EditListingPricingForm from './EditListingPricingForm';
import css from './EditListingPricingPanel.module.css';

const { Money } = sdkTypes;

const getInitialValues = params => {
  const { listing } = params;
  const { price } = listing?.attributes || {};

  return { price };
};

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    marketplaceCurrency,
    listingMinimumPriceSubUnits,
    disabled,
    ready,
    onSubmit,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    currentUser,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const initialValues = getInitialValues(props);
  const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
  const priceCurrencyValid =
    initialValues.price instanceof Money
      ? initialValues.price.currency === marketplaceCurrency
      : true;
  const unitType = listing?.attributes?.publicData?.unitType;


  const userId = currentUser.id.uuid
  const email = currentUser.attributes.email
  const name = currentUser.attributes.profile.firstName + ' ' + currentUser.attributes.profile.lastName
  const tallyFormLink = 'https://tally.so/r/nWr02Q?'
  const queryString = 'user_id=' + userId + '&email=' + email + '&name=' + name
  const tallyRedirectLink = tallyFormLink + queryString

  return (
    <div className={classes}>
      <H3 as="h1">
        {isPublished ? (
          <FormattedMessage
            id="EditListingPricingPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> }}
          />
        ) : (
          <FormattedMessage
            id="EditListingPricingPanel.createListingTitle"
            values={{ lineBreak: <br /> }}
          />
        )}
      </H3>

      <p className={css.description}>
      If you're not sure about how to price your charger, you can use our&nbsp;
        <ExternalLink key="TallyCalculator" href={tallyRedirectLink}>
        calculator
        </ExternalLink>
        &nbsp;to work it out.
      </p>

      {priceCurrencyValid ? (
        <EditListingPricingForm
          className={css.form}
          initialValues={initialValues}
          onSubmit={values => {
            const { price } = values;

            // New values for listing attributes
            const updateValues = {
              price,
            };
            onSubmit(updateValues);
          }}
          marketplaceCurrency={marketplaceCurrency}
          unitType={unitType}
          listingMinimumPriceSubUnits={listingMinimumPriceSubUnits}
          saveActionMsg={submitButtonText}
          disabled={disabled}
          ready={ready}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
          fetchErrors={errors}
        />
      ) : (
        <div className={css.priceCurrencyInvalid}>
          <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
        </div>
      )}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;
