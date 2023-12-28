import logo from '@/assets/img/logo_header.png';
import { ButtonCustom } from '@/components/Button';
import { setOpenModal } from '@/redux/Modal/modalLoginSlice';
import Cookies from 'js-cookie';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalFormLogin } from '../../Modal';
import { PopoverAvatarUser, PopoverSubMenu } from '../../Popover';

export function Navigate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('accessTokenStudent');
  const dataStudent = JSON.parse(localStorage.getItem('info_student'));
  const isLoginStudent = token && dataStudent ? true : false;
  const handleClickLogin = () => {
    dispatch(setOpenModal(true));
  };
  const handleClickLink = (item) => {
    navigate(item.href);
  };
  const handleClickLogo = () => {
    navigate('/');
  };
  const links = [
    {
      title: 'Trang chủ',
      href: '/',
    },
    {
      title: 'Tài liệu tham khảo',
      href: '/documents',
    },
  ];
  return (
    <Fragment>
      <div className='bg-white'>
        <nav className='max-w-[95%] w-full lg:max-w-[85%] mx-auto flex justify-between items-center py-3 transition-all bg-white'>
          <div className='w-[8rem] h-[2rem] lg:w-[13rem] bg-transparent flex items-center justify-center'>
            <img src={logo} alt='logo' className='hover:cursor-pointer' onClick={handleClickLogo} />
          </div>
          <div className='flex justify-center items-center gap-3 sm:gap-6 md:gap-8'>
            <ul className='hidden md:flex lg:text-xl xl:text-[1.3rem] items-center gap-3 sm:gap-6 md:gap-8'>
              {links.map((item) => (
                <li
                  key={item.title}
                  onClick={() => handleClickLink(item)}
                  className='relative text-black hover:text-[#005B30] hover:opacity-80 hover:cursor-pointer ease-out duration-200 active:scale-95 after:absolute after:content-[""] after:w-0 after:h-[2px] after:bg-[#005B30] hover:after:w-full after:left-0 after:right-0 after:bottom-0 py-3 after:transition-all after:duration-500 after:ease-in-out'
                >
                  {item.title}
                </li>
              ))}
            </ul>
            <div className='flex items-center gap-3'>
              {isLoginStudent && <PopoverAvatarUser />}
              <PopoverSubMenu />
              {!isLoginStudent && (
                <ButtonCustom title='Đăng nhập' type='primary' size='large' handleClick={handleClickLogin} />
              )}
            </div>
          </div>
        </nav>
      </div>
      <ModalFormLogin
        onChangeClickOpen={(open) => {
          if (!open) {
            dispatch(setOpenModal(false));
          }
        }}
      />
    </Fragment>
  );
}
