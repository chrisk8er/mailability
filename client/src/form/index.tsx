import { InputNumber, Input as AntdInput, Switch } from 'antd';
import { SearchProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { ImageUploaderProps, ImageUploader } from './image-uploader';
import { ColorPicker, ColorPickerProps } from './color-picker';
import { Select, SelectProps } from './select';
import { RadioGroup, RadioGroupProps } from './radio-group';
import enhancer from './enhancer';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Input, InputProps } from './input';
import { SwitchProps } from 'antd/lib/switch';
import { InlineText, InlineTextProps } from './inline-text-field';
export { RichTextField } from './rich-text-field';

export const TextField = enhancer<InputProps>(Input, (value) => value);

export const SearchField = enhancer<SearchProps>(
	AntdInput.Search,
	(e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value,
);

export const NumberField = enhancer<InputNumberProps>(
	InputNumber,
	(e: number | string | undefined | null) => e,
);

export const ColorPickerField = enhancer<ColorPickerProps>(ColorPicker, (e: string) => e);

export const ImageUploaderField = enhancer<ImageUploaderProps>(ImageUploader, (url: string) => url);

export const SelectField = enhancer<SelectProps>(Select, (e: string) => e);

export const RadioGroupField = enhancer<RadioGroupProps>(
	RadioGroup,
	(e: RadioChangeEvent) => e.target.value,
);

export const SwitchField = enhancer<SwitchProps>(Switch, (e: boolean) => e);

export const InlineTextField = enhancer<InlineTextProps>(InlineText, (value) => value);
