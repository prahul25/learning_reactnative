import { useState, useCallback } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

const getStrength = (
  pwd: string,
  opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean },
): { label: string; color: string; score: number; max: number } => {
  let score = 0
  let max = 0

  max++
  if (pwd.length >= 6) score++

  if (opts.lower) {
    max++
    if (/[a-z]/.test(pwd)) score++
  }
  if (opts.upper) {
    max++
    if (/[A-Z]/.test(pwd)) score++
  }
  if (opts.numbers) {
    max++
    if (/[0-9]/.test(pwd)) score++
  }
  if (opts.symbols) {
    max++
    if (/[^a-zA-Z0-9]/.test(pwd)) score++
  }

  const pct = score / max
  if (pct <= 0.4) return { label: 'Weak', color: '#FF4D4D', score, max }
  if (pct <= 0.7) return { label: 'Medium', color: '#FFA726', score, max }
  return { label: 'Strong', color: '#66BB6A', score, max }
}

const generatePassword = (
  len: number,
  opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean },
): string => {
  const sets: { chars: string; enabled: boolean }[] = [
    { chars: UPPERCASE, enabled: opts.upper },
    { chars: LOWERCASE, enabled: opts.lower },
    { chars: NUMBERS, enabled: opts.numbers },
    { chars: SYMBOLS, enabled: opts.symbols },
  ]

  const active = sets.filter(s => s.enabled)
  const all = active.map(s => s.chars).join('')
  const required = active.map(s => s.chars[Math.floor(Math.random() * s.chars.length)])

  for (let i = required.length; i < len; i++) {
    required.push(all[Math.floor(Math.random() * all.length)])
  }
  for (let i = required.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[required[i], required[j]] = [required[j], required[i]]
  }
  return required.join('')
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const strength = getStrength(password, {
    upper: includeUpper,
    lower: includeLower,
    numbers: includeNumbers,
    symbols: includeSymbols,
  })

  const handleGenerate = useCallback(() => {
    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
      Alert.alert('Error', 'Select at least one character type')
      return
    }
    setPassword(generatePassword(length, {
      upper: includeUpper,
      lower: includeLower,
      numbers: includeNumbers,
      symbols: includeSymbols,
    }))
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols])

  const handleCopy = useCallback(() => {
    if (!password) return
    Alert.alert('Copied!', 'Password copied to clipboard')
  }, [password])

  const toggle = (
    value: boolean,
    setter: (v: boolean) => void,
    label: string,
  ) => (
    <TouchableOpacity
      style={[styles.toggle, value && styles.toggleActive]}
      onPress={() => setter(!value)}
    >
      <Text style={[styles.toggleText, value && styles.toggleTextActive]}>
        {value ? '✓ ' : '  '}{label}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>

      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Tap generate or type your own"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {password !== '' && (
          <TouchableOpacity onPress={handleCopy} style={styles.copyBtn}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        )}
      </View>

      {password !== '' && (
        <View style={[styles.strengthBar, { backgroundColor: strength.color }]}>
          <Text style={styles.strengthText}>
            Strength: {strength.label} ({strength.score}/{strength.max})
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Length: {length}</Text>
      <View style={styles.lengthRow}>
        {[6, 7, 8].map(n => (
          <TouchableOpacity
            key={n}
            style={[styles.lengthBtn, length === n && styles.lengthBtnActive]}
            onPress={() => setLength(n)}
          >
            <Text style={[styles.lengthBtnText, length === n && styles.lengthBtnTextActive]}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Include:</Text>
      <View style={styles.toggleRow}>
        {toggle(includeUpper, setIncludeUpper, 'Uppercase')}
        {toggle(includeLower, setIncludeLower, 'Lowercase')}
      </View>
      <View style={styles.toggleRow}>
        {toggle(includeNumbers, setIncludeNumbers, 'Numbers')}
        {toggle(includeSymbols, setIncludeSymbols, 'Symbols')}
      </View>

      <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
        <Text style={styles.generateBtnText}>Generate Password</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PasswordGenerator

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A2E',
    textAlign: 'center',
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: '#1A1A2E',
    paddingVertical: 14,
    fontFamily: 'monospace',
  },
  copyBtn: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  strengthBar: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  strengthText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  lengthRow: {
    flexDirection: 'row',
    gap: 12,
  },
  lengthBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  lengthBtnActive: {
    borderColor: '#1A1A2E',
    backgroundColor: '#1A1A2E',
  },
  lengthBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
  },
  lengthBtnTextActive: {
    color: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggle: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  toggleActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: '#2E7D32',
  },
  generateBtn: {
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
})
