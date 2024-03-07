import { Stack, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native-web'
import { COLORS, SIZES, icons } from '../../constants'
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import About from '../../components/jobdetails/about/About'
import Company from '../../components/jobdetails/company/Company'
import Tabs from '../../components/jobdetails/tabs/Tabs'
import Specifics from '../../components/jobdetails/specifics/Specifics'
import Footer from '../../components/jobdetails/footer/Footer'

const tabs = ["About", "Qualifications", "Responsibilities"]

const JobDetails = () => {

    // useLocalSearchParams  - Returns the search parameters for the current component. 
    //                         It only updates when the global URL conforms to the route.
    // useGlobalSearchParams - Returns the global URL regardless of the component. 
    //                         It updates on every search param change and might cause components to update extraneously in the background

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
                    <About info={data[0].job_description ?? "No data available"}/>
                )
            case "Qualifications":
                return (
                    <Specifics 
                    title="Qualifications"
                    details={data[0].job_highlights?.Qualifications ?? "There's no data available"}/>
                )
            case "Responsibilities":
                return (
                    <Specifics 
                    title="Responsibilities"
                    details={data[1].job_highlights?.Responsibilities ?? "There's no data available"}/>
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
                            handlePress={() => router.push("/")}
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
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                           <Company 
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
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
                <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetails