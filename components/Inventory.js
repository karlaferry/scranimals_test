import {
  View,
  ImageBackground,
  Text,
  TextInput,
  Button,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useEffect } from "react/cjs/react.development";
import { InventoryItemCard } from "./InventoryItemCard";

export const Inventory = ({ navigation }) => {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userInventory, setUserInventory] = useState([]);

  useEffect(() => {
    const userItems = [];
    for (const key in currUser.inventory) {
      userItems.push({ ...currUser.inventory[key], itemId: key });
    }
    setUserInventory(userItems);
  }, [currUser]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Inventory</Text>
        <View style={styles.card}>
          {userInventory.map((item) => {
            return (
              <View key={item.itemId}>
                <InventoryItemCard item={item} navigation={navigation} />
              </View>
            );
          })}
        </View>
        <Pressable
          style={styles.exitbg}
          onPress={() => navigation.navigate("Scranimal")}
        >
          <Image
            source={require("../img_assets/times-circle-solid.svg")}
            style={styles.exit}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3BCEAC",
    alignItems: "center",
  },

  card: {
    flex: 1,

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  exit: {
    height: 65,
    width: 65,
    alignSelf: "center",
    justifyContent: "center",
  },
  exitbg: {
    height: 60,
    width: 60,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  num: {
    fontSize: 25,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  coin: {
    width: 20,
    height: 20,
  },
  cost: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
