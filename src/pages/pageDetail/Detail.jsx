import { Rate, Tabs } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { layThongTinLichChieuPhim } from "../../stores/quanLyRapReducer/quanLyRapReducer";
import { AiFillPlaySquare } from "react-icons/ai";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { UserLogin } from "../../constants/api";

export default function PhimDetail() {
  const [position, setPosition] = useState("left");
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lichChieuPhim } = useSelector((state) => state.quanLyRapReducer);

  window.onresize = () => {
    if (window.innerWidth <= 768) {
      setPosition("top");
    } else {
      setPosition("left");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(layThongTinLichChieuPhim(param.maphim));
  }, []);

  return (
    <Container
      className="PhimDetail bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${lichChieuPhim.hinhAnh})` }}
    >
      <div
        className="pt-20 pb-5 backdrop-blur-[12px]"
        style={{ backgroundColor: "#00000087" }}
      >
        <div className="container text-white">
          <div className="py-3 grid sm:grid-cols-2 md:grid-cols-5">
            <div className="md:col-span-1">
              <img src={lichChieuPhim.hinhAnh} alt="" className="w-full" />
            </div>
            <div className="md:col-span-3 sm:px-3 pt-3 sm:pt-0">
              <p className="text-3xl font-semibold text-amber-500 m-0">
                {lichChieuPhim.tenPhim}
              </p>
              <p className="text-lime-500">
                Ngày khởi chiếu:
                <span className="text-yellow-600 font-normal">
                  {moment(lichChieuPhim.ngayKhoiChieu).format("DD.MM.YYYY")}
                </span>
              </p>
              <p className="text-lime-500 ">
                Tình trạng:
                <span className="text-yellow-600 font-normal ">
                  {lichChieuPhim.dangChieu ? " Đang chiếu" : " Sắp chiếu"}
                </span>
              </p>
              <p className="text-lime-500 ">
               Mô tả:
               <span className="text-gray-300 text-base"> {lichChieuPhim.moTa}</span>
               </p>
              <a
                href={lichChieuPhim.trailer}
                target="blank"
                className="py-3 px-5 rounded-lg text-white bg-amber-500 text-lg hover:bg-amber-300 hover:text-black transition duration-300 flex items-center w-fit"
              >
                <AiFillPlaySquare className="inline-block text-xl" />{" "}
                <span className="">Trailer</span>
              </a>
            </div>
            <div className=" md:col-span-1 pt-3 md:pt-0 text-center">
              <div className="mb-5">
                <Rate
                  allowHalf
                  disabled
                  value={(5 / 10) * lichChieuPhim.danhGia}
                />
              </div>
              <div className="w-36 m-auto">
                <CircularProgressbar
                  background
                  value={lichChieuPhim.danhGia * 10}
                  text={`${lichChieuPhim.danhGia * 10}%`}
                  styles={buildStyles({
                    textSize: "20px",
                    pathColor: "#f59e0b",
                    textColor: "#f59e0b",
                    trailColor: "#bebdbd",
                    backgroundColor: "#00000033",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="bg-white">
            <Tabs
              tabPosition="top"
              centered
              items={[
                {
                  key: "1",
                  label: (
                    <span className="text-xl font-semibold">Lịch chiếu</span>
                  ),
                  children: (
                    <Tabs
                      tabPosition={position}
                      items={lichChieuPhim.heThongRapChieu?.map(
                        (heThong, i) => {
                          return {
                            key: i,
                            label: (
                              <img src={heThong.logo} alt="" className="w-20" />
                            ),
                            children: (
                              <div>
                                {heThong.cumRapChieu.map((cumRap, i) => (
                                  <div key={i} className="border-b py-2">
                                    <div className="flex">
                                      <img style={{width:55, height: 55}}
                                        src={cumRap.hinhAnh}
                                        alt=""
                                        className="w-20"
                                      />
                                     <p className="text-green-800 ms-3" style={{marginLeft: 2}}>{cumRap.diaChi}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 mt-2 justify-items-start">
                                      {cumRap.lichChieuPhim
                                        .slice(0, 12)
                                        .map((lichChieu, i) => (
                                          <button
                                            onClick={() => {
                                              localStorage.getItem(UserLogin)
                                                ? navigate(
                                                    `/ticket/${lichChieu.maLichChieu}`
                                                  )
                                                : navigate("/user/login");
                                            }}
                                            key={i}
                                            className="  text-start px-3 py-1 rounded-md font-medium hover:bg-slate-200 transition duration-300"
                                                style={{
                                                  backgroundColor: "#DCD7C9",
                                                }}
                                          >
                                             <span className="">
                                                  {moment(
                                                    lichChieu.ngayChieuGioChieu
                                                  ).format("DD-MM-YYYY")}{" "}
                                                  ~
                                                </span>
                                                <span className="text-red-500">
                                                  {moment(
                                                    lichChieu.ngayChieuGioChieu
                                                  ).format("hh:mm")}
                                                </span>
                                          </button>
                                        ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ),
                          };
                        }
                      )}
                    />
                  ),
                },
                {
                  label: (
                    <span className="text-xl font-semibold">Thông tin</span>
                  ),
                  key: "2",
                  children: "Content 1",
                },
                {
                  label: (
                    <span className="text-xl font-semibold">Đánh giá</span>
                  ),
                  key: "3",
                  children: "Content 1",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  &.PhimDetail {
    .ant-tabs-top > .ant-tabs-nav::before {
      border: none;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #f59e0b;
    }
    .ant-tabs-ink-bar {
      background-color: #f59e0b;
    }
    .ant-tabs-tab:hover {
      color: #f59e0b;
    }
  }
`;
