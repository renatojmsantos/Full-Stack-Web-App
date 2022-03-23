

import Items from './pages/Items';
import Error404 from './pages/Error404';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Stock from './pages/Stock';

import { Navigate,BrowserRouter,Routes, Route} from 'react-router-dom';
import { Component } from 'react';


class Pages extends Component{
    render() {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="items" element={<Items />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="404" element={<Error404 />} />
                    <Route path="/" element={<Navigate to="/orders" />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </BrowserRouter>
        );      
    }    
};

export default Pages;