import requests


def get_ds_response(user_input):
    messages = [{"role": "user", "content": user_input}]  # 消息格式

    payload = {
        "model": "deepseek-v4-pro",
        "messages": messages,
        "reasoning_effort": "high",
        "thinking": {"type": "enabled"},
    }

    headers = {
        "Authorization": "Bearer sk-ae607f0aa07849589fe2d87da84904a3",
        "Content-Type": "application/json",
    }

    response = requests.post(
        "https://api.deepseek.com/chat/completions",
        json=payload,  # 使用 json= 参数
        headers=headers,
    )

    return response


if __name__ == "__main__":
    resp = get_ds_response("你好呀")
    print(resp.status_code)
    if resp.status_code == 200:
        print(resp.json()["choices"][0]["message"]["content"])
    else:
        print(resp.text)
