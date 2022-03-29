import { Descriptions } from 'antd';
import React from 'react';

const ProfileDetails = ({ data }) => {
  return (
    <div>
      <div className='flex w-full flex-col'>
        <div className='flex space-x-2 pb-4'>
          <span className='text-xl font-bold text-gray-400'>My</span>{' '}
          <span className='text-xl font-bold text-indigo-500 '>Profile</span>
        </div>
        <Descriptions
          // title='Responsive Descriptions'
          bordered
          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label='First Name'>
            {data?.attributes?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label='Last Name'>
            {data?.attributes?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {data?.attributes?.email}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default ProfileDetails;
