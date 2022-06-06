import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px 10px;
  background-color: var(--bg-inset);
  input {
    background: var(--bg-secondary);
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 5px;
  }

  input:placeholder-shown + label {
    transform: translateY(30px) translateX(20px);
    font-size: 1.5em;
  }

  input:focus + label {
    transform: translateY(0px) translateX(0px);
    font-size: 1em;
  }

  label {
    height: 1.5rem;
    color: var(--text-quaternary);

    transition: all 200ms;
  }
`;

const StyledError = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity ${(props) => (props.visible ? '200ms' : '0')} ease-in;
  color: var(--accent-red);
`;

export function TextInput({ id, label, className, ...props }: TextInputProps) {
  const [field, meta] = useField(id);
  return (
    <StyledInput className={className}>
      <div className="flex flex-col-reverse">
        <input
          {...props}
          name={field.name}
          id={id}
          value={field.value}
          onChange={field.onChange}
          onBlur={(e) => {
            field.onBlur(e);
          }}
          placeholder=" "
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <StyledError visible={meta.touched && !!meta.error}>{' ' + meta.error}</StyledError>
    </StyledInput>
  );
}
