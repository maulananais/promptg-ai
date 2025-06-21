interface ToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  iconOn: string
  iconOff: string
}

export default function Toggle({ label, checked, onChange, iconOn, iconOff }: ToggleProps) {
  return (
    <div className="flex items-center space-x-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          checked ? 'bg-primary-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      
      <div className="flex items-center space-x-2">
        <img
          src={checked ? iconOn : iconOff}
          alt={checked ? 'On' : 'Off'}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </div>
  )
}
