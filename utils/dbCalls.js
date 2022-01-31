import { ref, child, get, push, set, update } from "firebase/database";
import { database } from "../firebase";
import { getCurrentDate } from "./utils";

export const getUser = (userObject) => {
  const logInDbRef = ref(database);
  return get(child(logInDbRef, `/Users`)).then((snapshot) => {
    if (snapshot.exists()) {
      const userArray = [];
      for (const obj in snapshot.val()) {
        if (snapshot.val()[obj].email === userObject.email) {
          userArray.push({ ...snapshot.val()[obj], userId: obj });
        }
      }
      return userArray;
    }
  });
};

export const postUser = (userObject, setCurrUser, setIsLoggedIn, nav) => {
  const signUpDbRef = ref(database, "/Users");
  const newUserId = push(signUpDbRef);
  set(newUserId, userObject)
    .then(() => {
      return getUser(userObject);
    })
    .then((arr) => {
      nav("PickPet");
      setCurrUser(arr[0]);
      setIsLoggedIn(true);
    });
};

export const patchUserPet = (userId, petObj, setCurrUser, nav) => {
  const dbRef = ref(database);
  const usersRef = child(dbRef, `/Users/` + userId);
  update(usersRef, {
    pet: petObj,
  })
    .then(() => {
      return get(child(dbRef, `/Users/` + userId));
    })
    .then((snapshot) => {
      const updatedUser = { userId };
      for (const key in snapshot.val()) {
        updatedUser[key] = snapshot.val()[key];
      }
      setCurrUser(updatedUser);
      nav("TrackingMain");
    });
};

export const patchUserWater = (userId, water, wallet) => {
  const dbRef = ref(database);
  const usersRef = child(dbRef, `/Users/` + userId);
  update(usersRef, {
    water: { [getCurrentDate()]: water },
    wallet,
  });
  
export const patchWallet = (currUser, setCurrUser, cost) => {
  const dbRef = ref(database);
  const userRef = child(dbRef, `/Users/` + currUser.userId);
  let wallet = 0;
  setCurrUser((curr) => {
    const newWallet = { ...curr };
    newWallet.wallet += cost;
    wallet = newWallet.wallet;
    return newWallet;
  });
  update(userRef, {
    wallet: wallet,
  });
  console.log(currUser);
};

export const patchUserInventory = (itemObj, currUser, setCurrUser) => {
  const dbRef = ref(database, `/Users/` + currUser.userId + `/inventory`);
  console.log(currUser);
  const newItem = push(dbRef);
  set(newItem, itemObj);
  patchWallet(currUser, setCurrUser, -itemObj.itemCost);
};
