import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../../context/AppContextProvider'

const Header = () => {
    const {input, setInput} = useContext(AppContext);
    const inpuRef=useRef();

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        setInput(inpuRef.current.value);
    }

    const onClear=async()=>{
       inpuRef.current.value=""
        setInput("");
    }

    return (
        <div className='mx-8 sm:mx-16 xs:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border 
                border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                    <p>New: AI feature integrated</p>
                    <img src={assets.star_icon} className='w-2.5' />
                </div>
                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                    Your own <span className='text-primary'>Blogging Platform.</span>
                </h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae alias iusto odio minus delectus sit ut distinctio ea voluptate, nobis enim porro, officiis eum doloremque deserunt iure aperiam maxime! Maxime!
                </p>

                <form 
                onSubmit={onSubmitHandler}
                className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 
                bg-white rouded overflow-hidden'>
                    <input type="text" ref={inpuRef} placeholder='Search for blogs' required className='w-full pl-4 
                    outline-none' />
                    <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rouded
                    hover:scale-105 transition-all cursor-pointer'>Search</button>

                </form>




            </div>

            <div className='text-center'>
                {input && <button className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer' onClick={onClear}>
                     clear-search
                    </button>}
            </div>

            <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' />

        </div>
    )
}

export default Header
