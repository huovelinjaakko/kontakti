import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data)
        console.log(contacts)
      }
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (

    <View style={styles.container} >
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => 
          <View>
            <Text style={{ fontSize: 18 }}>{item.name} {item.phoneNumbers[0].number}</Text>
          </View>}
        data={contacts}
        ItemSeparatorComponent={listSeparator}
      />
      <Button title="Get contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
