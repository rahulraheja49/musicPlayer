import React, { createContext, useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { DataProvider } from "recyclerlistview";

export const AudioContext = createContext();

export default function AudioProvider(props) {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files", [
      {
        text: "Grant Access",
        onPress: () => getPermission(),
      },
      {
        text: "Cancel",
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    // console.log(media.assets.length);

    setDataProvider(
      dataProvider.cloneWithRows([...audioFiles, ...media.assets])
    );
    setAudioFiles([...audioFiles, ...media.assets]);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    // console.log(permission);
    if (permission.granted) {
      getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        permissionAlert();
      }

      if (status === "granted") {
        getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        setPermissionError(true);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (permissionError)
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
          You haven't granted the required permissions
        </Text>
      </View>
    );
  return (
    <AudioContext.Provider value={{ audioFiles, dataProvider }}>
      {props.children}
    </AudioContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
