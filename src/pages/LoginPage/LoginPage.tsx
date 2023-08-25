import { useState } from 'react';

import { Input } from '../../common/fields';
import { Button } from '../../common/buttons';

import s from './LoginPage.module.scss';

export const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const getFieldProps = (field: keyof typeof formValues) => {
    const name = field;
    const value = formValues[field];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    };

    return { name, value, onChange };
  };

  return (
    <main className={s.page}>
      <section className={s.container}>
        <div>header</div>
        <div className={s.formContainer}>
          <div className={s.inputContainer}>
            <Input
              {...getFieldProps('username')}
              isError={true}
              helperText="validation"
              placeholder="Username"
            />
          </div>
          <div className={s.inputContainer}>
            <Input
              {...getFieldProps('password')}
              placeholder="Password"
            />
          </div>
          <div>
            <Button>Sign in</Button>
          </div>
        </div>
      </section>
    </main>
  );
};
