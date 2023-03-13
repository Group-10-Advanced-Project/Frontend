import { Outlet } from "react-router-dom";

const Layout =()=>{
    return( 
        <main className="App">
            <Outlet /> 
            {/* represent all the children of the layout component */}
        </main>
    )
}

export default Layout 