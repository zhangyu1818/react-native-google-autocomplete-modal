import { NativeModules, Platform } from 'react-native';

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

export function openAutocompleteModal(): Promise<any> {
  return GoogleAutocompleteModal.openAutocompleteModal()
}
