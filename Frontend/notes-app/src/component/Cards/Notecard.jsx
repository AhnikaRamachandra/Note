import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const Notecard = ({ title, date, content, tags, ispinned, onedit, ondelete, onpinnote }) => {
  return (
    <>
      <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out '>
        <div className='flex items-center justify-between'>
          <div>
            <h6 className='text-md font-bold'>{title}</h6>
            <span className='text-xs font-bold text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
          </div>
          <MdOutlinePushPin className={`icon-btn ${ispinned ? 'text-blue-500' : 'text-slate-500'}`} onClick={onpinnote} />
        </div>
        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>
        <div className='flex items-center justify-between mt-2'>
          {/* Conditionally render tags with proper styling */}
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {tags.map((item, index) => (
                <span key={index} className='bg-slate-200 rounded-full p-2 text-xs text-slate-600'>
                  #{item}
                </span>
              ))}
            </div>
          )}
          <div className='flex items-center gap-2'>
            <MdCreate className='icon-btn hover:text-green-600' onClick={onedit} />
            <MdDelete className='icon-btn hover:text-red-700' onClick={ondelete} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Notecard;
