import React, { memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
//import CardPhim from "../../../components/cardPhim/CardPhim";

function MovieList(props) {
  const [search, setSearch] = useSearchParams({ phimdangchieu: true });
  const navigate = useNavigate()
  const { listPhim } = props;

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container className="MovieList container pb-10 pt-5 overflow-hidden">
        <div
          className="m-auto text-center text-2xl text-5xl font-bold align-middle"
          style={{ maxWidth: 1200 }}
        >
          <hr />
          <span className="text-gray-500">MOVIE LIST</span>
        </div>
      <button
        onClick={() => setSearch({ phimdangchieu: true })}
        className={`text-lg transition duration-300 p-2 font-semibold rounded-lg shadow mr-2 hover:bg-white-500 ${
          search.get("phimdangchieu") === "true" ? "bg-gray-300" : "bg-white-300"
        }`}
      >
        Now showing
      </button>
      <button
        onClick={() => setSearch({ phimdangchieu: false })}
        className={`text-lg transition duration-300 font-semibold p-2 rounded-lg shadow hover:bg-white-500 ${
          search.get("phimdangchieu") === "false"
            ? "bg-gray-300"
            : "bg-white-300"
        }`}
      >
        Coming soon
      </button>
      <Slider {...settings} className="-mx-5">
        {[...listPhim]
          .reverse()
          .filter(
            (phim) => phim.dangChieu.toString() === search.get("phimdangchieu")
          )
          .map((phim, i) => (
            <div key={i}>
              <div className="p-5">
                <div className="shadow-lg border">
                  <div className="overflow-hidden">
                    <img
                      src={phim.hinhAnh}
                      alt=""
                      className="w-full h-[350px] "
                      title={phim.moTa}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <button
                      onClick={() => navigate(`/detail/${phim.maPhim}`)}
                      className="w-full font-bold transition duration-300 mb-0 bg-gray-300 text-lg p-1  shadow hover:bg-gray-700 "
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </Container>
  );
}
export default memo(MovieList);

const Container = styled.div`
  &.MovieList {
    .slick-prev {
      width: initial;
      height: initial;
      left: 20px;
      bottom: -35px;
      top: auto;
      &::before {
        color: black;
        font-size: 30px;
      }
    }
    .slick-next {
      width: initial;
      height: initial;
      bottom: -35px;
      right: 20px;
      top: auto;
      &::before {
        color: black;
        font-size: 30px;
      }
    }
  }
`;
