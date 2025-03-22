// import React, { useEffect, useState } from 'react'
import React from 'react'
import { Link } from "react-router-dom"
// import { useDispatch } from 'react-redux';
import Footer from '../components/common/Footer';
import HighlightText from '../components/separate/HomePage/HighlightText';
import { motion } from 'framer-motion'
import { fadeIn, } from './../components/common/motionFrameVarients';
import CTAButton from "../components/separate/HomePage/Button"
const Home = () => {
    
    return (
        <React.Fragment>
            <div className=' '>
                 {/*Section1  */}
            <div className='relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white '>
    
                <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7  '
                    >
                        Take Control of Your
                        <HighlightText text={"College Journey "} />
                    </motion.div>
                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className=' mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                    >
                        Track progress, manage time, and achieve your academic goals with ease
                    </motion.div>
                    <div className='flex flex-row gap-7 mt-8'>
                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                            Book a Demo
                        </CTAButton>
                    </div>

                     </div>


            </div>
             {/*Footer */}
             <Footer />
            </div>
            
        </React.Fragment>
    )
}
export default Home