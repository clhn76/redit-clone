import type { User } from 'firebase/auth'
import {FiSearch} from 'react-icons/fi'

export default function SearchInput({
  user
}: {
  user: User | null | undefined
}) {
  return (
    <div className={`flex-1 flex items-center relative text-neutral-300 ${!user ? 'max-w-[600px]' : 'max-w-none'}`}>
      <input
        placeholder='Search Reddit'
        className='
          w-full
          peer
          text-sm
          border-2
          rounded-md
          py-2
          pl-10
          duration-300
          outline-none
          focus:border-blue-500
          focus:text-neutral-500
          focus:bg-slate-50
        '
      type="text"  />
      <FiSearch className='absolute left-3 top-[9px] peer-focus:text-neutral-500 duration-300' size={20}/>
      
    </div>
  )
}