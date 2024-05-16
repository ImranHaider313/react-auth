const Alert = ({ text }: { text: string }) => {
  return (
    <div className='relative block w-full px-4 py-1 mb-2 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular'>
      {text}
    </div>
  );
};

export default Alert;
