import React from "react";
import Featured from "../../component/featured/Featured";
import Navbar from "../../component/navbar/Navbar";
import Header from "../../component/header/Header";
import "./home.css";
import PropertyList from "../../component/propertyList/PropertyList";
import FeaturedProperties from "../../component/featuredProperties/FeaturedProperties";
import MailList from "../../component/mailList/MailList";
import Footer from "../../component/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header show={true} />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browser by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
