import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import PageBuilder from '../../containers/PageBuilder/PageBuilder';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';

import SectionFeaturesLandingHero from '../PageBuilder/SectionBuilder/SectionFeaturesLandingHero';
import BlockDefaultLandingHero from '../PageBuilder/BlockBuilder/BlockDefaultLandingHero';


export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress, error, currentUser } = props;

  const sectionOverrides = {
    features: { component: SectionFeaturesLandingHero },
  };

  const blockOverrides = {
    defaultBlock: { component: BlockDefaultLandingHero },
  };

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
    <PageBuilder
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      inProgress={inProgress}
      options={{
        sectionComponents: sectionOverrides, 
        blockComponents: blockOverrides
      }}
      error={error}
      fallbackPage={<FallbackPage error={error}
      currentUser={currentUser} />}
    />
  );
};

LandingPageComponent.defaultProps = {
  currentUser: null,
};

LandingPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  error: propTypes.error,
  currentUser: propTypes.currentUser,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  const { currentUser } = state.user;
  return { pageAssetsData, inProgress, error, currentUser };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(connect(mapStateToProps))(LandingPageComponent);

export default LandingPage;
