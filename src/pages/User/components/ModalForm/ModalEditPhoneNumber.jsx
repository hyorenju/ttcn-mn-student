import { ModalForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import { ButtonCustom } from '../../../../components/Button';

export function ModalEditPhoneNumber({ open, onOpenChange }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const dataStudentLocal = JSON.parse(sessionStorage.getItem('info_student'));

  const onSignIn = () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response) => {},
            'expired-callback': () => {},
          },
          auth
        );
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const onGetCaptcha = (phoneNumber) => {
    try {
      // onSignIn();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const onSignin = (code) => {
    try {
      window.confirmationResult
        .confirm(code)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    onOpenChange(false);
  };
  return (
    <>
      <div>
        <ModalForm
          width={500}
          open={open}
          title={<h1 className='text-xl mb-4'>Cập nhật số điện thoại</h1>}
          onOpenChange={onOpenChange}
          onFinish={onFinish}
          submitter={{
            render: (props) => [
              <div className='w-full flex justify-between items-center'>
                <p className='opacity-75 italic'>{`Số điện thoại hiện tại: ${dataStudentLocal?.phoneNumber}`}</p>
                <div className='flex items-center'>
                  <ButtonCustom type='primary' title={'Cập nhật'} handleClick={() => handleClickSubmit(props)} />
                  <ButtonCustom title={'Hủy'} handleClick={handleClickCancel} />
                </div>
              </div>,
            ],
          }}
          modalProps={{
            destroyOnClose: false,
            maskClosable: false,
          }}
        >
          <ProFormText
            name='phone'
            required
            label={<p className='text-md'>Số điện thoại mới</p>}
            placeholder='Nhập số điện thoại mới'
          />
          <ProFormCaptcha
            countDown={60}
            phoneName='phone'
            name='captcha'
            required
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
              {
                pattern: '^[0-9]{6}$',
                message: 'Mã xác nhận có 6 kí tự số',
              },
            ]}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'Gửi lại mã'}`;
              }
              return 'Gửi mã';
            }}
            placeholder='Nhập mã xác nhận'
            onGetCaptcha={async (values) => {
              if (values) {
                console.log(values);
                onGetCaptcha(values);
              }
            }}
          />
        </ModalForm>
      </div>
    </>
  );
}
