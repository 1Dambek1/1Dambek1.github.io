"use server";

export async function submitCareerForm(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  if (!name || !phone) return { error: "Заполните поля" };

  const BOT_TOKEN = "8039284568:AAFxwePvOV393PCUY8ShPxvCMRNeWGKKpdQ";

  // Вставь сюда ID ГРУППЫ (с минусом в начале)
  const GROUP_CHAT_ID = "-1003768733105";

  const text = `
🌲 <b>НОВАЯ ЗАЯВКА В ГРУППУ</b>
👤 <b>Имя:</b> ${name}
📞 <b>Тел:</b> <code>${phone}</code>
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: GROUP_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    });
    return { success: true };
  } catch (e) {
    return { error: "Ошибка" };
  }
}
