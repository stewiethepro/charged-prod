import React from 'react';
import { FormattedMessage } from '../../../util/reactIntl';
import { NamedLink } from '../../../components';
import css from './NoSearchResultsMaybe.module.css';

const NoSearchResultsMaybe = props => {
  const { listingsAreLoaded, totalItems, location, resetAll, mobile } = props;
  const hasNoResult = listingsAreLoaded && totalItems === 0;
  const hasSearchParams = location.search?.length > 0;
  return hasNoResult ? (
    <div className={css.noSearchResults}>
      <br />
      <br />
      <FormattedMessage id={mobile ? "SearchPage.noResultsTitleMobile" : "SearchPage.noResultsTitleDesktop"} />
      <br />
      <br />
      <p>
        <FormattedMessage id={mobile ? "SearchPage.noResultsDescriptionMobile" : "SearchPage.noResultsDescriptionDesktop"} />
      </p>
      <p>
        Want to see more chargers in your area? Be the first to&nbsp;
        <NamedLink name="NewListingPage">
          list a charger
        </NamedLink>
        &nbsp;or&nbsp;
        <NamedLink name="ReferralsPage">
          invite a friend
        </NamedLink>
        &nbsp;to list theirs.
      </p>
      <br />
      <br />
      {hasSearchParams ? (
        <button className={css.resetAllFiltersButton} onClick={e => resetAll(e)}>
          <FormattedMessage id={'SearchPage.resetAllFilters'} />
        </button>
      ) : null}
    </div>
  ) : null;
};

export default NoSearchResultsMaybe;
