import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderWorkspace} from '../scripts/build.mjs';
import {readFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('renderWorkspace performance benchmark', () => {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    renderWorkspace(workspace);
  }
  const end = performance.now();
  const time = end - start;
  console.log(`Rendered 10000 times in ${time.toFixed(2)}ms`);

  // ensure the time is well within a reasonable bound (< 500ms should be plenty even on slow CI)
  assert.ok(time < 500, `Render performance degraded. Took ${time.toFixed(2)}ms (expected < 500ms)`);
});
