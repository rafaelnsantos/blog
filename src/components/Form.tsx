import { ReactNode } from 'react';
import { FormikProvider, useFormik, FormikConfig } from 'formik';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

interface FormPropsA<Values> extends Omit<FormikConfig<Values>, 'onSubmit'>, FormProps<Values> {
  children: ReactNode;
}

export interface FormProps<Values> {
  onSubmit: (values: Values) => Promise<unknown>;
  onError?: (error: Error) => void;
  onSuccess?: (response: any) => void;
}

const Backdrop = styled.div<{ visible: boolean }>`
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  opacity: ${(props) => (props.visible ? 1 : 0)};

  transition: opacity 500ms ease-in;

  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  transition: opacity 300ms ease-in;
  background: var(--bg-inset);
  padding: 10px;
  border-radius: 10px;
`;

export function Form<T>({ children, onSubmit, onSuccess, onError, ...props }: FormPropsA<T>) {
  const formik = useFormik<T>({
    ...props,
    onSubmit: async (values, bag) => {
      try {
        const res = await onSubmit(values);
        if (onSuccess) onSuccess(res);
        bag.resetForm();
      } catch (err) {
        if (onError) onError(err);
      } finally {
        bag.setSubmitting(false);
      }
    },
  });

  const { isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <div style={{ position: 'relative' }}>
        <StyledForm style={{ opacity: isSubmitting ? 0.5 : 1 }} onSubmit={formik.handleSubmit}>
          {children}
        </StyledForm>
        <Backdrop visible={isSubmitting}>
          <RingLoader color="var(--text-primary)" />
        </Backdrop>
      </div>
    </FormikProvider>
  );
}
