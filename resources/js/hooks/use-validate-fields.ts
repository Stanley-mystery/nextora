import { useEffect, useState } from 'react';
import { Form, FormInstance } from 'antd';

function useValidateFields(form: FormInstance) {
  const values = Form.useWatch([], form);

  const [submittable, setSubmittable] = useState<boolean>(false);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return [submittable];
}

export default useValidateFields;
