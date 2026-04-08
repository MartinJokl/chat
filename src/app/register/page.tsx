"use client"

import useFeedbackText from "@/hooks/feedback";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ChangeEvent, useState } from "react"

export default function Register() {
  const [feedbackText, ChangeFeedbackText] = useFeedbackText();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    verificationPassword: ""
  });

  function changeFromData(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value
    }))
  }

  async function register() {
    if (formData.password !== formData.verificationPassword) {
      ChangeFeedbackText('Password do not match');
      return;
    }

    const { error } = await authClient.signUp.email({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      callbackURL: "/",
    });
    if (error) {
      if (error.code === 'VALIDATION_ERROR') {
        if (error.message?.startsWith('[body.email]')) {
          ChangeFeedbackText(('Invalid email'))
        }
        else if (error.message?.startsWith('[body.password]')) {
          ChangeFeedbackText(('Invalid password'))
        }
      }
    }
  }


  return (
    <div className="bg-bg w-max mx-auto p-4 mt-12 rounded-2xl text-xl">
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <form className="mx-auto mt-8 text-right">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          className="bg-bg-light px-4 py-2 m-2 rounded-md"
          value={formData.email}
          onChange={changeFromData}
        />
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-bg-light px-4 py-2 m-2 rounded-md"
          value={formData.name}
          onChange={changeFromData}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-bg-light px-4 py-2 m-2 rounded-md"
          value={formData.password}
          onChange={changeFromData}
        />
        <br />
        <label htmlFor="verificationPassword">Password again:</label>
        <input
          type="password"
          name="verificationPassword"
          id="verificationPassword"
          className="bg-bg-light px-4 py-2 m-2 rounded-md"
          value={formData.verificationPassword}
          onChange={changeFromData}
        />
      </form>
      <p className={`text-error text-center text-base ${feedbackText ? 'visible' : 'invisible'}`}>{feedbackText || 'feedback text'}</p>
      <button
        className="bg-bg-light px-4 py-2 block mx-auto mt-1 border rounded-md border-border cursor-pointer hover:bg-border transition"
        onClick={register}
      >Register</button>
      <Link href="/login" className="text-link mx-auto w-max block mt-2">Have an accoutn already? Log in</Link>
    </div>
  )
}