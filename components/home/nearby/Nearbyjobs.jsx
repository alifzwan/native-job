import React from "react";
import { View, Text } from "react-native";
import styles from "./nearbyjobs.style";
import { ActivityIndicator, TouchableOpacity } from "react-native-web";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useRouter } from "expo-router";
import useFetch from "../../../hook/useFetch";



const Nearbyjobs = () => {
  const router = useRouter()
  const {data, isLoading, error} = useFetch("search",{
      query:"React Developer",
      num_pages: "1"
  })

  return (
    <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nearby jobs</Text>

          <TouchableOpacity>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
          ) : error?(
            <Text>Something Went Wrong</Text>
          ):(
            data?.map((job) => (
              <NearbyJobCard 
                job={job}
                key={`nearby-job-${job.job_id}`}
                handleNavigate={() => router.push(`/job-detail-${job.job_id}`)}
              />
            )) 
          )}
        </View>
    </View>
  );
};

export default Nearbyjobs;
