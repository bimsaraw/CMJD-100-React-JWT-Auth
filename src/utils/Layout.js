import { Outlet } from "react-router-dom"

const Layout = () => {


    const handleShoppingCart = () => {

        localStorage.setItem("cart",cart);

        localStorage.getItem('cart');
    }

    return (
        <>
            <div className="navbar">Navigation</div>
                <Outlet />
                {/*  Displaying Child elements */}
            <footer>This is footer</footer>
        </>
    )
}

export default Layout;