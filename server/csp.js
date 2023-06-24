const helmet = require('helmet');

const dev = process.env.REACT_APP_ENV === 'development';
const self = "'self'";
const unsafeInline = "'unsafe-inline'";
const unsafeEval = "'unsafe-eval'";
const data = 'data:';
const blob = 'blob:';
const devImagesMaybe = dev ? ['*.localhost:8000'] : [];
const baseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL || 'https://flex-api.sharetribe.com';
// Asset Delivery API is using a different domain than other Flex APIs
// cdn.st-api.com
// If assetCdnBaseUrl is used to initialize SDK (for proxy purposes), then that URL needs to be in CSP
const assetCdnBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_ASSET_CDN_BASE_URL;

// Default CSP whitelist.
//
// NOTE: Do not change these in the customizations, make custom
// additions within the exported function in the bottom of this file.
const defaultDirectives = {
  baseUri: [self],
  defaultSrc: [self],
  childSrc: [blob],
  connectSrc: [
    self,
    baseUrl,
    assetCdnBaseUrl,
    '*.st-api.com',
    'maps.googleapis.com',
    '*.tiles.mapbox.com',
    'api.mapbox.com',
    'events.mapbox.com',

    // Google Analytics
    'www.googletagmanager.com',
    '*.google-analytics.com',
    'stats.g.doubleclick.net',

    'fonts.googleapis.com',

    'sentry.io',
    '*.stripe.com',
  ],
  fontSrc: [self, data, 'assets-sharetribecom.sharetribe.com', 'fonts.gstatic.com'],
  formAction: [self],
  frameSrc: [self, '*.stripe.com', '*.youtube-nocookie.com'],
  imgSrc: [
    self,
    data,
    blob,
    ...devImagesMaybe,
    '*.imgix.net',
    'sharetribe.imgix.net', // Safari 9.1 didn't recognize asterisk rule.

    // Styleguide placeholder images
    'picsum.photos',
    '*.picsum.photos',

    'api.mapbox.com',
    'maps.googleapis.com',
    '*.gstatic.com',
    '*.googleapis.com',
    '*.ggpht.com',

    // Google Analytics
    'www.googletagmanager.com',
    'www.google.com',
    'www.google-analytics.com',
    'stats.g.doubleclick.net',

    // Youtube (static image)
    '*.ytimg.com',

    '*.stripe.com',
  ],
  mediaSrc: [],
  scriptSrc: [
    self,
    unsafeInline,
    unsafeEval,
    data,
    'maps.googleapis.com',
    'api.mapbox.com',
    'www.googletagmanager.com',
    '*.google-analytics.com',
    'js.stripe.com',
  ],
  styleSrc: [self, unsafeInline, 'fonts.googleapis.com', 'api.mapbox.com'],
};

/**
 * Middleware for creating a Content Security Policy
 *
 * @param {String} reportUri URL where the browser will POST the
 * policy violation reports
 *
 * @param {Boolean} reportOnly In the report mode, requests are only
 * reported to the report URL instead of blocked
 */
