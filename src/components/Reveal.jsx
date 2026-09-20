import useInView from '../hooks/useInView'

const variantClass = {
  up: '',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  fade: 'reveal-fade',
  clip: 'reveal-clip',
}

export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, duration = 650, className = '', children, ...rest }) {
  const { ref, inView } = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass[variant] || ''} ${inView ? 'reveal-inview' : ''} ${className}`}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-duration': `${duration}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}