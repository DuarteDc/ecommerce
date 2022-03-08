const Alert = ({icon , color , message}) => {
    return (
        <div className={`p-2 ${color} mb-6 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`} role="alert">
          <span className="flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3">
              {icon}
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
              {message}
          </span>             
        </div>
    );
};

export default Alert;