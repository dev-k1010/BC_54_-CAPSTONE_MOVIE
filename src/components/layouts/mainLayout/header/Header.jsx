import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungActions } from "../../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer";
import { UserLogin } from "../../../../constants/api";
import { quanLyDatVeActions } from "../../../../stores/quanLyDatVeReducer/quanLyDatVeReducer";

export default function Header() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const nguoiDung = JSON.parse(localStorage.getItem(UserLogin));
   const [navbar, setNavbar] = useState(false);

   return (
      <header className="Header py-2 bg-white fixed top-0 z-10 w-full">
         <div className="container">
            <div className="justify-between lg:items-center lg:flex">
               <div>
                  <div className="flex items-center justify-between lg:block">
                     <NavLink to="home">
                        <img className="w-10" src="https://cdn.icon-icons.com/icons2/3380/PNG/512/film_youtube_video_movie_social_media_multimedia_icon_212509.png" alt="" />
                     </NavLink>
                     <div className="lg:hidden">
                        <button className="p-2 text-black rounded-md outline-none border" onClick={() => setNavbar(!navbar)}>
                           {navbar ? <AiOutlineClose /> : <AiOutlineMenu />}
                        </button>
                     </div>
                  </div>
               </div>
               <div>
                  <div className={`flex-1 justify-self-center py-3 lg:block lg:py-0 ${navbar ? "block" : "hidden"}`}>
                     <ul className="items-center justify-center space-y-2 lg:flex lg:space-x-6 lg:space-y-0 mb-0 font-bold text-xl">
                        <li>
                           <NavLink  to='home' className="text-black hover:text-gray-600">
                              Trang chủ
                           </NavLink>
                        </li>
                        <li>
                           <NavLink  to="tintuc" className="text-black hover:text-gray-600">
                              Tin tức
                           </NavLink>
                        </li>
                        <li>
                           <NavLink  to="lienhe" className="text-black hover:text-gray-600">
                              Liên hệ
                           </NavLink>
                        </li>
                     </ul>

                     <div className="mt-3 space-x-2 lg:hidden ">
                        {nguoiDung ? (
                           <div className="inline-block space-x-2">
                              <NavLink  to="profile" className="inline-block text-lg rounded-lg px-6 py-2 text-white bg-gray-800 hover:bg-gray-500 hover:text-white transition duration-300">
                                 Chào! {nguoiDung.taiKhoan}
                              </NavLink>
                              <button onClick={() => {
                                 dispatch(quanLyNguoiDungActions.dangXuat());
                                 dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
                                 navigate("/home");
                              }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                                 Đăng xuất
                              </button>
                              {nguoiDung.maLoaiNguoiDung === 'QuanTri' ? <NavLink to="/admin/films" className="inline-block px-4 py-2 text-white bg-gray-800 rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                                 Page Admin
                              </NavLink> : ''}
                           </div>
                        ) : (
                           <div className="inline-block space-x-2">
                              <NavLink to="/user/login" className="inline-block px-4 py-2 text-center text-white bg-gray-800 rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                                 Đăng nhập
                              </NavLink>
                              <NavLink to="/user/register" className="inline-block px-4 py-2 text-black bg-dark rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                                 Đăng kí
                              </NavLink>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="hidden lg:block">
                  {nguoiDung ? (
                     <div className="inline-block space-x-2">
                        <NavLink to="profile" className="inline-block text-lg rounded-lg px-6 py-2 text-white bg-gray-800 hover:bg-gray-500 hover:text-white transition duration-300">
                           Hello! {nguoiDung.taiKhoan}
                        </NavLink>
                        <button onClick={() => {
                           dispatch(quanLyNguoiDungActions.dangXuat());
                           dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
                           navigate("/home");
                        }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                           Đăng xuất
                        </button>
                        {nguoiDung.maLoaiNguoiDung === 'QuanTri' ? <NavLink to="/admin/films" className="inline-block px-4 py-2 text-white bg-gray-800 rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                           Page Admin
                        </NavLink> : ''}
                     </div>
                  ) : (
                     <div className="inline-block space-x-2">
                        <NavLink to="/user/login" className="inline-block px-4 py-2 text-center text-white bg-gray-800 rounded-md shadow hover:bg-white-500 hover:text-white transition duration-300">
                           Đăng nhập
                        </NavLink>
                        <NavLink to="/user/register" className="inline-block px-4 py-2 text-black bg-gray rounded-md shadow hover:bg-gray-500 hover:text-white transition duration-300">
                           Đăng kí
                        </NavLink>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
}
