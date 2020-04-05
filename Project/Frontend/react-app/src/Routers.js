import React from 'react';
import Index from './pages/index/Index';
import NotFoundPage from './pages/index/NotFoundPage';

const Routers = [
    {
        path:'/',
        exact:true,
        main:()=> <Index></Index>
    },
    {
        path:'',
        exact:false,
        main:()=><NotFoundPage></NotFoundPage>
    }
]

export default Routers;