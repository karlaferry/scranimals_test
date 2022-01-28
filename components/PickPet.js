import React, { useState, useEffect } from 'react';
const {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
  Image,
} = require('react-native');

// DBREF
import { ref, child, get } from 'firebase/database';
import { database } from '../firebase';

const dbRef = ref(database);

import { indexCarousel } from '../utils/utils';
export const PickPet = ({ navigation, route }) => {
  const [petAvatarIndex, setPetAvatarIndex] = useState(0);
  const [petList, setPetList] = useState([
    {
      petImgUrl: 'https://i.ibb.co/SBsQf46/tortoise.png',
      petName: 'Bertie',
      type: 'Reptile',
    },
  ]);
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `/Pets`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPetList(() => {
            const pets = [];
            for (const pet in snapshot.val()) {
              pets.push(snapshot.val()[pet]);
            }
            return pets;
          });
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error;
      });
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img_assets/Autumn_Landscape.jpg')}
        resizeMode='cover'
        style={styles.img_bg}
      >
        <View>
          <Text style={styles.header}>Pick Your Pet</Text>
        </View>
        <View style={styles.selectionBox}>
          <Pressable
            style={styles.carouselArrows}
            onPress={() => {
              setPetAvatarIndex((current) => {
                return indexCarousel(current, -1, petList.length - 1);
              });
            }}
          >
            <Text style={styles.carouselArrowsText}>&#60;</Text>
          </Pressable>
          <Image
            source={petList[petAvatarIndex].petImgUrl}
            style={styles.petImage}
          />
          <Pressable
            style={styles.carouselArrows}
            onPress={() => {
              setPetAvatarIndex((current) => {
                return indexCarousel(current, 1, petList.length - 1);
              });
            }}
          >
            <Text style={styles.carouselArrowsText}>&#62;</Text>
          </Pressable>
        </View>
        <View style={styles.petIntroduction}>
          <Text>
            Hi my name is {petList[petAvatarIndex].petName}, please, please,
            please choose me!
          </Text>
        </View>
        <Pressable
          title='Pick'
          onPress={() => navigation.navigate('TrackingMain')}
        >
          <View style={styles.pickPetContainer}>
            <Text>I Choose You</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img_bg: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
  },
  selectionBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petImage: {
    resizeMode: 'contain',
    width: 250,
    height: 250,
  },
  carouselArrows: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 50,
  },
  carouselArrowsText: {
    fontSize: 30,
  },
  petIntroduction: {
    backgroundColor: 'white',
    padding: 10,
  },
  pickPetContainer: {
    backgroundColor: 'white',
    padding: 30,
    marginTop: 30,
  },
});