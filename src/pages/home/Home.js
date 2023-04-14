import './Home.css';
import '../../index.css'
import React from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../../components/button/button";
import Footer from "../../components/footer/Footer";

export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/drop-your-demo");
    }

    return (
        <>
            <NavigationBar/>
            <body className="page-body">
            <section className="outer-container first-outer-container">
                <article className="inner-container first-section">
                    <Button onClick={handleClick} button_content="Drop your demo here" bigOrSmall="big-button"/>
                </article>
            </section>

            <section className="outer-container">
                <article className="inner-container">
                    <h2>About Elevate Records</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda corporis eaque
                        inventore laudantium libero molestias officia, officiis qui ratione rem saepe similique
                        suscipit? Adipisci alias asperiores consectetur cum cumque debitis dicta dignissimos dolorem et
                        exercitationem expedita fugiat harum, illum impedit incidunt, inventore iure molestiae mollitia
                        necessitatibus nesciunt nobis possimus quasi quidem repellat repudiandae sint soluta tempore
                        tenetur unde voluptas. Dolores fuga in ipsa possimus. Architecto labore obcaecati pariatur. Amet
                        aspernatur consectetur cum cumque delectus, impedit incidunt iure laudantium molestias
                        perferendis placeat quas quia quis ratione reprehenderit temporibus unde, ut. Aut culpa cum
                        dolorem illum in necessitatibus quis repellendus veritatis! </p>
                    <Button onClick={handleClick} button_content="Drop your demo here" bigOrSmall="small-button"/>
                </article>
            </section>

            {/*ADD FOOTER*/}
            </body>
            <Footer />
        </>
    )
}