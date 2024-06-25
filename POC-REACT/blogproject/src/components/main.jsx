import "../style/style.css"
import SponseredNews from './sponseredNews'
import LeftComp from './leftComp'
import { useEffect, useState } from 'react'
import FeaturedTab from './featuredTab'

export let Main = () => {
    const [showSponsoredNews, setSponsoredNews] = useState([])
    const [showIsFeatured, setIsFeatured] = useState([])
    const categoryColor = {
        LifeStyle : "#d71b3b",
        Business : "#ff6e40",
        Marketing : "#12a4d9",
        Travel : "#cfb845",
        Technology : "#8a307f",
        Sports : "#05716c"
      }
    //   Color of the button according to the postCategory
    
    useEffect(() => {
        const allposts= JSON.parse(localStorage.getItem('createPost')) || [];
        const sponsoredNewsArray = allposts["sponsoredNews"] || []; 

        // Default to an empty array if "sponsoredNews" is undefined/null

        const latest_sponseredNews = sponsoredNewsArray.reverse().slice(0, 4);
        const IsFeaturedPosts = Object.values(allposts)
            .flatMap(postsArray => postsArray)
            .filter(post => post.isFeatured).reverse().slice(0,4);
            // Searches all arrays and finds where isFeatured is true

        setSponsoredNews(latest_sponseredNews)
        setIsFeatured(IsFeaturedPosts)
    }, [])

    return( <>
    
    {/* Featured Tab */}
    {/* Passing data via parameters to other components */}
    <FeaturedTab featuredTab={showIsFeatured} categoryColor={categoryColor}/>    
    <LeftComp/>    
    <SponseredNews sponsoredNews={showSponsoredNews} categoryColor={categoryColor}/>
    
</>
    
)}