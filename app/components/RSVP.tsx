'use client';

import { useState } from 'react';
import styles from './RSVP.module.css';

/* Tipagem do formulário */
interface FormData {
  name: string;
  attending: 'yes' | 'no' | '';
  adults: string;
  children: string;
  email: string;
  phone: string;
  notes: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const initialForm: FormData = {
  name: '',
  attending: '',
  adults: '1',
  children: '0',
  email: '',
  phone: '',
  notes: '',
};

/* Seção de confirmação de presença */
export default function RSVP() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /* Atualiza campo do formulário */
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* Envia os dados para a API Route */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitState('success');
        setForm(initialForm);
      } else {
        setSubmitState('error');
        setErrorMessage(data.error ?? 'Ocorreu um erro inesperado.');
      }
    } catch {
      setSubmitState('error');
      setErrorMessage('Não foi possível enviar. Verifique sua conexão.');
    }
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>CONFIRMAÇÃO<br />DE PRESENÇA</h2>
      <div className={styles.container}>
        <p className={styles.subtitle}>
          Por favor, confirme sua presença até <strong>17 de julho de 2026</strong>.
        </p>
        {/* Formulário */}
        <div className={styles.formWrapper}>
          {submitState === 'success' && (
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>◆</span>
              <h3>Presença confirmada!</h3>
              <p>
                Recebemos sua confirmação. Mal podemos esperar para celebrar com
                você!
              </p>
            </div>
          )}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-hidden={submitState === 'success'}
            style={{ visibility: submitState === 'success' ? 'hidden' : 'visible' }}
          >
            {/* Nome completo */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Seu nome completo"
                value={form.name}
                onChange={handleChange}
                required
                disabled={submitState === 'loading'}
              />
            </div>

            {/* Confirmação de presença */}
            <div className={styles.field}>
              <p className={styles.label}>Você irá ao evento?</p>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={form.attending === 'yes'}
                    onChange={handleChange}
                    disabled={submitState === 'loading'}
                    required
                  />
                  <span>Sim, estarei lá!</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={form.attending === 'no'}
                    onChange={handleChange}
                    disabled={submitState === 'loading'}
                  />
                  <span>Infelizmente não poderei ir</span>
                </label>
              </div>
            </div>

            {/* Quantidade de adultos e crianças — em linha */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="adults">
                  Adultos (incluindo você)
                </label>
                <select
                  id="adults"
                  name="adults"
                  className={styles.select}
                  value={form.adults}
                  onChange={handleChange}
                  disabled={submitState === 'loading'}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="children">
                  Crianças
                </label>
                <select
                  id="children"
                  name="children"
                  className={styles.select}
                  value={form.children}
                  onChange={handleChange}
                  disabled={submitState === 'loading'}
                >
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                    <option key={n} value={String(n)}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* E-mail */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={submitState === 'loading'}
              />
              <span className={styles.helperText}>
                Você receberá a confirmação de presença neste e-mail.
              </span>
            </div>

            {/* Telefone */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">
                Telefone para contato
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={styles.input}
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={handleChange}
                disabled={submitState === 'loading'}
              />
            </div>

            {/* Observações */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="notes">
                Observações
              </label>
              <textarea
                id="notes"
                name="notes"
                className={styles.textarea}
                placeholder="Restrições alimentares, acessibilidade ou qualquer outra informação..."
                value={form.notes}
                onChange={handleChange}
                rows={4}
                disabled={submitState === 'loading'}
              />
            </div>

            {/* Mensagem de erro */}
            {submitState === 'error' && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}

            {/* Botão de envio */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitState === 'loading'}
            >
              {submitState === 'loading' ? 'Enviando...' : 'Confirmar presença'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
