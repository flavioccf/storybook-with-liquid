type ControlType = 'color' | 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'range' | 'image_picker';

const CONTROL_TYPE_CONVERSION: { [key in ControlType]: string } = {
  'color': 'color',
  'text': 'text',
  'textarea': 'text',
  'select': 'select',
  'checkbox': 'boolean',
  'radio': 'radio',
  'number': 'number',
  'range': 'number',
  'image_picker': 'file',
};

function convertControlType(controlType: ControlType): string {
  return CONTROL_TYPE_CONVERSION[controlType] || 'text';
}

export default convertControlType;