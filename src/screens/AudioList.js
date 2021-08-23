import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";

const AudioList = () => {
  const { audioFiles, dataProvider } = useContext(AudioContext);

  const layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      dim.width = Dimensions.get("window").width;
      dim.height = 70;
    }
  );

  const rowRenderer = (type, item) => {
    return <Text>{item.filename}</Text>;
  };

  if (dataProvider.getSize() === 0) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  } else {
    return (
      // <ScrollView style={styles.container}>
      //   {audioFiles.map((item) => (
      //     <Text
      //       style={{
      //         padding: 10,
      //         borderBottomColor: "red",
      //         borderBottomWidth: 2,
      //       }}
      //       key={item.id}
      //     >
      //       {item.filename}
      //     </Text>
      //   ))}
      // </ScrollView>
      <View style={{ flex: 1 }}>
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default AudioList;
