// Runs Python (Pyodide) off the main thread, so a slow or endless program can be stopped.
import { loadPyodide } from "./pyodide/pyodide.mjs";
let py = null;
self.onmessage = async (e) => {
  const { id, code } = e.data;
  let out = "";
  try {
    if (!py) {
      py = await loadPyodide({ indexURL: new URL("./pyodide/", import.meta.url).href });
      py.runPython("import builtins\ndef _no_input(*a, **k):\n    raise RuntimeError('input() is not available here; put the value in a variable instead')\nbuiltins.input = _no_input");
      self.postMessage({ ready: true });
    }
    py.setStdout({ batched: (s) => { out += s + "\n"; } });
    py.setStderr({ batched: (s) => { out += s + "\n"; } });
    await py.runPythonAsync(code);
    self.postMessage({ id, out });
  } catch (err) {
    self.postMessage({ id, out, err: String((err && err.message) || err) });
  }
};
