"""Minimal cognitive agent example.

Behavior:
- receive input
- estimate confidence
- ask a question if confidence is low
- otherwise return an answer
"""


def estimate_confidence(user_input: str) -> float:
    """Very small heuristic for demo purposes."""
    cleaned = user_input.strip()
    if not cleaned:
        return 0.0
    if "?" in cleaned and len(cleaned) < 20:
        return 0.45
    if len(cleaned.split()) < 3:
        return 0.5
    return 0.85


def run_agent(user_input: str, threshold: float = 0.6) -> str:
    confidence = estimate_confidence(user_input)
    if confidence < threshold:
        return "Could you clarify your request with a bit more detail?"
    return f"Answer: based on your request, the next step is to proceed with a minimal safe protocol path."


if __name__ == "__main__":
    text = input("User input: ")
    print(run_agent(text))
