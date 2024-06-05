import React from "react";
import HomeContent from "./homecontent";
import Hero from "./hero";
import Footer from "./footer";

export default function HomePage () {
    return (

        <>
        <div className=" h-screen overflow-y-auto" >

            <Hero/>
            <HomeContent/>
            <Footer/>
            
        </div>



        </>

    );

}