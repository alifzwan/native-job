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

  const {data, isLoading, error} = useFetch("search", {
      query:"web developer in texas usa",
      num_pages: "1"
  })

  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
             Popular Jobs
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
                  selectedJob={selectedJob}
                  handleCardPress = {handleCardPress}
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
