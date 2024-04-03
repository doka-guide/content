import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

# Пример использования ChatGPT для проверки текста
# Вам нужно будет адаптировать этот скрипт для обработки файлов из PR

text = "Текст для проверки."
response = openai.Completion.create(
  engine="text-davinci-003",
  prompt="Проверьте орфографию и пунктуацию: " + text,
  temperature=0,
  max_tokens=60,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
)

print(response.choices[0].text.strip())
