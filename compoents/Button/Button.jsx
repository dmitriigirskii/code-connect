import styles from './Button.module.css'
import defaultIcon from './stylus-fountain-pen.svg'

const iconTypes = ['None', 'Leading', 'Trailing', 'Icon only']
const states = ['Default', 'Hover', 'Active', 'Disabled']

function FigmaIcon({ icon }) {
  if (icon && typeof icon !== 'string') return icon

  return <img className={styles.icon} src={icon || defaultIcon} alt="" aria-hidden="true" />
}

/**
 * Compact 36px button from the Design-System Figma library.
 * `iconType` and `state` use the exact variant names from Figma.
 */
export default function Button({
  iconType = 'None',
  state = 'Default',
  label = 'Button',
  icon,
  className = '',
  title,
  disabled = false,
  type = 'button',
  ...buttonProps
}) {
  if (!iconTypes.includes(iconType)) {
    throw new Error(`Button: iconType must be one of: ${iconTypes.join(', ')}`)
  }

  if (!states.includes(state)) {
    throw new Error(`Button: state must be one of: ${states.join(', ')}`)
  }

  const isIconOnly = iconType === 'Icon only'
  const isDisabled = disabled || state === 'Disabled'
  const buttonClassName = [
    styles.button,
    styles[`iconType${iconType.replaceAll(' ', '')}`],
    styles[`state${state}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const accessibleLabel = buttonProps['aria-label'] || label

  return (
    <button
      {...buttonProps}
      className={buttonClassName}
      type={type}
      disabled={isDisabled}
      aria-label={isIconOnly ? accessibleLabel : buttonProps['aria-label']}
      title={title || (isIconOnly ? accessibleLabel : undefined)}
    >
      {iconType === 'Leading' || isIconOnly ? (
        <FigmaIcon icon={icon} />
      ) : null}
      {!isIconOnly ? <span className={styles.label}>{label}</span> : null}
      {iconType === 'Trailing' ? <FigmaIcon icon={icon} /> : null}
    </button>
  )
}
