import emailjs from '@emailjs/browser'
// ---------------------------------------------------------------------------
// Fill these in after creating a free account at https://www.emailjs.com
// See README -> "إشعار الإيميل" for the exact steps.
// ---------------------------------------------------------------------------
const EMAILJS_PUBLIC_KEY = 'jbEy03Tn_O-fiZktm'
const EMAILJS_SERVICE_ID = 'service_gs3459v'
const EMAILJS_TEMPLATE_ID = 'template_1v3sak9'

/**
 * Sends you a notification email when a guest leaves a message. Fails
 * silently — if EmailJS isn't configured yet, or the request fails, the
 * guest's message still saves normally; they never see an error either way.
 */
export function notifyNewMessage(name: string, message: string) {
  if (EMAILJS_PUBLIC_KEY.startsWith('YOUR_')) return // not configured yet

  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        guest_name: name,
        guest_message: message,
        sent_at: new Date().toLocaleString('ar-EG'),
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    .catch(() => {
      // Notification is a nice-to-have — never block or alarm the guest.
    })
}
