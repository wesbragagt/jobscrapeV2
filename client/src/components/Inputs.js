export function Button({children, color,...rest}){
  const style = `bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
  return (
    <button
            className={style}
            type='button'
            {...rest}
          >
            {children}
          </button>
  )
}

export function Field({name, placeholder,children}){
  const labelStyle = `block text-gray-700 text-sm font-bold mb-2`
  const inputStyle = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
  return (
    <div className='mb-4'>
          <label
            className={labelStyle}
            htmlFor={name}
          >
            {children}
          </label>
          <input
            className={inputStyle}
            name={name}
            id={name}
            type='text'
            placeholder={placeholer}
          />
    </div>
  )
}