import { useField } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
}

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--bg-inset);
  input {
    background: var(--bg-secondary);
    border-radius: 5px;
    padding: 5px;
  }
`;
const StyledError = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity ${(props) => (props.visible ? '200ms' : '0')} ease-in;
`;

export function TextInput({ id, label, className, ...props }: TextInputProps) {
  const [field, meta] = useField(id);

  return (
    <StyledInput className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        name={field.name}
        id={id}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      <StyledError visible={meta.touched && !!meta.error}>{' ' + meta.error}</StyledError>
    </StyledInput>
  );
}
