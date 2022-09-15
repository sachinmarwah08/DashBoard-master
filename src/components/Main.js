// import React, { useContext, useEffect, useState } from "react";
import LineChart from "./Charts/LineChart";
import ContryRanking from "./ContryRanking";
import Footer from "./Layouts/Footer/Footer";
import GlobalWellbeing from "./GlobalWellbeing";
import Header from "./Layouts/Header/Header";
import NewsAndHashTags from "./NewsAndHashTags";
import TrendingHashtags from "./TrendingHashtags/TrendingHashtags";
import DashboardFilter from "./DashboardFilter/DashboardFilter";
import FilterProvider from "../context/FilterContext";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
// import { PuffLoader } from "react-spinners";
// import { useEffect, useState } from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { getUsers } from "./../api";
import { getInfluencers } from "../actions/TopInfluencerApis";

const Main = () => {
  // const [users, setUsers] = useState([]);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     setLoading(true);
  //     let fromDate = "2022-09-01";
  //     let toDate = "2022-09-12";
  //     const newUsers = await getInfluencers(fromDate, toDate, page);
  //     setUsers((prev) => [...prev, ...newUsers.influencers]);
  //     setLoading(false);
  //   };
  //   loadUsers();
  // }, [page]);

  // const observer = useRef();
  // const lastUserRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPage((page) => page + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading]
  // );

  // const userList = users.map((item, index) =>
  //   users.length === index + 1 ? (
  //     <li ref={lastUserRef} key={index}>
  //       {item}
  //     </li>
  //   ) : (
  //     <li key={index}>{item}</li>
  //   )
  // );
  return (
    <>
      {/* <div>
        <div>
          <ul>
            <li>{users && userList}</li>
          </ul>
        </div>
      </div>

      {loading && "loading"} */}
      <FilterProvider>
        <Header />
        <GlobalWellbeing />
        <DashboardFilter />
        <ContryRanking />
        <NewsAndHashTags />
        <TrendingHashtags />
        <LineChart />
        <Footer />
      </FilterProvider>
    </>
  );
};

export default Main;
