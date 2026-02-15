<script>
  import { onMount } from "svelte";

  // State
  let length = 16;
  let password = "";
  let copied = false;

  // Toggle State
  let useCommonSpecial = true; // e.g. ! @ # $
  let useUncommonSpecial = false; // e.g. [ ] { } - _ /

  // Character Sets
  const charsAlphaNum =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsCommon = "!@#$%^&*?";
  const charsUncommon = "()[]{}<>:;,.-_+=/|\\~\"'`";

  // Generate password
  function generatePassword() {
    let charset = charsAlphaNum;

    if (useCommonSpecial) charset += charsCommon;
    if (useUncommonSpecial) charset += charsUncommon;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    password = newPassword;
    copied = false;
  }

  // Gopy to clipboard
  async function copyToClipboard() {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(password);
      copied = true;
      setTimeout(() => (copied = false), 1000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }

  onMount(() => {
    generatePassword();
  });
</script>

<div
  class="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8"
>
  <!-- Header -->
  <div class="text-center mb-8">
    <h2
      class="text-2xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
    >
      Password Generator
    </h2>
    <p class="text-gray-400 text-sm mt-2">Quick and secure</p>
  </div>

  <!-- Password Display -->
  <div class="mb-6">
    <button
      on:click={copyToClipboard}
      class="w-full relative group min-h-16 rounded-xl border-2 transition-all duration-300 ease-out flex items-center justify-center overflow-hidden
      {copied
        ? 'border-green-500 bg-green-500/10 cursor-default'
        : 'border-gray-800 bg-gray-950 hover:border-gray-600 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer active:scale-[0.98]'}"
      aria-label="Copy password to clipboard"
    >
      {#if copied}
        <!-- Copied State -->
        <div
          class="flex items-center gap-2 text-green-400 animate-in fade-in zoom-in duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polyline points="20 6 9 17 4 12"></polyline></svg
          >
          <span class="text-lg font-bold font-sans">Copied!</span>
        </div>
      {:else}
        <!-- Normal State -->
        <div class="w-full flex items-center justify-between px-4 py-3">
          <span class="font-mono text-lg text-gray-200 break-all text-left mr-3"
            >{password}</span
          >

          <div
            class="text-gray-600 group-hover:text-indigo-400 transition-colors"
          >
            <!-- Copy Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><rect x="9" y="9" width="13" height="13" rx="2" ry="2"
              ></rect><path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
              ></path></svg
            >
          </div>
        </div>
      {/if}
    </button>
  </div>

  <!-- Controls -->
  <div class="space-y-6">
    <!-- Length Slider -->
    <div>
      <div class="flex justify-between items-center mb-3">
        <label for="length" class="text-sm font-medium text-gray-300"
          >Length</label
        >
        <span class="text-indigo-400 font-bold font-mono">{length}</span>
      </div>
      <input
        id="length"
        type="range"
        min="6"
        max="32"
        bind:value={length}
        on:input={generatePassword}
        class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
      />
    </div>

    <!-- Container for toggles -->
    <div
      class="bg-gray-950/50 rounded-xl p-4 space-y-4 border border-gray-800/50"
    >
      <!-- Toggle: Common Symbols -->
      <label class="flex items-center justify-between cursor-pointer group">
        <div class="flex flex-col">
          <span class="text-gray-300 text-sm font-medium">Symbols</span>
          <span class="text-gray-500 text-xs">! @ # $ ?</span>
        </div>
        <input
          type="checkbox"
          bind:checked={useCommonSpecial}
          on:change={generatePassword}
          class="sr-only peer"
        />
        <div
          class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
        ></div>
      </label>

      <div class="h-px bg-gray-800 w-full"></div>

      <!-- Toggle: Uncommon -->
      <label class="flex items-center justify-between cursor-pointer group">
        <div class="flex flex-col">
          <span class="text-gray-300 text-sm font-medium">Ambiguous</span>
          <span class="text-gray-500 text-xs">{`{ } [ ] / \` -`}</span>
        </div>
        <input
          type="checkbox"
          bind:checked={useUncommonSpecial}
          on:change={generatePassword}
          class="sr-only peer"
        />
        <div
          class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
        ></div>
      </label>
    </div>

    <!-- Generate Button -->
    <button
      on:click={generatePassword}
      class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" /></svg
      >
      Generate New
    </button>
  </div>
</div>
