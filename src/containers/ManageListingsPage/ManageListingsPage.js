import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/ui.duck';

import { H3, Page, PaginationLinks, UserNav, Footer, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';

import ManageListingCard from './ManageListingCard/ManageListingCard';

import { closeListing, openListing, getOwnListingsById } from './ManageListingsPage.duck';
import css from './ManageListingsPage.module.css';

export class ManageListingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { listingMenuOpen: null };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu(listing) {
    this.setState({ listingMenuOpen: listing });
  }

  render() {
    const {
      closingListing,
      closingListingError,
      listings,
      onCloseListing,
      onOpenListing,
      openingListing,
      openingListingError,
      pagination,
      queryInProgress,
      queryListingsError,
      queryParams,
      scrollingDisabled,
      intl,
      currentUser
    } = this.props;

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

    const loadingResults = (
      <div className={css.messagePanel}>
        <H3 as="h2" className={css.heading}>
          <FormattedMessage id="ManageListingsPage.loadingOwnListings" />
        </H3>
      </div>
    );

    const queryError = (
      <div className={css.messagePanel}>
        <H3 as="h2" className={css.heading}>
          <FormattedMessage id="ManageListingsPage.queryError" />
        </H3>
      </div>
    );

    const noResults =
      listingsAreLoaded && pagination.totalItems === 0 ? (
        <H3 as="h1" className={css.heading}>
          <FormattedMessage id="ManageListingsPage.noResults" />
        </H3>
      ) : null;

    const heading =
      listingsAreLoaded && pagination.totalItems > 0 ? (
        <H3 as="h1" className={css.heading}>
          <FormattedMessage
            id="ManageListingsPage.youHaveListings"
            values={{ count: pagination.totalItems }}
          />
        </H3>
      ) : (
        noResults
      );

    const page = queryParams ? queryParams.page : 1;
    const paginationLinks =
      listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
        <PaginationLinks
          className={css.pagination}
          pageName="ManageListingsPage"
          pageSearchParams={{ page }}
          pagination={pagination}
        />
      ) : null;

    const listingMenuOpen = this.state.listingMenuOpen;
    const closingErrorListingId = !!closingListingError && closingListingError.listingId;
    const openingErrorListingId = !!openingListingError && openingListingError.listingId;

    const title = intl.formatMessage({ id: 'ManageListingsPage.title' });

    const panelWidth = 62.5;
    // Render hints for responsive image
    const renderSizes = [
      `(max-width: 767px) 100vw`,
      `(max-width: 1920px) ${panelWidth / 2}vw`,
      `${panelWidth / 3}vw`,
    ].join(', ');

    // Boot Intercom

  if (typeof window !== "undefined") {
    if (currentUser && currentUser.attributes.emailVerified) {
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "qv2ju58e",
        name: currentUser.attributes.profile.firstName + ' ' + currentUser.attributes.profile.lastName,
        user_id: currentUser.id.uuid, 
        email: currentUser.attributes.email,
        created_at: currentUser.attributes.createdAt
      });
    } else {
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "qv2ju58e",
      });
    }
  }

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn
          topbar={
            <>
              <TopbarContainer currentPage="ManageListingsPage" />
              <UserNav currentPage="ManageListingsPage" />
            </>
          }
          footer={<Footer />}
        >
          {queryInProgress ? loadingResults : null}
          {queryListingsError ? queryError : null}
          <div className={css.listingPanel}>
            {heading}
            <div className={css.listingCards}>
              {listings.map(l => (
                <ManageListingCard
                  className={css.listingCard}
                  key={l.id.uuid}
                  listing={l}
                  isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                  actionsInProgressListingId={openingListing || closingListing}
                  onToggleMenu={this.onToggleMenu}
                  onCloseListing={onCloseListing}
                  onOpenListing={onOpenListing}
                  hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
                  hasClosingError={closingErrorListingId.uuid === l.id.uuid}
                  renderSizes={renderSizes}
                />
              ))}
            </div>
            {paginationLinks}
          </div>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ManageListingsPageComponent.defaultProps = {
  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

ManageListingsPageComponent.propTypes = {
  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  } = state.ManageListingsPage;
  const listings = getOwnListingsById(state, currentPageResultIds);
  const { currentUser } = state.user;
  return {
    currentPageResultIds,
    listings,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
});

const ManageListingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ManageListingsPageComponent);

export default ManageListingsPage;
