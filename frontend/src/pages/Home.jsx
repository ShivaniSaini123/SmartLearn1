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
                <Link to={"/signup"}>
                    <div className='z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                        transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Facilitator</p>                    
                    </div>
                </div>
                </Link>
                <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7  '
                    >
                        Unlock New Opportunities with 
                        <HighlightText text={"Coding Skills"} />
                    </motion.div>
                    <motion.div
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className=' mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300'
                    >
                        Learn coding at your own pace, wherever you are, with our flexible online courses. Gain access to a wide range of resources, including interactive projects, quizzes, and personalized guidance from expert instructors to help you master the skills you need.
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