module.exports = (reportUri, reportOnly) => {
  // ================ START CUSTOM CSP URLs ================ //

  // Add custom CSP whitelisted URLs here. See commented example
  // below. For format specs and examples, see:
  // https://content-security-policy.com/

  // Example: extend default img directive with custom domain
  // const { imgSrc = [self] } = defaultDirectives;
  // const exampleImgSrc = imgSrc.concat('my-custom-domain.example.com');
  const { scriptSrc = [self] } = defaultDirectives;
  const { connectSrc = [self] } = defaultDirectives;
  const { childSrc = [self] } = defaultDirectives;
  const { fontSrc = [self] } = defaultDirectives;
  const { formAction = [self] } = defaultDirectives;
  const { frameSrc = [self] } = defaultDirectives;
  const { mediaSrc = [self] } = defaultDirectives;
  const { imgSrc = [self] } = defaultDirectives;
  const { styleSrc = [self] } = defaultDirectives;

  const customScriptSrc = scriptSrc.concat([
    'https://app.intercom.io',
    'https://widget.intercom.io',
    'https://js.intercomcdn.com',
    'https://app.viral-loops.com',
    'https://ajax.googleapis.com/ajax/libs/',
    'https://cdnjs.cloudflare.com/ajax/libs/',
    'https://res.cloudinary.com/vrlps/',
    'https://getcharged.herokuapp.com/static/scripts/mapbox/',
    'https://*.facebook.net'
  ]);
  const customConnectSrc = connectSrc.concat([
    'https://via.intercom.io',
    'https://api.intercom.io',
    'https://api.au.intercom.io',
    'https://api.eu.intercom.io',
    'https://api-iam.intercom.io',
    'https://api-iam.eu.intercom.io',
    'https://api-iam.au.intercom.io',
    'https://api-ping.intercom.io',  
    'https://nexus-websocket-a.intercom.io',
    'wss://nexus-websocket-a.intercom.io',
    'https://nexus-websocket-b.intercom.io',
    'wss://nexus-websocket-b.intercom.io',
    'https://nexus-europe-websocket.intercom.io', 
    'wss://nexus-europe-websocket.intercom.io', 
    'https://nexus-australia-websocket.intercom.io',
    'wss://nexus-australia-websocket.intercom.io', 
    'https://uploads.intercomcdn.com',
    'https://uploads.intercomcdn.eu', 
    'https://uploads.au.intercomcdn.com', 
    'https://uploads.intercomusercontent.com',
    'https://app.viral-loops.com/',
    'https://res.cloudinary.com/vrlps/',
    'https://www.facebook.com',
  ]);
  const customChildSrc = childSrc.concat([
    'https://intercom-sheets.com',
    'https://www.intercom-reporting.com',
    'https://www.youtube.com',
    'https://player.vimeo.com',
    'https://fast.wistia.net',
  ]);
  const customFontSrc = fontSrc.concat([
    'https://js.intercomcdn.com',
    'https://fonts.intercomcdn.com',
  ]);
  const customFormAction = formAction.concat([
    'https://intercom.help',
    'https://api-iam.intercom.io',
    'https://api-iam.eu.intercom.io',
    'https://api-iam.au.intercom.io',
    'https://www.facebook.com',
  ]);
  const customFrameSrc = frameSrc.concat([
    'https://intercom-sheets.com',
    'https://www.facebook.com'
  ]);
  const customMediaSrc = mediaSrc.concat([
    'https://js.intercomcdn.com',
  ]);
  const customImgSrc = imgSrc.concat([
    'https://js.intercomcdn.com',
    'https://static.intercomassets.com',
    'https://downloads.intercomcdn.com',
    'https://downloads.intercomcdn.eu',
    'https://downloads.au.intercomcdn.com',
    'https://uploads.intercomusercontent.com',
    'https://gifs.intercomcdn.com',
    'https://video-messages.intercomcdn.com',
    'https://messenger-apps.intercom.io',
    'https://messenger-apps.eu.intercom.io',
    'https://messenger-apps.au.intercom.io',
    'https://*.intercom-attachments-1.com',
    'https://*.intercom-attachments.eu',
    'https://*.au.intercom-attachments.com',
    'https://*.intercom-attachments-2.com',
    'https://*.intercom-attachments-3.com',
    'https://*.intercom-attachments-4.com',
    'https://*.intercom-attachments-5.com',
    'https://*.intercom-attachments-6.com',
    'https://*.intercom-attachments-7.com',
    'https://*.intercom-attachments-8.com',
    'https://*.intercom-attachments-9.com',
    'https://static.intercomassets.eu',
    'https://static.au.intercomassets.com',
    'https://www.facebook.com'
  ]);
  const customStyleSrc = styleSrc.concat([
    'unsafe-inline',
    'https://app.viral-loops.com/',
    'https://res.cloudinary.com/vrlps/',
  ]);

  const customDirectives = {
    // Example: Add custom directive override
    // imgSrc: exampleImgSrc,
    scriptSrc: customScriptSrc,
    connectSrc: customConnectSrc,
    childSrc: customChildSrc,
    fontSrc: customFontSrc,
    formAction: customFormAction,
    frameSrc: customFrameSrc,
    mediaSrc: customMediaSrc,
    imgSrc: customImgSrc,
    styleSrc: customStyleSrc,
  };

  // ================ END CUSTOM CSP URLs ================ //

  // Helmet v4 expects every value to be iterable so strings or booleans are not supported directly
  // If we want to add block-all-mixed-content directive we need to add empty array to directives
  // See Helmet's default directives:
  // https://github.com/helmetjs/helmet/blob/bdb09348c17c78698b0c94f0f6cc6b3968cd43f9/middlewares/content-security-policy/index.ts#L51

  const directives = Object.assign({ reportUri: [reportUri] }, defaultDirectives, customDirectives);
  if (!reportOnly) {
    directives.upgradeInsecureRequests = [];
  }

  // See: https://helmetjs.github.io/docs/csp/
  return helmet.contentSecurityPolicy({
    useDefaults: false,
    directives,
    reportOnly,
  });
};
