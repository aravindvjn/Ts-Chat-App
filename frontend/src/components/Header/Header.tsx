import { Menu } from '@mui/icons-material'
import { AppName } from '../../global/Links/Links'

const Header = () => {
  return (
    <div className='bg-secondary z-10 fixed right-0 left-0 top-0 h-16 flex items-center justify-between shadow-sm shadow-gray-300'>
      <p className='text-black pl-4 text-lg font-semibold'>{AppName}</p>
      <Menu fontSize='large' className='text-black mr-4' />
    </div>
  )
}

export default Header
