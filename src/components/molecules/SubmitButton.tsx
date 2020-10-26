import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: var(--accent-green);
  padding: 10px;
  margin-right: 30px;
  border-radius: 10px;
  float: right;
  box-shadow: 3px 5px 6px var(--shadow-bg-inset);
  color: black;

  opacity: 0.8;

  transition: all 300ms;

  :disabled {
    background: var(--text-quaternary);
    opacity: 0.8;
  }

  :hover {
    opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  }
`;

interface SubmitButtonProps {
  children: ReactNode;
}

export function SubmitButton(props: SubmitButtonProps) {
  const { isValid, isSubmitting } = useFormikContext();

  return (
    <StyledButton type="submit" disabled={!isValid || isSubmitting}>
      {props.children}
      {isSubmitting && '...'}
    </StyledButton>
  );
}
