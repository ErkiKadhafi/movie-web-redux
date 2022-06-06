import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="bg-gray-gray/900 font-poppins">
                <div className="bg-backgroundMain ">{children}</div>
            </div>
        </>
    );
};

export default Layout;
