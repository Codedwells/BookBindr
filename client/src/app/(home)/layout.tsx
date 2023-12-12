import NavBar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}

export default Layout;
