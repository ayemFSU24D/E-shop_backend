
import { useContext } from "react";
import "./../Styles/Layout.css";
import { NavLink, Outlet } from "react-router";
import { CartContext } from "../contexts/CartContext";
export const Layout=()=>{
    const { totalItems} = useContext(CartContext);
   /*  const {cart, cartDispatch} = useContext(CartContext); */
   return ( 

       <>
<header>

    <nav>
    <ul>
        <li>
            <NavLink to={"/"} >Hem</NavLink>
        </li>

        <li>
            <NavLink to={"/shop"} >Shop</NavLink>
        </li>

        <li>
            <NavLink to={"/admin"} >Admin</NavLink>
        </li>

        <li>
            <NavLink to={"/cart"} >🛒{totalItems > 0 && `${totalItems}`} </NavLink>
        </li>

        <li>
            <NavLink to={"/Contact"} >Kontakta oss</NavLink>
        </li>
    </ul>
</nav>
</header>

<main>
    <Outlet/>
</main>
<footer>
        <div>Social media</div>
        <div>Karta</div>
        <div>Kontaktinfo</div>
      </footer>
</>
    ) 
} 




/* import { NavLink, Outlet } from "react-router"
import "./../styles/layout.css";
import { useAuth0 } from "@auth0/auth0-react"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
    Image,
} from "@heroui/react";
import { useState } from "react";

export const Layout=()=>{
    const { loginWithRedirect, logout, isAuthenticated, user} = useAuth0()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL

    const pages = [
        {name: "Home", href: "/"},
        {name: "Contact", href: "/contact"},
        {name: "Bookings", href: "/bookings"},
        ...(isAuthenticated && !isAdmin ? [{name: "Customer Bookings", href: "/customer-bookings"}] : []),
        ...(isAuthenticated && isAdmin ? [{name: "Admin Bookings", href: "/admin-bookings"}] : []),
    ];

    const handleLogin = () => {
        loginWithRedirect({
            authorizationParams: {
                prompt: 'login',
            },            
        });
    };


    const handleLogout = () => {
        logout({ logoutParams: {returnTo: window.location.origin} })
        }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-onyx text-white-smoke p-4">
                <Navbar onMenuOpenChange={setIsMenuOpen}>
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="md:hidden"
                        />
                    <NavbarBrand>
                    <Image
                        alt="Ren&RipaLogo"
                        src="./Logo-footer.png"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                        <p className="font-bold text-inherit"></p>
                    </NavbarBrand>
                    </NavbarContent>
            
                    <NavbarContent className="hidden md:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/">
                        Hem
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link aria-current="page" href="/Contact">
                        Contact
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/Booking">
                        Bookings
                        </Link>
                    </NavbarItem>
                    {isAuthenticated &&(
                        <NavbarItem>
                            <Link color="foreground" href="/CustomerBookings">
                                Customer Bookings
                            </Link>
                        </NavbarItem>
                    )}
                    {isAuthenticated && user?.email === import.meta.env.VITE_ADMIN_EMAIL &&(
                        <NavbarItem>
                            <Link color="primary" href="/AdminBookings">
                                Admin Bookings
                            </Link>
                        </NavbarItem>
                    )}
                    </NavbarContent>
                    <NavbarContent justify="end">
                        {!isAuthenticated ? (
                            <>
                                <NavbarItem >
                                    <Button color="primary" onPress={handleLogin}>
                                        Login
                                    </Button>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button as={Link} color="primary" href="/signup" variant="flat">
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </>
                        ):(
                            <NavbarItem>
                                <Button color="primary" onPress={handleLogout}>
                                    Logout
                                </Button>
                            </NavbarItem>
                        )}
                    </NavbarContent>
                    <NavbarMenu>
                    {pages.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className="w-full"
                            color={index === 2 ? "primary" : index === pages.length - 1 ? "danger" : "foreground"}
                            href={item.href}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                        </NavbarMenuItem>
                    ))}
                    </NavbarMenu>
                </Navbar>
            </header>

        
            <main className="flex-grow">
                <Outlet />
            </main>
        

            <footer className="flex flex-col bg-onyx text-white-smoke p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
                    <div className="mb-4 md:mb-0 md:w-1/3 text-left">
                        <ul className="text-left">
                            <li>Ren & Ripa</li>
                            <li>84599</li>
                            <li>(63.0641955, 12.5419728)</li>
                            <li>Jämtland-Härjedalen</li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0 md:w-1/3 flex justify-center">
                        <Image
                            alt="Ren&RipaLogo"
                            src="./Logo-footer.png"
                            width={200}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <nav className="md:w-1/3 flex justify-center">
                    <ul className="flex flex-col items-start space-y-2">
                        <li>
                            <NavLink to="/" className="hover:text-rusty-red transition duration-300 text-lg">
                                Hem
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Contact" className="hover:text-white-smoke transition duration-300 text-lg">
                                Kontakt
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Booking" className="hover:text-rusty-red transition duration-300 text-lg">
                                Boka
                            </NavLink>
                        </li>
                    </ul>
                    </nav>
                </div>
                <p className="text-center mt-4">&copy; 2025 Ren & Ripa. Alla rättigheter förbehållna.</p>
            </footer>
        </div>
    )
} */
    