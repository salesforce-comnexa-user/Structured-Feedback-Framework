#!/usr/bin/env python3
"""Build one portable HTML artifact from an explicitly chosen test pack."""
from pathlib import Path
import argparse,json
ROOT=Path(__file__).resolve().parents[1]
def build(pack_path,out):
    pack=json.loads(Path(pack_path).read_text())
    template=(ROOT/'src/index.html').read_text()
    payload=json.dumps(pack,ensure_ascii=False).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
    # Literal JSON unicode escapes keep data from closing the script element.
    payload=payload.replace('\\\\u00','\\u00')
    replacements={'/* STYLE */':(ROOT/'src/style.css').read_text(),'/* PACK */':payload,'/* CORE */':(ROOT/'src/core.js').read_text(),'/* APP */':(ROOT/'src/app.js').read_text()}
    for marker,value in replacements.items():template=template.replace(marker,value)
    output=Path(out);output.parent.mkdir(parents=True,exist_ok=True);output.write_text(template)
    return output
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--pack',type=Path,default=ROOT/'packs/northstar-service-handoff/1.0.0/pack.json');parser.add_argument('--out',type=Path,default=ROOT/'dist/index.html');args=parser.parse_args();print(build(args.pack,args.out))
