import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { openAutocompleteModal } from 'react-native-google-autocomplete-modal';

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          openAutocompleteModal()
            .then((res) => {
              console.log(JSON.stringify(res, null, 2));
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Open Autocomplete Modal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
