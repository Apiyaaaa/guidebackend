import Viewarticle from "../components/Viewarticle/Viewarticle";
import Viewtags from "../components/Viewtags/Viewtags";
import Viewusers from "../components/Viewusers/Viewusers";
import Overview from "../components/Overview";
import Home from '../Home/Home';
import {Navigate} from 'react-router-dom'

export default [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/overview',
                element: <Overview />
            },
            {
                path: '/articlesManagement',
                element: <Viewarticle />
            },
            {
                path: '/tagsManagement',
                element: <Viewtags />
            },
            {
                path: '/usersManagement',
                element: <Viewusers />
            },
            {
                path: '/',
                element: <Navigate to ='/overview' />
            },

        ]
    }

]