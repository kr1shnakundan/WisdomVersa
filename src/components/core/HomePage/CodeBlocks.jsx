import React from 'react'
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import { info } from 'autoprefixer'

const CodeBlocks = ({
    position ,
     heading ,
      subheading , 
      ctabtn1  , 
      ctabtn2  , 
      codeColor ,
       codeblock ,
       backgroundGradient
}) => {
  return (
    <div className={`flex ${position} my-20 flex-col justify-between gap-10`}>
        {/* section-1 */}
        <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
            {heading}

            <div className='text-richblack-300 text-base -mt-3 font-bold w-[85%]'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
               <CTAButton active={ctabtn1.active} linkTo={ctabtn1.link}>
                <div className='flex items-center gap-2'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
                </CTAButton> 
                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.link}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>
        {/* section-2 */}
        <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>   

             {/* same work as code-border "Create glass like appearance" */}
            {/* <div className="absolute w-full h-full  bg-white/5 backdrop-blur-sm border border-white/20 shadow-lg opacity-30 z-0"></div> */}

            {backgroundGradient}
            
            {/* indexing */}
            <div className='flex flex-col text-center w-[10%] select-none text-richblack-400 font-bold font-inter z-10'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            {/* code */}
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 border-white z-10`}>

                <TypeAnimation
                sequence={[codeblock ,1000 , ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                    whiteSpace:"pre-line",
                    display:"block"
                }}
                omitDeletionAnimation={true}/>

            </div>
        </div>
    </div>
  )
}

export default CodeBlocks;