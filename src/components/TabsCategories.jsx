import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobsCard from './JobsCard';
import axios from 'axios';

const TabsCategories = () => {
  const [jobs, setJobs] = useState([])

  useEffect(()=>{
    const getData = async() =>{
      const {data} =  await axios(`${import.meta.env.VITE_API_URL}/jobs`)
      setJobs(data)
    }
    getData();
  },[])

    return (
        <Tabs>
        <div className='container mx-auto px-6 my-10'>
            <h1 className='text-3xl font-bold text-center mb-3'>Browse Job Categories</h1>
            <p className='text-base font-medium text-center w-[650px] mx-auto mb-8 text-blue-gray-500'>By browsing different job categories, individuals can refine their job search criteria. They may discover roles they hadn't previously considered or realize which aspects of a job are most important to them.</p>
        <div className='flex items-center justify-center'>
        <TabList>
          <Tab>Web Design</Tab>
          <Tab>Graphics Design</Tab>
          <Tab>Digital Marketing</Tab>
        </TabList>
        </div> 

        <TabPanel>
          <div className='grid grid-cols-1 gap-2 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              jobs.filter(j=>j.category === 'Web Design').map(job=><JobsCard key={job._id} job={job}></JobsCard>)
            }
          </div>
        </TabPanel>

        <TabPanel>
        <div className='grid grid-cols-1 gap-2 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              jobs.filter(j=>j.category === 'Graphics Design').map(job=><JobsCard key={job._id} job={job}></JobsCard>)
            }
          </div>
        </TabPanel>

        <TabPanel>
        <div className='grid grid-cols-1 gap-2 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              jobs.filter(j=>j.category === 'Digital Marketing').map(job=><JobsCard key={job._id} job={job}></JobsCard>)
            }
          </div>
        </TabPanel>
        </div>
        </Tabs>
    );
};

export default TabsCategories;