import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { fetcher } from '~/services/fetcher';
import { Comment } from '~/pages/blog/[slug]';

interface CommentFormProps {
  slug: string;
  onNewComment: (comment: Comment) => void;
}

const InputDiv = styled.div.attrs({ className: 'flex flex-col mb-2' })``;

export function CommentForm({ slug, onNewComment }: CommentFormProps) {
  const formik = useFormik({
    initialValues: {
      user: '',
      comment: '',
    },
    validationSchema: Yup.object().shape({
      user: Yup.string().min(3, 'Too short!').required('Required!'),
      comment: Yup.string().required('Required!'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const data = await fetcher(
        `
        mutation ($input: CommentInput!){
          newComment(input: $input)
        }
      `,
        {
          input: {
            slug: slug,
            comment: values.comment,
            user: values.user,
          },
        }
      );
      resetForm();
      setSubmitting(false);
      onNewComment({
        id: data.newComment,
        comment: values.comment,
        user: values.user,
        createdAt: new Date().getTime(),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <InputDiv>
        <label htmlFor="user">Name</label>
        <input
          id="user"
          name="user"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.user}
        />
        {formik.touched.user && formik.errors.user}
      </InputDiv>
      <InputDiv>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.comment}
          className="p-4"
        />
        {formik.touched.comment && formik.errors.comment}
      </InputDiv>
      {!formik.isSubmitting && (
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      )}
    </form>
  );
}
