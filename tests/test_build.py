import unittest,sys,tempfile,json,re,zipfile,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build import build
class BuildTests(unittest.TestCase):
 def test_embedded_content_is_json_and_cannot_close_script(self):
  p=json.loads((ROOT/'packs/northstar-service-handoff/1.0.0/pack.json').read_text());p['title']='A </script><img src=x onerror=alert(1)> & résumé'
  with tempfile.TemporaryDirectory() as t:
   source=Path(t)/'pack.json';source.write_text(json.dumps(p));out=build(source,Path(t)/'index.html');html=out.read_text();embedded=re.search(r'<script id="pack-data" type="application/json">(.*?)</script>',html,re.S).group(1)
   self.assertNotIn('<',embedded);self.assertEqual(json.loads(embedded)['title'],p['title']);self.assertNotIn('/* PACK */',html)
 def test_portable_skill_build(self):
  subprocess.run([sys.executable,str(ROOT/'scripts/package.py')],check=True,stdout=subprocess.PIPE)
  with tempfile.TemporaryDirectory() as t:
   with zipfile.ZipFile(ROOT/'artifacts/structured-feedback-skill-1.0.0.zip') as z:z.extractall(t)
   skill=Path(t)/'structured-feedback';self.assertTrue((skill/'SKILL.md').is_file());framework=skill/'assets/framework';out=Path(t)/'example.html'
   subprocess.run([sys.executable,str(framework/'scripts/build.py'),'--out',str(out)],check=True,stdout=subprocess.PIPE)
   self.assertIn('A clearer handoff',out.read_text())
if __name__=='__main__':unittest.main()
