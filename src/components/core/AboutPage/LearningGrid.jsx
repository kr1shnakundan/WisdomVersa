import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button';

const LearningGridArray = [
 {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-4  gap-3 w-[350px] xl:w-fit mb-12 text-richblack-5 bg-richblack-900 mx-auto'>
        {
            LearningGridArray.map((card , i)=>{
                return(
                    <div key={i}
                    className={`
                        ${i === 0 && "xl:col-span-2 xl:h-[294px]"} ${
                            card.order %2 === 1 ? "bg-richblack-700 h-[294px]" 
                            : card.order %2 === 0 ? "bg-ricblack-800 h-[294px]"
                            : "bg-transparent"
                        }  ${card.order === 3 && "xl:col-start-2"} 
                        `}
                    >
                        {card.order < 0 ? (
                                <div 
                                className='xl:w-[90%] flex flex-col items-start mr-12 gap-3 pb-10 xl:pb-0 '>
                                    <h2 className='text-[2.25rem] leading-[2.75rem] font-semibold '>
                                        {card.heading}
                                        <HighlightText text={card.highlightText} />

                                    </h2>
                                    <p className='text-richblack-300 font-medium '>
                                        {card.description}
                                    </p>
                                    <CTAButton linkTo={card.BtnLink} active={true}
                                    className=''>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                            ) : (
                                <div className='p-8 flex flex-col gap-8'>
                                    <h2 className='text-richblack-5 text-lg'>
                                        {card.heading}
                                    </h2>
                                    <p className="text-richblack-300 font-medium">
                                        {card.description}
                                    </p>
                                </div>
                            )
                        }

                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid