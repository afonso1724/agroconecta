export const Card = ({ children, className = '', ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}
    {...props}
  >
    {children}
  </div>
);
