import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import Categories from '../components/Categories'
import HeaderTabs from '../components/HeaderTabs'
import RestaurantItems from '../components/RestaurantItems'
import SearchBar from '../components/SearchBar'
import { localRestaurants } from '../data/localRestaurants'

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState('San Francisco');
  const [activeTab, setActiveTab] = useState('Delivery');

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      }
    }

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(
        json.businesses.filter((business) => 
          business.transactions.includes(activeTab.toLowerCase())
        )
      )
    );
  }
  
  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: '#eee', flex: 1 }}>
      <View style={{ backgroundColor: 'white', padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity}/>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Categories/>
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  )
}
