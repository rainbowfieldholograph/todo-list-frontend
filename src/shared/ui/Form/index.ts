import { Fields } from './Fields';
import { FormOrigin } from './Form';

type FormOriginType = typeof FormOrigin;

interface FormInterface extends FormOriginType {
  Fields: typeof Fields;
}

const Form = FormOrigin as FormInterface;

Form.Fields = Fields;

export { Form };
