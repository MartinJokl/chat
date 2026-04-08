"use client"

import useFeedbackText from "@/hooks/feedback";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ChangeEvent, useState } from "react"

export default function Login() {
  const [feedbackText, ChangeFeedbackText] = useFeedbackText();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function changeFromData(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value
    }))
  }

  async function login() {
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });
    if (error) {
      ChangeFeedbackText(error.message ?? 'Error')
    }
  }


  return (
    <div className="bg-bg w-max mx-auto p-4 mt-12 rounded-2xl text-xl">
      <h1 className="text-3xl font-bold text-center">Log in</h1>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-bg-light px-4 py-2 m-2 rounded-md"
          value={formData.password}
          onChange={changeFromData}
        />
      </form>
      <p className={`text-error text-center text-base ${feedbackText ? 'visible' : 'invisible'}`}>{feedbackText || 'feedback text'}</p>
      <button
        className="bg-bg-light px-4 py-2 block mx-auto mt-1 border rounded-md border-border cursor-pointer hover:bg-border transition"
        onClick={login}
      >Log in</button>
      <Link href="/register" className="text-link mx-auto w-max block mt-2">Do not have an account? Register</Link>
    </div>
  )
}