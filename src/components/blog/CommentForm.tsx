import { fetcher } from '~/services/fetcher';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CommentFormProps {
  slug: string;
}

export function CommentForm({ slug }: CommentFormProps) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      user: '',
      comment: '',
    },
    onSubmit: async (values) => {
      await fetcher(
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
      router.reload();
    },
    validationSchema: Yup.object().shape({
      user: Yup.string().min(3, 'Too short!').required('Required!'),
      comment: Yup.string().required('Required!'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <label htmlFor="user">Name</label>
      <input
        id="user"
        name="user"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.user}
      />
      {formik.errors.user}
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        rows={4}
        onChange={formik.handleChange}
        value={formik.values.comment}
      />
      {formik.errors.comment}
      <button type="submit">Submit</button>
    </form>
  );
}
