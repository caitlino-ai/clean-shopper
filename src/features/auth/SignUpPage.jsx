import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { supabase } from '../../lib/supabase'

export default function SignUpPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) { setErrors(next); return }

    setIsLoading(true)
    setErrors({})

    const { error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setErrors({ form: signUpError.message })
      setIsLoading(false)
      return
    }

    // Sign in immediately — works whether email confirmation is on or off
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      // Account created but couldn't auto sign-in (e.g. confirmation required)
      setSuccess(true)
      setIsLoading(false)
    }
    // If sign-in succeeded, onAuthStateChange handles the redirect
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-space-xl">
      <div className="w-full max-w-[400px]">
        <div className="mb-space-2xl text-center">
          <h1 className="text-h1 text-neutral-900 mb-space-sm">Create an account</h1>
          <p className="text-body text-neutral-600">
            Start building your clean product library.
          </p>
        </div>

        {success ? (
          <div className="bg-success/10 border border-success/20 rounded-lg px-space-lg py-space-md text-center">
            <p className="text-body text-success font-semibold mb-space-xs">Check your email</p>
            <p className="text-small text-neutral-600">
              We sent a confirmation link to <span className="font-semibold text-neutral-900">{email}</span>.
              Click it to activate your account.
            </p>
          </div>
        ) : (
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
              placeholder="At least 6 characters"
              error={errors.password}
              disabled={isLoading}
            />

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Create account
            </Button>
          </form>
        )}

        <p className="text-small text-neutral-600 text-center mt-space-xl">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
