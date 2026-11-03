"""Build a separate search index for each language after i18n has merged pages."""
import json
from pathlib import Path
from mkdocs.plugins import event_priority
LOCALES = ('en', 'pt-BR', 'es', 'fr', 'it')
@event_priority(-100)
def on_post_build(config):
    search = Path(config['site_dir']) / 'search'
    source = search / 'search_index.json'
    if not source.exists():
        return
    index = json.loads(source.read_text(encoding='utf-8'))
    for locale in LOCALES:
        docs = []
        for doc in index['docs']:
            prefix = doc['location'].lstrip('/').split('/')[0]
            language = prefix if prefix in LOCALES else 'en'
            if language == locale:
                docs.append(doc)
        data = dict(index, docs=docs)
        (search / f'search_index.{locale}.json').write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')
