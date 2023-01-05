import { clsx } from 'clsx';
import { DetailedHTMLProps, FC, FormHTMLAttributes } from 'react';
import styles from './Form.module.css';

type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  border?: boolean;
};

export const FormOrigin: FC<FormProps> = ({
  className,
  border = true,
  children,
  ...rest
}) => {
  return (
    <form
      className={clsx(className, styles.form, {
        [styles.border]: border,
      })}
      action=""
      {...rest}
    >
      {children}
    </form>
  );
};
