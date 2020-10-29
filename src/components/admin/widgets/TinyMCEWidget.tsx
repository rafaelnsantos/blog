import Widget from '@monx/react-netlifycms/dist/Widget';
import { Editor } from '@tinymce/tinymce-react';

export const TinyMCEWidget = Widget<string>(
  ({ onChange, value }) => {
    return (
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        value={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'codesample',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={(content) => onChange(content)}
      />
    );
  },
  {
    activateFix: true,
  }
);
