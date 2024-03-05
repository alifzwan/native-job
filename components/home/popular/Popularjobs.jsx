import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native-web";
import styles from "./popularjobs.style";
import { router, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import { FlatList } from "react-native";
import { useState } from "react";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch"



const Popularjobs = () => {
  const router = useRouter()

  const {data, isLoading, error} = useFetch(
    "search",
    {
      query:"React Developer",
      num_pages: "1"
    }
  )

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
             Jobs
          </Text>

          <TouchableOpacity>
              <Text style={styles.headerBtn}>
                Show All
              </Text>
          </TouchableOpacity>

        </View>

      <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary}/>
          ) : error ?(
            <Text>Something went wrong</Text>
          ) : (
            <FlatList  
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard 
                  item={item}
                />
              )}
              keyExtractor={(item) => item.job_id}
              contentContainerStyle={{columnGap:SIZES.medium}}
              horizontal
            />  
           
          )}
      </View>
    </View>
  );
};

export default Popularjobs;
