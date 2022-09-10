import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBed,
  faCar,
  faCartFlatbedSuitcase,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useContext, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
const Header = ({ show }) => {
  const [openCalender, setOpenCalender] = useState(false);
  const [openVisitor, setOpenVisitor] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [adult, setadult] = useState(1);
  const [children, setchildren] = useState(0);
  const [room, setroom] = useState(1);
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, adult, children, room },
    });
    navigate("/hotels", {
      state: { destination, dates, adult, children, room },
    });
  };

  return (
    <div className={show ? "header" : "header notshow"}>
      <div className="header_container">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rental</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
            <span>Airport Taxi</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUser} />
            <span>Attraction</span>
          </div>
        </div>
        {show && (
          <>
            <h2 className="headerTitle">
              A lifetime of discouts? It's Genius.
            </h2>
            <p1 className="headerDescription">
              Get reward for your travels - Search low prices on hotels, homes
              and much more
            </p1>
            <div>
              <button className="headerBtn">Sign In / Register</button>
            </div>
            <div className="headerSearchContainer">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <input
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                  placeholder="Where are You Going?"
                  className="headerSearchInput"
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerSearchIcon"
                />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenCalender(!openCalender)}
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")}`} To{" "}
                  {`${format(dates[0].endDate, "dd/MM/yyyy")}`}
                </span>
                {openCalender && (
                  <DateRange
                    className="calenderModalContainer"
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    direction="horizontal"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faUser} className="headerSearchIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenVisitor(!openVisitor);
                  }}
                >
                  {adult} adult {children} children {room} room
                </span>
                {openVisitor && (
                  <div className="visitersModalContainer">
                    <div className="category">
                      <p>Adults</p>
                      <p>
                        Children <br />
                      </p>
                      <p>Rooms</p>
                    </div>
                    <div className="visitorsCount">
                      <div className="decrement">
                        <button
                          disabled={adult <= 0}
                          onClick={() => setadult(adult - 1)}
                        >
                          -
                        </button>
                        <button
                          disabled={children <= 0}
                          onClick={() => setchildren(children - 1)}
                        >
                          -
                        </button>
                        <button
                          disabled={room <= 0}
                          onClick={() => setroom(room - 1)}
                        >
                          -
                        </button>
                      </div>
                      <div className="count">
                        <p>{adult}</p>
                        <p>{children}</p>
                        <p>{room}</p>
                      </div>
                      <div className="increment">
                        <button onClick={() => setadult(adult + 1)}>+</button>
                        <button onClick={() => setchildren(children + 1)}>
                          +
                        </button>
                        <button onClick={() => setroom(room + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleSearch}
                  disabled={!destination}
                  className="headerSearchButton"
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
