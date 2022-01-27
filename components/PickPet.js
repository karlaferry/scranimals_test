import React, { useState, useEffect } from "react";
const {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
  Image,
} = require("react-native");
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// DBREF
import { ref, child, get } from "firebase/database";
import { database } from "../firebase";

const dbRef = ref(database);
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { indexCarousel } from "../utils/utils";
export const PickPet = ({ navigation, route }) => {
  const [petAvatarIndex, setPetAvatarIndex] = useState(0);
  const [petList, setPetList] = useState([
    {
      petImgUrl: "https://i.ibb.co/SBsQf46/tortoise.png",
      petName: "Bertie",
      type: "Reptile",
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
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error;
      });
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img_assets/Autumn_Landscape.jpg")}
        resizeMode="cover"
        style={styles.img_bg}
      >
        <View>
          <Text style={styles.header}>Pick Your Pet</Text>
        </View>
        <View style={styles.selectionBox}>
          <Pressable
            onPress={() => {
              setPetAvatarIndex((current) => {
                return indexCarousel(current, -1, petList.length - 1);
              });
            }}
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} style={styles.arrows} />
          </Pressable>
          <Image
            source={petList[petAvatarIndex].petImgUrl}
            style={styles.petImage}
          />
          <Pressable
            onPress={() => {
              setPetAvatarIndex((current) => {
                return indexCarousel(current, 1, petList.length - 1);
              });
            }}
          >
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              style={styles.arrows}
            />
          </Pressable>
        </View>
        <Pressable
          title="Pick"
          onPress={() => navigation.navigate("TrackingMain")}
        >
          <Text>I Choose You</Text>
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
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
  },
  selectionBox: {
    flexDirection: "row",
  },
  petImage: {
    width: 150,
    height: 150,
  },
  arrows: {
    color: "#0EAD69",
  },
});
