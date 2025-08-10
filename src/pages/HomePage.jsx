import React from 'react'
import Navbar from '../components/Navbar'
import CategoryChips from '../components/CategoryChips'
import PopularPlaces from '../components/PopularPlaces'
import MoodSuggestions from '../components/MoodSuggestions'
import WeatherSuggestions from '../components/WeatherSuggestions'
import LocalBuzzMap from '../components/LocalBuzzMap'
import TopReviewsCarousel from '../components/TopReviewsCarousel'
import HiddenGems from '../components/HiddenGems'
import LocalTopPicks from '../components/LocalTopPicks'
import SmartPlan from '../components/SmartPlan'
import TrendingReels from '../components/TrendingReels'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div>
            
            <Navbar />
            <PopularPlaces />
            <MoodSuggestions/>
            {/* <WeatherSuggestions/> */}
            <LocalBuzzMap/>
            <TopReviewsCarousel/>
            <HiddenGems/>
            <LocalTopPicks/>
            <SmartPlan/>
            {/* <TrendingReels/> */}
            <Footer/>
        </div>
    )
}

export default HomePage