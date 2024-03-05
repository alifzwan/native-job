

import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native-web";
import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES, icons } from "../../../constants";
import { useState } from "react";

const jobTypes =[
  "Full-time",
  "Part-time",
  "Contract"
]



const Welcome = () => {
  const router = useRouter()
  const [activeJobType, setActiveJobType] = useState("Full-Time")
  return (
    <View>
      <View style={styles.container}>
          <Text style={styles.userName}>Hello Alif</Text>
          <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput 
              style={styles.searchInput} 
              value=""
              placeholder="What are you looking for?"
              onChange={() => {}}/>
          </View>

          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
            <Image 
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}/>
          </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes} 
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)} 
              onPress={() => {setActiveJobType(item), router.push(`/search/${item}`)}}
            >
              <Text style={styles.tabText(activeJobType, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )} 
          keyExtractor={(item) => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
        />
          
      </View>
    </View>
  );
};

export default Welcome;
