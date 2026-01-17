def overlay_schema(data):
    return {
        "type": data.get("type"),
        "content": data.get("content"),
        "x": data.get("x", 0),
        "y": data.get("y", 0),
        "width": data.get("width", 150),
        "height": data.get("height", 50),
    }