// HorizontalScroll.js
import React from 'react';
import { motion } from 'framer-motion';
import sliderone from '.././images/carousel.png';
import slidertwo from '.././images/blog.png';
import sliderthree from '.././images/myimg.png';
import './carousel.css';

const HorizontalScroll = ({ children }) => {
  return (
    <motion.div className='carousel'>
      <motion.div drag="x" className='inner-carousel'>
        <motion.div drag="x" className='item'>
          <img src={sliderone} className='carouselimage' alt='sliderone' />
        </motion.div>
        <motion.div className='item'>
          <img src={slidertwo} className='carouselimage' alt='slidertwo' />
        </motion.div>
        <motion.div className='item'>
          <img src={sliderthree} className='carouselimage' alt='sliderthree' />
        </motion.div>

        <motion.div className='item'>
          <img src={sliderone} className='carouselimage' alt='sliderone' />
        </motion.div>
        <motion.div className='item'>
          <img src={slidertwo} className='carouselimage' alt='slidertwo' />
        </motion.div>
        <motion.div className='item'>
          <img src={sliderthree} className='carouselimage' alt='sliderthree' />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HorizontalScroll;
