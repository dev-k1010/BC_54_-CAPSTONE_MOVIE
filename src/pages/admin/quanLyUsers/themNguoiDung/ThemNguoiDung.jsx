import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { quanLyNguoiDungActions, themNguoiDung } from '../../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer'

export default function ThemNguoiDung() {
   const dispatch = useDispatch()
   const { register, handleSubmit } = useForm();
   const { errAddNguoiDung, addNguoiDung } = useSelector((state) => state.quanLyNguoiDungReducer);
   useEffect(() => {
      dispatch(quanLyNguoiDungActions.themNguoiDung())
   }, [])

   return (
      <div className=' p-3'>
         <p className='font-bold text-xl mb-3'>Thêm người dùng</p>
         <form
         onSubmit={handleSubmit(data => dispatch(themNguoiDung({ ...data, maNhom: 'GP00' })))}>
            {/* Tài khoản */}
            <div>
               <p className='m-0 font-bold'>Tài khoản</p>
               <input required {...register("taiKhoan")} type="text" className="border border-gray-500 w-full focus:outline-none px-2 py-1 " />
               <p className='m-0 text-red-500 h-5'>{errAddNguoiDung === 'Tài khoản đã tồn tại!' ? errAddNguoiDung : ''}</p>
            </div>
            {/* Mật khẩu */}
            <div>
               <p className='m-0 font-bold'>Mật khẩu</p>
               <input required {...register("matKhau")} type="password" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1" />
               <p className='m-0 text-red-500 h-5'></p>
            </div>
            {/* Email */}
            <div>
               <p className='m-0 font-bold'>Email</p>
               <input required {...register("email")} type="email" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1" />
               <p className='m-0 text-red-500 h-5'>{errAddNguoiDung === 'Email đã tồn tại!' ? errAddNguoiDung : ''}</p>
            </div>
            {/* Họ tên */}
            <div>
               <p className='m-0 font-bold'>Họ Tên</p>
               <input required {...register("hoTen")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1" />
               <p className='m-0 text-red-500 h-5'></p>
            </div>
            <div>
               <p className='m-0 font-bold'>Số điện thoại</p>
               <input required {...register("soDt")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1" />
               <p className='m-0 text-red-500 h-5'></p>
            </div>
            <div>
               <p className='m-0 font-bold'>Loại người dùng</p>
               <select {...register("maLoaiNguoiDung")} className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 ">
                  <option value="KhachHang">Khách hàng</option>
                  <option value="QuanTri">Quản trị</option>
               </select>
               <p className='m-0 text-red-500 h-5'></p>
            </div>

            <div className="lg:text-right mt-3 flex justify-between">
               <span className='text-green-500 text-xl'>{addNguoiDung && !errAddNguoiDung ? 'Thêm người dùng thành công!' : ''}</span>
               {addNguoiDung && !errAddNguoiDung ? '' : <button className="px-7 py-3 bg-gray-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-gray-800 transition duration-300">
                  Add User
               </button>}
            </div>
         </form>
      </div>
   )
}
