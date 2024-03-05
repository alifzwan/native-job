
import { Stack , useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn'
import { ScrollView } from 'react-native-web'


const Home = () => {
  const router = useRouter()
  return (
   <SafeAreaView style ={{flex:1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle:{ backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl ={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl ={icons.profile} dimension="100%" />
          ),
          headerTitle: ""
        }}
      />

      <ScrollView showVerticalScrollIndicator={false}>
        <View 
          style={{
            flex:1, padding:SIZES.medium
          }}
        >
          <Welcome />

        </View>
      </ScrollView>
   </SafeAreaView>
  )
}

export default Home