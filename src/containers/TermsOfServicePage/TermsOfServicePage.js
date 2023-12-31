import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import { H1 } from '../PageBuilder/Primitives/Heading';
import PageBuilder, { SectionBuilder } from '../../containers/PageBuilder/PageBuilder';

import FallbackPage, { fallbackSections } from './FallbackPage';
import { ASSET_NAME } from './TermsOfServicePage.duck';

// This "content-only" component can be used in modals etc.
const TermsOfServiceContent = props => {
  const { inProgress, error, data } = props;

  if (inProgress) {
    return null;
  }

  // We don't want to add h1 heading twice to the HTML (SEO issue).
  // Modal's header is mapped as h2
  const hasContent = data => typeof data?.content === 'string';
  const exposeContentAsChildren = data => {
    return hasContent(data) ? { children: data.content } : {};
  };
  const CustomHeading1 = props => <H1 as="h2" {...props} />;

  const hasData = error === null && data;
  const sectionsData = hasData ? data : fallbackSections;

  return (
    <SectionBuilder
      {...sectionsData}
      options={{
        fieldComponents: {
          heading1: { component: CustomHeading1, pickValidProps: exposeContentAsChildren },
        },
        isInsideContainer: true,
      }}
    />
  );
};

// Presentational component for TermsOfServicePage
const TermsOfServicePageComponent = props => {
  const { pageAssetsData, inProgress, error, currentUser } = props;

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
      error={error}
      fallbackPage={<FallbackPage />}
    />
  );
};

TermsOfServicePageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  error: propTypes.error,
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
const TermsOfServicePage = compose(connect(mapStateToProps))(TermsOfServicePageComponent);

const TOS_ASSET_NAME = ASSET_NAME;
export { TOS_ASSET_NAME, TermsOfServicePageComponent, TermsOfServiceContent };

export default TermsOfServicePage;
