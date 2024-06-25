import React from 'react';
import RecentPostComp from './recentPostComp';
import AdvertisementComp from './advertisementComp';

function RightComp({recentPosts}) {
  // console.log(recentPosts)
  return (
    <div className="right">
      <div className="recent-post">
        <h3>Recent post</h3>
        <RecentPostComp recentPosts={recentPosts}/>
      </div>
      <div className="advertisement">
        <AdvertisementComp />
      </div>
    </div>
  );
}

export default RightComp;
