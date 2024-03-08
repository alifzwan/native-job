import { useGlobalSearchParams, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, View } from 'react-native'
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import { SIZES, icons } from '../../constants'
import NearbyJobCard from '../../components/common/cards/nearby/NearbyJobCard'
import styles from '../../components/common/header/screenheader.style'

const JobSearch = () => {
  const params = useGlobalSearchParams()
  const router = useRouter()

  const [searchResult, setSearchResult] = useState([])
  const [searchLoader, setSearchLoader] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [page, setPage] = useState(1)
  
  const handleSearch = async() => {
    setSearchLoader(true)
    setSearchResult([])

    try {
      const options = {
        method: "GET",
        url: `https://80b586ca-2344-4519-9d65-b5359fb80611.mock.pstmn.io`,
        params: {
          query: params.id ,
          page : page.toString()
        },
      };
      const response = await axios.request(options);
      setSearchResult(response.data.data)
    } catch (error){
      setSearchError(error)
      console.log(error, "Something went wrong")
    } finally {
      setSearchLoader(false)
    }
  }

  const handlePagination = (direction) => {
    if(direction === "left" && page > 1) {
      setPage(page - 1)
      handleSearch()
    } else if (direction === "right"){
      setPage(page + 1)
      handleSearch()
    }
  }
  
  useEffect(() => {
    handleSearch()
  }, [])
  



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen 
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => {
            <ScreenHeaderBtn 
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.push("/")}
            />
          }
        }}/>

      <FlatList 
        data={searchResult}
        renderItem={({ item })=> {
          <NearbyJobCard 
            job={item}
            handleNavigate={() => router.push(`/job-details${item.job_id}`)}
          />
        }}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{padding: SIZES.medium, rowGap: SIZES.medium}}

        ListHeaderComponent = {() => (
          <>
            <View style={style.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : searchError && (
                <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}

        ListFooterComponent ={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity 
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image 
                source={icons.chevronLeft}
                style={styles.paginationImage}
              />
            </TouchableOpacity>

            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>

            <TouchableOpacity 
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image 
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView> 
  )
}

export default JobSearch