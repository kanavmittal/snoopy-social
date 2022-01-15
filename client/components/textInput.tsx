interface textInputProps {
  width: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: any) => void;
}
const TextInput: React.FC<textInputProps> = ({
  width,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className={`${width} px-3 mb-6 md:mb-0`}>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={`input-${value}`}
          >
            {value}
          </label>
          <input
            className={
              "appearance-none block w-full bg-gray-200 text-gray-700 border" +
              (error ? " border-red-500 " : "") +
              "rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            }
            id={`input-${value}`}
            type={type}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default TextInput;
