import { useField } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface TextInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
}

export function TextInput({ id, label, className, ...props }: TextInputProps) {
  const [field, meta] = useField(id);

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        name={field.name}
        id={id}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      <div>{meta.touched && meta.error}</div>
    </div>
  );
}
