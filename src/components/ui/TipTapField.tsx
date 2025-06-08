import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import TipTapFieldContent from './TipTapFieldContent';
import { Editor } from '@tiptap/react';

type TipTapFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  fileName?: Path<T>;
  placeholder?: string;
  size?: string;
  fieldStyle?: string;
  textStyle?: string;
  setEditor: (editor: Editor | null, fileName: Path<T> | null) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholderStyle?: string;
};

export default function TipTapField<T extends FieldValues>({
  control,
  name,
  fileName,
  placeholder,
  size,
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
          size={size}
          fieldStyle={fieldStyle}
          textStyle={textStyle}
          setEditor={setEditor}
          fileName={fileName}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderStyle={placeholderStyle}
        />
      )}
    />
  );
}
