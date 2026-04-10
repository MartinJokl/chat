"use client"

//import { useEffect, useState } from "react"

type NotificationBoxProps = {
  notification: {
    title: string,
    description: string,
    show: boolean
  }
}

export default function NotificationBox({ notification }: NotificationBoxProps) {
  /*
  const [notification2, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setInterval(() => {
      setNotification(n => n ? null : 'lorem ipsum bl abla');
    }, 2000);
  }, [])*/

  return (
    <div className={`absolute right-4 top-4 ${notification.show ? 'translate-x-0' : 'translate-x-100'} transition-transform duration-300`}>
      <div className="bg-bg px-8 py-4 text-center rounded-xl">
        <h2>{notification?.title}</h2>
        <p className="text-text-muted">{notification?.description}</p>
      </div>
    </div>
  )
}