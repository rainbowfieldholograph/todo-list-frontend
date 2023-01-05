import { ChangeEventHandler, CSSProperties } from 'react';

export type TextFieldProps<T extends HTMLTextAreaElement | HTMLInputElement> = {
  className?: string;
  style?: CSSProperties;
  label: string;
  value: string;
  onChange: ChangeEventHandler<T>;
  disabled?: boolean;
  required?: boolean;
};
