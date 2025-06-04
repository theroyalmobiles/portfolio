module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin-reverse 2s linear infinite',
        'scale-in': 'scale-in 1.5s infinite alternate',
        'wave': 'wave 1.2s infinite ease-in-out',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.3)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(167, 139, 250, 0.7)',
      },
    },
  },
  variants: {},
  plugins: [],
    }