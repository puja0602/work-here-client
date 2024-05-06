// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider from './Slider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bg1 from '../assets//images//miguel-angel-hernandez-cObuSxlcUac-unsplash.jpg';
import bg2 from '../assets/images/becca-tapert--A_Sx8GrRWg-unsplash.jpg';
import bg3 from '../assets/images/claudio-schwarz-TSgpeJ3yu8g-unsplash.jpg';

const Carousel = () => {
    return (
        <div className='container mx-auto px-10 my-6'>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slider image={bg1} text={'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.'}></Slider>
        </SwiperSlide>
        <SwiperSlide>
            <Slider image={bg2} text={'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.'}></Slider>
        </SwiperSlide>
        <SwiperSlide>
            <Slider image={bg3} text={'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.'}></Slider>
        </SwiperSlide>
      </Swiper>
      </div>
    );
};

export default Carousel;