import Navbar from "../components/Navbar";
import PostBoard from "../components/PostBoard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Home() {
    return (
        <>
            <Navbar />
            <div style={{ margin: "12vh" }}>
                <PostBoard />
            </div>
            i
        </>
    );
}

export default Home;
