import React from 'react';
import { FormattedMessage } from '../../../util/reactIntl';
import css from './NoSearchResultsMaybe.module.css';

const NoSearchResultsMaybe = props => {
  const { listingsAreLoaded, totalItems, location, resetAll, mobile } = props;
  const hasNoResult = listingsAreLoaded && totalItems === 0;
  const hasSearchParams = location.search?.length > 0;
  return hasNoResult ? (
    <div className={css.noSearchResults}>
      <FormattedMessage id={mobile ? "SearchPage.noResultsTitleMobile" : "SearchPage.noResultsTitleDesktop"} />
      <br />
      <br />
      <FormattedMessage id={mobile ? "SearchPage.noResultsDescriptionMobile" : "SearchPage.noResultsDescriptionDesktop"} />
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
