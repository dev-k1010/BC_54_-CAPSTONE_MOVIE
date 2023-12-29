import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachBanner, layDanhSachPhim } from '../../stores/quanLyPhimReducer/quanLyPhimReducer'
import { layThongTinLichChieuHeThongRap } from '../../stores/quanLyRapReducer/quanLyRapReducer'
import Banner from './banner/Banner'
import MovieList from './listPhim/MovieList'
import RapList from './listRap/RapList'


export default function Home() {
   const dispatch = useDispatch()
   const { listBanner, listPhim, } = useSelector(state => state.quanLyPhimReducer)
   const { lichChieuHeThongRap } = useSelector(state => state.quanLyRapReducer)
   useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(layDanhSachBanner())
      dispatch(layDanhSachPhim())
      dispatch(layThongTinLichChieuHeThongRap())
   }, [])

   return (
      <div>
         <Banner listBanner={listBanner}/>
         <MovieList listPhim={listPhim} />
         <RapList lichChieuHeThongRap={lichChieuHeThongRap} />
      </div>
   )
}
