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

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter()
  const [activeJobType, setActiveJobType] = useState("Full-Time")
  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.userName}>Welcome Alif</Text>
            <Text style={styles.welcomeMessage}>Find your perfect job</Text>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput 
                style={styles.searchInput} 
                value=""
                placeholder="What are you looking for?"
                onChangeText={(text) => setSearchTerm(text)}
              />
            </View>

            <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
              <Image 
                source={icons.search}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <FlatList 
            data={jobTypes} 
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.tab(activeJobType, item)} 
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>
                  {item}
                </Text>
              </TouchableOpacity>
            )} 
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          />
        </View>
        
    </View>
  );
};

export default Welcome;
