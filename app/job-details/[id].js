import { Stack, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native-web'
import { COLORS, icons } from '../../constants'
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import About from '../../components/jobdetails/about/About'
import Company from '../../components/jobdetails/company/Company'
import Tabs from '../../components/jobdetails/tabs/Tabs'
import Specifics from '../../components/jobdetails/specifics/Specifics'

const tabs = ["About", "Qualifications", "Responsibilities"]




const JobDetails = () => {

    const router = useRouter()
    const params = useGlobalSearchParams() // To get specific ID of the job-details page

    const { data, isLoading, error, refetch  } = useFetch('job-details',{
        job_id: params.id
    })


    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);
    }, [])
    
    const displayTabContent = () => {
        switch (activeTab) {
            case "About":
                return (
                    <About />
                )
            case "Qualifications":
                return (
                    <Specifics />
                )
            case "Responsibilities":
                return (
                    <Specifics />
                )
            default:
                return null
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: "",

                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                            />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share}
                            dimension="60%"
                            />
                    ),
                    
                }} 
            />

            <>
                <ScrollView 
                    showsVerticalScrollIndicator={true}
                    refreshControl={
                        //RefreshControl - to add pull to refresh functionality. 
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                >
                    {isLoading ? ( 
                        <ActivityIndicator size="large" color={COLORS.primary}/> //Loading animation
                    ) : error ? (
                        <Text>Something Went Wrong</Text>
                    ) : data.length === 0 ?(
                        <Text>There is no available data</Text>
                    ) : (
                        <View>
                           <Company 
                                companyLogo={data.employer_logo}
                                jobTitle={data.job_title}
                                companyName={data.employer_name}
                                location={data.job_country}
                           />

                           <Tabs
                                tabs={tabs} 
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                           />
                           {displayTabContent()}
                        </View>
                    )}
                </ScrollView>
            </>

           

        </SafeAreaView>
    )
}

export default JobDetails