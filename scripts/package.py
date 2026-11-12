#!/usr/bin/env python3
"""Generate portable skill, source and example artifacts without external dependencies."""
from pathlib import Path
import shutil,tempfile,zipfile,hashlib
from build import build,ROOT

def zip_tree(source,destination,prefix):
    with zipfile.ZipFile(destination,'w',zipfile.ZIP_DEFLATED) as z:
        for f in sorted(source.rglob('*')):
            if f.is_file() and '__pycache__' not in f.parts:
                z.write(f,str(Path(prefix)/f.relative_to(source)))

def package():
    out=ROOT/'artifacts';out.mkdir(exist_ok=True)
    build(ROOT/'packs/northstar-service-handoff/1.0.0/pack.json',out/'structured-feedback-example-1.0.0.html')
    with tempfile.TemporaryDirectory() as tmp:
        skill=Path(tmp)/'structured-feedback';shutil.copytree(ROOT/'skills/structured-feedback',skill)
        framework=skill/'assets/framework'
        for folder in ['src','packs','schemas']:
            shutil.copytree(ROOT/folder,framework/folder)
        (framework/'scripts').mkdir();shutil.copy(ROOT/'scripts/build.py',framework/'scripts/build.py')
        zip_tree(skill,out/'structured-feedback-skill-1.0.0.zip','structured-feedback')
    with zipfile.ZipFile(out/'structured-feedback-framework-1.0.0.zip','w',zipfile.ZIP_DEFLATED) as z:
        for f in sorted(ROOT.rglob('*')):
            if f.is_file() and not any(part in ['.git','dist','artifacts','distribution','__pycache__'] for part in f.relative_to(ROOT).parts):
                z.write(f,str(Path('Structured-Feedback-Framework')/f.relative_to(ROOT)))
    release=ROOT/'distribution';release.mkdir(exist_ok=True)
    for name in ['structured-feedback-skill-1.0.0.zip','structured-feedback-example-1.0.0.html']:
        shutil.copy(out/name,release/name)
    (release/'SHA256SUMS').write_text(''.join(hashlib.sha256((release/name).read_bytes()).hexdigest()+'  '+name+'\n' for name in ['structured-feedback-skill-1.0.0.zip','structured-feedback-example-1.0.0.html']))
    for f in sorted(out.iterdir()):print(f)
if __name__=='__main__':package()
