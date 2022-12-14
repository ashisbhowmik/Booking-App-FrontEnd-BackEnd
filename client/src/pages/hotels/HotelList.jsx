import React, { useState } from "react";
import Navbar from "./../../component/navbar/Navbar";
import Header from "./../../component/header/Header";
import { useLocation } from "react-router-dom";
import "./hotellist.css";
import { format } from "date-fns";
import SearchItem from "./../../component/searchItem/SearchItem";
import { DateRange } from "react-date-range";
import useFetch from "./../../hooks/useFetch";

const HotelList = () => {
  const location = useLocation();
  const [destination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);
  const [adult] = useState(location.state.adult);
  const [children] = useState(location.state.children);
  const [room] = useState(location.state.room);
  // console.log(location);

  const { data, loading, error, reFetch } = useFetch(
    `/api/hotels?city=${destination}&min=${min}&max=${max}`
  );

  const handleClick = async () => {
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header show={false} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                    placeholder={min}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    placeholder={max}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading || data.length === 0
              ? "no hotel available in this city, please search for nearby city.."
              : data.map((item, i) => (
                  <SearchItem
                    key={i}
                    imageUrl="https://bit.ly/3wNqoDn"
                    item={item}
                  />
                ))}
            {/* <SearchItem imageUrl="https://bit.ly/3Rdtzws" />
            <SearchItem imageUrl="https://bit.ly/3cCRfLN" />
            <SearchItem imageUrl="https://bit.ly/3Qbk67z" />
            <SearchItem imageUrl="https://bit.ly/3Q3uqP3" />
            <SearchItem imageUrl="https://bit.ly/3Tt5WBw" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
