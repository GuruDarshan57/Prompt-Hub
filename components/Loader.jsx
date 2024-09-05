import React from 'react'

const Loader = () => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <div className="loader mt-14"></div>
            <p>Fetching Data</p>
        </div>
    )
}

export default Loader