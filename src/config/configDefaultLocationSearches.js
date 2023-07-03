import { types as sdkTypes } from '../util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
//
// NOTE: these are highly recommended, since they
//       1) help customers to find relevant locations, and
//       2) reduce the cost of using map providers geocoding API
const defaultLocations = [
  {
    id: 'default-auckland',
    predictionPlace: {
      address: 'Auckland',
      bounds: new LatLngBounds(new LatLng(-36.545, 175.298), new LatLng(-37.047,174.498)),
    },
  },
  {
    id: 'default-wellington',
    predictionPlace: {
      address: 'Wellington',
      bounds: new LatLngBounds(new LatLng(-41.237698, 174.853385), new LatLng(-41.356092, 174.705757)),
    },
  },
  {
    id: 'default-hamilton',
    predictionPlace: {
      address: 'Hamilton',
      bounds: new LatLngBounds(new LatLng(-37.706988, 175.366850), new LatLng(-37.837251, 175.186262)),
    },
  },
  {
    id: 'default-christchurch',
    predictionPlace: {
      address: 'Christchurch',
      bounds: new LatLngBounds(new LatLng(-43.417194, 172.820244), new LatLng(-43.627801, 172.485848)),
    },
  },
  {
    id: 'default-queenstown',
    predictionPlace: {
      address: 'Queenstown',
      bounds: new LatLngBounds(new LatLng(-44.924308, 168.919787), new LatLng(-45.104395, 168.570971)),
    },
  },
  {
    id: 'default-dunedin',
    predictionPlace: {
      address: 'Dunedin',
      bounds: new LatLngBounds(new LatLng(-45.794285, 170.773080), new LatLng(-45.934384, 170.376199)),
    },
  },
  // {
  //   id: 'default-auckland-central',
  //   predictionPlace: {
  //     address: 'Central Auckland, New Zealand',
  //     bounds: new LatLngBounds(new LatLng(-36.832855798989165, 174.81968106374825), new LatLng(-36.93268050957636, 174.70337348647865)),
  //   },
  // },
  // {
  //   id: 'default-auckland-north',
  //   predictionPlace: {
  //     address: 'North Auckland, New Zealand',
  //     bounds: new LatLngBounds(new LatLng(-36.65600676268095, 174.81799615740596), new LatLng(-36.83271770248426, 174.66575084558633)),
  //   },
  // },
  // {
  //   id: 'default-auckland-south',
  //   predictionPlace: {
  //     address: 'South Auckland, New Zealand',
  //     bounds: new LatLngBounds(new LatLng(-36.933163293400156, 174.9681796742587), new LatLng(-37.12110567276981, 174.73326481238746)),
  //   },
  // },
  // {
  //   id: 'default-auckland-east',
  //   predictionPlace: {
  //     address: 'East Auckland, New Zealand',
  //     bounds: new LatLngBounds(new LatLng(-36.840274927208114, 175.01694758359895), new LatLng(-36.9574082327617, 174.82793825211343)),
  //   },
  // },
  // {
  //   id: 'default-auckland-west',
  //   predictionPlace: {
  //     address: 'West Auckland, New Zealand',
  //     bounds: new LatLngBounds(new LatLng(-36.783284510687636, 174.696259580988), new LatLng(-36.97458112253792, 174.57113092341842)),
  //   },
  // },
  // {
  //   id: 'default-helsinki',
  //   predictionPlace: {
  //     address: 'Helsinki, Finland',
  //     bounds: new LatLngBounds(new LatLng(60.29783, 25.25448), new LatLng(59.92248, 24.78287)),
  //   },
  // },
  // {
  //   id: 'default-turku',
  //   predictionPlace: {
  //     address: 'Turku, Finland',
  //     bounds: new LatLngBounds(new LatLng(60.53045, 22.38197), new LatLng(60.33361, 22.06644)),
  //   },
  // },
  // {
  //   id: 'default-tampere',
  //   predictionPlace: {
  //     address: 'Tampere, Finland',
  //     bounds: new LatLngBounds(new LatLng(61.83657, 24.11838), new LatLng(61.42728, 23.5422)),
  //   },
  // },
  // {
  //   id: 'default-oulu',
  //   predictionPlace: {
  //     address: 'Oulu, Finland',
  //     bounds: new LatLngBounds(new LatLng(65.56434, 26.77069), new LatLng(64.8443, 24.11494)),
  //   },
  // },
  // {
  //   id: 'default-ruka',
  //   predictionPlace: {
  //     address: 'Ruka, Finland',
  //     bounds: new LatLngBounds(new LatLng(66.16997, 29.16773), new LatLng(66.16095, 29.13572)),
  //   },
  // },
];
export default defaultLocations;
