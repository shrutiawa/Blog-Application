
// import {createRoot} from "react-dom/client"
// import { App } from "./components/app";


import React, { useEffect, useState } from 'react';



// <<<<<<< ramya
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/loginForm';
// import App from './components/app'; 

// const Root = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<LoginForm />} />
//         <Route path="/" element={<App />} />
//       </Routes>
//     </Router>
//   );
// };

// createRoot(document.getElementById('root')).render(<Root />);




// =======

// import {createRoot} from "react-dom/client"
// import App from "./components/app";
// import CommentsComp from "./components/comments";

// import { PostList } from "./components/posts";

// createRoot(document.getElementById("root")).render(<PostList/>);



// =======

import { createRoot } from 'react-dom/client';
import Root from "./components/root"
import LeftComp from './components/leftComp';
createRoot(document.getElementById("root")).render(<Root/>);



