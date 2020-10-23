import { useField } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface TextInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label: string;
}

const StyledInput = styled.div<{ focus: boolean; empty: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--bg-inset);
  input {
    background: var(--bg-secondary);
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 5px;
  }
  label {
    height: 1.5rem;
    color: var(--text-quaternary);
    transform: translateY(${(props) => (props.focus || !props.empty ? 0 : 30)}px)
      translateX(${(props) => (props.focus || !props.empty ? 0 : 20)}px);
    font-size: ${(props) => (props.focus || !props.empty ? 1 : 1.5)}rem;
    transition: all 200ms;
  }
`;

const StyledError = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity ${(props) => (props.visible ? '200ms' : '0')} ease-in;
`;

export function TextInput({ id, label, className, ...props }: TextInputProps) {
  const [field, meta] = useField(id);
  const [focus, setFocus] = useState(false);
  return (
    <StyledInput className={className} focus={focus} empty={!field.value}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        name={field.name}
        id={id}
        value={field.value}
        onChange={field.onChange}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      />
      <StyledError visible={meta.touched && !!meta.error}>{' ' + meta.error}</StyledError>
    </StyledInput>
  );
}
