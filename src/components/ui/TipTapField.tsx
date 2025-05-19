import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import TipTapFieldContent from './TipTapFieldContent';
import { Editor } from '@tiptap/react';

type TipTapFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  fieldStyle?: string;
  textStyle?: string;
  setEditor: (editor: Editor | null) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholderStyle?: string;
};

export default function TipTapField<T extends FieldValues>({
  control,
  name,
  placeholder,
  fieldStyle,
  textStyle,
  setEditor,
  onFocus,
  onBlur,
  placeholderStyle,
}: TipTapFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TipTapFieldContent
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          fieldStyle={fieldStyle}
          textStyle={textStyle}
          setEditor={setEditor}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderStyle={placeholderStyle}
        />
      )}
    />
  );
}
