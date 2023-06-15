import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import { useConfiguration } from '../../context/configurationContext';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { twitterPageURL } from '../../util/urlHelpers';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaLinkedin,
  IconSocialMediaTwitter,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.module.css';

const renderSocialMediaLinks = (intl, config) => {
  const { siteFacebookPage, siteInstagramPage, siteLinkedinPage, siteTwitterHandle } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToLinkedin = intl.formatMessage({ id: 'Footer.goToLinkedin' });
  const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  const fbLink = siteFacebookPage ? (
    <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;
  
  const linkedinLink = siteLinkedinPage ? (
    <ExternalLink key="linkToLinkedin" href={siteLinkedinPage} className={css.icon} title={goToLinkedin}>
      <IconSocialMediaLinkedin />
    </ExternalLink>
  ) : null;

  const twitterLink = siteTwitterPage ? (
    <ExternalLink
      key="linkToTwitter"
      href={siteTwitterPage}
      className={css.icon}
      title={goToTwitter}
    >
      <IconSocialMediaTwitter />
    </ExternalLink>
  ) : null;

  const instagramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;
  return [fbLink, linkedinLink, twitterLink, instagramLink].filter(v => v != null);
};

const Footer = props => {
  const config = useConfiguration();
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl, config);
  const { siteHelpCentrePage } = config
  const classes = classNames(rootClassName || css.root, className);

  const tallyChargerTypeRedirectLink = 'https://tally.so/r/nWr0kL?'
  const tallyCalculatorRedirectLink = 'https://tally.so/r/nWr02Q?'

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.socialLinksMobile}>{socialMediaLinks}</div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <Logo format="desktop" className={css.logo} />
              </NamedLink>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="CMSPage" params={{ pageId: 'about' }} className={css.link}>
                    <FormattedMessage id="Footer.toAboutPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <ExternalLink key="HelpCentrePage" href={siteHelpCentrePage} className={css.link}>
                    <FormattedMessage id="Footer.toHelpCentrePage" />
                  </ExternalLink>
                </li>
                <li className={css.listItem}>
                  <ExternalLink key="TallyChargerType" href={tallyChargerTypeRedirectLink} className={css.link}>
                    <FormattedMessage id="Footer.toTallyChargerType" />
                  </ExternalLink>
                </li>
                <li className={css.listItem}>
                  <ExternalLink key="TallyCalculator" href={tallyCalculatorRedirectLink} className={css.link}>
                    <FormattedMessage id="Footer.toTallyCalculator" />
                  </ExternalLink>
                </li>
              </ul>
            </div>
            <div className={css.actionLinks}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="SearchPage" className={css.link}>
                    <FormattedMessage id="Footer.toSearchPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="NewListingPage" className={css.link}>
                    <FormattedMessage id="Footer.toNewListingPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="ReferralsPage" className={css.link}>
                    <FormattedMessage id="Footer.toReferralsPage" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
                <li className={css.listItem}>
                <NamedLink
                  name="SearchPage"
                  to={{
                    search:
                      '?address=Auckland%2C%20New%20Zealand&bounds=-36.545%2C175.298%2C-37.047%2C174.498',
                  }}
                  className={css.link}
                >
                  <FormattedMessage id="Footer.link1" />
                </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Central%20Auckland%2C%20New%20Zealand&bounds=-36.832855798989165%2C174.81968106374825%2C-36.93268050957636%2C174.70337348647865',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.link2" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=North%20Auckland%2C%20New%20Zealand&bounds=-36.65600676268095%2C174.81799615740596%2C-36.83271770248426%2C174.66575084558633',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.link3" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searchesExtra}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=South%20Auckland%2C%20New%20Zealand&bounds=-36.933163293400156%2C174.9681796742587%2C-37.12110567276981%2C174.73326481238746',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.link4" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=East%20Auckland%2C%20New%20Zealand&bounds=-36.840274927208114%2C175.01694758359895%2C-36.9574082327617%2C174.82793825211343',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.link5" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=West%20Auckland%2C%20New%20Zealand&bounds=-36.783284510687636%2C174.696259580988%2C-36.97458112253792%2C174.57113092341842',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.link6" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.extraLinks}>
              {socialMediaLinks.length > 0 ? (
                <div className={css.socialLinks}>{socialMediaLinks}</div>
              ) : null}
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
