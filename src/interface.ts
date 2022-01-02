export interface GMSPlace {
  /** Name of the place. */
  name?: string;
  /** Place ID of this place. */
  placeID?: string;
  /**
   * Location of the place. The location is not necessarily the center of the Place, or any
   * particular entry or exit point, but some arbitrarily chosen point within the geographic extent of
   * the Place.
   */
  coordinate: Coordinate;
  /**
   * Phone number of this place, in international format, i.e. including the country code prefixed
   * with "+".  For example, Google Sydney's phone number is "+61 2 9374 4000".
   */
  phoneNumber?: string;
  /**
   * Address of the place as a simple string.
   */
  formattedAddress?: string;
  /**
   * Five-star rating for this place based on user reviews.
   *
   * Ratings range from 1.0 to 5.0.  0.0 means we have no rating for this place (e.g. because not
   * enough users have reviewed this place).
   */
  rating: number;
  /**
   * Price level for this place, as integers from 0 to 4.
   *
   * e.g. A value of 4 means this place is "$$$$" (expensive).  A value of 0 means free (such as a
   * museum with free admission).
   */
  priceLevel: number;
  /**
   * The types of this place.  Types are NSStrings, valid values are any types documented at
   * <https://developers.google.com/places/ios-sdk/supported_types>.
   */
  types?: PlaceTypes[];
  /** Website for this place. */
  website?: string;
  /**
   * The recommended viewport for this place. May be nil if the size of the place is not known.
   *
   * This returns a viewport of a size that is suitable for displaying this place. For example, a
   * |GMSPlace| object representing a store may have a relatively small viewport, while a |GMSPlace|
   * object representing a country may have a very large viewport.
   */
  viewport?: GMSCoordinateBounds;
  /**
   * An array of |GMSAddressComponent| objects representing the components in the place's address.
   * These components are provided for the purpose of extracting structured information about the
   * place's address: for example, finding the city that a place is in.
   *
   * These components should not be used for address formatting. If a formatted address is required,
   * use the |formattedAddress| property, which provides a localized formatted address.
   */
  addressComponents?: GMSAddressComponent;
  /**
   * The Plus code representation of location for this place.
   */
  plusCode?: GMSPlusCode;
  /**
   * The Opening Hours information for this place.
   * Includes open status, periods and weekday text when available.
   */
  openingHours?: GMSOpeningHours;
  /**
   * Represents how many reviews make up this place's rating.
   */
  userRatingsTotal: number;
  /**
   * The timezone UTC offset of the place in minutes.
   */
  utcOffsetMinutes?: number;
  /**
   * The |GMSPlaceBusinessStatus| of the place.
   */
  businessStatus: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface GMSCoordinateBounds {
  northEast: Coordinate;
  southWest: Coordinate;
  /* iOS only */
  valid?: boolean;
}

export interface GMSAddressComponent {
  name: string;
  shortName: string;
  types: PlaceTypes[];
  /* iOS only */
  type?: PlaceTypes;
}

export interface GMSPlusCode {
  globalCode: string;
  compoundCode: string;
}

export interface GMSOpeningHours {
  periods: GMSPeriod[];
  weekdayText: string[];
}

export interface GMSPeriod {
  openEvent: GMSEvent;
  closeEvent: GMSEvent;
}

export interface GMSEvent {
  day: number;
  time: {
    hour: number;
    minute: number;
  };
}

export type PlaceTypes =
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'administrative_area_level_3'
  | 'administrative_area_level_4'
  | 'administrative_area_level_5'
  | 'archipelago'
  | 'colloquial_area'
  | 'continent'
  | 'country'
  | 'establishment'
  | 'finance'
  | 'floor'
  | 'food'
  | 'general_contractor'
  | 'geocode'
  | 'health'
  | 'intersection'
  | 'landmark'
  | 'locality'
  | 'natural_feature'
  | 'neighborhood'
  | 'place_of_worship'
  | 'plus_code'
  | 'point_of_interest'
  | 'political'
  | 'post_box'
  | 'postal_code'
  | 'postal_code_prefix'
  | 'postal_code_suffix'
  | 'postal_town'
  | 'premise'
  | 'room'
  | 'route'
  | 'street_address'
  | 'street_number'
  | 'sublocality'
  | 'sublocality_level_1'
  | 'sublocality_level_2'
  | 'sublocality_level_3'
  | 'sublocality_level_4'
  | 'sublocality_level_5'
  | 'subpremise'
  | 'town_square';

// export type PlaceSearchTypes =
//   | 'accounting'
//   | 'airport'
//   | 'amusement_park'
//   | 'aquarium'
//   | 'art_gallery'
//   | 'atm'
//   | 'bakery'
//   | 'bank'
//   | 'bar'
//   | 'beauty_salon'
//   | 'bicycle_store'
//   | 'book_store'
//   | 'bowling_alley'
//   | 'bus_station'
//   | 'cafe'
//   | 'campground'
//   | 'car_dealer'
//   | 'car_rental'
//   | 'car_repair'
//   | 'car_wash'
//   | 'casino'
//   | 'cemetery'
//   | 'church'
//   | 'city_hall'
//   | 'clothing_store'
//   | 'convenience_store'
//   | 'courthouse'
//   | 'dentist'
//   | 'department_store'
//   | 'doctor'
//   | 'drugstore'
//   | 'electrician'
//   | 'electronics_store'
//   | 'embassy'
//   | 'fire_station'
//   | 'florist'
//   | 'funeral_home'
//   | 'furniture_store'
//   | 'gas_station'
//   | 'gym'
//   | 'hair_care'
//   | 'hardware_store'
//   | 'hindu_temple'
//   | 'home_goods_store'
//   | 'hospital'
//   | 'insurance_agency'
//   | 'jewelry_store'
//   | 'laundry'
//   | 'lawyer'
//   | 'library'
//   | 'light_rail_station'
//   | 'liquor_store'
//   | 'local_government_office'
//   | 'locksmith'
//   | 'lodging'
//   | 'meal_delivery'
//   | 'meal_takeaway'
//   | 'mosque'
//   | 'movie_rental'
//   | 'movie_theater'
//   | 'moving_company'
//   | 'museum'
//   | 'night_club'
//   | 'painter'
//   | 'park'
//   | 'parking'
//   | 'pet_store'
//   | 'pharmacy'
//   | 'physiotherapist'
//   | 'plumber'
//   | 'police'
//   | 'post_office'
//   | 'primary_school'
//   | 'real_estate_agency'
//   | 'restaurant'
//   | 'roofing_contractor'
//   | 'rv_park'
//   | 'school'
//   | 'secondary_school'
//   | 'shoe_store'
//   | 'shopping_mall'
//   | 'spa'
//   | 'stadium'
//   | 'storage'
//   | 'store'
//   | 'subway_station'
//   | 'supermarket'
//   | 'synagogue'
//   | 'taxi_stand'
//   | 'tourist_attraction'
//   | 'train_station'
//   | 'transit_station'
//   | 'travel_agency'
//   | 'university'
//   | 'veterinary_care'
//   | 'zoo';
