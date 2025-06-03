import os

TEMPLATES = [
    """
    <div id='onetrust-banner-sdk'>
        <p>Wir verwenden Cookies.</p>
        <button id='onetrust-accept-btn-handler'>Alle akzeptieren</button>
        <button class='onetrust-close-btn-handler'>Alle ablehnen</button>
    </div>
    """,
    """
    <div id='CybotCookiebotDialog'>
        <p>Diese Seite verwendet Cookies</p>
        <button data-cookieconsent='reject'>Nur notwendige</button>
        <button data-cookieconsent='accept'>Alle akzeptieren</button>
    </div>
    """,
    """
    <div id='sp-cc' class='message-overlay'>
        <p>Cookies zum Verbessern des Angebots</p>
        <button class='sp-choice reject'>Alle ablehnen</button>
        <button class='sp-choice accept'>Akzeptieren</button>
    </div>
    """,
    """
    <div class='cookie-banner'>
        <p>Wir nutzen Cookies.</p>
        <button class='reject'>Ablehnen</button>
        <button class='accept'>Akzeptieren</button>
    </div>
    """,
    """
    <div class='consent-banner'>
        <p>Bitte Cookies erlauben.</p>
        <button class='deny'>Nein</button>
        <button class='allow'>Ja</button>
    </div>
    """
]

PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang='de'>
<head>
    <meta charset='UTF-8'>
    <title>Testseite {num}</title>
    <style>
        body {{ font-family: sans-serif; margin: 20px; }}
    </style>
</head>
<body>
    <h1>Testseite {num}</h1>
    {banner}
</body>
</html>
"""

INDEX_TEMPLATE_HEADER = """<!DOCTYPE html>
<html lang='de'>
<head><meta charset='UTF-8'><title>Testumgebung</title></head>
<body>
<h1>Cookie-Banner Testseiten</h1>
<ul>"""

INDEX_TEMPLATE_FOOTER = """</ul>
</body>
</html>"""

def main():
    os.makedirs('test_env/pages', exist_ok=True)
    index_links = []
    for i in range(1, 101):
        banner = TEMPLATES[(i - 1) % len(TEMPLATES)]
        page_content = PAGE_TEMPLATE.format(num=i, banner=banner)
        filename = f'test_env/pages/site_{i:03}.html'
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(page_content)
        index_links.append(f"<li><a href='pages/site_{i:03}.html'>Seite {i}</a></li>")

    with open('test_env/index.html', 'w', encoding='utf-8') as idx:
        idx.write(INDEX_TEMPLATE_HEADER)
        idx.write("\n".join(index_links))
        idx.write(INDEX_TEMPLATE_FOOTER)

if __name__ == '__main__':
    main()
