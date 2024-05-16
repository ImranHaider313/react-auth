const Button = ({
  text,
  onClick,
  type = 'button',
}: {
  text: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
