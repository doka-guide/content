import openai
import os
from github import Github
import subprocess

def get_changed_files(pr_number):
    """Получаем список изменённых файлов в пулл-реквесте."""
    repo_name = os.getenv('GITHUB_REPOSITORY')
    github_token = os.getenv('GITHUB_TOKEN')  # Должен быть установлен в секретах GitHub
    g = Github(github_token)
    repo = g.get_repo(repo_name)
    pr = repo.get_pull(pr_number)
    return [file.filename for file in pr.get_files()]

def check_spelling_and_grammar(text):
    """Проверяем орфографию и пунктуацию текста с помощью ChatGPT."""
    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt="Проверьте орфографию и пунктуацию: " + text,
        temperature=0,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    
    return response.choices[0].text.strip()

def main():
    pr_number = int(os.getenv('PR_NUMBER'))  # Установите номер PR как переменную окружения или передайте напрямую
    changed_files = get_changed_files(pr_number)
    
    for file_path in changed_files:
        # Проверяем только текстовые файлы (пример: .txt, .md)
        if file_path.endswith(('.txt', '.md')):
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    print(f"Проверка файла {file_path}:")
                    result = check_spelling_and_grammar(content)
                    print(result)
            except Exception as e:
                print(f"Ошибка при обработке файла {file_path}: {e}")

if __name__ == "__main__":
    main()
