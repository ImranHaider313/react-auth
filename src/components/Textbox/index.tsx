interface TextboxProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textbox: React.FC<TextboxProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  handleChange,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          {label}
        </label>
      )}
      <div className='mt-2'>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete='off'
          className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Textbox;
