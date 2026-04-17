import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { supabase } from '../../lib/supabase'

export default function SignInPage({ onNavigate, onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    if (!password) next.password = 'Password is required.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) { setErrors(next); return }

    setIsLoading(true)
    setErrors({})

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrors({ form: error.message })
      setIsLoading(false)
    } else {
      onSignIn?.()
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-space-xl">
      <div className="w-full max-w-[400px]">
        <div className="mb-space-2xl text-center">
          <h1 className="text-h1 text-neutral-900 mb-space-sm">Welcome back</h1>
          <p className="text-body text-neutral-600">
            Sign in to your Clean Shopper account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg" noValidate>
          {errors.form && (
            <p className="text-small text-error">{errors.form}</p>
          )}

          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            error={errors.email}
            disabled={isLoading}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Your password"
            error={errors.password}
            disabled={isLoading}
          />

          <Button type="submit" variant="primary" isLoading={isLoading}>
            Sign in
          </Button>
        </form>

        <p className="text-small text-neutral-600 text-center mt-space-xl">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
