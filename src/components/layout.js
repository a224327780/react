import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className="bg-gray-800 min-h-screen">
            <div className="bg-white">
                <div className="container mx-auto">
                    <h1 className="py-4 text-3xl">NodeQuery</h1>
                </div>
            </div>
            <div className="container mx-auto py-8">
                <Outlet/>
            </div>
        </div>
    );
}