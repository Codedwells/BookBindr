interface InputRadioProps {
  label: string
  name: string
  value: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputRadio({
  label,
  name,
  value,
  checked,
  onChange,
  ...props
}: InputRadioProps) {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        data-checked={checked}
        {...props}
      />
      <label className="text-gray-700 text-base">{label}</label>
    </div>
  )
}

export { InputRadio }
