import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lists from "./components/lists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Lists />} />
                <Route path="/:id" element={<Home />} />
            </Route>
        </Routes>
    );
}

function Home() {
    return <h2>Home</h2>;
}


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

