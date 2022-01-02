import { NativeModules, Platform } from 'react-native';

import type { GMSPlace } from './interface';

export * from './interface';

const LINKING_ERROR =
  `The package 'react-native-google-autocomplete-modal' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const GoogleAutocompleteModal = NativeModules.GoogleAutocompleteModal
  ? NativeModules.GoogleAutocompleteModal
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

interface OpenAutocompleteModalOptions {
  /**
   * The country to restrict results to.
   *
   * This should be a ISO 3166-1 Alpha-2 country code (case insensitive). If nil, no country filtering will take place.
   */
  county?: string;
  /**
   * The countries to restrict results to.
   *
   * This should be a ISO 3166-1 Alpha-2 country code (case insensitive). Supports up to 5 countries to filter. If nil, no country filtering will take place.
   */
  countries?: string[];
}

export function openAutocompleteModal(
  options: OpenAutocompleteModalOptions = {}
): Promise<GMSPlace> {
  return GoogleAutocompleteModal.openAutocompleteModal(options);
}
