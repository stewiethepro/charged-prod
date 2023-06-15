import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import {
  LayoutSideNavigation,
  Footer,
  Page,
  UserNav,
  H3,
  H4,
} from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';

import css from './ReferralsPage.module.css';

export const ReferralsPageComponent = props => {
  const {
    scrollingDisabled,
    currentUser,
    intl,
  } = props;

  const pageDetails = (
    <div className={css.details}>
    </div>
  );

  const title = intl.formatMessage({ id: 'ReferralsPage.title' });

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

  // Viral loops registration
  const viralLoopsCampaignId = 'sf7SLR20yr5Q591bjZeZDA3S0PA'

  const viralLoopsUser = currentUser ? 
  {
    firstname: currentUser.attributes.profile.firstName,
    lastname: currentUser.attributes.profile.lastName,
    email: currentUser.attributes.email
  } : null  

  async function getViralLoopsData(user) {
    console.log("flumpy");
    // Get campaign by ID

    const campaign = await ViralLoops.getCampaign(viralLoopsCampaignId);

    console.log("campaign: ", campaign);

    // Identify user in campaign
    console.log('[Viral Loops] Identifying...', user);
    const response = await campaign.identify(user).catch(error => {
    console.error("[Viral Loops] Participation error", error);
    });

    // Log response
    if (response.isNew) {
        console.log('[Viral Loops] ✅ Participation completed!');
        console.log('VL response: ', response);
    } else {
        console.log('[Viral Loops] ✅ Identified participant!');
        console.log('VL response: ', response);
    }
  }
    
if (typeof window !== "undefined" && currentUser && typeof window.ViralLoops !== "undefined") {
    getViralLoopsData(viralLoopsUser);
}

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation
        topbar={
          <>
            <TopbarContainer
              currentPage="ReferralsPage"
              desktopClassName={css.desktopTopbar}
              mobileClassName={css.mobileTopbar}
            />
            <UserNav 
            currentPage="ReferralsPage"
            selectedPageName="ReferralsPage" />
          </>
        }
        sideNav={null}
        useAccountSettingsNav
        currentPage="ReferralsPage"
        footer={<Footer />}
      >
        <div className={css.content}>
          <H3 as="h1" className={css.title}>
            <FormattedMessage id="ReferralsPage.heading" />
          </H3>
          <div className={css.sectionContainer}>
            <div className={css.vlFormContainer}>
                <form-widget ucid={viralLoopsCampaignId}></form-widget>
            </div>
          </div>  
          <div className={css.sectionContainer}>
            <div className={css.vlRewardsContainer}>
                <rewards-widget ucid={viralLoopsCampaignId}></rewards-widget>
            </div>
          </div>  
        </div>
      </LayoutSideNavigation>
    </Page>
  );
};

ReferralsPageComponent.defaultProps = {
  currentUser: null,
};

const { bool, func } = PropTypes;

ReferralsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  scrollingDisabled: bool.isRequired,
  
  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const { currentUser } = state.user;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
});

const ReferralsPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ReferralsPageComponent);

export default ReferralsPage;